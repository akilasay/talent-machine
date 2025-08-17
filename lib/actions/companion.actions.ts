'use server';

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import { revalidatePath } from "next/cache";

//chnage this to mogno db
export const createCompanion = async (formData: CreateCandidates) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');

    return data[0];
}

//creating candidate after form submit
export const createCandidate = async (formData: CreateCandidates) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a candidate');

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;
}
// Sample dummy data
const dummyCandidates = [
{
    id: '1',
    name: 'Robert Wilson',
    job: 'Accountant',
    topic: 'Excel, QuickBooks, Financial Reporting',
    gender: 'male',
    education: 'bsc',
    experience: 7,
  },
  {
    id: '2',
    name: 'Laura Thompson',
    job: 'Book Keeper',
    topic: 'Ledger Management, QuickBooks, Payroll',
    gender: 'female',
    education: 'diploma',
    experience: 4,
  },
  {
    id: '3',
    name: 'Michael Patel',
    job: 'Tax Advisor',
    topic: 'Tax Preparation, IRS Regulations, Auditing',
    gender: 'male',
    education: 'msc',
    experience: 10,
  },
  {
    id: '4',
    name: 'Emily Davis',
    job: 'Business Analyst',
    topic: 'Data Analysis, SQL, Financial Modeling',
    gender: 'female',
    education: 'bsc',
    experience: 5,
  },
  {
    id: '5',
    name: 'James Lee',
    job: 'Accountant',
    topic: 'GAAP, Account Reconciliation, SAP',
    gender: 'male',
    education: 'bsc',
    experience: 8,
  },
  {
    id: '6',
    name: 'Sarah Martinez',
    job: 'Book Keeper',
    topic: 'Bookkeeping, Xero, Accounts Payable',
    gender: 'female',
    education: 'high school',
    experience: 3,
  },
  {
    id: '7',
    name: 'David Kim',
    job: 'Tax Advisor',
    topic: 'Tax Planning, Corporate Tax, Excel',
    gender: 'male',
    education: 'msc',
    experience: 12,
  },
  {
    id: '8',
    name: 'Rachel Brown',
    job: 'Business Analyst',
    topic: 'Tableau, Process Optimization, Stakeholder Management',
    gender: 'female',
    education: 'bsc',
    experience: 6,
  },
  {
    id: '9',
    name: 'Thomas Nguyen',
    job: 'Accountant',
    topic: 'Financial Statements, QuickBooks, Budgeting',
    gender: 'male',
    education: 'diploma',
    experience: 5,
  },
  {
    id: '10',
    name: 'Jennifer Clark',
    job: 'Tax Advisor',
    topic: 'Tax Compliance, Auditing, TurboTax',
    gender: 'female',
    education: 'bsc',
    experience: 9,
  },
  {
    id: '11',
    name: 'William Garcia',
    job: 'Business Analyst',
    topic: 'Power BI, Requirements Gathering, Agile',
    gender: 'male',
    education: 'msc',
    experience: 7,
  },
  {
    id: '12',
    name: 'Amanda Lopez',
    job: 'Book Keeper',
    topic: 'Accounts Receivable, QuickBooks, Data Entry',
    gender: 'female',
    education: 'highschool',
    experience: 2,
  },
];

export interface Candidate {
  id: string;
  name: string;
  job: string;
  topic: string;
  gender: string;
  education: string;
  experience: number;
}

