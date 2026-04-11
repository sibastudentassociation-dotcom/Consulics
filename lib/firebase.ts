import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, setPersistence, browserSessionPersistence, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export async function initializeAuthPersistence() {
  await setPersistence(auth, browserSessionPersistence);
}

export async function loginWithEmailPassword(email: string, password: string): Promise<User> {
  await initializeAuthPersistence();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  await firebaseSignOut(auth);
}

export async function getCurrentIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  return user ? await user.getIdToken(true) : null;
}

export default app;
