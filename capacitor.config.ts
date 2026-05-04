import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hathrekha.ai',
  appName: 'HathRekha AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
