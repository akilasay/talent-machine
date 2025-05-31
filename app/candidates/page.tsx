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

import { getAllCandidates, Candidate } from '@/lib/actions/companion.actions';
import CandidateCard from '@/components/CandidateCard';
import { getSubjectColor } from '@/lib/utils';
import SearchComponent from '@/components/SearchComponent';

interface SearchParams {
  searchParams: Promise<{
    job?: string | string[];
    topic?: string | string[];
    limit?: string;
    page?: string;
  }>;
}

  
const CandidatesLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const job = filters.job ? filters.job : '';
  const topic = filters.topic ? filters.topic : '';
  // const limit = parseInt(searchParams.limit || '10');
  // const page = parseInt(searchParams.page || '1');

  // Only fetch candidates if job or topic is provided
  let candidates: Candidate[] = [];
  if (job || topic) {
    candidates = await getAllCandidates({ job, topic });
  }

  return (
    <main className="p-6 relative z-10 max-w-7xl mx-auto">
      <SearchComponent />

      {candidates.length > 0 ? (
        <section className="flex flex-wrap gap-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              {...candidate}
              color={getSubjectColor(candidate.job)}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Please use the search form above to find candidates.
          </p>
        </div>
      )}
    </main>
  );
};

export default CandidatesLibrary;