import { adminDb } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

function ensureDb() {
  if (!adminDb) {
    throw new Error('Firebase admin is not initialized.');
  }
  return adminDb;
}

export interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'responded';
}

export class ContactService {
  static async createInquiry(data: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): Promise<ContactInquiry> {
    const firestore = ensureDb();
    const inquiryRef = firestore.collection('contact_inquiries').doc();
    const inquiry: ContactInquiry = {
      id: inquiryRef.id,
      ...data,
      createdAt: new Date(),
      status: 'new',
    };

    await inquiryRef.set(inquiry);

    // Send notification email
    await this.sendNotificationEmail(inquiry);

    return inquiry;
  }

  static async getInquiries(): Promise<ContactInquiry[]> {
    const firestore = ensureDb();
    const snapshot = await firestore.collection('contact_inquiries').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as ContactInquiry[];
  }

  static async updateInquiryStatus(id: string, status: ContactInquiry['status']): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('contact_inquiries').doc(id).update({ status });
  }

  private static async sendNotificationEmail(inquiry: ContactInquiry): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@consulics.com', // Replace with actual admin email
      subject: `New Contact Inquiry from ${inquiry.firstName} ${inquiry.lastName}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${inquiry.firstName} ${inquiry.lastName}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Service:</strong> ${inquiry.service}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
        <p><strong>Received:</strong> ${inquiry.createdAt.toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}