import { createClient } from '@/lib/supabase/server';
import { getAllEmployers } from '@/lib/actions/employer.actions';
import { redirect } from 'next/navigation';
import AdminEmployersList from '@/components/admin/AdminEmployersList';

export default async function AdminEmployersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = '/admin/employers';
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').map((id) => id.trim()).filter(Boolean);
  if (!adminIds.length || !adminIds.includes(user.id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access denied</h1>
          <p className="text-gray-600">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  let employers;
  try {
    employers = await getAllEmployers();
  } catch (e) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <p className="text-red-600">{e instanceof Error ? e.message : 'Failed to load employers'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Employer approvals</h1>
        <p className="text-gray-600 mb-6">
          Approve employers so they can view candidate profiles. New employers start with approval disabled.
        </p>
        <AdminEmployersList employers={employers} />
      </div>
    </div>
  );
}
