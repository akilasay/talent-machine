'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface EmployerProfileData {
  companyName: string
  industry?: string
  companySize?: string
  website?: string
  contactPerson: string
  email: string
  phone?: string
  location?: string
  description?: string
  companyBio?: string
}

export interface EmployerProfile {
  id: string
  user_id: string
  company_name: string
  industry?: string
  company_size?: string
  website?: string
  contact_person: string
  email: string
  phone?: string
  location?: string
  description?: string
  company_bio?: string
  is_verified: boolean
  /** When false, employer cannot view candidate profiles until admin approves. */
  approval_enabled: boolean
  created_at: string
  updated_at: string
}

/**
 * Create or update employer profile with security validation
 */
export async function saveEmployerProfile(data: EmployerProfileData) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error('Authentication required')
  }

  // Verify user is employer type
  const { data: userProfile, error: profileError } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single()

  if (profileError || !userProfile || userProfile.user_type !== 'employer') {
    throw new Error('Access denied. Only employers can create employer profiles.')
  }

  // Validate input data
  const validationErrors = validateEmployerData(data)
  if (Object.keys(validationErrors).length > 0) {
    throw new Error(`Validation failed: ${Object.values(validationErrors).join(', ')}`)
  }

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const profileData = {
    user_id: user.id,
    company_name: data.companyName.trim(),
    industry: data.industry?.trim() || null,
    company_size: data.companySize || null,
    website: data.website?.trim() || null,
    contact_person: data.contactPerson.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || null,
    location: data.location?.trim() || null,
    description: data.description?.trim() || null,
    company_bio: data.companyBio?.trim() || null,
    updated_at: new Date().toISOString()
  }

  try {
    if (existingProfile) {
      // Update existing profile (do not allow employer to change approval_enabled)
      const { error: updateError } = await supabase
        .from('employers')
        .update(profileData)
        .eq('user_id', user.id)

      if (updateError) {
        throw new Error(`Failed to update profile: ${updateError.message}`)
      }
    } else {
      // Create new profile: approval_enabled false until admin approves
      const { error: insertError } = await supabase
        .from('employers')
        .insert({ ...profileData, approval_enabled: false })

      if (insertError) {
        throw new Error(`Failed to create profile: ${insertError.message}`)
      }
    }

    revalidatePath('/employers')
    revalidatePath('/employers/new')
    
    return { success: true, message: 'Profile saved successfully' }
  } catch (error: unknown) {
    console.error('Error saving employer profile:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to save profile'
    throw new Error(errorMessage)
  }
}

/**
 * Get employer profile for current user
 */
export async function getEmployerProfile(): Promise<EmployerProfile | null> {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }

  // Verify user is employer type
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single()

  if (!userProfile || userProfile.user_type !== 'employer') {
    return null
  }

  const { data: profile, error } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // No profile found
    }
    throw new Error(`Failed to fetch profile: ${error.message}`)
  }

  return profile
}

/**
 * Check if current user has employer profile
 */
export async function hasEmployerProfile(): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return false
  }

  const { data: profile, error } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  return !error && !!profile
}

/**
 * Check if current user is employer type
 */
export async function isEmployer(): Promise<boolean> {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return false
  }

  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single()

  return userProfile?.user_type === 'employer'
}

/**
 * Check if the current user is an approved employer (can view candidate profiles).
 * Returns false if not logged in, not an employer, or employer not yet approved.
 */
export async function getEmployerApprovalStatus(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return false

  const { data: profile } = await supabase
    .from('employers')
    .select('approval_enabled')
    .eq('user_id', user.id)
    .single()

  return profile?.approval_enabled === true
}

/**
 * Get approval status for a given user id (for server-side checks).
 * Returns null if not an employer or no profile.
 */
export async function getEmployerApprovalStatusByUserId(userId: string): Promise<boolean | null> {
  const supabase = await createClient()
  const { data: profile, error } = await supabase
    .from('employers')
    .select('approval_enabled')
    .eq('user_id', userId)
    .single()
  if (error || !profile) return null
  return profile.approval_enabled === true
}

/**
 * Admin only: set employer approval. Requires ADMIN_USER_IDS env (comma-separated user UUIDs).
 */
export async function updateEmployerApproval(employerId: string, approvalEnabled: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return { success: false, error: 'Authentication required' }
  }

  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').map((id) => id.trim()).filter(Boolean)
  if (!adminIds.length || !adminIds.includes(user.id)) {
    return { success: false, error: 'Only admins can approve employers' }
  }

  const { error } = await supabase
    .from('employers')
    .update({ approval_enabled: approvalEnabled, updated_at: new Date().toISOString() })
    .eq('id', employerId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/employers')
  revalidatePath('/candidates')
  return { success: true }
}

