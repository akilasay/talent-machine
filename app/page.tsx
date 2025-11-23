'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Briefcase,
  MapPin, 
  Building2
} from 'lucide-react';

// Mock job data - Jobs from job posters
const mockJobs = [
  // From English Training Center Poster (Keystone)
  {
    id: 1,
    title: 'English Teachers',
    company: 'Keystone',
    location: 'Galle',
    type: 'Full time',
    posted: '3 days ago',
    sector: 'Education',
    logo: '/images/company1.png',
  },
  {
    id: 2,
    title: 'Trainee Teachers',
    company: 'Keystone',
    location: 'Galle',
    type: 'Full time',
    posted: '3 days ago',
    sector: 'Education',
    logo: '/images/company1.png',
  },
  {
    id: 3,
    title: 'Coordinators',
    company: 'Keystone',
    location: 'Galle',
    type: 'Full time',
    posted: '3 days ago',
    sector: 'Education',
    logo: '/images/company1.png',
  },
  // From Accounting Positions Poster
  {
    id: 4,
    title: 'Assistant Accountant',
    company: 'Finance Solutions',
    location: 'Colombo',
    type: 'Full time',
    posted: '2 days ago',
    sector: 'Accounting',
    logo: '/images/company2.png',
  },
  {
    id: 5,
    title: 'Accounts Executives',
    company: 'Finance Solutions',
    location: 'Colombo',
    type: 'Full time',
    posted: '2 days ago',
    sector: 'Accounting',
    logo: '/images/company2.png',
  },
];

export default function JobsListingPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-28 md:pt-32 py-8 lg:py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-10 lg:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Section - Text and Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 order-1 lg:order-1"
            >
              {/* Main Heading */}
              <div>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-950 leading-tight mb-3">
                  Discover Your{' '}
                  <span className="text-purple-600">Dream Career</span> Today
                </h1>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl">
                  Your next opportunity is just a search away. We connect ambitious professionals with companies that value talent, innovation, and growth. Start your journey to a career that not only matches your skills but also fuels your passion and unlocks your potential.
                </p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/candidates">
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-12 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Users className="h-5 w-5" />
                    Find Talents
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-950 border-2 border-blue-950 hover:border-blue-700 h-12 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Briefcase className="h-5 w-5" />
                    Browse Jobs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Section - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative order-2 lg:order-2 hidden md:block pt-2"
            >
              <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] flex items-center justify-center">
                <Image
                  src="/images/jobsImage.png"
                  alt="Professional pointing to opportunities"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Published Jobs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-blue-950">
              Published Jobs
            </h2>
            <div className="h-8 w-px bg-gray-300"></div>
            <Link
              href="/jobs"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              All Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {mockJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href="/jobs">
                  <Card className="h-full border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Company Logo/Image */}
                        <div className="flex-shrink-0">
                          {job.logo ? (
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <Image
                                src={job.logo}
                                alt={job.company}
                                width={80}
                                height={80}
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-xs text-center p-2">
                              <Building2 className="h-8 w-8 mb-1" />
                              <span>NO IMAGE AVAILABLE</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-blue-950 group-hover:text-blue-600 transition-colors block">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">Published {job.posted}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4">
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              {job.location}
                            </span>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded ml-auto">
                              {job.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}




