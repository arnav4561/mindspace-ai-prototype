import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "gencrewprototype",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "gencrewprototype.firebaseapp.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "REDACTED_API_KEY",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "gencrewprototype.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "235635541612",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:235635541612:web:6a4e15d7d240fabb677a49",
  measurementId: "G-TWNX0K58C1"
};

// Initialize Firebase only on client side and avoid double initialization
let app;
if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
} else if (typeof window !== 'undefined') {
  app = getApps()[0];
}

// Initialize Firebase services only on client side
export const auth = typeof window !== 'undefined' && app ? getAuth(app) : null;
export const functions = typeof window !== 'undefined' && app ? getFunctions(app) : null;
export const firestore = typeof window !== 'undefined' && app ? getFirestore(app) : null;
