import { NextRequest } from 'next/server';
import { verifyUser, verifyUserToken } from '@/lib/verify-token';

export async function requireAdmin(request: NextRequest) {
  const user = await verifyUser(request);
  if (!user || user.role !== 'admin') {
    const error = new Error('Unauthorized');
    (error as any).status = 403;
    throw error;
  }
  return user;
}

export async function requireAdminToken(token: string | undefined) {
  if (!token) {
    const error = new Error('Unauthorized');
    (error as any).status = 403;
    throw error;
  }

  const user = await verifyUserToken(token);

  if (!user || user.role !== 'admin') {
    const error = new Error('Unauthorized');
    (error as any).status = 403;
    throw error;
  }

  return user;
}
