'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, UserCheck, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TermsAndConditionsPage = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">1.1</span> These terms and conditions (Terms) are entered into between Nextgen Global (Private) Limited (PV 00283099) (we, us, or our) and you, together the Parties and each Party.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">1.2</span> We provide a platform where individuals seeking employment or contractor opportunities (Job Seekers) and businesses looking for staff (Employers) can connect and transact (Platform).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">1.3</span> In these Terms, &quot;you&quot; means (as applicable) the person or entity registered with us as either an Employer or a Job Seeker or the individual accessing or using the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">1.4</span> If you are using the Platform on behalf of your employer or a business entity, you, in your individual capacity, represent and warrant that you are authorized to act on behalf of your employer or the business entity and to bind the entity and the entity&apos;s personnel to these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">1.5</span> We do not guarantee that Job Seekers will obtain employment through the use of the Platform. Our role is solely to increase visibility and facilitate connections between Job Seekers and prospective Employers.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'acceptance',
      title: '2. Acceptance and Platform Licence',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">2.1</span> You accept these Terms by accepting these Terms on the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">2.2</span> You must be at least 18 years old to use the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">2.3</span> During the Account creation process, you may have the ability to opt-in to receiving communications from our partners related to services like insurance, immigration, car sales, and mortgages. If you provide such consent, we may share your personal information with our partners, including as leads or for them to directly contact you regarding their services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">2.4</span> We may amend these Terms at any time by providing written notice to you. By clicking &quot;I accept&quot; or continuing to use the Platform after the notice or 30 days after notification (whichever date is earlier), you agree to the amended Terms. If you do not agree to the amendment and it adversely affects your rights, you may cancel your Membership with effect from the date of the change in these Terms by providing written notice to us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">2.5</span> Subject to your compliance with these Terms, we grant you a personal, non-exclusive, royalty-free, revocable, worldwide, non-transferable licence to use our Platform in accordance with these Terms. All other uses are prohibited without our prior written consent.
            </p>
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">2.6</span> When using the Platform, you must not do or attempt to do anything that is unlawful or inappropriate, including:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>anything that would constitute a breach of an individual&apos;s privacy (including uploading private or personal information without an individual&apos;s consent) or any other legal rights;</li>
                <li>using the Platform to defame, harass, threaten, menace, or offend any person;</li>
                <li>using the Platform for unlawful purposes;</li>
                <li>interfering with any user of the Platform;</li>
                <li>tampering with or modifying the Platform (including by transmitting viruses and using trojan horses);</li>
                <li>using the Platform to send unsolicited electronic messages;</li>
                <li>using data mining robots, screen scraping, or similar data gathering and extraction tools on the Platform; or</li>
                <li>facilitating or assisting a third party to do any of the above acts.</li>
                <li>intentionally or unintentionally disclosing or entering misinformation on the Platform.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'accounts',
      title: '3. Accounts',
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.1</span> You must register on the Platform and create an account (Account) to access the Platform&apos;s features.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">3.2</span> You must provide basic information when registering for an Account, including:
              </p>
              <p className="text-gray-700 leading-relaxed ml-4">
                <span className="font-semibold">a.</span> Where you are a Job Seeker: your full name, email address, location, any onboarding information we require, and you must choose a password.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

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
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our platform.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="pl-16">
                      {section.content}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: sections.length * 0.1 }}
          className="mt-12"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">
                  Contact Us
                </h2>
              </div>
              <div className="pl-16 space-y-4">
                <p className="text-blue-100 leading-relaxed">
                  For any questions or notices regarding these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span>hello@nxtgenglobal.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span>+94 71 258 7984</span>
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
};

export default TermsAndConditionsPage;

