'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Toggle to show/hide Google sign-in button (set to true to enable in future)
const SHOW_GOOGLE_SIGN_IN = false;

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const { signIn, signUp, signInWithGoogle, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url') || '/'
  
  // Debug logging
  useEffect(() => {
    console.log('SignInForm - redirectUrl:', redirectUrl)
    console.log('SignInForm - user:', user)
    console.log('SignInForm - loading:', loading)
  }, [redirectUrl, user, loading])

  // Redirect user after successful sign-in
  useEffect(() => {
    if (user && !loading) {
      console.log('User signed in, redirecting to:', redirectUrl)
      router.push(redirectUrl)
    }
  }, [user, loading, router, redirectUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = isSignUp 
      ? await signUp(email, password, userType)
      : await signIn(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      if (isSignUp) {
        setError('')
        setLoading(false)
        // Show success message for sign up
        alert(`Account created successfully as ${userType}! Please check your email to verify your account.`)
      } else {
        // Sign in successful, let useEffect handle redirect
        setLoading(false)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    const { error } = await signInWithGoogle(redirectUrl)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    }
    // Google OAuth will redirect automatically, so we don't need to handle it here
    // Note: Google OAuth works for both sign-in and sign-up
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Enter your email and password to create a new account'
              : 'Enter your email and password to sign in to your account'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            {/* User Type Selection - Only show during sign up */}
            {isSignUp && (
              <div className="space-y-3">
                <Label>I am a:</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as 'candidate' | 'employer')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="candidate" />
                    <Label htmlFor="candidate" className="flex flex-col">
                      <span className="font-medium">Job Seeker / Candidate</span>
                      <span className="text-sm text-gray-500">Looking for job opportunities</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="flex flex-col">
                      <span className="font-medium">Employer / Company</span>
                      <span className="text-sm text-gray-500">Hiring talented professionals</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading 
                ? (isSignUp ? 'Creating account...' : 'Signing in...') 
                : (isSignUp ? 'Create Account' : 'Sign In')
              }
            </Button>
          </form>
          
          {/* Toggle between Sign In and Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                }}
                className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
          
          {/* Google Sign-In Button - Hidden for now, can be enabled by setting SHOW_GOOGLE_SIGN_IN to true */}
          {SHOW_GOOGLE_SIGN_IN && (
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {isSignUp ? 'Sign up with Google' : 'Continue with Google'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
