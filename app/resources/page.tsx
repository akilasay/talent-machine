'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { featuredArticles } from '@/constants/articlesData';

export default function ResourcesPage() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 pt-28 pb-8 lg:pb-16">
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
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-0">
              Access expert guidance, tips, and strategies to advance your career. From resume writing to interview preparation, we&apos;ve got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-4 lg:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              EXPLORE RESOURCES
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Browse our comprehensive collection of career resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((resource, index) => (
              <motion.div
                key={resource.id || resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden group">
                  {/* Image Section */}
                  {'image' in resource && resource.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={resource.image}
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/80 to-transparent" />
                    </div>
                  )}
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
                      onClick={() => {
                        if ('content' in resource && resource.content) {
                          setSelectedArticle(resource.id);
                        }
                      }}
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

          {/* Article Modal/Overlay */}
          <AnimatePresence>
            {selectedArticle && (() => {
              const article = featuredArticles.find(r => r.id === selectedArticle && r.content);
              if (!article || !article.content) return null;

              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                  onClick={() => setSelectedArticle(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                          {article.type}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {article.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Close article"
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                      <div className="prose prose-lg max-w-none dark:prose-invert">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
                          {article.content.subtitle}
                        </p>
                        
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-8 leading-relaxed">
                          {article.content.introduction}
                        </div>

                        {article.content.sections.map((section, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="mb-8"
                          >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                              {section.title}
                            </h3>
                            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                              {section.content}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                      <Button
                        onClick={() => setSelectedArticle(null)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Close
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
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




