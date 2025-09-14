import CandidateForm from "@/components/CandidateForm"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const NewCompanion = async() => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const redirectUrl = "/companions/new";
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  return (
      <main className="mx-auto px-1 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {/* <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center "> */}
                <article className="w-full gap-4 flex flex-col">
                  <h1 className="text-3xl font-bold">Create User profile</h1>
                  
                  <CandidateForm />
            </article>
          </main>
  )
}

export default NewCompanion