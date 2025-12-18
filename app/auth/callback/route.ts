import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type') // 'signup' or 'recovery' or 'email_change'
  const redirectUrl = searchParams.get('redirect_url') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Email confirmed successfully
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      // Handle different types of email confirmations
      let finalRedirectUrl = redirectUrl
      if (type === 'signup') {
        finalRedirectUrl = '/?confirmed=true'
      } else if (type === 'recovery') {
        // Password recovery - redirect to reset password page
        finalRedirectUrl = '/auth/reset-password'
      } else if (type === 'email_change') {
        finalRedirectUrl = redirectUrl
      }
      
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${finalRedirectUrl}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${finalRedirectUrl}`)
      } else {
        return NextResponse.redirect(`${origin}${finalRedirectUrl}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
