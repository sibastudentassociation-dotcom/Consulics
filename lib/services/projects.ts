import { adminDb } from '@/lib/firebase-admin';

function ensureDb() {
  if (!adminDb) {
    throw new Error('Firebase admin is not initialized.');
  }
  return adminDb;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'tax' | 'trucking';
  clientName?: string;
  imageUrl?: string;
  testimonial?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectsService {
  static async getAllProjects(): Promise<Project[]> {
    const firestore = ensureDb();
    const snapshot = await firestore.collection('projects').where('isActive', '==', true).get();
    return snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Project[];
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const firestore = ensureDb();
    const doc = await firestore.collection('projects').doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return {
      ...data,
      createdAt: data!.createdAt.toDate(),
      updatedAt: data!.updatedAt.toDate(),
    } as Project;
  }

  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const firestore = ensureDb();
    const projectRef = firestore.collection('projects').doc();
    const newProject: Project = {
      id: projectRef.id,
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await projectRef.set(newProject);
    return newProject;
  }

  static async updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('projects').doc(id).update({
      ...updates,
      updatedAt: new Date(),
    });
  }

  static async deleteProject(id: string): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('projects').doc(id).delete();
  }
}