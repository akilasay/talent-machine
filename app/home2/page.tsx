'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, ArrowRight, TrendingUp, Clock, Building2 } from 'lucide-react';

// Mock job data for Popular Search section
const popularJobs = [
  {
    id: 1,
    title: 'Product Designer',
    company: 'Reallygreatsite',
    type: 'Design',
    posted: '3 min ago',
    image: '/images/team-collage.jpg',
  },
  {
    id: 2,
    title: 'Data Engineer',
    company: 'Reallygreatsite',
    type: 'Engineer',
    posted: '3 min ago',
    image: '/images/team-office.jpg',
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'Reallygreatsite',
    type: 'Designer',
    posted: '3 min ago',
    image: '/images/team-collage.jpg',
  },
];

export default function Home2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Right Side Background Image */}
      <section className="relative overflow-hidden pt-20 md:pt-24 pb-8 lg:pb-10">
        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[400px] lg:min-h-[450px]">
            {/* Left Section - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-5 lg:space-y-6 z-10"
            >
   

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Dream Career
                  </span>{' '}
                  Today
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  Your next opportunity is just a search away. We connect ambitious professionals with companies that value talent, innovation, and growth.
                </p>
              </div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center sm:justify-start"
              >
                <Link href="/jobs" className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    {/* Animated shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>
                    {/* Glow effect on hover */}
                    <span className="absolute inset-0 bg-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                    <Briefcase className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110" />
                    <span className="relative z-10">Browse Jobs</span>
                    <ArrowRight className="h-5 w-5 relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Section - Background Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/herobg2.jpeg"
                  alt="Hero background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/20"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Search Section */}
      <section className="py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Search
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after job opportunities in the market
            </p>
          </motion.div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href="/jobs">
                  <Card className="h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden group-hover:border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Job Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                            <Image
                              src={job.image}
                              alt={job.company}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Company Name and Type */}
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-bold text-base mb-2 truncate group-hover:text-blue-600 transition-colors">
                            {job.company}
                          </p>
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                            {job.type}
                          </span>
                        </div>
                      </div>

                      {/* Job Title and Time */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>

                      {/* Hover Effect Indicator */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                          <ArrowRight className="h-4 w-4" />
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

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who found their dream jobs through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-base backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



