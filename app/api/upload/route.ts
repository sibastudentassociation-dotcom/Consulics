import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop()?.toLowerCase();
    // PDF ke liye image resource type use karo
    const resourceType = (ext === 'pdf') ? 'image' : 'raw';
const result = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    {
      folder: `consulics/${category}`,
      resource_type: 'auto', // ← 'image' ki jagah 'auto'
      type: 'upload',
      access_mode: 'public',
      use_filename: true,      // ← original filename use karo
      unique_filename: true,
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  ).end(buffer);
});

    return NextResponse.json({ url: (result as any).secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}