export const getAllCandidates = async ({ limit = 10, page = 1, job, topic }: GetAllCandidates) => {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredCandidates = [...dummyCandidates];

  // Handle filtering based on job and topic
  if (job && topic) {
    // Filter by job and (topic or name)
    const jobArray = Array.isArray(job) ? job : [job];
    const topicArray = Array.isArray(topic) ? topic : [topic];
    
    filteredCandidates = filteredCandidates.filter((candidate) => {
      const jobMatch = jobArray.some((j) =>
        candidate.job.toLowerCase().includes(j.toLowerCase())
      );
      const topicMatch = topicArray.some((t) =>
        candidate.topic.toLowerCase().includes(t.toLowerCase()) ||
        candidate.name.toLowerCase().includes(t.toLowerCase())
      );
      return jobMatch && topicMatch;
    });
  } else if (job) {
    // Filter by job only
    const jobArray = Array.isArray(job) ? job : [job];
    filteredCandidates = filteredCandidates.filter((candidate) =>
      jobArray.some((j) => candidate.job.toLowerCase().includes(j.toLowerCase()))
    );
  } else if (topic) {
    // Filter by topic or name
    const topicArray = Array.isArray(topic) ? topic : [topic];
    filteredCandidates = filteredCandidates.filter((candidate) =>
      topicArray.some((t) =>
        candidate.topic.toLowerCase().includes(t.toLowerCase()) ||
        candidate.name.toLowerCase().includes(t.toLowerCase())
      )
    );
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCandidates = filteredCandidates.slice(startIndex, endIndex);

  return paginatedCandidates;
};

export const getCandidateById = async (id: string): Promise<Candidate | null> => {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  const candidate = dummyCandidates.find((candidate) => candidate.id === id);
  return candidate || null;
};

// export const getCompanion = async (id: string) => {
//     const supabase = createSupabaseClient();

//     const { data, error } = await supabase
//         .from('companions')
//         .select()
//         .eq('id', id);

//     if(error) return console.log(error);

//     return data[0];
// }

// export const addToSessionHistory = async (companionId: string) => {
//     const { userId } = await auth();
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase.from('session_history')
//         .insert({
//             companion_id: companionId,
//             user_id: userId,
//         })

//     if(error) throw new Error(error.message);

//     return data;
// }

// export const getRecentSessions = async (limit = 10) => {
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase
//         .from('session_history')
//         .select(`companions:companion_id (*)`)
//         .order('created_at', { ascending: false })
//         .limit(limit)

//     if(error) throw new Error(error.message);

//     return data.map(({ companions }) => companions);
// }

// export const getUserSessions = async (userId: string, limit = 10) => {
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase
//         .from('session_history')
//         .select(`companions:companion_id (*)`)
//         .eq('user_id', userId)
//         .order('created_at', { ascending: false })
//         .limit(limit)

//     if(error) throw new Error(error.message);

//     return data.map(({ companions }) => companions);
// }

// export const getUserCompanions = async (userId: string) => {
//     const supabase = createSupabaseClient();
//     const { data, error } = await supabase
//         .from('companions')
//         .select()
//         .eq('author', userId)

//     if(error) throw new Error(error.message);

//     return data;
// }

// export const newCompanionPermissions = async () => {
//     const { userId, has } = await auth();
//     const supabase = createSupabaseClient();

//     let limit = 0;

//     if(has({ plan: 'pro' })) {
//         return true;
//     } else if(has({ feature: "3_companion_limit" })) {
//         limit = 3;
//     } else if(has({ feature: "10_companion_limit" })) {
//         limit = 10;
//     }

//     const { data, error } = await supabase
//         .from('companions')
//         .select('id', { count: 'exact' })
//         .eq('author', userId)

//     if(error) throw new Error(error.message);

//     const companionCount = data?.length;

//     if(companionCount >= limit) {
//         return false
//     } else {
//         return true;
//     }
// }

// // Bookmarks
// export const addBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase.from("bookmarks").insert({
//     companion_id: companionId,
//     user_id: userId,
//   });
//   if (error) {
//     throw new Error(error.message);
//   }
//   // Revalidate the path to force a re-render of the page

//   revalidatePath(path);
//   return data;
// };

// export const removeBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .delete()
//     .eq("companion_id", companionId)
//     .eq("user_id", userId);
//   if (error) {
//     throw new Error(error.message);
//   }
//   revalidatePath(path);
//   return data;
// };

// // It's almost the same as getUserCompanions, but it's for the bookmarked companions
// export const getBookmarkedCompanions = async (userId: string) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
//     .eq("user_id", userId);
//   if (error) {
//     throw new Error(error.message);
//   }
//   // We don't need the bookmarks data, so we return only the companions
//   return data.map(({ companions }) => companions);
// };
