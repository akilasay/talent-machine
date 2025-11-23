'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, User, Building2, CreditCard, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'job-seeker' | 'employer' | 'general' | 'account';
}

const faqData: FAQItem[] = [
  // Job Seeker Questions
  {
    id: 'js-1',
    question: 'How do I create a job seeker profile?',
    answer: 'To create your profile, click on "Job Seekers" in the navigation menu, then select "Create Profile". Fill in your personal information, skills, education, and experience. You can also upload your CV. Once completed, your profile will be reviewed and go live on the platform.',
    category: 'job-seeker',
  },
  {
    id: 'js-2',
    question: 'How much does it cost to create a profile?',
    answer: 'Everithing for a fee.',
    category: 'job-seeker',
  },
  {
    id: 'js-3',
    question: 'How do employers find my profile?',
    answer: 'Once your profile is approved and live, employers can search and browse anonymized versions of job seeker profiles. When an employer is interested, they can access your full profile, download your CV, and contact you directly through the platform.',
    category: 'job-seeker',
  },
  {
    id: 'js-4',
    question: 'Can I update my profile after it\'s created?',
    answer: 'Yes, you can update your profile for free.',
    category: 'job-seeker',
  },
  // Employer Questions
  {
    id: 'emp-1',
    question: 'How do I post a job opening?',
    answer: 'As an employer, you need to create an account and enjoy the free trial for first comes.',
    category: 'employer',
  },
  {
    id: 'emp-2',
    question: 'What membership options are available for employers?',
    answer: 'We offer different tiers of membership with various services and membership periods. You can choose between annual or other recurring intervals. Alternatively, you can use our Pay As You Go option to access specific job seeker profiles at your discretion.',
    category: 'employer',
  },
  {
    id: 'emp-3',
    question: 'How do I verify my employer account?',
    answer: 'Before your account is approved, we may request additional information including evidence of your business registration, identification documents for directors/owners, and other relevant information. If you don\'t provide the requested information to our satisfaction, we may refuse to approve your account.',
    category: 'employer',
  },
  {
    id: 'emp-4',
    question: 'Can I contact job seekers directly?',
    answer: 'Yes, once you have access to a job seeker\'s full profile (through your membership or Pay As You Go purchase), you can contact them directly using the contact information provided or through our platform messaging system.',
    category: 'employer',
  },
  {
    id: 'emp-5',
    question: 'How does the Pay As You Go option work?',
    answer: 'Pay As You Go allows you to pay to access specific job seeker profiles without committing to a membership. You can browse anonymized profiles and purchase access to individual profiles that interest you.',
    category: 'employer',
  },
  // General Questions
  {
    id: 'gen-1',
    question: 'What is NextGen Talent Machine?',
    answer: 'NextGen Talent Machine is a recruitment platform that connects job seekers with employers. We help candidates showcase their skills beyond traditional credentials and enable employers to find ideal candidates who perfectly fit their unique needs.',
    category: 'general',
  },
  {
    id: 'gen-2',
    question: 'How does the matching process work?',
    answer: 'Our platform uses intelligent matching to connect job seekers with relevant opportunities. Job seekers create detailed profiles, and employers can search and filter based on skills, experience, and qualifications. The platform facilitates connections between the right talent and opportunities.',
    category: 'general',
  },
  {
    id: 'gen-3',
    question: 'Is my personal information secure?',
    answer: 'Yes, we take data security seriously. All personal information is protected according to our Privacy Policy. We use secure encryption and follow industry best practices to safeguard your data. Job seeker profiles are initially shown in anonymized form to protect privacy.',
    category: 'general',
  },
  {
    id: 'gen-4',
    question: 'What makes NextGen Talent Machine different from other job portals?',
    answer: 'We focus on showcasing talent beyond just credentials, matching candidates with roles where they will thrive. Our platform emphasizes meaningful connections and helps both job seekers and employers find the perfect fit through intelligent matching and comprehensive profiles.',
    category: 'general',
  },
  // Account Questions
  {
    id: 'acc-1',
    question: 'How do I cancel my membership?',
    answer: 'You can cancel your membership at any time using the "Deactivate Account" functionality in your account settings. Your cancellation will take effect from the end of the current billing cycle. You can also contact us directly for assistance with cancellation.',
    category: 'account',
  },
  {
    id: 'acc-2',
    question: 'Are membership fees refundable?',
    answer: 'Membership fees are refundable and cancellable in accordance with any rights you may have under consumer laws and our Terms & Conditions. Please refer to our Terms & Conditions for detailed refund policies.',
    category: 'account',
  },
  {
    id: 'acc-3',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including credit cards, debit cards, and direct debit. All payment information is collected and stored through our secure third-party payment processor. We do not store credit card details on our servers.',
    category: 'account',
  },
  {
    id: 'acc-4',
    question: 'How do I reset my password?',
    answer: 'If you need to reset your password, you can use the "Forgot Password" link on the sign-in page. You will receive an email with instructions to reset your password. If you continue to have issues, please contact our support team.',
    category: 'account',
  },
];

const categoryIcons = {
  'job-seeker': User,
  'employer': Building2,
  'general': HelpCircle,
  'account': CreditCard,
};

const categoryLabels = {
  'job-seeker': 'For Job Seekers',
  'employer': 'For Employers',
  'general': 'General Questions',
  'account': 'Account & Payments',
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, services, and how to get started.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All Questions' : categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const Icon = categoryIcons[faq.category];
            const isOpen = openItems.includes(faq.id);

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {faq.question}
                            </h3>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-gray-700 leading-relaxed pt-2">
                                    {faq.answer}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <ChevronDown
                          className={`flex-shrink-0 h-5 w-5 text-gray-400 transition-transform duration-300 mt-1 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardContent>
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">
                  Still Have Questions?
                </h2>
              </div>
              <div className="pl-16 space-y-4">
                <p className="text-blue-100 leading-relaxed">
                  Can&apos;t find the answer you&apos;re looking for? Please get in touch with our friendly team.
                </p>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <a
                      href="mailto:hello@nxtgenglobal.com"
                      className="hover:text-white transition-colors"
                    >
                      hello@nxtgenglobal.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <a
                      href="tel:+94712587984"
                      className="hover:text-white transition-colors"
                    >
                      +94 71 258 7984
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span>High Level Rd, Nugegoda 10250</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

