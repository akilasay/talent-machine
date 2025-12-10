'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Search, X, Filter, ChevronRight, ArrowUpDown } from 'lucide-react';
import { mockJobs } from '@/constants/jobsData';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function JobsPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique locations from jobs
  const uniqueLocations = useMemo(() => {
    const locations = mockJobs
      .map((job) => job.location)
      .filter((loc) => loc && loc.trim() !== '');
    return Array.from(new Set(locations)).sort();
  }, []);

  // Filter and sort jobs based on search keyword, location, and sort order
  const filteredJobs = useMemo(() => {
    let jobs = mockJobs;

    // Filter by search keyword (title and company)
    if (activeSearch.trim()) {
      const keyword = activeSearch.toLowerCase().trim();
      jobs = jobs.filter((job) => {
        const titleMatch = job.title?.toLowerCase().includes(keyword) || false;
        const companyMatch = job.company?.toLowerCase().includes(keyword) || false;
        return titleMatch || companyMatch;
      });
    }

    // Filter by location
    if (locationFilter && locationFilter !== 'all') {
      jobs = jobs.filter((job) => job.location?.toLowerCase() === locationFilter.toLowerCase());
    }

    // Sort by posted date
    if (sortOrder !== 'none') {
      jobs = [...jobs].sort((a, b) => {
        if (!a.posted || !b.posted) return 0;
        
        // Parse date from YYYY/MM/DD format
        const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split('/').map(Number);
          return new Date(year, month - 1, day);
        };

        const dateA = parseDate(a.posted);
        const dateB = parseDate(b.posted);

        if (sortOrder === 'newest') {
          return dateB.getTime() - dateA.getTime(); // Newest first
        } else {
          return dateA.getTime() - dateB.getTime(); // Oldest first
        }
      });
    }

    return jobs;
  }, [activeSearch, locationFilter, sortOrder]);

  const handleSearch = () => {
    setActiveSearch(searchKeyword);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    setActiveSearch('');
    setLocationFilter('');
    // Note: sortOrder is kept as it's not shown in active filters
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hasActiveFilters = activeSearch || (locationFilter && locationFilter !== 'all');

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          {/* <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
           All Jobs
          </h1> */}
          {/* <p className="text-gray-600 text-base lg:text-lg">
            Discover {mockJobs.length}+ job opportunities from top companies
          </p> */}
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 lg:mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-6 text-base bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all duration-300"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Clear input"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="px-6 lg:px-8 h-[52px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Search className="h-5 w-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              {/* Sort Order - Always Visible */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-300">
                    <SelectValue placeholder="Sort by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full sm:w-auto"
                >
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-300">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {hasActiveFilters && (
                <button
                  onClick={handleClearSearch}
                  className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  Clear all filters
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2"
              >
                {activeSearch && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    &quot;{activeSearch}&quot;
                    <button
                      onClick={() => {
                        setActiveSearch('');
                        setSearchKeyword('');
                      }}
                      className="hover:bg-blue-100 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {locationFilter && locationFilter !== 'all' && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {locationFilter}
                    <button
                      onClick={() => setLocationFilter('')}
                      className="hover:bg-blue-100 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </motion.div>
            )}

            {/* Results Count */}
            {hasActiveFilters && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-gray-600"
              >
                Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> of {mockJobs.length} jobs
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => {
              const jobImage = job.poster || job.logo;
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="group"
                >
                  <Link href={`/jobs/${job.id}`}>
                    <Card className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg overflow-hidden">
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
                          {/* Left: Company Logo */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                              <Image
                                src={jobImage}
                                alt={job.company || job.title || 'Company'}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Middle: Job Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                              {job.title}
                            </h3>
                            {job.company && job.company.trim() !== '' && (
                              <p className="text-gray-600 font-medium text-base mb-2">
                                {job.company}
                              </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              {job.location && job.location.trim() !== '' && (
                                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                  <span>{job.location}</span>
                                </div>
                              )}
                              {job.posted && job.posted.trim() !== '' && (
                                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                  <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                  <span>Posted {job.posted}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right: Action Button */}
                          <div className="flex-shrink-0 flex items-center sm:items-start sm:pt-1">
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `/jobs/${job.id}`;
                              }}
                            >
                              <span className="hidden sm:inline">View Details</span>
                              <span className="sm:hidden">View</span>
                              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16 bg-white rounded-lg border border-gray-200"
            >
              {hasActiveFilters ? (
                <>
                  <div className="text-gray-500 text-lg mb-2 font-medium">
                    No jobs found
                  </div>
                  <p className="text-gray-400 mb-6 text-sm">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    onClick={handleClearSearch}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Clear all filters
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-gray-500 text-lg mb-2 font-medium">
                    No job postings available
                  </div>
                  <p className="text-gray-400 text-sm">
                    Check back later for new opportunities
                  </p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
