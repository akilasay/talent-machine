'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, UserCheck, AlertCircle, Mail, Phone, MapPin, Users, MessageSquare, CreditCard, Scale, Eye, Lock, Gavel, X } from 'lucide-react';
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
              <p className="text-gray-700 leading-relaxed ml-4 mb-2">
                <span className="font-semibold">a.</span> Where you are a Job Seeker: your full name, email address, location, any onboarding information we require, and you must choose a password.
              </p>
              <p className="text-gray-700 leading-relaxed ml-4">
                <span className="font-semibold">b.</span> Where you are an Employer: your business name, contact name, email address, any verification information we require, and you must choose a password.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.3</span> Where you are an Employer: Before approving your Account or providing access to Job Seeker Profiles, we may request additional information from you to verify your identity and suitability as an Employer on the Platform. This may include evidence of your business registration, identification documents for directors/owners, and other relevant information. If you do not provide the requested information to our satisfaction, we may refuse to approve your Account or restrict your access to the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.4</span> Once you have registered an Account, your Account information will be used to create a profile which you may then curate (Profile).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.5</span> All personal information you provide to us will be treated in accordance with our Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.6</span> You agree to provide and maintain up-to-date information in your Account and to not share your Account password with any other person. Your Account is personal, and you must not transfer it to others.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.7</span> You are responsible for keeping your Account details and your username and password confidential, and you will be liable for all activity in your Account, including purchases made using your Account details. You agree to immediately notify us of any unauthorized use of your Account.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">3.8</span> You are responsible for maintaining and updating your Profile. When you make any changes to your Profile, your Profile will be placed on hold until reviewed and approved by us.
            </p>
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">3.9</span> Where you are a Job Seeker:
              </p>
              <div className="space-y-2 ml-4">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">a.</span> We will review your request for an Account before approving the request. We may request additional information. If you do not provide us with the information we reasonably request, we may refuse to create an Account for you. If you provide us with any information which indicates you are not a fit and proper person to be provided with an Account, we may refuse to provide you with an Account in our sole discretion.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">b.</span> We are not responsible for verifying your visa status, educational qualifications, professional credentials, and other relevant details related to your Profile.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">c.</span> When you create an Account, you must pay a one-off fee as specified on our Platform which enables your Profile to go live for a period otherwise specified (Fixed Fee). You will then be charged a monthly Membership fee.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">d.</span> You reserve the right to update your Profile once every three months. If you wish to update your Profile beyond this, you will be charged an additional fee as set out on our Platform.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">e.</span> Where your visa expires, your Account will no longer be live on the Platform.
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">3.10</span> Where you are an Employer:
              </p>
              <div className="space-y-2 ml-4">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">a.</span> When you create an Account, you may select a membership (Membership). You may choose between different tiers of Membership with different services and different membership periods as set out on our Platform.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">b.</span> As an alternative to a Membership, you may pay to access specific Job Seeker Profiles at your discretion (Pay As You Go purchase).
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'platform-summary',
      title: '4. Platform Summary',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">4.1</span> The Platform is a marketplace where Employers can access Job Seekers and Job Seekers can promote themselves for employment opportunities. We provide the Platform to users, including hosting and maintaining the Platform. You understand and agree that we only make available the NextGen Talent Machine. We are not party to any agreement entered into between an Employer and a Job Seeker and we have no control over the conduct of Job Seekers, Employers, or any other users of the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">4.2</span> A Job Seeker looking for employment opportunities creates an Account on the Platform. An anonymized version of this, with only key details around skills and experience, then goes live for review by Employers (Job Seeker Profile).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">4.3</span> An Employer wanting to engage an employee or contractor for permanent or casual engagements creates an Account on the Platform to view and browse matched anonymized Job Seeker Profiles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">4.4</span> The Employer may then shortlist Job Seeker Profiles, access full non-anonymized Job Seeker Profiles, download the CVs of Job Seekers, and use this information to contact Job Seekers directly (in accordance with the inclusions of their Membership or where no Membership has been purchased, in accordance with the Pay As You Go purchase).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'communication',
      title: '5. Communication',
      icon: MessageSquare,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold">5.1</span> We may contact you via the Platform using in-Account notifications or via off-Platform communication channels such as text message or email.
          </p>
        </div>
      ),
    },
    {
      id: 'memberships',
      title: '6. Memberships',
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">6.1</span> You may purchase a Membership by paying the Membership fees outlined on the Platform (Membership Fees) in advance on an annual basis or some other recurring interval disclosed to you prior to your payment of the Membership Fees (Billing Cycle).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">6.2</span> Your Membership will automatically renew at the end of the Billing Cycle for the same period of time, and you will be charged the Membership Fees in connection with each subsequent Billing Cycle unless and until you cancel your Membership.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">6.3</span> The Membership Fees are only refundable and cancellable in accordance with any rights you may have under New Zealand consumer laws and these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">6.4</span> We may need to change what is available as part of your Membership (for example, the inclusions, exclusions, updated features) from time to time. If we change what is available as part of your Membership, we will provide you with at least 30 days&apos; notice of the change. After the notice period has lapsed, we will apply the changes to your Membership. If the changes adversely affect your enjoyment of the Membership, you may cancel your Membership with effect from the date we apply the changes to your Membership by providing written notice to us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">6.5</span> We may need to change the Fees from time to time. If we change the Membership Fees, we will provide you with 30 days&apos; notice of the change. After 30 days, we will apply the updated Membership Fee to your Membership. If the updated Membership Fee is not acceptable to you, you may cancel your Membership in accordance with the &apos;Termination&apos; clause.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'payments',
      title: '7. Payments',
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.1</span> As an Employer, you agree to pay (and your chosen payment method will be charged) the Membership Fee for your relevant Membership, or where no Membership has been selected, you agree to pay any applicable Pay As You Go fees as they are incurred.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.2</span> As a Job Seeker, you agree to pay (and your chosen payment method will be charged) the Fixed Fee and any Membership Fees.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.3</span> The payment methods we offer for the Pay As You Go fees, Fixed Fees, and Membership Fees (together the Fees) are set out on the Platform. We may offer payment through a third-party provider. You acknowledge and agree that we have no control over the actions of the third-party provider, and your use of the third-party payment method may be subject to additional terms and conditions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.4</span> You must not pay or attempt to pay the Fees by fraudulent or unlawful means. If you make a payment by debit card or credit card, you warrant that you are authorized to use the debit card or credit card to make the payment. If payment is made by direct debit, by providing your bank account details and accepting these Terms, you authorize our nominated third-party payment processor to debit your account in accordance with these Terms, and you certify that you are either an account holder or an authorized signatory on the account for which you provide details.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.5</span> You agree that we may set-off or deduct from any monies payable to you under these Terms any amounts which are payable by you to us in connection with the Platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">7.6</span> We do not store any credit card details, and all payment information is collected and stored through our third-party payment processor.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'disputes',
      title: '8. Disputes between Employers and Job Seekers',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">8.1</span> We will not be responsible for resolving any disputes between Employers and Job Seekers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">8.2</span> For disputes between Employers and Job Seekers, we encourage Parties to attempt to resolve disputes (including claims for returns or refunds) with the other Party directly and in good faith through external communication methods.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">8.3</span> In the event that a dispute cannot be resolved through these means, the Parties may choose to resolve the dispute in any manner agreed between the Parties or otherwise in accordance with applicable laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">8.4</span> This clause will survive the termination or expiry of these Terms.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'identity-verification',
      title: '9. Identity Verification',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">9.1</span> If we choose to conduct identity verification or background checks on any Employer or Job Seeker to the extent permitted by law, we disclaim all warranties of any kind, either express or implied, that such checks will identify prior misconduct by an Employer or Job Seeker or guarantee that an Employer or Job Seeker will not engage in misconduct in the future.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">9.2</span> Any verification of Job Seekers or Employers on the Platform is not an endorsement or recommendation that the Job Seeker or Employer is trustworthy or suitable.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">9.3</span> Where you have elected to verify your identity under this clause, you acknowledge and agree that:
              </p>
              <div className="space-y-2 ml-4">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">a.</span> We may contact, connect to, or otherwise liaise with Third Party ID Services to validate your identity and information (Identity Check); and
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">b.</span> Third Party ID Services may provide us with your personal information or sensitive information, and you consent to us receiving and using this information to enable us to perform an Identity Check.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'intellectual-property',
      title: '10. Intellectual Property',
      icon: Lock,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">10.1</span> All intellectual property (including copyright) developed, adapted, modified, or created by us or our personnel (including in connection with the Terms, any content on the Platform, and the products) (Our Intellectual Property) will at all times vest or remain vested in us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">10.2</span> We authorize you to use Our Intellectual Property solely for the purposes for which it was intended to be used.
            </p>
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">10.3</span> You must not, without our prior written consent:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>copy, in whole or in part, any of Our Intellectual Property;</li>
                <li>reproduce, retransmit, distribute, disseminate, sell, publish, broadcast, or circulate any of Our Intellectual Property to any third party; or</li>
                <li>breach any intellectual property rights connected with the Platform, including (without limitation) altering or modifying any of Our Intellectual Property, causing any of Our Intellectual Property to be framed or embedded in another website, or creating derivative works from any of Our Intellectual Property.</li>
              </ul>
            </div>
            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">10.4</span> Nothing in the above clause restricts your ability to publish, post, or repost Our Intellectual Property on your social media page or blog, provided that:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>you do not assert that you are the owner of Our Intellectual Property;</li>
                <li>unless explicitly agreed by us in writing, you do not assert that you are endorsed or approved by us;</li>
                <li>you do not damage or take advantage of our reputation, including in a manner that is illegal, unfair, misleading, or deceptive; and</li>
                <li>you comply with all other terms of these Terms.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">10.5</span> This clause will survive the termination or expiry of these Terms.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'warranties',
      title: '11. Warranties',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700 leading-relaxed font-semibold mb-3">
              <span className="font-semibold">11.1</span> You represent, warrant, and agree that:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
              <li>you will not use our Platform, including Our Intellectual Property, in any way that competes with our business;</li>
              <li>there are no legal restrictions preventing you from entering into these Terms;</li>
              <li>all information and documentation that you provide to us in connection with these Terms is true, correct, and complete;</li>
              <li>where you are a Job Seeker, you are responsible for complying with all laws, rules, and regulations which apply to providing the services in your Job Seeker Listings;</li>
              <li>where you are a Job Seeker, you are appropriately qualified and have any required skills, knowledge, or training to provide the services; and</li>
              <li>where you are a Job Seeker, you are solely responsible for determining which projects to accept, the type, timing, manner, means, methods, or processes of providing your services, and the price you charge for services. You are not our employee and are not entitled to any employment benefits. We do not supervise, direct, or control any of the services you offer. We do not set your fees, work hours, your schedule, or your location. We do not provide you with training, equipment, tools, or any materials to provide your services. You are responsible for any taxes payable on any fee you receive for your services.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'consumer-law',
      title: '12. Consumer Law',
      icon: Gavel,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">12.1</span> Subject to any rights you may have under Sri Lanka consumer laws, we exclude all express and implied warranties, and all material, work, and services (including the Platform) are provided to you without warranties of any kind, either express or implied, whether in statute, at law, or on any other basis.
            </p>
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">12.2</span> If you are a business using our Platform, you agree and represent that you are using our Platform for the purpose of trade, and we and you both agree that:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>the Consumer Guarantees Act 1993 and sections 9, 12A, and 13 of the Fair Trading Act 1986 do not apply to the Next Gen Talent Machine Services and these Terms; and</li>
                <li>it is fair and reasonable that we and you are both bound by these Terms, including this clause.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">12.3</span> As an Employer, the services provided by a Job Seeker may also confer on you certain rights under New Zealand consumer laws.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'liability',
      title: '13. Limitations on Liability',
      icon: AlertCircle,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">13.1</span> To the maximum extent permitted by law, we will not be liable for, and you waive and release us from and against, any Liability caused or contributed to by, arising from, or connected with:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
              <li>the use or results of any Third-Party ID Service or Identity Check; and</li>
              <li>any aspect of the Employer and Job Seeker interaction, including the services offered by the Job Seeker, the description of the services requested or offered, any advice provided, and the performance of services.</li>
            </ul>
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">13.2</span> Despite anything to the contrary and to the maximum extent permitted by law:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>neither Party will be liable for Consequential Loss;</li>
                <li>each Party&apos;s liability for any Liability under these Terms will be reduced proportionately to the extent the relevant Liability was caused or contributed to by the acts or omissions of the other Party or any of that Party&apos;s personnel, including any failure by that Party to mitigate its losses; and</li>
                <li>our aggregate liability for any Liability arising from or in connection with these Terms will be limited to the Fees, Service Fees, and Listing Fees paid by you in the 12 months immediately preceding the act, event, or omission giving rise to the Liability (and where there has been less than 12 months of Fees paid, an amount equal to 12 months of Fees calculated on a pro-rata basis having regard to the amount of Fees paid and the period of time).</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'termination',
      title: '14. Termination',
      icon: X,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.1</span> We reserve the right to terminate or suspend your Account at any time with written notice due to a breach or suspected breach of clause 2.6.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.2</span> Your Account and these Terms may be terminated by you at any time using the &apos;Deactivate Account&apos; functionality in the Account page section of your Account settings. Your cancellation will take effect from the end of the current Billing Cycle.
            </p>
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">14.3</span> These Terms will terminate immediately upon written notice by a Party (Non-Defaulting Party) if:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>the other Party (Defaulting Party) breaches a material term of these Terms and that breach has not been remedied within 10 Business Days of the Defaulting Party being notified of the breach by the Non-Defaulting Party; or</li>
                <li>the Defaulting Party is unable to pay its debts as they fall due.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.4</span> Should we suspect that you are in breach of these Terms, we may suspend your Account while we investigate the suspected breach.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600 mt-4">
              <p className="text-gray-700 leading-relaxed font-semibold mb-3">
                <span className="font-semibold">14.5</span> Upon expiry or termination of these Terms:
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-4">
                <li>Where you have a Job Seeker Profile, this will no longer be active or visible to Employers;</li>
                <li>We will immediately cease providing the JobNet Services; and</li>
                <li>Where we terminate the Terms as a result of your unrectified default, you also agree to pay us our reasonable additional costs directly arising from such termination, including recovery fees.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.6</span> Where termination is due to our breach of these Terms, we agree to refund you for any prepaid unused Fees, Service Fees, or Listing Fees on a pro-rata basis.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.7</span> Termination of these Terms will not affect any rights or liabilities that a Party has accrued under it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">14.8</span> This clause will survive the termination or expiry of these Terms.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'general',
      title: '15. General',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.1 Assignment:</span> Subject to the below clause, a Party must not assign or deal with the whole or any part of its rights or obligations under these Terms without the prior written consent of the other Party (such consent is not to be unreasonably withheld).
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.2 Assignment of Debt:</span> You agree that we may assign or transfer any debt owed by you to us arising under or in connection with these Terms to a debt collector, debt collection agency, or other third party.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.3 Confidentiality:</span> Other than where the disclosure is permitted by law or agreed between the Parties, each Party agrees not to disclose any confidential information it may access on or through the Platform to a third party or otherwise misuse such confidential information. Confidential information may include confidential information supplied to you by us, by an Employer, or by a Job Seeker.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.4 Disputes:</span> In relation to a dispute, controversy, or claim arising from or in connection with these Terms (including any question regarding its existence, validity, or termination) (Dispute) between an Employer and us or a Job Seeker and us, a Party may not commence court proceedings relating to a Dispute without first meeting with a senior representative of the other Party to seek (in good faith) to resolve the Dispute. If the Parties cannot agree on how to resolve the Dispute at that initial meeting, either Party may refer the matter to a mediator. If the Parties cannot agree on who the mediator should be, either Party may ask the New Zealand Disputes Resolution Centre to appoint a mediator. The mediator will decide the time, place, and rules for mediation. The Parties agree to attend the mediation in good faith to seek to resolve the Dispute. The costs of the mediation will be shared equally between the Parties. Nothing in this clause will operate to prevent a Party from seeking urgent injunctive or equitable relief from a court of appropriate jurisdiction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.5 Entire Terms:</span> These Terms contain the entire understanding between the Parties, and the Parties agree that no representation or statement has been made to or relied upon by either of the Parties except as expressly stipulated in these Terms. These Terms supersede all previous discussions, communications, negotiations, understandings, representations, warranties, commitments, and agreements in respect of its subject matter.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.6 Force Majeure:</span> Neither Party will be liable for any delay or failure to perform their respective obligations under these Terms if such delay or failure is caused or contributed to by a Force Majeure Event, provided the Party seeking to rely on the benefit of this clause, as soon as reasonably practical, notifies the other Party in writing about the Force Majeure Event and the extent to which it is unable to perform its obligations and uses reasonable endeavors to minimize the duration and adverse consequences of the Force Majeure Event.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.7 Further Assurance:</span> Each Party must promptly do all things and execute all further instruments necessary to give full force and effect to these Terms and their obligations under it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.8 Governing Law:</span> These Terms are governed by the laws of New Zealand. Each Party irrevocably and unconditionally submits to the exclusive jurisdiction of the courts operating in Sri Lanka and any courts entitled to hear appeals from those courts and waives any right to object to proceedings being brought in those courts.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.9 Notices:</span> Any notice given under these Terms must be in writing, addressed to us at the details set out below or to you at the details provided in your Account. Any notice may be sent by standard post or email and will be deemed to have been served on the expiry of 48 hours in the case of post or at the time of transmission in the case of transmission by email.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.10 Publicity:</span> With your prior written consent, you agree that we may advertise or publicize the broad nature of our supply of the Next Gen Talent Machine Services to you, including on our website or in our promotional material.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.11 Relationship of Parties:</span> These Terms are not intended to create a partnership, joint venture, employment, or agency relationship between the Parties.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.12 Severance:</span> If a provision of these Terms is held to be void, invalid, illegal, or unenforceable, that provision is to be read down as narrowly as necessary to allow it to be valid or enforceable, failing which that provision (or that part of that provision) will be severed from these Terms without affecting the validity or enforceability of the remainder of that provision or the other provisions in these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">15.13 Third-Party Sites:</span> The Platform may contain links to websites operated by third parties. Unless we tell you otherwise, we do not control, endorse, or approve, and are not responsible for, the content on those websites. We recommend that you make your own investigations with respect to the suitability of those websites. If you purchase goods or services from a third-party website linked from the Platform, such third party provides the goods and services to you, not us. We may receive a benefit (which may include a referral fee or a commission) should you visit certain third-party websites via a link on the Platform (Affiliate Link) or for featuring certain products or services on the Platform. We will make it clear by notice to you which (if any) products or services we receive a benefit to feature on the Platform or which (if any) third-party links are Affiliate Links.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'definitions',
      title: '16. Definitions',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">16.1 Consequential Loss</span> means any loss or damage that cannot be considered to arise according to the usual course of things from the relevant breach, act, or omission, whether or not such loss or damage may reasonably be supposed to have been in the contemplation of the Parties at the time they entered into these Terms as the probable result of the relevant breach, act, or omission, including but not limited to any real or anticipated loss of profit, loss of benefit, loss of revenue, loss of business, loss of goodwill, loss of opportunity, loss of savings, loss of reputation, loss of use, and/or loss or corruption of data. The Parties agree that your obligation to pay us the Fee under these Terms will not constitute &quot;Consequential Loss.&quot;
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">16.2 Force Majeure Event</span> means any event or circumstance which is beyond a Party&apos;s reasonable control.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">16.3 Intellectual Property</span> means any and all existing and future rights throughout the world conferred by statute, common law, equity, or any corresponding law in relation to any copyright, designs, patents, trademarks, domain names, know-how, inventions, processes, trade secrets, or confidential information, circuit layouts, software, computer programs, databases, or source codes, including any application or right to apply for registration of and any improvements, enhancements, or modifications of the foregoing, whether or not registered or registrable.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">16.4 Liability</span> means any expense, cost, liability, loss, damage, claim, notice, entitlement, investigation, demand, proceeding, or judgment (whether under statute, contract, equity, tort (including negligence), indemnity, or otherwise), howsoever arising, whether direct or indirect, and/or whether present, unascertained, future, or contingent and whether involving a third party or a party to these Terms or otherwise.
            </p>
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
                    <span>No.441/28 J, Highlevel Road, Gangodawila, Nugegoda, Colombo, SRI LANKA</span>
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