/**
 * Update employer profile
 */
export async function updateEmployerProfile(data: EmployerProfileData) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error('Authentication required')
  }

  // Verify user is employer type
  const { data: userProfile, error: profileError } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single()

  if (profileError || !userProfile || userProfile.user_type !== 'employer') {
    throw new Error('Access denied. Only employers can update employer profiles.')
  }

  // Validate input data
  const validationErrors = validateEmployerData(data)
  if (Object.keys(validationErrors).length > 0) {
    throw new Error(`Validation failed: ${Object.values(validationErrors).join(', ')}`)
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!existingProfile) {
    throw new Error('Employer profile not found. Please create a profile first.')
  }

  const profileData = {
    company_name: data.companyName.trim(),
    industry: data.industry?.trim() || null,
    company_size: data.companySize || null,
    website: data.website?.trim() || null,
    contact_person: data.contactPerson.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || null,
    location: data.location?.trim() || null,
    description: data.description?.trim() || null,
    company_bio: data.companyBio?.trim() || null,
    updated_at: new Date().toISOString()
  }

  try {
    const { error: updateError } = await supabase
      .from('employers')
      .update(profileData)
      .eq('user_id', user.id)

    if (updateError) {
      throw new Error(`Failed to update profile: ${updateError.message}`)
    }

    revalidatePath('/employers')
    revalidatePath('/employers/new')
    revalidatePath(`/employers/${existingProfile.id}`)
    
    return { success: true, message: 'Profile updated successfully' }
  } catch (error: unknown) {
    console.error('Error updating employer profile:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
    throw new Error(errorMessage)
  }
}

/**
 * Delete employer profile
 */
export async function deleteEmployerProfile() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    throw new Error('Authentication required')
  }

  // Verify user is employer type
  const { data: userProfile } = await supabase
    .from('user_profiles')
    .select('user_type')
    .eq('user_id', user.id)
    .single()

  if (!userProfile || userProfile.user_type !== 'employer') {
    throw new Error('Access denied. Only employers can delete employer profiles.')
  }

  const { error } = await supabase
    .from('employers')
    .delete()
    .eq('user_id', user.id)

  if (error) {
    throw new Error(`Failed to delete profile: ${error.message}`)
  }

  revalidatePath('/employers')
  revalidatePath('/employers/new')
  
  return { success: true, message: 'Profile deleted successfully' }
}

/**
 * Validate employer data
 */
function validateEmployerData(data: EmployerProfileData): Record<string, string> {
  const errors: Record<string, string> = {}

  // Company name validation
  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required'
  } else if (data.companyName.trim().length < 2) {
    errors.companyName = 'Company name must be at least 2 characters'
  } else if (data.companyName.trim().length > 200) {
    errors.companyName = 'Company name must be less than 200 characters'
  }

  // Contact person validation
  if (!data.contactPerson?.trim()) {
    errors.contactPerson = 'Contact person name is required'
  } else if (data.contactPerson.trim().length < 2) {
    errors.contactPerson = 'Contact person name must be at least 2 characters'
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Website validation
  if (data.website && !/^https?:\/\/.+\..+/.test(data.website)) {
    errors.website = 'Please enter a valid website URL (e.g., https://example.com)'
  }

  // Phone validation
  if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.phone = 'Please enter a valid phone number'
  }

  // Description validation
  if (data.description && data.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters'
  }

  // Company bio validation
  if (data.companyBio && data.companyBio.length > 2000) {
    errors.companyBio = 'Company bio must be less than 2000 characters'
  }

  return errors
}

/**
 * Get employer profile by ID
 */
export async function getEmployerProfileById(id: string): Promise<EmployerProfile | null> {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }

  const { data: profile, error } = await supabase
    .from('employers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // No profile found
    }
    throw new Error(`Failed to fetch employer profile: ${error.message}`)
  }

  return profile
}

/**
 * Get all employers (admin only). Requires ADMIN_USER_IDS env (comma-separated user UUIDs).
 */
export async function getAllEmployers(): Promise<EmployerProfile[]> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Authentication required')
  }

  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').map((id) => id.trim()).filter(Boolean)
  if (!adminIds.length || !adminIds.includes(user.id)) {
    throw new Error('Only admins can list employers')
  }

  const { data: employers, error } = await supabase
    .from('employers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch employers: ${error.message}`)
  }

  return employers || []
}
