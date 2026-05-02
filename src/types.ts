/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium: boolean;
  totalScans: number;
}

export interface PalmScanReport {
  id: string;
  date: string;
  scores: {
    destiny: number;
    wealth: number;
    love: number;
    career: number;
  };
  insights: {
    personality: string;
    wealthForecast: string;
    loveDestiny: string;
    careerPath: string;
    growthWarnings: string[];
    remedies: string[];
  };
  luckyTraits: {
    auraColor: string;
    luckyGem: string;
    powerNumbers: number[];
    rulingPlanet: string;
  };
  timelinePredictions: {
    shortTerm: string;
    mediumTerm: string;
    longTerm: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}
