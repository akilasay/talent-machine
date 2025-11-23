'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  MapPin, 
  Building2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: 'English teachers',
    company: 'Keystone',
    location: 'Colombo',
    type: 'Full time',
    posted: '1 day ago',
    sector: 'Sales',
    logo: '/images/company1.png',
  },
  {
    id: 2,
    title: 'Sales Executive',
    company: 'Tech Corp',
    location: 'Colombo',
    type: 'Full time',
    posted: '1 day ago',
    sector: null,
    logo: '/images/company1.png',
  },
  {
    id: 3,
    title: 'Marketing Executive – Commodity',
    company: 'HeadmastersHR',
    location: 'Colombo',
    type: 'Full time',
    posted: '2 days ago',
    sector: 'Marketing',
    logo: '/images/company2.png',
  },
  {
    id: 4,
    title: 'Assistant Manager Student Enrollment',
    company: 'HeadmastersHR',
    location: 'Colombo',
    type: 'Full time',
    posted: '2 days ago',
    sector: 'Education',
    logo: '/images/company2.png',
  },
  {
    id: 5,
    title: 'Sales Manager – IT Hardware',
    company: 'HeadmastersHR',
    location: 'Colombo',
    type: 'Full time',
    posted: '2 days ago',
    sector: 'Sales',
    logo: '/images/company2.png',
  },
  {
    id: 6,
    title: 'Early Childhood Educator',
    company: 'HeadmastersHR',
    location: 'Colombo',
    type: 'Full time',
    posted: '3 days ago',
    sector: 'Education',
    logo: '/images/company2.png',
  },
];

const sectors = [
  { value: 'all', label: 'All' },
  { value: 'hse', label: '(HSE)' },
  { value: 'accounting', label: 'Accounting and Auditing' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Banking and Finance' },
];

export default function JobsListingPage() {
  const [searchTitle, setSearchTitle] = useState('');
  const [location, setLocation] = useState('');
  const [sector, setSector] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ searchTitle, location, sector });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 lg:py-16">
        <div className="absolute inset-0 bg-[url('/images/cta.svg')] opacity-5 bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-950 mb-3">
              Your Gateway to Exceptional Talent
            </h1>
          </motion.div>

          {/* Illustration with Search Form Overlay */}
          <div className="relative">
            {/* Illustration Background */}
            <div className="relative w-full h-48 lg:h-56 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/befound-image.png"
                  alt="Diverse professionals"
                  width={600}
                  height={300}
                  className="object-contain opacity-80"
                />
              </div>
            </div>

            {/* Search Form Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-20 -mt-24 lg:-mt-28"
            >
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-blue-200">
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <Input
                          placeholder="Job Title, Keywords, or Phrase"
                          value={searchTitle}
                          onChange={(e) => setSearchTitle(e.target.value)}
                          className="w-full border-blue-300 focus:border-blue-600"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Input
                          placeholder="City, State or ZIP"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full border-blue-300 focus:border-blue-600"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <Select value={sector} onValueChange={setSector}>
                          <SelectTrigger className="w-full border-blue-300 focus:border-blue-600">
                            <SelectValue placeholder="Select Sector" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectors.map((sec) => (
                              <SelectItem key={sec.value} value={sec.value}>
                                {sec.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-1">
                        <Button
                          type="submit"
                          className="w-full bg-blue-950 hover:bg-blue-900 text-white"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Search Jobs
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Published Jobs Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-blue-950">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Card className="h-full border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300">
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
                            <Link
                              href={`/jobs/${job.id}`}
                              className="text-xl font-semibold text-blue-950 hover:text-blue-600 transition-colors block"
                            >
                              {job.title}
                            </Link>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}




