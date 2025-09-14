'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function SetupProfilePage() {
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, getUserType } = useAuth()
  const router = useRouter()

  // Check for pending user type from localStorage
  useEffect(() => {
    const pendingUserType = localStorage.getItem('pending_user_type') as 'candidate' | 'employer' | null
    if (pendingUserType) {
      setUserType(pendingUserType)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!user) {
      setError('No user found')
      setLoading(false)
      return
    }

    try {
      // Save user type to database
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          user_type: userType
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      // Clear pending user type from localStorage
      localStorage.removeItem('pending_user_type')

      // Redirect based on user type
      if (userType === 'candidate') {
        router.push('/job-seekers')
      } else {
        router.push('/employers')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Please select your account type to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">I am a:</Label>
              <RadioGroup
                value={userType}
                onValueChange={(value) => setUserType(value as 'candidate' | 'employer')}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="candidate" id="candidate" />
                  <Label htmlFor="candidate" className="flex flex-col cursor-pointer">
                    <span className="font-medium text-lg">Job Seeker / Candidate</span>
                    <span className="text-sm text-gray-500">Looking for job opportunities and career growth</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer" className="flex flex-col cursor-pointer">
                    <span className="font-medium text-lg">Employer / Company</span>
                    <span className="text-sm text-gray-500">Hiring talented professionals for your team</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting up...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
