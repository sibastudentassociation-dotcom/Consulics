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

const firebaseAdminApp = global.__firebaseAdminApp || (hasAdminCredentials ? admin.initializeApp({
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
}) : undefined);

global.__firebaseAdminApp = firebaseAdminApp;

if (!firebaseAdminApp) {
  throw new Error('Firebase Admin credentials are missing. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.');
}

export const adminAuth = admin.auth(firebaseAdminApp);
export const adminDb = admin.firestore(firebaseAdminApp);
export const adminStorage = admin.storage(firebaseAdminApp);
export const auth = adminAuth;
export const db = adminDb;

export default admin;