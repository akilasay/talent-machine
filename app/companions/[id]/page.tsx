import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCandidateByIdFromDB } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface CandidateProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Await the params
  const { id } = await params;
  
  if (!user) {
    // Redirect to sign-in with the current URL as redirectUrl
    const redirectUrl = `/companions/${id}`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
  }

  //TODO --> check user has subcription to seee the details -After Payment feature

  const candidate = await getCandidateByIdFromDB(id);

  if (!candidate) {
    notFound();
  }

  const color = getSubjectColor(candidate.job);

  return (
    <main className="max-w-5xl mx-auto p-6 my-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
        {/* Header Section */}
        <div className={`h-16 w-full ${color}`}></div>
        <div className="relative px-6 pt-4 pb-8">
          <div className="absolute -top-16 left-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.fist_name + ' ' + candidate.last_name)}&background=ffffff&color=000000&size=128`}
                alt={`${candidate.fist_name} ${candidate.last_name}'s avatar`}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-16">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{candidate.fist_name} {candidate.last_name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">{candidate.job}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-8">
          {/* Sidebar: Personal Info */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Personal Information</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Gender:</span>{' '}
                  {candidate.gender.charAt(0).toUpperCase() + candidate.gender.slice(1)}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Contact</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span> {candidate.fist_name.toLowerCase()}.{candidate.last_name.toLowerCase()}@example.com
              </p>
            </div>
          </div>

          {/* Main Content: Skills, Education, Experience */}
          <div className="md:col-span-2 space-y-6">
            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.topic.split(', ').map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Education</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Degree:</span>{' '}
                {candidate.education === 'no'
                  ? 'High School'
                  : candidate.education === 'diploma'
                  ? 'Diploma'
                  : candidate.education === 'bsc'
                  ? 'BSc Degree'
                  : 'MSc Degree'}
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Experience</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">Years of Experience:</span> {candidate.experience} years
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                <span className="font-medium">Role:</span> {candidate.job}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}