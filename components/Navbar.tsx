'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import NavItems from './NavItems';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userCandidateProfile, setUserCandidateProfile] = useState<{
    id: string;
  } | null>(null);
  const [userEmployerProfile, setUserEmployerProfile] = useState<{
    id: string;
  } | null>(null);
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check if we're on the home page (root path) for transparent navbar
  // Use state to prevent hydration mismatch - start with false, update after mount
  const [isHomePage, setIsHomePage] = useState(false);
  
  // Update isHomePage after component mounts to prevent hydration errors
  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  const toggleMobileMenu = (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      // Use a small delay to ensure the button click is processed first
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  // Fetch user's profile and determine user type
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setUserCandidateProfile(null);
        setUserEmployerProfile(null);
        setUserType(null);
        setIsLoadingProfile(false);
        return;
      }
      
      setIsLoadingProfile(true);
      try {
        const supabase = createClient();
        
        // First, get user type from user_profiles table
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('user_type')
          .eq('user_id', user.id)
          .single();

        if (userProfile) {
          setUserType(userProfile.user_type);
          
          // Fetch the appropriate profile based on user type
          if (userProfile.user_type === 'candidate') {
            const { data: candidateData } = await supabase
              .from('candidates')
              .select('id')
              .eq('author', user.id)
              .single();
            
            if (candidateData) {
              setUserCandidateProfile(candidateData);
            }
          } else if (userProfile.user_type === 'employer') {
            const { data: employerData } = await supabase
              .from('employers')
              .select('id')
              .eq('user_id', user.id)
              .single();
            
            if (employerData) {
              setUserEmployerProfile(employerData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleProfileClick = () => {
    if (userType === 'candidate' && userCandidateProfile) {
      // User has a candidate profile, redirect to their profile page
      router.push(`/candidates/${userCandidateProfile.id}`);
    } else if (userType === 'employer' && userEmployerProfile) {
      // User has an employer profile, redirect to their profile page
      router.push(`/employers/${userEmployerProfile.id}`);
    } else if (userType === 'candidate') {
      // User is candidate but doesn't have a profile, redirect to create one
      router.push('/candidates/new');
    } else if (userType === 'employer') {
      // User is employer but doesn't have a profile, redirect to create one
      router.push('/employers/new');
    } else {
      // User doesn't have a profile type, redirect to sign up
      router.push('/sign-up');
    }
    setShowUserMenu(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push('/');
  };

  const navVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
  };

  const userMenuVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.2 } 
    },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2 } 
    },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isHomePage 
          ? 'bg-blue-950/80 backdrop-blur-md border-b border-blue-800/30 shadow-lg shadow-blue-950/20' 
          : 'bg-blue-950 backdrop-blur-xl border-b border-blue-800/50 shadow-xl shadow-blue-950/30'
      }`}
      initial="initial"
      animate="animate"
      variants={navVariants}
    >
      <div className="relative flex items-center justify-between mx-auto w-full max-w-7xl px-3 sm:px-6 py-3 sm:py-4">
        {/* Logo - Left Side */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0"
        >
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <div className="relative">
                <Image
                  src="/images/logo2.png"
                  alt="logo"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16"
                  priority
                />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-xl font-bold leading-tight text-white">
                  TalentHub
                </h1>
                <p className="text-xs -mt-1 hidden sm:block text-white/90">
                  Find Your Dream Job
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav Items - Center */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavItems isHomePage={isHomePage} />
        </div>

        {/* Desktop Auth - Right Side */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          {!user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/sign-in">
              <Button
                  className="bg-white hover:bg-blue-50 text-blue-950 border-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20"
              >
                Sign In
              </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 group hover:bg-blue-900/50"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <span className="text-white text-sm font-bold">
                        {user.email?.split('@')[0]?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      {user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-white/80">
                      Online
                    </p>
                  </div>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-800 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {user.email?.split('@')[0]?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {user.email?.split('@')[0]}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          disabled={isLoadingProfile}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isLoadingProfile ? 'Loading...' : 
                             userType === 'employer' ? 'My Company Profile' : 'My Profile'}
                          </span>
                        </button>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden absolute right-3 sm:right-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              ref={toggleButtonRef}
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="rounded-full p-2 text-white hover:text-white/90 hover:bg-white/10"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="md:hidden backdrop-blur-xl bg-blue-950 border-t border-blue-800/50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
        <div className="flex flex-col gap-4 py-4 px-4">
          {/* Mobile Navigation Items */}
          <div className="flex flex-col gap-2">
            <NavItems onItemClick={() => setIsMobileMenuOpen(false)} isHomePage={isHomePage} />
          </div>
          
          {/* Mobile Auth Section */}
          <div className="border-t border-blue-800/50 pt-4">
            {!user ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link href="/sign-in" className="w-full">
                  <Button
                    className="bg-white hover:bg-blue-50 text-blue-950 border-0 rounded-xl px-6 py-3 text-sm font-semibold w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {/* User Profile Card */}
                <div className="flex items-center gap-3 p-4 bg-blue-900/50 rounded-xl w-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">
                      {user.email?.split('@')[0]?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-semibold text-white truncate">
                      {user.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-white/80 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {/* Mobile Profile Actions */}
                <div className="flex flex-col gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <button
                      onClick={handleProfileClick}
                      disabled={isLoadingProfile}
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-blue-900/50 text-white hover:bg-blue-800/50 transition-all duration-200 w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {isLoadingProfile ? 'Loading...' : 
                         userType === 'employer' ? 'My Company Profile' : 'My Profile'}
                      </span>
                    </button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="border-red-500/50 text-red-300 hover:bg-red-900/30 hover:border-red-400 rounded-xl px-4 py-3 text-sm font-semibold w-full transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}