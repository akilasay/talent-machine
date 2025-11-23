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
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "NextGen Global",
    posted: "1 day ago",
    image: "/images/poster/secondJobPost.jpeg",
    featured: true,
    urgent: false
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
      className="relative group"
    >
      {/* Job Image Card */}
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300">
        <div className="relative w-full min-h-[450px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[700px] flex items-center justify-center bg-gray-50">
          <Image
            src={job.image}
            alt={job.title}
            width={800}
            height={1000}
            className="w-full h-auto max-h-[700px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
            priority={index === 0}
          />
          
          {/* Posted Date Overlay */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
            <div className="flex items-center space-x-2 text-white">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Posted {job.posted}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-2">
            Browse All Jobs
          </h1>
          <p className="text-gray-600">
            Discover exciting career opportunities from top companies
          </p>
        </div>

        {/* Job Listings - Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
