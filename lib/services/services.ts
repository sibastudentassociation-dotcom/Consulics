import { adminDb } from '@/lib/firebase-admin';

function ensureDb() {
  if (!adminDb) {
    throw new Error('Firebase admin is not initialized.');
  }
  return adminDb;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'tax' | 'trucking';
  price: number;
  features: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ServicesService {
  static async getAllServices(): Promise<Service[]> {
    const firestore = ensureDb();
    const snapshot = await firestore.collection('services').where('isActive', '==', true).get();
    return snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Service[];
  }

  static async getServiceById(id: string): Promise<Service | null> {
    const firestore = ensureDb();
    const doc = await firestore.collection('services').doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data,
      createdAt: data!.createdAt.toDate(),
      updatedAt: data!.updatedAt.toDate(),
    } as Service;
  }

  static async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const firestore = ensureDb();
    const serviceRef = firestore.collection('services').doc();
    const newService: Service = {
      id: serviceRef.id,
      ...service,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await serviceRef.set(newService);
    return newService;
  }

  static async updateService(id: string, updates: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('services').doc(id).update({
      ...updates,
      updatedAt: new Date(),
    });
  }

  static async deleteService(id: string): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('services').doc(id).delete();
  }
}