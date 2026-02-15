import { notFound } from 'next/navigation';
import { getCandidateByIdFromDB } from '@/lib/actions/companion.actions';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';
import CandidateProfileWrapper from '@/components/CandidateProfileWrapper';

interface CandidateProfilePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}

export default async function CandidateProfilePage({ params, searchParams }: CandidateProfilePageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Await the params and searchParams
  const { id } = await params;
  const { edit } = await searchParams;
  
  if (!user) {
    // Redirect to sign-in with the current URL as redirectUrl
    const redirectUrl = `/candidates/${id}`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  const candidate = await getCandidateByIdFromDB(id);

  if (!candidate) {
    notFound();
  }

  // Check if the current user is the owner of this candidate profile
  const isOwner = user.id === candidate.author;

  // Get user type to determine access level
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single();

  const userType = userProfile?.user_type;

  // If viewer is employer, check approval (must be approved to view candidate profiles)
  let employerApproved = false;
  if (userType === 'employer') {
    const { data: employerRow } = await supabase
      .from('employers')
      .select('approval_enabled')
      .eq('user_id', user.id)
      .single();
    employerApproved = employerRow?.approval_enabled === true;
  }

  // Check if we should start in edit mode
  const shouldStartEditing = edit === 'true' && isOwner;

  // Access control logic
  if (!isOwner) {
    // If user is not the owner, check if they have permission to view
    if (userType === 'employer' && !employerApproved) {
      // Employer not yet approved by admin
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>
              <p className="text-gray-600 mb-6">
                Your employer account is under review. You will be able to view candidate profiles once an administrator approves your account. This usually takes a short time.
              </p>
              <Link
                href="/employers"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Back to Employer Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }
    if (userType === 'candidate') {
      // Job seekers cannot view other job seekers' full profiles
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Access Required</h2>
              <p className="text-gray-600 mb-6">
                As a job seeker, you can see profile cards in search results, but to view full candidate profiles, you need to sign in as an employer.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/sign-out" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Sign Out & Create Employer Account
                </Link>
                <Link 
                  href="/job-seekers" 
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Go to Job Seeker Dashboard
                </Link>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Employers can view full candidate profiles to find the best talent for their companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (userType !== 'employer') {
      // If user type is not employer, they cannot view full profiles
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
              <p className="text-gray-600 mb-6">
                Only employers can view full candidate profiles. Please sign in as an employer to access this feature.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/employers/sign-up" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Create Employer Account
                </Link>
                <Link 
                  href="/job-seekers" 
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Go to Job Seeker Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // If user is owner or has employer access, show the profile
  return (
    <CandidateProfileWrapper 
      candidate={candidate} 
      isOwner={isOwner}
      initialEditMode={shouldStartEditing}
      userEmail={user.email}
    />
  );
}