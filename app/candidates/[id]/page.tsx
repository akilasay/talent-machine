import { notFound } from 'next/navigation';
import { getCandidateByIdFromDB } from '@/lib/actions/companion.actions';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CandidateProfileWrapper from '@/components/CandidateProfileWrapper';

interface CandidateProfilePageProps {
  params: { id: string };
  searchParams: { edit?: string };
}

export default async function CandidateProfilePage({ params, searchParams }: CandidateProfilePageProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    // Redirect to sign-in with the current URL as redirectUrl
    const redirectUrl = `/candidates/${params.id}`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  //TODO --> check user has subcription to seee the details -After Payment feature

  const candidate = await getCandidateByIdFromDB(params.id);

  if (!candidate) {
    notFound();
  }

  // Check if the current user is the owner of this candidate profile
  const isOwner = user.id === candidate.author;

  // Check if we should start in edit mode
  const shouldStartEditing = searchParams.edit === 'true' && isOwner;

  return (
    <CandidateProfileWrapper 
      candidate={candidate} 
      isOwner={isOwner}
      initialEditMode={shouldStartEditing}
      userEmail={user.email}
    />
  );
}