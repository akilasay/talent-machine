'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { resendConfirmationEmail } = useAuth()
  
  // Get error parameters from both query params and hash
  const [errorParams, setErrorParams] = useState({
    error: searchParams.get('error') || '',
    errorCode: searchParams.get('error_code') || '',
    errorDescription: searchParams.get('error_description') || '',
    type: searchParams.get('type') || 'signup'
  })

  useEffect(() => {
    // Check URL hash for error parameters (Supabase sometimes puts them in hash)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1) // Remove #
      if (hash) {
        const hashParams = new URLSearchParams(hash)
        const hashError = hashParams.get('error')
        const hashErrorCode = hashParams.get('error_code')
        const hashErrorDescription = hashParams.get('error_description')
        
        if (hashError || hashErrorCode) {
          setErrorParams(prev => ({
            ...prev,
            error: hashError || prev.error,
            errorCode: hashErrorCode || prev.errorCode,
            errorDescription: hashErrorDescription || prev.errorDescription,
          }))
          
          // Clean up the hash from URL
          window.history.replaceState(null, '', window.location.pathname + window.location.search)
        }
      }
    }
  }, [])

  const { error, errorCode, errorDescription, type } = errorParams
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const isExpired = errorCode === 'otp_expired' || error?.includes('expired') || errorDescription?.includes('expired')
  const isInvalid = errorCode === 'invalid' || error?.includes('invalid') || errorDescription?.includes('invalid')

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMsg('')

    if (!email) {
      setErrorMsg('Please enter your email address')
      setLoading(false)
      return
    }

    const { error } = await resendConfirmationEmail(email)
    
    if (error) {
      setErrorMsg(error.message || 'Failed to resend confirmation email. Please try again.')
    } else {
      setMessage(`A new confirmation email has been sent to ${email}. Please check your inbox and click the link to verify your account.`)
    }
    
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verification Link Error
          </CardTitle>
          <CardDescription className="text-center">
            {isExpired 
              ? 'Your verification link has expired'
              : isInvalid
              ? 'Your verification link is invalid'
              : 'There was a problem verifying your email address'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(error || errorCode || errorDescription) && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {errorDescription 
                  ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
                  : isExpired
                  ? 'The verification link has expired. Please request a new one below.'
                  : 'The verification link is invalid or has already been used.'}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Get a New Verification Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter your email address below and we'll send you a new verification link.
              </p>
            </div>

            <form onSubmit={handleResend} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={loading}
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{errorMsg}</p>
                </div>
              )}

              {message && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-sm text-green-800 dark:text-green-200">{message}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Resend Confirmation Email'}
              </Button>
            </form>
          </div>

          <div className="pt-4 border-t space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/sign-up')}
            >
              Try Signing Up Again
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push('/sign-in')}
            >
              Go to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

