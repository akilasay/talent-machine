// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };

enum Subject {
  maths = "maths",
  language = "language",
  science = "science",
  history = "history",
  coding = "coding",
  geography = "geography",
  economics = "economics",
  finance = "finance",
  business = "business",
}

type Companion = Models.DocumentList<Models.Document> & {
  $id: string;
  name: string;
  subject: Subject;
  topic: string;
  duration: number;
  bookmarked: boolean;
};

interface CreateCandidates {
  fistName: string;
  lastName: string;
  job: string;
  topic: string;
  gender: string;
  eductaion: string;
  experience: number;
  academicQualifications: string;
  professionalQualifications: string;
  author?: string;
}

interface GetAllCompanions {
  limit?: number;
  page?: number;
  subject?: string | string[];
  topic?: string | string[];
}
interface GetAllCandidates {
  limit?: number;
  page?: number;
  job?: string | string[];
  topic?: string | string[];
  education?: string;
  experience?: string;
}

interface BuildClient {
  key?: string;
  sessionToken?: string;
}

interface CreateUser {
  email: string;
  name: string;
  image?: string;
  accountId: string;
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}


interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface CompanionComponentProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  voice: string;
  style: string;
}