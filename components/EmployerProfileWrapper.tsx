"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Building2, Globe, Mail, Phone, MapPin, Users, Calendar, Shield } from 'lucide-react'
import EmployerEditForm from './EmployerEditForm'

interface EmployerProfileWrapperProps {
  employer: {
    id: string;
    company_name: string;
    industry?: string;
    company_size?: string;
    website?: string;
    contact_person: string;
    email: string;
    phone?: string;
    location?: string;
    description?: string;
    company_bio?: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  }
  isOwner: boolean
  initialEditMode?: boolean
  userEmail?: string
}

export default function EmployerProfileWrapper({ 
  employer, 
  isOwner, 
  initialEditMode = false, 
  userEmail 
}: EmployerProfileWrapperProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode)
  const [currentEmployer, setCurrentEmployer] = useState(employer)

  // Update local state when employer prop changes (e.g., after page refresh)
  useEffect(() => {
    setCurrentEmployer(employer)
  }, [employer])

  const handleEditSuccess = (updatedEmployer?: typeof employer) => {
    setIsEditing(false)
    if (updatedEmployer) {
      setCurrentEmployer(updatedEmployer) // Update local state with new data
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
                Great to see you again! You can update your company profile information below to keep it current and attractive to candidates.
              </p>
            </div>
          </div>
        )}
        <EmployerEditForm 
          employer={currentEmployer}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleEditSuccess}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentEmployer.company_name}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  {currentEmployer.is_verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {currentEmployer.industry && (
                    <Badge variant="outline">
                      {currentEmployer.industry}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {isOwner && (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Company Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentEmployer.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About Us</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {currentEmployer.description}
                    </p>
                  </div>
                )}
                
                {currentEmployer.company_bio && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Company Bio</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {currentEmployer.company_bio}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  {currentEmployer.industry && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Industry</h4>
                      <p className="text-gray-700">{currentEmployer.industry}</p>
                    </div>
                  )}
                  {currentEmployer.company_size && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Company Size</h4>
                      <p className="text-gray-700">{currentEmployer.company_size} employees</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentEmployer.contact_person}</p>
                      <p className="text-sm text-gray-600">Contact Person</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{currentEmployer.email}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>

                  {currentEmployer.phone && (
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{currentEmployer.phone}</p>
                        <p className="text-sm text-gray-600">Phone Number</p>
                      </div>
                    </div>
                  )}

                  {currentEmployer.location && (
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{currentEmployer.location}</p>
                        <p className="text-sm text-gray-600">Location</p>
                      </div>
                    </div>
                  )}

                  {currentEmployer.website && (
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <a 
                          href={currentEmployer.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {currentEmployer.website}
                        </a>
                        <p className="text-sm text-gray-600">Website</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification</span>
                  <Badge variant={currentEmployer.is_verified ? "default" : "secondary"}>
                    {currentEmployer.is_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Complete</span>
                  <Badge variant="default">Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm text-gray-900">
                    {new Date(currentEmployer.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            {isOwner && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/candidates'}
                    className="w-full"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Browse Candidates
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(currentEmployer.created_at).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>This profile is visible to job seekers and candidates.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
