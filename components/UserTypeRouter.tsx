'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

interface UserTypeRouterProps {
  children: React.ReactNode
  fallbackUrl?: string
}

export default function UserTypeRouter({ children }: UserTypeRouterProps) {
  const { user, loading, getUserType } = useAuth()
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUserType = async () => {
      if (!user) {
        setIsChecking(false)
        return
      }

      try {
        const type = await getUserType()
        setUserType(type)
        
        // If user doesn't have a type set, redirect to profile setup
        if (!type) {
          router.push('/setup-profile')
          return
        }
      } catch (error) {
        console.error('Error checking user type:', error)
      } finally {
        setIsChecking(false)
      }
    }

    if (!loading) {
      checkUserType()
    }
  }, [user, loading, getUserType, router])

  // Show loading while checking user type
  if (loading || isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If no user, show the children (sign-in page, etc.)
  if (!user) {
    return <>{children}</>
  }

  // If user has a type, show the children
  if (userType) {
    return <>{children}</>
  }

  // Fallback
  return <>{children}</>
}
