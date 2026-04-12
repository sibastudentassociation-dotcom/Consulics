import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const hasAdminCredentials = Boolean(
  firebaseAdminConfig.projectId &&
  firebaseAdminConfig.privateKey &&
  firebaseAdminConfig.clientEmail
);

declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdminApp: admin.app.App | undefined;
}

const firebaseAdminApp: admin.app.App | undefined = global.__firebaseAdminApp;

declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdminApp: admin.app.App | undefined;
}

global.__firebaseAdminApp = firebaseAdminApp;

function initializeFirebaseAdmin(): admin.app.App | undefined {
  if (global.__firebaseAdminApp) {
    return global.__firebaseAdminApp;
  }

  if (!hasAdminCredentials) {
    return undefined;
  }

  const app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseAdminConfig.projectId,
      privateKey: firebaseAdminConfig.privateKey,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: 'https://accounts.google.com/o/oauth2/auth',
      tokenUri: 'https://oauth2.googleapis.com/token',
      authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
      clientCertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    } as any),
    databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${firebaseAdminConfig.projectId}.firebaseio.com`,
  });

  global.__firebaseAdminApp = app;
  return app;
}

function getFirebaseAdminApp(): admin.app.App {
  const app = global.__firebaseAdminApp || initializeFirebaseAdmin();
  if (!app) {
    throw new Error('Firebase Admin credentials are missing. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
  }
  return app;
}

function createProxy<T extends object>(factory: () => T) {
  return new Proxy({} as T, {
    get(_, prop) {
      const target = factory();
      const value = (target as any)[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(_, prop, value) {
      const target = factory();
      (target as any)[prop] = value;
      return true;
    },
    has(_, prop) {
      const target = factory();
      return prop in target;
    },
  });
}

export const adminAuth = createProxy(() => admin.auth(getFirebaseAdminApp())) as admin.auth.Auth;
export const adminDb = createProxy(() => admin.firestore(getFirebaseAdminApp())) as admin.firestore.Firestore;
export const adminStorage = createProxy(() => admin.storage(getFirebaseAdminApp())) as admin.storage.Storage;
export const auth = adminAuth;
export const db = adminDb;

export default admin;