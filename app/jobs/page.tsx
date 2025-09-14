'use client';

import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Mock job data - simplified for image-based display
const jobPostings = [
  {
    id: 1,
    title: "Senior Software Developer",
    company: "TechCorp Solutions",
    posted: "2 days ago",
    image: "/images/poster/hiringPoster1.png",
    featured: true,
    urgent: true
  }
];

interface JobPosting {
  id: number;
  title: string;
  company: string;
  posted: string;
  image: string;
  featured: boolean;
  urgent: boolean;
}

const JobCard = ({ job, index }: { job: JobPosting, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Job Image Only */}
      <div className="relative group">
        <Image
          src={job.image}
          alt="Job Poster"
          width={800}
          height={600}
          className="w-full h-auto object-contain rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
        />
        
        {/* Posted Date Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 text-white">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Posted {job.posted}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Job Listings */}
        <div className="space-y-8">
          {jobPostings.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {jobPostings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 text-lg mb-4">
              No job postings available at the moment.
            </div>
            <p className="text-gray-400">
              Check back later for new opportunities!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
