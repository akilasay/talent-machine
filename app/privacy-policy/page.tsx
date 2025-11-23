'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Nextgen Global (Private) Limited (PV 00283099) (we, us or our), understands that protecting your personal information is important. This Privacy Policy sets out our commitment to protecting the privacy of personal information provided to us, or collected by us, when interacting with you.
          </p>
        </div>
      ),
    },
    {
      id: 'personal-information',
      title: 'Personal Information',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Personal information means identifiable information about you, for example your name, email address, telephone number and so on. If you cannot be identified (for example, when personal information has been aggregated and anonymised), then certain parts of this policy may not apply to that information.
          </p>
        </div>
      ),
    },
    {
      id: 'data-collection',
      title: 'The Personal Information We Collect',
      icon: Eye,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            The types of personal information we may collect about you include:
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Identity Data</h4>
              <p className="text-gray-700 text-sm">Including your first name, last name, age, current country of residence, your birth country, and gender.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Business Data</h4>
              <p className="text-gray-700 text-sm">Where you are an employer, including your business name, business registration number, business address, proof of business address, phone and email verification, contact name and role, branch, business type, and business location. You may also provide us with your tax ID, website URL, number of employees, details of any accreditations your business holds, and whether or not you are a franchise.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Contact Data</h4>
              <p className="text-gray-700 text-sm">Including billing address, business address, residential address, email address and telephone numbers.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Financial Data</h4>
              <p className="text-gray-700 text-sm">Including but not limited to bank account and payment card details (including through our third-party payment processors).</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Background Verification Data</h4>
              <p className="text-gray-700 text-sm">Including your photo ID and other details requested as part of our verification process to comply with our due diligence obligations, anti-money laundering laws and related ongoing monitoring commitments.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Technical and Usage Data</h4>
              <p className="text-gray-700 text-sm">When you access any of our websites or platforms, details about your internet protocol (IP) address, login data, browser session and geo-location data, statistics on page views and sessions, device and network information, acquisition sources, search queries and/or browsing behaviour, access and use of our website (including through the use of Internet cookies or analytics), and communications with our website.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Profile Data</h4>
              <p className="text-gray-700 text-sm">Including your username and password for NextGen Talent Machine, profile image, content you share through our platform, and support requests you have made.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Interaction Data</h4>
              <p className="text-gray-700 text-sm">Includes but is not limited to information you provide to us when you participate in any interactive features of our Platform, including surveys, contests, promotions, activities or events.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Marketing and Communications Data</h4>
              <p className="text-gray-700 text-sm">Includes but is not limited to your preferences in receiving marketing from us and our third parties and your communication preferences.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Professional Data</h4>
              <p className="text-gray-700 text-sm">Including your CV, professional history such as your previous positions and professional experience, your references, and any other data or documentation you provide to us.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Academic and Professional Qualifications Data</h4>
              <p className="text-gray-700 text-sm">Including, where applicable, the institution, course, completion date, grade, and expiry date.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-900 mb-2">Job Preference Data</h4>
              <p className="text-gray-700 text-sm">Including your desired field/industry, job title, availability types (full time/part time/contract), available start date, work type (in-house/remote/hybrid), and preferred working area.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'collection-methods',
      title: 'How We Collect Personal Information',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect personal information in a variety of ways, including:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>When you interact directly with us, including face-to-face, over the phone, over email, or online</li>
            <li>When you complete a form, such as registering for any events or newsletters, or responding to surveys</li>
            <li>When you apply for a job with us</li>
            <li>From third parties, such as details of your use of any website we operate (from our analytics and cookie providers and marketing providers. See the &quot;Cookies&quot; section below for more detail on the use of cookies)</li>
            <li>From publicly available sources, such as social media</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'purpose',
      title: 'Why We Collect, Hold, Use and Disclose Personal Information',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect, hold, use and disclose personal information for the following purposes:
          </p>
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>To enable you to access and use our platform, including to provide you with a login</li>
            <li>To assess whether to take you on as a new job seeker</li>
            <li>To do business with you</li>
            <li>To contact and communicate with you about our business, including in response to any support requests you lodge with us or other enquiries you make with us</li>
            <li>With your prior consent, to provide your information to our business partners specialising in insurance, mortgages, car sales and immigration advice</li>
            <li>To contact and communicate with you about any enquiries you make with us via any website we operate</li>
            <li>For internal record keeping, administrative, invoicing and billing purposes</li>
            <li>For analytics, market research and business development, including to operate and improve our business, associated applications and associated social media platforms</li>
            <li>For advertising and marketing, including to send you promotional information about our events and experiences and information that we consider may be of interest to you</li>
            <li>To run promotions, competitions and/or offer additional benefits to you</li>
            <li>If you have applied for employment with us, to consider your employment application</li>
            <li>To comply with our legal obligations or if otherwise required or authorised by law</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'disclosure',
      title: 'Our Disclosures of Personal Information to Third Parties',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Where we disclose your personal information to the third parties listed above, these third parties may store, transfer or access personal information outside of Sri Lanka. We will only disclose your personal information overseas in accordance with the Sri Lankan Privacy Principles.
          </p>
        </div>
      ),
    },
    {
      id: 'rights',
      title: 'Your Rights and Controlling Your Personal Information',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Your Choice</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Please read this Privacy Policy carefully. If you provide personal information to us, you understand we will collect, hold, use and disclose your personal information in accordance with this Privacy Policy. You do not have to provide personal information to us; however, if you do not, it may affect our ability to do business with you.
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Restrict and Unsubscribe</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              To object to processing for direct marketing/unsubscribe from our email database or opt-out of communications (including marketing communications), please contact us using the details below or opt-out using the opt-out facilities provided in the communication.
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Access</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              You may request access to the personal information that we hold about you. An administrative fee may be payable for the provision of such information. Please note, in some situations, we may be legally permitted to withhold access to your personal information. If we cannot provide access to your information, we will advise you as soon as reasonably possible and provide you with the reasons for our refusal and any mechanism available to complain about the refusal. If we can provide access to your information in another form that still meets your needs, then we will take reasonable steps to give you such access.
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Correction</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you believe that any information, we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please contact us using the details below. We will take reasonable steps to promptly correct any information found to be inaccurate, out of date, incomplete, irrelevant, or misleading. Please note, in some situations, we may be legally permitted to not correct your personal information. If we cannot correct your information, we will advise you as soon as reasonably possible and provide you with the reasons for our refusal and any mechanism available to complain about the refusal.
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Complaints</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you wish to make a complaint, please contact us using the details below and provide us with full details of the complaint. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take in response to your complaint.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'storage',
      title: 'Storage and Security',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We are committed to ensuring that the personal information we collect is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures, to safeguard and secure personal information and protect it from misuse, interference, loss and unauthorised access, modification and disclosure.
          </p>
          <p className="text-gray-700 leading-relaxed">
            While we are committed to security, we cannot guarantee the security of any information that is transmitted to or by us over the Internet. The transmission and exchange of information is carried out at your own risk.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We may use cookies on our website from time to time. Cookies are text files placed in your computer&apos;s browser to store your preferences. Cookies, by themselves, do not tell us your email address or other personally identifiable information. However, they do recognise you when you return to our online website and allow third parties to cause our advertisements to appear on your social media and online media feeds as part of our retargeting campaigns. If and when you choose to provide our online website with personal information, this information may be linked to the data stored in the cookie.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our website.
          </p>
        </div>
      ),
    },
    {
      id: 'links',
      title: 'Links to Other Websites',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to other parties&apos; websites. We do not have any control over those websites, and we are not responsible for the protection and privacy of any personal information which you provide whilst visiting those websites. These websites are not governed by this Privacy Policy.
          </p>
        </div>
      ),
    },
    {
      id: 'amendments',
      title: 'Amendments',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We may, at any time and at our discretion, vary from this Privacy Policy by publishing the amended Privacy Policy on our website. We recommend you check our website regularly to ensure you are aware of our current Privacy Policy.
          </p>
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
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
                  For any questions or notices regarding this Privacy Policy, please contact us:
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

export default PrivacyPolicyPage;
