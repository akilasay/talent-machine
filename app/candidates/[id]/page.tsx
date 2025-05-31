import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Placeholder for your candidate fetching and utility functions
import { getCandidateById } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

// Define props for dynamic route
interface CandidateProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  // Resolve params
  const { id } = await params;

  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    const redirectUrl = `/sign-in?redirect_url=${encodeURIComponent(`/candidates/${id}`)}`;
    redirect(redirectUrl);
  }

  // Check user role
  // const user = await currentUser();
  // const userRole = user?.privateMetadata?.role as string | undefined; // Explicit type cast

  // if (userRole !== 'employer') {
  //   redirect('/job-seekers');
  // }

  // Fetch candidate data
  const candidate = await getCandidateById(id);
  if (!candidate) {
    notFound();
  }

  const color = getSubjectColor(candidate.job);

  return (
    <main className="max-w-5xl mx-auto p-6 my-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
        <div className={`h-16 w-full ${color}`}></div>
        <div className="relative px-6 pt-4 pb-8">
          <div className="absolute -top-16 left-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&background=ffffff&color=000000&size=128`}
                alt={`${candidate.name}'s avatar`}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-16">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{candidate.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">{candidate.job}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12">
          <div className="md:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Details</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Gender:</span>{' '}
                {candidate.gender?.charAt(0).toUpperCase() + (candidate.gender?.slice(1) || '')}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span>{' '}
                {candidate.name.toLowerCase().replace(' ', '.') + '@example.com'}
              </p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(candidate.topic || '').split(', ').map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Education</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Degree:</span>{' '}
                {candidate.education === 'highschool'
                  ? 'High School'
                  : candidate.education === 'diploma'
                  ? 'Diploma'
                  : candidate.education === 'bsc'
                  ? 'BSc Degree'
                  : 'MSc Degree'}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Experience</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Years:</span> {candidate.experience || 0} years
              </p>
              {/* <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-medium">Role:</span> {candidate.title || candidate.job}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}