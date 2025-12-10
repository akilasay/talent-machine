import SignUpForm from '@/components/auth/SignUpForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // If user is already signed in, redirect to job-seekers page
  if (user) {
    redirect('/job-seekers')
  }
  
  return <SignUpForm />
}
