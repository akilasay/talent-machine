'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText, Video, Users, TrendingUp, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ResourcesPage() {
  const resourceCategories = [
    {
      icon: FileText,
      title: 'Resume & CV Tips',
      description: 'Learn how to create a standout resume that gets noticed by employers.',
      resources: [
        'How to Write a Winning Resume',
        'CV Formatting Best Practices',
        'Tailoring Your Resume for Each Job',
        'ATS-Friendly Resume Guide',
      ],
      color: 'blue',
    },
    {
      icon: Video,
      title: 'Interview Preparation',
      description: 'Master the art of interviewing with our comprehensive guides and tips.',
      resources: [
        'Common Interview Questions & Answers',
        'Virtual Interview Best Practices',
        'Behavioral Interview Techniques',
        'Salary Negotiation Strategies',
      ],
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Strategies and insights to advance your career and reach your goals.',
      resources: [
        'Building Your Professional Network',
        'Career Transition Guide',
        'Skills Development Roadmap',
        'Leadership Development Tips',
      ],
      color: 'purple',
    },
    {
      icon: Target,
      title: 'Job Search Strategies',
      description: 'Effective methods to find and secure your dream job.',
      resources: [
        'Where to Find Hidden Job Opportunities',
        'LinkedIn Profile Optimization',
        'Job Search Action Plan',
        'Following Up After Applications',
      ],
      color: 'orange',
    },
    {
      icon: Lightbulb,
      title: 'Career Coaching Tips',
      description: 'Expert advice from career coaches to guide your professional journey.',
      resources: [
        'Identifying Your Career Strengths',
        'Setting Career Goals',
        'Work-Life Balance Strategies',
        'Overcoming Career Obstacles',
      ],
      color: 'pink',
    },
    {
      icon: Users,
      title: 'Professional Development',
      description: 'Resources to enhance your skills and stay competitive in the job market.',
      resources: [
        'Online Learning Platforms',
        'Industry Certifications Guide',
        'Soft Skills Development',
        'Staying Current in Your Field',
      ],
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  const featuredResources = [
    {
      title: 'The Complete Job Seeker\'s Guide 2024',
      description: 'A comprehensive guide covering everything from resume writing to salary negotiation.',
      type: 'Guide',
      readTime: '15 min read',
    },
    {
      title: 'Mastering Virtual Interviews',
      description: 'Essential tips and techniques for succeeding in remote job interviews.',
      type: 'Article',
      readTime: '8 min read',
    },
    {
      title: 'Career Change Success Stories',
      description: 'Inspiring stories from professionals who successfully transitioned careers.',
      type: 'Case Study',
      readTime: '12 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 font-semibold">
              CAREER RESOURCES
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Career Coaching Resource Hub
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Access expert guidance, tips, and strategies to advance your career. From resume writing to interview preparation, we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 font-semibold text-center">
              FEATURED RESOURCES
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Start Here
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Our most popular resources to help you get started on your career journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">{resource.readTime}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group hover:bg-blue-100"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 font-semibold">
              EXPLORE RESOURCES
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Resources by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive collection of career resources organized by topic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              const colorClass = colorClasses[category.color as keyof typeof colorClasses];
              
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardHeader>
                      <div className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.resources.map((resource, resourceIndex) => (
                          <li
                            key={resourceIndex}
                            className="flex items-start gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group"
                          >
                            <ArrowRight className="h-4 w-4 mt-0.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            <span>{resource}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="ghost"
                        className="w-full mt-6 justify-center group hover:bg-gray-100"
                      >
                        View All
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Need Personalized Career Coaching?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert career coaches are here to help you navigate your career journey with personalized guidance and support.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg"
            >
              Get Career Coaching
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

