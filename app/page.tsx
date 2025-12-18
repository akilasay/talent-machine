'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {  Briefcase, ArrowRight, MapPin } from 'lucide-react';
import { mockJobs } from '@/constants/jobsData';
import { useMemo } from 'react';

export default function HomePage() {
  // Sort jobs by date (newest first) and get the latest 3
  const latestJobs = useMemo(() => {
    const sortedJobs = [...mockJobs].sort((a, b) => {
      if (!a.posted || !b.posted) return 0;
      
      // Parse date from YYYY/MM/DD format
      const parseDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const dateA = parseDate(a.posted);
      const dateB = parseDate(b.posted);
      
      // Newest first
      return dateB.getTime() - dateA.getTime();
    });
    
    return sortedJobs.slice(0, 3);
  }, []);
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 lg:pb-12 min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">        {/* Background Image - Full Section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/herobg2.jpeg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content Container with Blue Overlay Box */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-10 pt-6 lg:pt-8">
          {/* Blue Overlay Box - Larger Area with Smaller Margins */}
          <div className="relative bg-blue-500/70 rounded-lg lg:rounded-xl p-8 md:p-12 lg:p-16 mx-2 md:mx-4 lg:mx-6 shadow-xl backdrop-blur-sm">
            <div className="max-w-2xl">
              {/* Text Content and Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="space-y-4 lg:space-y-5">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                    Discover Your Dream Career Today
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-white/95 leading-relaxed max-w-xl drop-shadow-md">
                    Your next opportunity is just a search away. We connect ambitious professionals with companies that value talent, innovation, and growth.
                  </p>
                </div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-start"
                >
                  <Link href="/jobs" className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-auto bg-white/95 hover:bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-white/50 hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group backdrop-blur-sm"
                    >
                      {/* Animated shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                      {/* Glow effect on hover */}
                      <span className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                      <Briefcase className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110" />
                      <span className="relative z-10">Browse Jobs</span>
                      <ArrowRight className="h-5 w-5 relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-900 uppercase tracking-wider">
              Latest Jobs
            </h2>
          </motion.div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {latestJobs.map((job, index) => {
              // Use poster field from job data, fallback to logo if poster doesn't exist
              const jobImage = job.poster || job.logo;
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/jobs/${job.id}`}>
                    <Card className="h-full bg-gradient-to-br from-blue-100 to-blue-50 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg overflow-hidden hover:from-blue-200 hover:to-blue-100">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Job Image */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shadow-md">
                              <Image
                                src={jobImage}
                                alt={job.company}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          {/* Company Name and Type */}
                          <div className="flex-1 min-w-0">
                            <p className="text-blue-900 font-semibold text-sm mb-1 truncate group-hover:text-blue-700 transition-colors">
                              {job.company}
                            </p>
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            {job.posted}
                          </span>
                          </div>
                        </div>

                        {/* Job Title and Location */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

