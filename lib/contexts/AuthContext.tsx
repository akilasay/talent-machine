'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, userType: 'candidate' | 'employer') => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  signInWithGoogle: (redirectUrl?: string) => Promise<{ error: Error | null }>
  getUserType: () => Promise<'candidate' | 'employer' | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userType: 'candidate' | 'employer') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (!error && data.user) {
      console.log('User created successfully, saving user type:', userType)
      console.log('User ID:', data.user.id)
      
      try {
        // Save user type to user_profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            user_type: userType
          })
          .select()
        
        if (profileError) {
          console.error('Error saving user type:', profileError)
          console.error('Profile error details:', JSON.stringify(profileError, null, 2))
          
          // Try to create the table if it doesn't exist
          if (profileError.code === 'PGRST116' || profileError.message?.includes('relation "user_profiles" does not exist')) {
            console.log('Table does not exist, user will need to set up profile later')
            // Store user type in localStorage as fallback
            localStorage.setItem('pending_user_type', userType)
          }
        } else {
          console.log('User type saved successfully:', profileData)
          // Clear any pending user type from localStorage
          localStorage.removeItem('pending_user_type')
        }
      } catch (err) {
        console.error('Unexpected error saving user type:', err)
        // Store user type in localStorage as fallback
        localStorage.setItem('pending_user_type', userType)
      }
    }
    
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signInWithGoogle = async (redirectUrl?: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect_url=${encodeURIComponent(redirectUrl || '/')}`
      }
    })
    return { error }
  }

  const getUserType = async (): Promise<'candidate' | 'employer' | null> => {
    if (!user) return null
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('user_id', user.id)
      .single()
    
    if (error) {
      console.error('Error fetching user type:', error)
      return null
    }
    
    return data?.user_type || null
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    getUserType,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
