'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const maxRetries = 5 // Maximum number of retry attempts

  useEffect(() => {
    let mounted = true
    let authSubscription: { unsubscribe: () => void } | null = null
    let retryTimeout: NodeJS.Timeout | null = null

    const checkSession = async (attempt: number = 0) => {
      if (!mounted) return

      try {
        // Check for session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          // Verify the session is actually valid by checking user
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          
          if (user && !userError) {
            if (mounted) {
              setIsValidSession(true)
              setError('')
              setCheckingSession(false)
            }
            return
          }
        }

        // If no session and we haven't exceeded max retries, retry
        if (attempt < maxRetries) {
          // Exponential backoff: 200ms, 400ms, 800ms, 1600ms, 3200ms
          const delay = Math.min(200 * Math.pow(2, attempt), 3200)
          
          retryTimeout = setTimeout(() => {
            if (mounted) {
              checkSession(attempt + 1)
            }
          }, delay)
        } else {
          // Max retries reached, set up auth state listener as last resort
          if (mounted && !authSubscription) {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
              if (mounted) {
                if (session) {
                  // Verify user exists
                  supabase.auth.getUser().then(({ data: { user }, error: userError }) => {
                    if (mounted) {
                      if (user && !userError) {
                        setIsValidSession(true)
                        setError('')
                        setCheckingSession(false)
                      }
                    }
                  })
                } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                  // Give it one more moment after these events
                  setTimeout(() => {
                    if (mounted) {
                      supabase.auth.getSession().then(({ data: { session } }) => {
                        if (mounted) {
                          if (session) {
                            supabase.auth.getUser().then(({ data: { user }, error: userError }) => {
                              if (mounted) {
                                if (user && !userError) {
                                  setIsValidSession(true)
                                  setError('')
                                } else {
                                  setError('Invalid or expired reset link. Please request a new password reset.')
                                }
                                setCheckingSession(false)
                              }
                            })
                          } else {
                            setError('Invalid or expired reset link. Please request a new password reset.')
                            setCheckingSession(false)
                          }
                        }
                      })
                    }
                  }, 500)
                }
              }
            })
            authSubscription = subscription
          }
          
          // Wait a bit more with the listener active before giving up
          setTimeout(() => {
            if (mounted) {
              supabase.auth.getSession().then(({ data: { session } }) => {
                if (mounted) {
                  if (session) {
                    supabase.auth.getUser().then(({ data: { user }, error: userError }) => {
                      if (mounted) {
                        if (!user || userError) {
                          setError('Invalid or expired reset link. Please request a new password reset.')
                        }
                        setCheckingSession(false)
                      }
                    })
                  } else {
                    setError('Invalid or expired reset link. Please request a new password reset.')
                    setCheckingSession(false)
                  }
                }
              })
            }
          }, 2000)
        }
      } catch (err) {
        console.error('Error checking session:', err)
        if (mounted && attempt >= maxRetries) {
          setError('Invalid or expired reset link. Please request a new password reset.')
          setCheckingSession(false)
        }
      }
    }

    // Start checking
    checkSession()

    // Cleanup function
    return () => {
      mounted = false
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      if (authSubscription) {
        authSubscription.unsubscribe()
      }
    }
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Security: Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Security: Enhanced password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    // Security: Check for common weak passwords
    const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123']
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      setError('Password is too common. Please choose a stronger password.')
      setLoading(false)
      return
    }

    // Security: Verify session is still valid before allowing password change
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (!session || sessionError) {
      setError('Your session has expired. Please request a new password reset link.')
      setLoading(false)
      setIsValidSession(false)
      return
    }

    // Security: Verify user exists and is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (!user || userError) {
      setError('Authentication failed. Please request a new password reset link.')
      setLoading(false)
      setIsValidSession(false)
      return
    }

    try {
      // Security: Update password - Supabase handles token invalidation automatically
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        // Security: Don't expose detailed error messages that could help attackers
        if (error.message.includes('expired') || error.message.includes('invalid')) {
          setError('This reset link has expired or is invalid. Please request a new password reset.')
        } else {
          setError('Failed to update password. Please try again or request a new reset link.')
        }
        setLoading(false)
      } else {
        // Security: Sign out the user immediately after password reset
        // This ensures the reset token cannot be reused
        await supabase.auth.signOut()
        setSuccess(true)
        setTimeout(() => {
          router.push('/sign-in?password_reset=true')
        }, 3000)
      }
    } catch (err) {
      // Security: Generic error message to prevent information leakage
      console.error('Password reset error:', err)
      setError('An error occurred while resetting your password. Please try again or request a new reset link.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900 pt-16 sm:pt-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your password has been updated successfully. You have been signed out for security reasons. 
                Please sign in again with your new password.
              </p>
              <p className="text-sm text-gray-500">Redirecting to sign in page...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (checkingSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900 pt-16 sm:pt-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-gray-600">Verifying reset link...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isValidSession && error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900 pt-16 sm:pt-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Invalid Reset Link</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link href="/sign-in">
                <Button className="w-full">
                  Go to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-gray-900 pt-16 sm:pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading || !isValidSession}
                minLength={8}
                placeholder="Enter new password (min. 8 characters)"
                autoComplete="new-password"
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading || !isValidSession}
                minLength={8}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading || !isValidSession}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <div className="text-center">
              <Link href="/sign-in" className="text-sm text-blue-600 hover:text-blue-500">
                Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

