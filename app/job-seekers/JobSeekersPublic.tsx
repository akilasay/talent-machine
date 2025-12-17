"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, CheckCircle } from "lucide-react";

export default function JobSeekersPublic() {
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
            <Users className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of job seekers who trust our platform to find their next opportunity. 
            Create your profile and get discovered by top employers today.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md"
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
                <Link href="/sign-in?redirect_url=/job-seekers" className="block">
                  <Button variant="outline" className="w-full">
                    Sign In as Job Seeker
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

