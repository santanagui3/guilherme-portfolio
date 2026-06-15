// Firebase Configuration
// These are public Firebase client-side keys (safe to expose in frontend code)
// Security is handled by Firebase Auth + Firestore Security Rules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYeDVYxUlBIT7BHXn-sW-KO5KJODaIfJA",
  authDomain: "guilherme-portifolio-5237f.firebaseapp.com",
  projectId: "guilherme-portifolio-5237f",
  storageBucket: "guilherme-portifolio-5237f.firebasestorage.app",
  messagingSenderId: "699123522746",
  appId: "1:699123522746:web:e0da01e93e3f9d56387683"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
