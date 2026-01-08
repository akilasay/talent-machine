import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Security: Validate redirect URL to prevent open redirect attacks
function sanitizeRedirectUrl(url: string, origin: string): string {
  // Remove any protocol and domain, keep only path
  try {
    const urlObj = new URL(url, origin)
    // Only allow same-origin redirects
    if (urlObj.origin !== new URL(origin).origin) {
      return '/'
    }
    // Only allow relative paths (no external redirects)
    if (!urlObj.pathname.startsWith('/')) {
      return '/'
    }
    return urlObj.pathname + urlObj.search
  } catch {
    // If URL parsing fails, return safe default
    return '/'
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') // 'signup' or 'recovery' or 'email_change'
  const redirectUrl = searchParams.get('redirect_url') ?? '/'
  
  // Security: Validate code format (Supabase codes are typically base64-like strings)
  if (code && (code.length < 20 || code.length > 500)) {
    // Invalid code format - redirect to error page
    const errorParams = new URLSearchParams()
    errorParams.set('error', 'invalid_code_format')
    errorParams.set('error_code', 'invalid_code')
    if (type) errorParams.set('type', type)
    
    return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams.toString()}`)
  }
  
  // Check for error parameters in the URL (Supabase redirects with errors in hash, but we can check query params too)
  const error = searchParams.get('error')
  const errorCode = searchParams.get('error_code')
  const errorDescription = searchParams.get('error_description')

  // If there are error parameters, redirect to error page with them
  if (error || errorCode) {
    const errorParams = new URLSearchParams()
    // Security: Sanitize error messages to prevent XSS
    if (error) errorParams.set('error', encodeURIComponent(error.substring(0, 200)))
    if (errorCode) errorParams.set('error_code', encodeURIComponent(errorCode.substring(0, 50)))
    if (errorDescription) errorParams.set('error_description', encodeURIComponent(errorDescription.substring(0, 500)))
    if (type) errorParams.set('type', encodeURIComponent(type))
    
    return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams.toString()}`)
  }

  if (code) {
    const supabase = await createClient()
    
    // Security: Exchange code for session (Supabase handles token validation and expiration)
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!exchangeError) {
      // Email confirmed successfully
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      // Security: Handle different types of email confirmations with safe redirects
      let finalRedirectUrl: string
      if (type === 'signup') {
        finalRedirectUrl = '/?confirmed=true'
      } else if (type === 'recovery') {
        // Password recovery - redirect to reset password page (always safe, no user input)
        finalRedirectUrl = '/auth/reset-password'
      } else if (type === 'email_change') {
        // Security: Sanitize redirect URL to prevent open redirect attacks
        finalRedirectUrl = sanitizeRedirectUrl(redirectUrl, origin)
      } else {
        // Unknown type - use sanitized redirect URL
        finalRedirectUrl = sanitizeRedirectUrl(redirectUrl, origin)
      }
      
      // Security: Construct safe redirect URL
      let redirectTarget: string
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        redirectTarget = `${origin}${finalRedirectUrl}`
      } else if (forwardedHost) {
        // Security: Validate forwarded host to prevent host header injection
        const validHostPattern = /^[a-zA-Z0-9.-]+$/
        if (validHostPattern.test(forwardedHost)) {
          redirectTarget = `https://${forwardedHost}${finalRedirectUrl}`
        } else {
          redirectTarget = `${origin}${finalRedirectUrl}`
        }
      } else {
        redirectTarget = `${origin}${finalRedirectUrl}`
      }
      
      return NextResponse.redirect(redirectTarget)
    } else {
      // Security: Log error for monitoring but don't expose details to user
      console.error('Auth code exchange failed:', {
        type,
        error: exchangeError.message,
        timestamp: new Date().toISOString()
      })
      
      // Error exchanging code - redirect to error page with error details
      const errorParams = new URLSearchParams()
      // Security: Generic error message to prevent information leakage
      errorParams.set('error', 'authentication_failed')
      errorParams.set('error_code', exchangeError.status?.toString() || 'exchange_failed')
      if (type) errorParams.set('type', encodeURIComponent(type))
      
      return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams.toString()}`)
    }
  }

  // No code provided - redirect to error page
  const errorParams = new URLSearchParams()
  errorParams.set('error', 'no_code')
  errorParams.set('error_code', 'missing_code')
  if (type) errorParams.set('type', encodeURIComponent(type))
  
  return NextResponse.redirect(`${origin}/auth/auth-code-error?${errorParams.toString()}`)
}
