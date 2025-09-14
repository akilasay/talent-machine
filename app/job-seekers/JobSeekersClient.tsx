"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface JobSeekersClientProps {
  hasExistingProfile: boolean;
  existingProfileId?: string;
  userEmail?: string;
}

export default function JobSeekersClient({ hasExistingProfile, existingProfileId, userEmail }: JobSeekersClientProps) {
  const router = useRouter();

  const handleCreateProfile = () => {
    if (hasExistingProfile && existingProfileId) {
      // User already has a profile, redirect to view their profile (not edit mode)
      router.push(`/candidates/${existingProfileId}`);
    } else {
      // User doesn't have a profile, go to create page
      router.push("/candidates/new");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl border border-blue-100 bg-white">
        <CardContent className="p-10 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-700"
          >
            {hasExistingProfile 
              ? `Welcome Back, ${userEmail?.split('@')[0] || 'there'}! 🎉` 
              : "Stand Out to Employers"
            }
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            {hasExistingProfile 
              ? "We're thrilled to have you back! Your profile is already set up and ready to help you connect with amazing opportunities. Click below to view your profile and see how it appears to employers."
              : "Creating your profile helps recruiters understand your skills, experience, and career goals. The more complete your profile is, the higher your chances of being discovered and hired by top companies."
            }
          </motion.p>

          {hasExistingProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl shadow-sm"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  🚀 Your Profile is Live!
                </h3>
                <p className="text-green-700 text-sm">
                  Employers can already see your profile. Click below to view how it appears to them and make updates if needed!
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button 
              onClick={handleCreateProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-transform hover:scale-105"
            >
              {hasExistingProfile ? "👁️ View My Profile" : "🚀 Create Profile"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
