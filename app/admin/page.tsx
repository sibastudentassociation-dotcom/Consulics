import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { requireAdminToken } from '@/lib/require-admin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    redirect('/login');
  }

  try {
    await requireAdminToken(session);
  } catch (error) {
    redirect('/login');
  }

  return <AdminDashboard />;
}
