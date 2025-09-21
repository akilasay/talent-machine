// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Profile = () => {
//   return (
//            <section className="mx-auto bg-[#2c2c2c] text-white rounded-2xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
//             <div className="bg-[#fccc41] rounded-2xl px-3 py-1.5 text-black">Find best candidate for your requirements.</div>
//             <h2 className="text-3xl font-bold">
//                 Find best candidate for your requirements.
//             </h2>
//             <p>Create profile and see the best.</p>
//             <Image src="images/cta.svg" alt="cta" width={362} height={232} />
//             <button className="bg-[#fe5933] text-white rounded-xl cursor-pointer px-4 py-2 flex items-center gap-2">
//                 <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
//                 <Link href="/candidates/new">
//                     <p> Create Profile</p>
//                 </Link>
//             </button>
//         </section>
//   )
// }

// export default Profile

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Building2, Shield, Users, CheckCircle } from "lucide-react";

export default function EmployerProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [employerProfileId, setEmployerProfileId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check user type
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('user_type')
          .eq('user_id', user.id)
          .single();

        if (userProfile) {
          setUserType(userProfile.user_type);
          
          // Check if user has employer profile
          if (userProfile.user_type === 'employer') {
            const { data: employerProfile } = await supabase
              .from('employers')
              .select('id')
              .eq('user_id', user.id)
              .single();
            
            setHasProfile(!!employerProfile);
            setEmployerProfileId(employerProfile?.id || null);
          }
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [user, supabase]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, show sign-up options
  if (!user) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Top Talent for Your Company
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of employers who trust our platform to find the best candidates. 
              Create your employer account and start building your dream team today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="h-full shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>For Employers</span>
                  </CardTitle>
                  <CardDescription>
                    Create an employer account to find and hire top talent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Post job listings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Browse candidate profiles</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Direct messaging</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Advanced search filters</span>
                    </li>
                  </ul>
                  <Link href="/employers/sign-up" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Sign Up as Employer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="h-full shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>For Job Seekers</span>
                  </CardTitle>
                  <CardDescription>
                    Looking for a job? Create a candidate account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Create professional profile</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Apply to job listings</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Get discovered by employers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Track applications</span>
                    </li>
                  </ul>
                  <Link href="/sign-up" className="block">
                    <Button variant="outline" className="w-full">
                      Sign Up as Job Seeker
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // If user is candidate type, redirect them
  if (userType === 'candidate') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              This page is for employers only. You're currently signed in as a job seeker.
            </p>
            <div className="space-y-3">
              <Link href="/candidates">
                <Button className="w-full">Go to Job Seeker Dashboard</Button>
              </Link>
              <p className="text-sm text-gray-500">
                Want to become an employer?{' '}
                <Link href="/sign-out" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign out
                </Link>
                {' '}and create an employer account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is employer but not verified, show verification message
  if (userType === 'employer' && !user.email_confirmed_at) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Verification Required</h2>
            <p className="text-gray-600 mb-4">
              Please check your email and click the verification link to access your employer dashboard.
            </p>
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is employer, show appropriate content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Building2 className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Employer Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {hasProfile 
              ? "Manage your company profile and find the best talent for your team."
              : "Complete your company profile to start finding top talent for your team."
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span>Company Profile</span>
                </CardTitle>
                <CardDescription>
                  {hasProfile 
                    ? "Update your company information and attract better candidates"
                    : "Create your company profile to showcase your organization"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Company information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Contact details</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Company description</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Industry & size</span>
                  </li>
                </ul>
                <div className="space-y-3">
                  <Link href="/employers/new" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {hasProfile ? 'Update Profile' : 'Create Profile'}
                    </Button>
                  </Link>
                  {hasProfile && employerProfileId && (
                    <Link href={`/employers/${employerProfileId}`} className="block">
                      <Button variant="outline" className="w-full">
                        View Profile
              </Button>
            </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Find Talent</span>
                </CardTitle>
                <CardDescription>
                  Browse and connect with qualified candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Browse candidate profiles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Advanced search filters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Direct messaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Save candidates</span>
                  </li>
                </ul>
                <Link href="/candidates" className="block">
                  <Button variant="outline" className="w-full">
                    Browse Candidates
                  </Button>
                </Link>
        </CardContent>
      </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
