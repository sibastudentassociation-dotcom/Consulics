import { db } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

function ensureDb() {
  if (!db) {
    throw new Error('Firebase admin is not initialized.');
  }
  return db;
}

export interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: Date;
}

export class AppointmentService {
  static async createAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
    const firestore = ensureDb();
    const appointmentRef = firestore.collection('appointments').doc();
    const appointment: Appointment = {
      id: appointmentRef.id,
      ...data,
      status: 'pending',
      createdAt: new Date(),
    };

    await appointmentRef.set(appointment);
    await this.sendConfirmationEmail(appointment);
    await this.sendAdminNotificationEmail(appointment);

    return appointment;
  }

  static async getAppointments(): Promise<Appointment[]> {
    const firestore = ensureDb();
    const snapshot = await firestore.collection('appointments').orderBy('appointmentDate', 'desc').get();
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Appointment[];
  }

  static async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const firestore = ensureDb();
    const snapshot = await firestore
      .collection('appointments')
      .where('appointmentDate', '==', date)
      .orderBy('appointmentTime')
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Appointment[];
  }

  static async updateAppointment(id: string, update: Partial<Pick<Appointment, 'status' | 'appointmentDate' | 'appointmentTime'>>): Promise<void> {
    const firestore = ensureDb();
    await firestore.collection('appointments').doc(id).update(update);
  }

  private static async createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  private static async sendConfirmationEmail(appointment: Appointment): Promise<void> {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return;
    }

    const transporter = await this.createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.email,
      subject: `Appointment Request Received — ${appointment.serviceType}`,
      html: `
        <h2>Appointment Request Received</h2>
        <p>Hi ${appointment.firstName},</p>
        <p>Thanks for requesting an appointment. Here are the details we received:</p>
        <ul>
          <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
          <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
          <li><strong>Service:</strong> ${appointment.serviceType}</li>
        </ul>
        <p>We will confirm this booking shortly.</p>
        <p>Best regards,<br/>The CONSULICS Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }

  private static async sendAdminNotificationEmail(appointment: Appointment): Promise<void> {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return;
    }

    const transporter = await this.createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@consulics.com',
      subject: `New Appointment Request from ${appointment.firstName} ${appointment.lastName}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${appointment.firstName} ${appointment.lastName}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Phone:</strong> ${appointment.phone}</p>
        <p><strong>Service:</strong> ${appointment.serviceType}</p>
        <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
        <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
        <p><strong>Notes:</strong> ${appointment.notes ?? 'None'}</p>
        <p><strong>Received:</strong> ${appointment.createdAt.toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}
