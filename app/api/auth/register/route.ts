import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth';
import { registerSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const user = await AuthService.createUser(
      validatedData.email,
      validatedData.password,
      `${validatedData.firstName} ${validatedData.lastName}`,
      validatedData.phone
    );

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
