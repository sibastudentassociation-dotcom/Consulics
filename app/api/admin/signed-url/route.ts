import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);
    const { url } = await request.json();

    // Extract public_id from URL
    const urlParts = url.split('/upload/');
    const publicIdWithExtension = urlParts[1].split('/').slice(1).join('/');
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');

    const signedUrl = cloudinary.utils.private_download_url(publicId, 'pdf', {
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      attachment: true,
    });

    return NextResponse.json({ signedUrl });
  } catch (error: any) {
    console.error('Signed URL error:', error);
    return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}