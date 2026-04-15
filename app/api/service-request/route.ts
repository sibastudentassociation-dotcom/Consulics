import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, serviceType, comments, uploadedFiles } = body;

    // Save to Firestore
    const docRef = adminDb.collection('service-requests').doc();
    await docRef.set({
      id: docRef.id,
      firstName,
      lastName,
      email,
      phone,
      serviceType,
      comments: comments || '',
      uploadedFiles: uploadedFiles || {},
      status: 'pending',
      createdAt: new Date(),
    });

    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Service Request from ${firstName} ${lastName}`,
        html: `
          <h2>New Service Request</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p><strong>Comments:</strong> ${comments || 'None'}</p>
          <h3>Uploaded Files:</h3>
          ${Object.entries(uploadedFiles || {}).map(([category, urls]) => `
            <p><strong>${category}:</strong></p>
            <ul>${(urls as string[]).map(url => `<li><a href="${url}">${url}</a></li>`).join('')}</ul>
          `).join('')}
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Service request error:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}