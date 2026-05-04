import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  increment,
  updateDoc,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile, PalmScanReport } from '../types';

// Connection Test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Cosmic Link Established: Firestore Connected");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("The stars are unreachable. Please check your internet connection.");
    }
  }
}

testConnection();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  user: UserProfile | null;
  loading: boolean;
  currentReport: PalmScanReport | null;
  setCurrentReport: (report: PalmScanReport | null) => void;
  reports: PalmScanReport[];
  addReport: (report: PalmScanReport) => Promise<void>;
  currentImage: string | null;
  setCurrentImage: (img: string | null) => void;
  upgradeToPremium: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentReport, setCurrentReport] = useState<PalmScanReport | null>(null);
  const [reports, setReports] = useState<PalmScanReport[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Sync user profile
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            const newUser: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Traveler',
              photoURL: firebaseUser.photoURL || undefined,
              isPremium: false,
              totalScans: 0
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
          } else {
            setUser(userSnap.data() as UserProfile);
          }
        } catch (error) {
          console.error("User profile sync error", error);
        }

        // Sync reports
        const reportsRef = collection(db, 'users', firebaseUser.uid, 'reports');
        const q = query(reportsRef, orderBy('createdAt', 'desc'));
        
        const unsubscribeReports = onSnapshot(q, (snapshot) => {
          const fetchedReports = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })) as PalmScanReport[];
          setReports(fetchedReports);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, `users/${firebaseUser.uid}/reports`);
        });

        setLoading(false);
        return () => unsubscribeReports();
      } else {
        setUser(null);
        setReports([]);
        setLoading(false);
      }
    }, (error) => {
      console.error("Auth listener error", error);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const addReport = async (report: PalmScanReport) => {
    if (!auth.currentUser) return;
    const reportRef = doc(collection(db, 'users', auth.currentUser.uid, 'reports'));
    const userRef = doc(db, 'users', auth.currentUser.uid);

    try {
      await setDoc(reportRef, {
        ...report,
        id: reportRef.id,
        createdAt: serverTimestamp()
      });
      await updateDoc(userRef, {
        totalScans: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, reportRef.path);
    }
  };

  const upgradeToPremium = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    try {
      await updateDoc(userRef, { isPremium: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, userRef.path);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, loading,
      currentReport, setCurrentReport, 
      reports, addReport,
      currentImage, setCurrentImage,
      upgradeToPremium
    }}>
      {!loading && children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
