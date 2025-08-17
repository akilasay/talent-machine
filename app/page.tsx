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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Star, Users } from 'lucide-react';

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.15 } },
  };

  const hoverScale = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageParallax = {
    initial: { y: 20 },
    animate: {
      y: -20,
      transition: { repeat: Infinity, repeatType: 'reverse', duration: 3, ease: 'easeInOut' },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-800 via-blue-500 to-blue-100 text-white overflow-hidden"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="absolute inset-0 bg-[url('/images/cta.svg')] opacity-10 animate-wave bg-cover bg-center" />
        <div className="container mx-auto px-4 py-12 md:py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn} className="space-y-8 max-w-lg">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Hire <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-400">Elite Talent</span> Today
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Unlock a world of skilled professionals with Job Global’s seamless hiring platform.
              </p>
              <div className="flex  gap-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-teal-400 hover:bg-teal-500 text-white text-lg px-8 py-6 rounded-full shadow-lg"
                  >
                    <Link href="/candidates">
                      Get Started for FREE <ArrowRight className="ml-2 h-6 w-6" />
                    </Link>
                  </Button>
                </motion.div>
                {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-blue-300 text-blue-300 hover:bg-blue-700 hover:text-white rounded-full text-lg px-8 py-6"
                >
                  <Link href="/job-seekers">Explore Jobs</Link>
                </Button>
              </motion.div> */}
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <motion.div animate={imageParallax} className="relative z-20">
                <Image
                  src="/images/befound-image.png"
                  alt="Hiring platform"
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-3xl -z-10" />
              <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/10 backdrop-blur-md rounded-2xl -z-10 border border-blue-300/20" />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </motion.section>

      {/* Features Section (Unchanged) */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Why Job Global?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {[
            {
              icon: <Users className="h-10 w-10 text-blue-500" />,
              title: 'Curated Talent',
              description: 'Access a pool of pre-vetted candidates with diverse skills.',
            },
            {
              icon: <Briefcase className="h-10 w-10 text-blue-500" />,
              title: 'Efficient Hiring',
              description: 'Reduce hiring time with our streamlined process.',
            },
            {
              icon: <Star className="h-10 w-10 text-blue-500" />,
              title: 'Perfect Fit',
              description: 'Match candidates based on skills and culture.',
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeIn} whileHover={hoverScale}>
              <Card className="border-none bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section (Unchanged) */}
      <motion.section
        className="bg-blue-50 dark:bg-blue-950 py-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Trusted by Our Community
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Job Global made hiring seamless. We found our lead engineer in days!',
                name: 'Alex Carter',
                role: 'CTO, Innovatech',
                avatar: '/images/client1.jpg',
              },
              {
                quote: 'The platform’s ease of use saved us countless hours in recruitment.',
                name: 'Emma Brown',
                role: 'HR Manager, GrowEasy',
                avatar: '/images/client2.jpg',
              },
              {
                quote: 'As a freelancer, I landed my dream project quickly. Amazing experience!',
                name: 'Liam Davis',
                role: 'UI/UX Designer',
                avatar: '/images/client3.jpg',
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={hoverScale}>
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-700">
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.quote}</p>
                    <div className="mt-6 flex items-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-blue-300"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section (Unchanged) */}
      <motion.section
        className="container mx-auto px-4 py-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Flexible <span className="text-blue-500">Pricing</span> Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Per Candidate',
              price: '$5',
              description: 'Affordable hiring for individual roles.',
            },
            {
              title: 'Time Efficiency',
              price: '1 Hour',
              description: 'Hire faster with optimized workflows.',
            },
            {
              title: 'Visibility',
              price: '1:1000',
              description: 'Maximize exposure to top talent.',
            },
          ].map((plan, index) => (
            <motion.div key={index} variants={fadeIn} whileHover={hoverScale}>
              <Card className="border-blue-500 border-2 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    {plan.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{plan.price}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.description}</p>
                  <Button asChild variant="outline" className="mt-6 w-full border-blue-500 text-blue-500 hover:bg-blue-100">
                    <Link href="/sign-in?redirect_url=/pricing">Explore Plan</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section (Unchanged) */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Hiring?
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg max-w-2xl mx-auto mb-8">
            Join Job Global and connect with exceptional talent today.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
              <Link href="/candidates">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}