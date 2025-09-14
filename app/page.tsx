// import CompanionCard from '@/components/CandidateCard'
// import CompanionList from '@/components/CompanionList'
// import CTA from '@/components/CTA'
// import FeatureSection from '@/components/home/FeaturesSection'
// import Footer from '@/components/home/Footer'
// import Hero from '@/components/home/Hero'
// import PaymentPackages from '@/components/home/PaymentPackages'
// import Testimonials from '@/components/home/Testimonials'
// import { recentSessions } from '@/constants'
// import React from 'react'


// const Page = () => {
//   return (
//     <div className='bg-[#eff6ff] mx-auto px-14 flex flex-col gap-8 h-full max-w-[1400px] pt-10 max-sm:px-2 bg-background text-foreground border-border outline-ring/50'>
              
//            <Hero />
//            <FeatureSection />
//           <Testimonials />
//           <PaymentPackages />
        
     
            
//             {/* <CompanionCard 
//               id="123"
//               name ="Neaura Binary explorer"
//               topic="topic1"
//               subject="science"
//               duration={45}
//               color="#74b72e"
//             />
//               <CompanionCard 
//               id="456"
//               name ="Neaura Binary explorer"
//               topic="topic1"
//               subject="maths"
//               duration={30}
//               color="#0a6522"
//             />
//                <CompanionCard 
//               id="789"
//               name ="Neaura Binary explorer"
//               topic="topic1"
//               subject="science"
//               duration={30}
//               color="#3f704d"
//             />
//           </section>

//           <section className='flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center'>
//                <CompanionList
//                 title="Recently completed sessions"
//                 companions={recentSessions}
//                 classNames="w-2/3 max-lg:w-full"
//             />
//             <CTA /> */}
//           {/* </section> */}
//     </div>
//   )
// }

// export default Page

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Search, Clock, Shield, Star } from 'lucide-react';

export default function HomePage() {


  const hoverScale = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[url('/images/cta.svg')] opacity-5 bg-cover bg-center" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Your
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Perfect Match
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Connect talented professionals with amazing opportunities. 
                  Whether you re hiring or looking for your next role.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/candidates">
                      Find Talent <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Link href="/jobs">
                      Browse Jobs
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="/images/befound-image.png"
                  alt="Professional networking and teamwork illustration"
                  width={600}
                  height={600}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make hiring and job searching simple, efficient, and successful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-blue-600" />,
                title: 'Smart Matching',
                description: 'AI-powered algorithms match the right candidates with the right opportunities.',
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: 'Quick Results',
                description: 'Find your perfect match in days, not weeks.',
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: 'Verified Profiles',
                description: 'All profiles are verified for authenticity and quality.',
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: 'Global Network',
                description: 'Access talent and opportunities from around the world.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={hoverScale}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white"
          >
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '5K+', label: 'Job Postings' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-4xl lg:text-5xl font-bold">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who found success on our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Found my dream job in just 3 days! The platform made everything so easy.',
                name: 'Sarah Johnson',
                role: 'Software Engineer',
                avatar: '/images/client1.jpg',
                rating: 5,
              },
              {
                quote: 'Hired 5 amazing developers in one week. Incredible platform!',
                name: 'Michael Chen',
                role: 'CTO, TechStart',
                avatar: '/images/client2.jpg',
                rating: 5,
              },
              {
                quote: 'The best job search experience I\'ve ever had. Highly recommended!',
                name: 'Emily Rodriguez',
                role: 'UX Designer',
                avatar: '/images/client3.jpg',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={hoverScale}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of professionals who have already found their perfect match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/candidates">
                    Find Talent Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-blue-600 hover:bg-blue-50  hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Link href="/jobs">
                    Browse Jobs
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}