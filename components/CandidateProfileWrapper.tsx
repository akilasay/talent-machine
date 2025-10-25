"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getSubjectColor } from '@/lib/utils'
import CandidateEditForm from './CandidateEditForm'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface CandidateProfileWrapperProps {
  candidate: {
    id: string;
    name: string;
    fist_name?: string;
    last_name?: string;
    job: string;
    topic: string;
    education: string;
    experience: number;
    gender?: string;
    academicQualifications: string;
    academic_qualifications?: string;
    professionalQualifications: string;
    professional_qualifications?: string;
    // CV fields
    cv_url?: string;
    cv_filename?: string;
    cv_file_size?: number;
    cv_uploaded_at?: string;
  }
  isOwner: boolean
  initialEditMode?: boolean
  userEmail?: string
}

export default function CandidateProfileWrapper({ candidate, isOwner, initialEditMode = false, userEmail }: CandidateProfileWrapperProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [currentCandidate, setCurrentCandidate] = useState(candidate)

  // Update local state when candidate prop changes (e.g., after page refresh)
  useEffect(() => {
    setCurrentCandidate(candidate)
  }, [candidate])

  const color = getSubjectColor(currentCandidate.job)

  const handleEditSuccess = (updatedCandidate?: {
    id: string;
    name: string;
    fist_name?: string;
    last_name?: string;
    job: string;
    topic: string;
    education: string;
    experience: number;
    gender?: string;
    academicQualifications: string;
    academic_qualifications?: string;
    professionalQualifications: string;
    professional_qualifications?: string;
  }) => {
    setIsEditing(false)
    if (updatedCandidate) {
      setCurrentCandidate(updatedCandidate) // Update local state with new data
    }
    // The page will refresh automatically due to router.refresh() in the form
  }

  if (isEditing) {
    return (
      <div>
        {initialEditMode && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Welcome back, {userEmail?.split('@')[0] || 'there'}! 👋
              </h3>
              <p className="text-blue-700 text-sm">
                Great to see you again! You can update your profile information below to keep it current and attractive to employers.
              </p>
            </div>
          </div>
        )}
        <CandidateEditForm 
          candidate={currentCandidate}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleEditSuccess}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Modern Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8">
          {/* Gradient Header */}
          <div className={`h-40 w-full ${color} relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          
          {/* Profile Section */}
          <div className="relative px-8 pb-8">
            <div className="absolute -top-24 left-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Image
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentCandidate.fist_name + ' ' + currentCandidate.last_name)}&background=4f46e5&color=ffffff&size=192&bold=true`}
                    alt={`${currentCandidate.fist_name} ${currentCandidate.last_name}'s avatar`}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                {/* Online Status Indicator */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          
            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-3">
              {isOwner && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
              <Button
                variant="outline"
                className="border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105"
              >
                Share Profile
              </Button>
            </div>

            {/* Profile Info */}
            <div className="pt-28">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                      {currentCandidate.fist_name} {currentCandidate.last_name}
                    </h1>
                    {isOwner && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Your Profile
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-3 font-medium">
                    {currentCandidate.job}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentCandidate.topic}
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentCandidate.experience}+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentCandidate.education === 'msc' ? 'MSc' : 
                       currentCandidate.education === 'bsc' ? 'BSc' : 
                       currentCandidate.education === 'diploma' ? 'Diploma' : 'High School'}
                    </div>
                    <div className="text-sm text-gray-500">Education</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Available</div>
                    <div className="text-sm text-gray-500">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Owner Message */}
        {isOwner && !isEditing && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎉 This is Your Profile!
              </h3>
              <p className="text-green-700 text-sm">
                This is how your profile appears to employers. Keep it updated and attractive to maximize your chances of getting hired!
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">👤</span>
                </div>
                About
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentCandidate.topic}
              </p>
            </div>

            {/* Experience & Education */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🎓</span>
                </div>
                Education & Experience
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-lg">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Education Level</h3>
                    <p className="text-gray-600">
                      {currentCandidate.education === 'no'
                        ? 'No formal education'
                        : currentCandidate.education === 'diploma'
                        ? 'Diploma'
                        : currentCandidate.education === 'bsc'
                        ? 'Bachelor\'s Degree'
                        : currentCandidate.education === 'msc'
                        ? 'Master\'s Degree'
                        : currentCandidate.education}
                    </p>
                    {currentCandidate.academic_qualifications && (
                      <p className="text-gray-500 text-sm mt-1">{currentCandidate.academic_qualifications}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-lg">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Professional Experience</h3>
                    <p className="text-gray-600">{currentCandidate.experience} years of experience</p>
                    {currentCandidate.professional_qualifications && (
                      <p className="text-gray-500 text-sm mt-1">{currentCandidate.professional_qualifications}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold">⚡</span>
                </div>
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {currentCandidate.topic.split(', ').map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-medium rounded-full border border-blue-200 hover:shadow-md transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CV Section */}
            {currentCandidate.cv_url && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm sm:text-base">📄</span>
                  </div>
                  <span className="truncate">CV / Resume</span>
                </h2>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-green-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-base sm:text-lg">📄</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                          {currentCandidate.cv_filename || 'CV Document'}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {currentCandidate.cv_file_size ? `${(currentCandidate.cv_file_size / 1024 / 1024).toFixed(1)} MB` : 'File size not available'}
                          {currentCandidate.cv_uploaded_at && (
                            <span className="ml-1 sm:ml-2">
                              • Uploaded {new Date(currentCandidate.cv_uploaded_at).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                      <Button
                        onClick={() => window.open(currentCandidate.cv_url, '_blank')}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto"
                      >
                        <span className="text-sm sm:text-base">👁️</span>
                        <span className="hidden sm:inline">View CV</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = currentCandidate.cv_url!;
                          link.download = currentCandidate.cv_filename || 'CV.pdf';
                          link.click();
                        }}
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto"
                      >
                        <span className="text-sm sm:text-base">⬇️</span>
                        <span className="hidden sm:inline">Download</span>
                        <span className="sm:hidden">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📧</span>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">📧</span>
                  </div>
                  <span className="text-gray-600 text-sm">Email available on request</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">📍</span>
                  </div>
                  <span className="text-gray-600 text-sm">Location not specified</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {isOwner ? 'Manage Your Profile' : 'Quick Actions'}
              </h3>
              <div className="space-y-3">
                {isOwner ? (
                  <>
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
                    >
                      ✏️ Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl py-3 font-semibold">
                      👁️ View as Others See
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl py-3 font-semibold">
                      📤 Share Profile
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
                      📞 Contact Candidate
                    </Button>
                    <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl py-3 font-semibold">
                      💾 Save Profile
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl py-3 font-semibold">
                      📤 Share
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold text-gray-900">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-semibold text-green-600">Online Now</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profile Complete</span>
                  <span className="font-semibold text-blue-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
