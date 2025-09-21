'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface EmployerProfileData {
  companyName: string
  industry: string
  companySize: string
  website: string
  contactPerson: string
  email: string
  phone: string
  location: string
  description: string
  companyBio: string
}

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' }
]

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Real Estate',
  'Media & Entertainment',
  'Non-profit',
  'Government',
  'Other'
]

export default function EmployerProfileForm() {
  const { user, getUserType } = useAuth()
  const [formData, setFormData] = useState<EmployerProfileData>({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    companyBio: ''
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [isEmployer, setIsEmployer] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  // Security validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateWebsite = (website: string): boolean => {
    if (!website) return true // Website is optional
    const urlRegex = /^https?:\/\/.+\..+/
    return urlRegex.test(website)
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Company name validation
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required'
    } else if (formData.companyName.trim().length < 2) {
      errors.companyName = 'Company name must be at least 2 characters'
    } else if (formData.companyName.trim().length > 200) {
      errors.companyName = 'Company name must be less than 200 characters'
    }

    // Contact person validation
    if (!formData.contactPerson.trim()) {
      errors.contactPerson = 'Contact person name is required'
    } else if (formData.contactPerson.trim().length < 2) {
      errors.contactPerson = 'Contact person name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Website validation
    if (formData.website && !validateWebsite(formData.website)) {
      errors.website = 'Please enter a valid website URL (e.g., https://example.com)'
    }

    // Phone validation
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    // Description validation
    if (formData.description && formData.description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters'
    }

    // Company bio validation
    if (formData.companyBio && formData.companyBio.length > 2000) {
      errors.companyBio = 'Company bio must be less than 2000 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user makes selection
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const checkUserPermissions = async () => {
    if (!user) return

    try {
      // Check if user is employer type
      const userType = await getUserType()
      if (userType !== 'employer') {
        setError('Access denied. Only employers can create employer profiles.')
        setIsLoading(false)
        return
      }
      setIsEmployer(true)

      // Check if user already has an employer profile
      const { data: existingProfile, error: profileError } = await supabase
        .from('employers')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', profileError)
        setError('Error checking existing profile. Please try again.')
        setIsLoading(false)
        return
      }

      if (existingProfile) {
        setHasProfile(true)
        // Load existing profile data
        setFormData({
          companyName: existingProfile.company_name || '',
          industry: existingProfile.industry || '',
          companySize: existingProfile.company_size || '',
          website: existingProfile.website || '',
          contactPerson: existingProfile.contact_person || '',
          email: existingProfile.email || '',
          phone: existingProfile.phone || '',
          location: existingProfile.location || '',
          description: existingProfile.description || '',
          companyBio: existingProfile.company_bio || ''
        })
      } else {
        // Check for pending employer data from sign-up
        const pendingData = localStorage.getItem('pending_employer_data')
        if (pendingData) {
          try {
            const parsedData = JSON.parse(pendingData)
            setFormData(prev => ({
              ...prev,
              companyName: parsedData.companyName || '',
              contactPerson: parsedData.contactPerson || '',
              phone: parsedData.phone || '',
              industry: parsedData.industry || '',
              website: parsedData.website || ''
            }))
            // Clear pending data
            localStorage.removeItem('pending_employer_data')
          } catch (err) {
            console.error('Error parsing pending employer data:', err)
          }
        }
      }
    } catch (err) {
      console.error('Error checking user permissions:', err)
      setError('Error checking permissions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    // Validate form
    if (!validateForm()) {
      setSaving(false)
      return
    }

    if (!user) {
      setError('You must be logged in to create a profile.')
      setSaving(false)
      return
    }

    try {
      const profileData = {
        user_id: user.id,
        company_name: formData.companyName.trim(),
        industry: formData.industry || null,
        company_size: formData.companySize || null,
        website: formData.website || null,
        contact_person: formData.contactPerson.trim(),
        email: formData.email.trim(),
        phone: formData.phone || null,
        location: formData.location || null,
        description: formData.description || null,
        company_bio: formData.companyBio || null,
        updated_at: new Date().toISOString()
      }

      if (hasProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from('employers')
          .update(profileData)
          .eq('user_id', user.id)

        if (updateError) {
          throw updateError
        }
        setMessage('Profile updated successfully!')
      } else {
        // Create new profile
        const { error: insertError } = await supabase
          .from('employers')
          .insert(profileData)

        if (insertError) {
          throw insertError
        }
        setMessage('Profile created successfully!')
        setHasProfile(true)
      }
    } catch (err: any) {
      console.error('Error saving profile:', err)
      setError(err.message || 'Error saving profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    checkUserPermissions()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isEmployer) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">
              Only employers can create employer profiles. Please sign up as an employer first.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              {hasProfile ? 'Update Employer Profile' : 'Create Employer Profile'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {hasProfile 
                ? 'Update your company information to attract the best talent'
                : 'Complete your company profile to start finding top talent'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Shield className="h-5 w-5" />
                  <span>Company Information</span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      disabled={saving}
                      className={validationErrors.companyName ? 'border-red-500' : ''}
                      placeholder="Your company name"
                    />
                    {validationErrors.companyName && (
                      <p className="text-sm text-red-500">{validationErrors.companyName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleSelectChange('industry', value)}
                      disabled={saving}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => handleSelectChange('companySize', value)}
                      disabled={saving}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={saving}
                      className={validationErrors.website ? 'border-red-500' : ''}
                      placeholder="https://yourcompany.com"
                    />
                    {validationErrors.website && (
                      <p className="text-sm text-red-500">{validationErrors.website}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Shield className="h-5 w-5" />
                  <span>Contact Information</span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      disabled={saving}
                      className={validationErrors.contactPerson ? 'border-red-500' : ''}
                      placeholder="Your full name"
                    />
                    {validationErrors.contactPerson && (
                      <p className="text-sm text-red-500">{validationErrors.contactPerson}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={saving}
                      className={validationErrors.email ? 'border-red-500' : ''}
                      placeholder="your.email@company.com"
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-500">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={saving}
                      className={validationErrors.phone ? 'border-red-500' : ''}
                      placeholder="+1 (555) 123-4567"
                    />
                    {validationErrors.phone && (
                      <p className="text-sm text-red-500">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={saving}
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>
              </div>

              {/* Company Description Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Shield className="h-5 w-5" />
                  <span>Company Description</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={saving}
                    className={validationErrors.description ? 'border-red-500' : ''}
                    placeholder="Brief description of your company and what you do..."
                    rows={4}
                  />
                  {validationErrors.description && (
                    <p className="text-sm text-red-500">{validationErrors.description}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.description.length}/1000 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyBio">Company Bio</Label>
                  <Textarea
                    id="companyBio"
                    name="companyBio"
                    value={formData.companyBio}
                    onChange={handleInputChange}
                    disabled={saving}
                    className={validationErrors.companyBio ? 'border-red-500' : ''}
                    placeholder="Detailed information about your company culture, values, and mission..."
                    rows={6}
                  />
                  {validationErrors.companyBio && (
                    <p className="text-sm text-red-500">{validationErrors.companyBio}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.companyBio.length}/2000 characters
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : hasProfile ? 'Update Profile' : 'Create Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
