'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Clock,
  ArrowLeft,
  Mail,
  Phone,
  Copy,
  Check,
  UserPlus
} from 'lucide-react';
import { mockJobs } from '@/constants/jobsData';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = parseInt(params.id as string);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // Find the job by ID
  const job = mockJobs.find(j => j.id === jobId);

  const handleCopyEmail = () => {
    if (job?.email) {
      navigator.clipboard.writeText(job.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (job?.contact) {
      navigator.clipboard.writeText(job.contact);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // If job not found, show error or redirect
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you are looking for doesnt exist.</p>
            <Link href="/jobs">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Use poster field from job data, fallback to logo if poster doesn't exist
  const jobImage = job.poster || job.logo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">
          <Link href="/jobs">
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </section>

      {/* Job Title Section - Top Middle */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
              {job.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Job Detail Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Full Size Poster Image */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Full Size Job Poster Image */}
                <div className="w-full">
                  <Image
                    src={jobImage}
                    alt={`${job.title} at ${job.company}`}
                    width={1200}
                    height={1600}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Apply Card */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Interested in this position?</h3>
                    <p className="text-blue-100 mb-6">
                      Apply now and take the next step in your career journey.
                    </p>
                    <Button
                      onClick={() => setShowContactInfo(!showContactInfo)}
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-6 text-base transition-all duration-300"
                      size="lg"
                    >
                      {showContactInfo ? 'Hide Options' : 'Apply Now'}
                    </Button>

                    {/* Contact Information and Create Profile - Expandable */}
                    <AnimatePresence>
                      {showContactInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-white/20 overflow-hidden space-y-4"
                        >
                          {/* Contact Details Section - Shown First */}
                          <div className="space-y-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                                <p className="text-sm text-blue-100 font-medium">Email:</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <a 
                                  href={`mailto:${job?.email}`}
                                  className="flex-1 text-white font-semibold hover:text-blue-100 transition-colors break-all"
                                >
                                  {job?.email}
                                </a>
                                <button
                                  onClick={handleCopyEmail}
                                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                  title="Copy email"
                                >
                                  {copiedEmail ? (
                                    <Check className="h-4 w-4 text-green-300" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-white" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                                <p className="text-sm text-blue-100 font-medium">Phone:</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <a 
                                  href={`tel:${job?.contact?.replace(/\s/g, '')}`}
                                  className="flex-1 text-white font-semibold hover:text-blue-100 transition-colors"
                                >
                                  {job?.contact}
                                </a>
                                <button
                                  onClick={handleCopyPhone}
                                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                  title="Copy phone number"
                                >
                                  {copiedPhone ? (
                                    <Check className="h-4 w-4 text-green-300" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-white" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Create Profile Button - Shown Below Contact Info */}
                          <Link href="/job-seekers" className="block">
                            <Button
                              className="w-full bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold py-5 text-base transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <UserPlus className="h-5 w-5" />
                              Create Profile Notify More Jobs
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>

                {/* Job Details Card */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Posted Date</p>
                          <p className="font-semibold text-gray-900">{job.posted}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

