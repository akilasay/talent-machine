'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Layers3, Sparkles, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutUsPage() {
  const values = [
    {
      icon: Layers3,
      title: 'Our Passion',
      description: 'Fair, fast, and frictionless hiring.',
    },
    {
      icon: Sparkles,
      title: 'Transparency',
      description: 'Showcasing talent without compromising privacy.',
    },
    {
      icon: RefreshCw,
      title: 'Our Mission',
      description: 'Revolutionise recruitment by connecting job seekers and employers.',
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
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 font-semibold">
              ABOUT NEXTGEN TALENT MACHINE
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Careers, Connecting Excellence
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect exceptional professionals with top-tier companies, transforming career goals into achievements through expertise and objective alignment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/team-office.jpg"
                  alt="Diverse team in office"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
                OUR STORY
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Transforming Talent Discovery
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At NextGen Talent Machine, we strive to transform the way individuals find career opportunities and how businesses identify exceptional talent. We enable job seekers to showcase their potential beyond traditional qualifications, aligning them with positions where they can excel. Companies receive access to outstanding professionals who match their specific requirements. As recruitment specialists, we lead an intelligent method to hiring, driven by valuable relationships between qualified candidates and career openings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Value Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 font-semibold">
              OUR VALUE
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              The Principles That Guide Our Success
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/team-collage.jpg"
                  alt="Diverse team members"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
                OUR TEAM
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Our Diverse and Talented Team
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At NextGen Talent Machine, our power comes from our varied and skilled workforce. Combining experienced experts with creative emerging professionals, we unite deep knowledge across technology, finance, and marketing fields. Our management provides strategic direction and support, while our technical and promotional teams fuel originality and advancement. Collectively, we are dedicated to linking candidates with companies, building a system that encourages development, achievement, and possibilities for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

