import EmployerSignUpForm from '@/components/auth/EmployerSignUpForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import Link from 'next/link'

export default async function EmployerSignUpPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is logged in, check their type
  if (user) {
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('user_id', user.id)
      .single()

    // If user is already a candidate, show access denied
    if (userProfile?.user_type === 'candidate') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                You&apos;re already signed in as a job seeker. To create an employer account, please sign out first.
              </p>
              <div className="space-y-3">
                <Link href="/job-seekers">
                  <Button variant="outline" className="w-full">
                    Go to Job Seeker Dashboard
                  </Button>
                </Link>
                <Link href="/sign-out">
                  <Button className="w-full">
                    Sign Out & Create Employer Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    // If user is already an employer, redirect to employer dashboard
    if (userProfile?.user_type === 'employer') {
      redirect('/employers')
    }
  }

  return <EmployerSignUpForm />
}
