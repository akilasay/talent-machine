'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ComingSoonContent() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('service') || 'Service';

  return (
    <div className="min-h-screen sm:pt-8 pt-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-8">
            <Clock className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-700 mb-2">
            {serviceName}
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            We're working hard to bring you this amazing service. Stay tuned for updates!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link href="/contactus">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-6 bg-white rounded-lg shadow-lg"
          >
            <p className="text-sm text-gray-600">
              Want to be notified when this service launches?{' '}
              <Link href="/contactus" className="text-blue-600 hover:text-blue-700 font-semibold">
                Get in touch with us
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-8 animate-pulse">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">Loading...</h1>
        </div>
      </div>
    }>
      <ComingSoonContent />
    </Suspense>
  );
}

