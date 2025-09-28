import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import EmployerProfileWrapper from "@/components/EmployerProfileWrapper";
import { getEmployerProfileById } from "@/lib/actions/employer.actions";

interface EmployerProfilePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function EmployerProfilePage({ params, searchParams }: EmployerProfilePageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Await the params and searchParams
  const { id } = await params;
  const { edit } = await searchParams;
  
  if (!user) {
    // Redirect to sign-in with the current URL as redirectUrl
    const redirectUrl = `/employers/${id}`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  // Get employer profile by ID
  const employer = await getEmployerProfileById(id);

  if (!employer) {
    notFound();
  }

  // Check if the current user is the owner of this employer profile
  const isOwner = user.id === employer.user_id;

  // Check if we should start in edit mode
  const shouldStartEditing = edit === 'true' && isOwner;

  return (
    <EmployerProfileWrapper 
      employer={employer} 
      isOwner={isOwner}
      initialEditMode={shouldStartEditing}
      userEmail={user.email}
    />
  );
}




