// import CandidateForm from "@/components/CandidateForm"
// import {auth} from "@clerk/nextjs/server";
// import {redirect} from "next/navigation";


// const NewCompanion = async() => {

//     const { userId } = await auth(); //check authenticate user can redirect to the page
//     // if(!userId) redirect('/sign-in');
//       if (!userId) {
//     // Redirect to sign-in with the current URL as redirectUrl
//     const redirectUrl = "/candidates/new";
//     redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
//   }

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


import CandidateForm from "@/components/CandidateForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth(); // check authenticated user
  if (!userId) {
    const redirectUrl = "/candidates/new";
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-blue-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 cursor-default select-none">
            Create Your Profile
          </h1>
        </div>

        <div className="w-full">
          <CandidateForm />
        </div>
      </section>
    </main>
  );
};

export default NewCompanion;

