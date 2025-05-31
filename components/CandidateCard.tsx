import Image from 'next/image';
import Link from 'next/link';

interface CandidateCardProps {
  id: string;
  name: string;
  job: string;
  topic: string;
  education: string;
  experience: number;
  color: string;
}

const CandidateCard = ({ id, job, topic, education, experience, color }: CandidateCardProps) => {
  return (
    <article
      className="flex flex-col flex-1 min-w-[280px] max-w-[360px] rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
    >
      {/* Header: Job Tag and Bookmark */}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full text-blue-950 capitalize ${color}`}
        >
          {job}
        </span>
        <button
          className="p-2 bg-gray-500 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 active:scale-95 transition-all duration-200"
          aria-label="Bookmark candidate"
        >
          <Image
            src="/icons/bookmark.svg"
            alt="Bookmark"
            width={12}
            height={14}
            className="dark:invert"
          />
        </button>
      </div>

      {/* Name */}
      {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
        {name}
      </h2> */}

      {/* Skills */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {topic}
      </p>

      {/* Education */}
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="Education"
          width={16}
          height={16}
          className="dark:invert"
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Education:</span>{' '}
          {education === 'highschool'
            ? 'High School'
            : education === 'diploma'
            ? 'Diploma'
            : education === 'bsc'
            ? 'BSc Degree'
            : 'MSc Degree'}
        </p>
      </div>

      {/* Experience */}
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="Experience"
          width={16}
          height={16}
          className="dark:invert"
        />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">Experience:</span> {experience} years
        </p>
      </div>

      {/* Full Profile Button */}
      <Link href={`/candidates/${id}`} className="w-full mt-auto">
        <button
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          View Full Profile
          <Image
            src="/icons/arrow-right.svg"
            alt="Arrow"
            width={24}
            height={24}
            className="dark:invert"
          />
        </button>
      </Link>
    </article>
  );
};

export default CandidateCard;