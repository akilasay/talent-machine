
import EmployerProfileForm from "@/components/EmployerProfileForm"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const EmployerNew = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const redirectUrl = "/employers/new";
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  // Check if user is employer type
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single();

  if (!userProfile || userProfile.user_type !== 'employer') {
    // If user is a candidate, show access denied message
    if (userProfile?.user_type === 'candidate') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-6">
                You're currently signed in as a job seeker. Only employers can create employer profiles.
              </p>
              <div className="space-y-3">
                <a 
                  href="/candidates" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Go to Job Seeker Dashboard
                </a>
                <a 
                  href="/sign-out" 
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  Sign Out & Create Employer Account
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // For users without a profile or other types, redirect to sign-up
    redirect('/employers/sign-up');
  }

  return <EmployerProfileForm />;
};

export default EmployerNew;


// import {auth} from "@clerk/nextjs/server";
// import {redirect} from "next/navigation";


// const NewCompanion = async() => {

//     // const { userId } = await auth(); //check authenticate user can redirect to the page
//     // if(!userId) redirect('/sign-in');

//   return (
//       <main className="mx-auto px-1 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 lg:w-1/3 min-md:w-2/3 items-center justify-center">
//             {/* <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center "> */}
//                 <article className="w-full gap-4 flex flex-col">
//                   <h1 className="text-3xl font-bold">Create User profile</h1>
                  
//                   <CandidateForm />
//             </article>
//           </main>
//   )
// }

// export default NewCompanion



