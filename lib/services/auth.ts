import { adminAuth, adminDb } from '@/lib/firebase-admin';

function ensureAuth() {
  if (!adminAuth) {
    throw new Error('Firebase admin is not initialized.');
  }
  return adminAuth;
}

function ensureDb() {
  if (!adminDb) {
    throw new Error('Firebase admin is not initialized.');
  }
  return adminDb;
}

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

export class AuthService {
  static async createUser(email: string, password: string, name: string, phone?: string): Promise<AuthUser> {
    const adminAuth = ensureAuth();
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone,
    });

    const now = new Date();
    const userData = {
      uid: userRecord.uid,
      name,
      email,
      phone: phone || null,
      role: 'user' as const,
      createdAt: now,
      lastLogin: now,
    };

    const firestore = ensureDb();
    await firestore.collection('users').doc(userRecord.uid).set(userData);

    return userData;
  }

  static async getUser(uid: string): Promise<AuthUser | null> {
    const firestore = ensureDb();
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) return null;

    const data = userDoc.data();
    return {
      uid: data!.uid,
      name: data!.name,
      email: data!.email,
      phone: data!.phone || null,
      role: data!.role,
      createdAt: data!.createdAt.toDate(),
      lastLogin: data!.lastLogin.toDate(),
    };
  }

  static async verifyToken(token: string): Promise<AuthUser | null> {
    try {
      const decodedToken = await ensureAuth().verifyIdToken(token);
      return await this.getUser(decodedToken.uid);
    } catch (error) {
      return null;
    }
  }

  static async updateUser(uid: string, updates: Partial<Pick<AuthUser, 'name' | 'phone'>>): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('users').doc(uid).update({
      ...updates,
      updatedAt: new Date(),
    });
  }
}
