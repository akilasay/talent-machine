import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUserCandidateProfile } from "@/lib/actions/companion.actions";
import JobSeekersClient from "./JobSeekersClient";

export default async function JobSeekersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const redirectUrl = "/job-seekers";
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  // Check if user already has a candidate profile
  let existingProfile = null;
  try {
    existingProfile = await getUserCandidateProfile();
  } catch (error) {
    console.error("Error checking existing profile:", error);
    // If there's an error checking, continue with create mode
  }

  return (
    <JobSeekersClient 
      hasExistingProfile={!!existingProfile} 
      existingProfileId={existingProfile?.id}
      userEmail={user.email}
    />
  );
}




// import Link from "next/link"
// import Image from "next/image"

// const page = () => {
//   return (
//         <section className="mx-auto bg-[#2c2c2c] text-white rounded-2xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
//             <div className="bg-[#fccc41] rounded-2xl px-3 py-1.5 text-black">Start building future professionalism.</div>
//             <h2 className="text-3xl font-bold">
//                 Earn the value Build your Profile
//             </h2>
//             <p>Add details and Get Hired.</p>
//             <Image src="images/cta.svg" alt="cta" width={362} height={232} />
//             <button className="bg-[#fe5933] text-white rounded-xl cursor-pointer px-4 py-2 flex items-center gap-2">
//                 <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
//                 <Link href="/candidates/new">
//                     <p> Create Profile</p>
//                 </Link>
//             </button>
//         </section>
    
//   )
// }

// export default page
