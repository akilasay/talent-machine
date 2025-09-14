'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import NavItems from './NavItems';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userCandidateProfile, setUserCandidateProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Fetch user's candidate profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoadingProfile(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('candidates')
          .select('id')
          .eq('author', user.id)
          .single();

        if (data && !error) {
          setUserCandidateProfile(data);
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
    if (userCandidateProfile) {
      // User has a candidate profile, redirect to their profile page
      router.push(`/candidates/${userCandidateProfile.id}`);
    } else {
      // User doesn't have a profile, redirect to create one
      router.push('/candidates/new');
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
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
    open: { 
      opacity: 1, 
      height: 'auto', 
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
      className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-100/50 dark:shadow-gray-900/50"
      initial="initial"
      animate="animate"
      variants={navVariants}
    >
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-3 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <div className="relative">
                <Image
                  src="/images/logo2.png"
                  alt="logo"
                  width={36}
                  height={36}
                  className="sm:w-[45px] sm:h-[45px] transition-all duration-300 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden xs:block">
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  TalentHub
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                  Find Your Dream Job
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav Items and Auth */}
        <div className="hidden md:flex items-center gap-8">
          <NavItems />
          <div className="flex items-center gap-4">
            {!user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-in">
                <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
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
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
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
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
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
                        className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
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
                              {isLoadingProfile ? 'Loading...' : 'My Profile'}
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
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-full p-2"
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
      <motion.div
        className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
      >
        <div className="flex flex-col gap-4 py-4 px-4">
          {/* Mobile Navigation Items */}
          <div className="flex flex-col gap-2">
            <NavItems onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
          
          {/* Mobile Auth Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {!user ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link href="/sign-in" className="w-full">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 text-sm font-semibold w-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {/* User Profile Card */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl w-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">
                      {user.email?.split('@')[0]?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {user.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
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
                      className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all duration-200 w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {isLoadingProfile ? 'Loading...' : 'My Profile'}
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
                      className="border-red-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl px-4 py-3 text-sm font-semibold w-full transition-all duration-300"
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
    </motion.nav>
  );
}