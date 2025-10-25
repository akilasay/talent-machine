"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building2, AlertCircle, CheckCircle } from 'lucide-react'
import { updateEmployerProfile } from '@/lib/actions/employer.actions'

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters').max(200, 'Company name must be less than 200 characters'),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  companyBio: z.string().max(2000, 'Company bio must be less than 2000 characters').optional(),
})

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

interface EmployerEditFormProps {
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
  onCancel: () => void
  onSuccess: (updatedEmployer?: {
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
  }) => void
}

export default function EmployerEditForm({ employer, onCancel, onSuccess }: EmployerEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: employer.company_name || "",
      industry: employer.industry || "",
      companySize: employer.company_size || "",
      website: employer.website || "",
      contactPerson: employer.contact_person || "",
      email: employer.email || "",
      phone: employer.phone || "",
      location: employer.location || "",
      description: employer.description || "",
      companyBio: employer.company_bio || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess("")
    
    try {
      console.log("Updating employer data:", values)
      
      // Convert form values to the format expected by the action
      const employerData = {
        companyName: values.companyName,
        industry: values.industry || undefined,
        companySize: values.companySize || undefined,
        website: values.website || undefined,
        contactPerson: values.contactPerson,
        email: values.email,
        phone: values.phone || undefined,
        location: values.location || undefined,
        description: values.description || undefined,
        companyBio: values.companyBio || undefined,
      }
      
      const result = await updateEmployerProfile(employerData)
      
      if (result.success) {
        console.log("Employer updated successfully")
        setSubmitSuccess("Profile updated successfully!")
        
        // Create updated employer object
        const updatedEmployer = {
          ...employer,
          company_name: values.companyName,
          industry: values.industry || undefined,
          company_size: values.companySize || undefined,
          website: values.website || undefined,
          contact_person: values.contactPerson,
          email: values.email,
          phone: values.phone || undefined,
          location: values.location || undefined,
          description: values.description || undefined,
          company_bio: values.companyBio || undefined,
          updated_at: new Date().toISOString(),
        }
        
        onSuccess(updatedEmployer)
        router.refresh() // Refresh the page to show updated data
      } else {
        setSubmitError(result.message || "Failed to update employer profile")
      }
    } catch (error) {
      console.error("Error updating employer:", error)
      setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
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
              Edit Company Profile
            </CardTitle>
            <CardDescription className="text-gray-600">
              Update your company information to attract the best talent
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Building2 className="h-5 w-5" />
                  <span>Company Information</span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      {...form.register("companyName")}
                      disabled={isSubmitting}
                      className={form.formState.errors.companyName ? 'border-red-500' : ''}
                      placeholder="Your company name"
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-sm text-red-500">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={form.watch("industry")}
                      onValueChange={(value) => form.setValue("industry", value)}
                      disabled={isSubmitting}
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
                      value={form.watch("companySize")}
                      onValueChange={(value) => form.setValue("companySize", value)}
                      disabled={isSubmitting}
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
                      {...form.register("website")}
                      disabled={isSubmitting}
                      className={form.formState.errors.website ? 'border-red-500' : ''}
                      placeholder="https://yourcompany.com"
                    />
                    {form.formState.errors.website && (
                      <p className="text-sm text-red-500">{form.formState.errors.website.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Building2 className="h-5 w-5" />
                  <span>Contact Information</span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                    <Input
                      id="contactPerson"
                      {...form.register("contactPerson")}
                      disabled={isSubmitting}
                      className={form.formState.errors.contactPerson ? 'border-red-500' : ''}
                      placeholder="Your full name"
                    />
                    {form.formState.errors.contactPerson && (
                      <p className="text-sm text-red-500">{form.formState.errors.contactPerson.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      disabled={isSubmitting}
                      className={form.formState.errors.email ? 'border-red-500' : ''}
                      placeholder="your.email@company.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      disabled={isSubmitting}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...form.register("location")}
                      disabled={isSubmitting}
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>
              </div>

              {/* Company Description Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <Building2 className="h-5 w-5" />
                  <span>Company Description</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    disabled={isSubmitting}
                    className={form.formState.errors.description ? 'border-red-500' : ''}
                    placeholder="Brief description of your company and what you do..."
                    rows={4}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {form.watch("description")?.length || 0}/1000 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyBio">Company Bio</Label>
                  <Textarea
                    id="companyBio"
                    {...form.register("companyBio")}
                    disabled={isSubmitting}
                    className={form.formState.errors.companyBio ? 'border-red-500' : ''}
                    placeholder="Detailed information about your company culture, values, and mission..."
                    rows={6}
                  />
                  {form.formState.errors.companyBio && (
                    <p className="text-sm text-red-500">{form.formState.errors.companyBio.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {form.watch("companyBio")?.length || 0}/2000 characters
                  </p>
                </div>
              </div>

              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {submitSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{submitSuccess}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}




