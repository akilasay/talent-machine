// import {getAllCompanions, getAllCandidates} from "@/lib/actions/companion.actions";
// import CandidateCard from "@/components/CandidateCard";
// import {getSubjectColor} from "@/lib/utils";
// import SearchInput from "@/components/SearchInput";
// import SearchComponent from "@/components/SearchComponent";
// import JobFilter from "@/components/JobFilter";

// const CandidatesLibrary = async ({ searchParams } : SearchParams ) => {
  
//   const filters = await searchParams;
//   const job = filters.job ? filters.job : '';
//   const topic = filters.topic ? filters.topic : '';

//   // Only fetch candidates if job or topic is provided
//   // Initialize candidates with explicit type
//   // let candidates = null;
//   // if (job || topic) {
//   //   candidates = await getAllCandidates({ job, topic });
//   // }

//   console.log('PARAMS:',filters);
//   const candidates = await getAllCandidates({ job, topic });
//   // console.log('candidates:',candidates);


//   return (
//       <main className="p-4 relative z-10 max-w-7xl mx-auto" >
//       <SearchComponent />
    
//       <section className=" flex flex-wrap gap-4">
//                 {candidates.map((candidate) => (
//                     <CandidateCard
//                         key={candidate.id}
//                         {...candidate}
//                         color={getSubjectColor(candidate.job)}
//                     />
//                 ))}
//             </section>   
//     </main>
//   )
// }

// export default CandidatesLibrary

import { getCandidatesFromDB } from '@/lib/actions/companion.actions';
import { getEmployerApprovalStatus } from '@/lib/actions/employer.actions';
import CandidateCard from '@/components/CandidateCard';
import { getSubjectColor } from '@/lib/utils';
import CandidateSearchFilters from '@/components/CandidateSearchFilters';
import { createClient } from '@/lib/supabase/server';

interface SearchParams {
  searchParams: Promise<{
    job?: string | string[];
    topic?: string | string[];
    education?: string;
    experience?: string;
    limit?: string;
    page?: string;
  }>;
}

const CandidatesLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const job = filters.job ? filters.job : '';
  const topic = filters.topic ? filters.topic : '';
  const education = filters.education || '';
  const experience = filters.experience || '';
  const limit = parseInt(filters.limit || '12');
  const page = parseInt(filters.page || '1');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let employerApproved = false;
  if (user) {
    employerApproved = await getEmployerApprovalStatus();
  }

  // Only fetch candidates if any filter is provided
  let candidates = [];
  if (job || topic || education || experience) {
    candidates = await getCandidatesFromDB({ 
      job: job as string, 
      topic: topic as string,
      education: education as string,
      experience: experience as string,
      limit, 
      page 
    });
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <main className="p-6 relative z-10 max-w-7xl mx-auto pt-24 md:pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Find Your Perfect Candidate
          </h1>
          <p className="text-blue-700">
            Use the search form below to find skilled professionals by job title or skills
          </p>
        </div>

        <CandidateSearchFilters />

        {candidates.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-blue-700">
                Showing {candidates.length} candidate{candidates.length !== 1 ? 's' : ''}
                {(job || topic || education || experience) && ' matching your search'}
              </p>
            </div>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  {...candidate}
                  color={getSubjectColor(candidate.job)}
                  employerApproved={employerApproved}
                />
              ))}
            </section>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {(job || topic || education || experience) ? "No candidates found" : "Start Your Search"}
              </h3>
              <p className="text-blue-700 mb-6">
                {(job || topic || education || experience)
                  ? "Try adjusting your search criteria to find more candidates."
                  : "Use the search form above to find candidates by job title, skills, education, or experience. For example, search for 'accountant' or 'developer'."
                }
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidatesLibrary;