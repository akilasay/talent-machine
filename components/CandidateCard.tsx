"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

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
  const { user } = useAuth();
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check user type
  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        setUserType(null);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('user_type')
          .eq('user_id', user.id)
          .single();

        setUserType(userProfile?.user_type || null);
      } catch (error) {
        console.error('Error checking user type:', error);
        setUserType(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserType();
  }, [user]);

  // Determine if user can view full profile
  const canViewFullProfile = userType === 'employer' || !user;

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

      {/* Access Control for Profile Button */}
      {canViewFullProfile ? (
        // Employers and non-logged in users can view full profiles
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
      ) : (
        // Job seekers see limited access message
        <div className="w-full mt-auto">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-center text-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Premium Access</span>
            </div>
            <p className="text-xs">
              Login as employer to view full profile
            </p>
          </div>
          <Link href="/employers/sign-up" className="block mt-2">
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Sign Up as Employer
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="dark:invert"
              />
            </button>
          </Link>
        </div>
      )}
    </article>
  );
};

export default CandidateCard;