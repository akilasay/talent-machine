'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavItems from './NavItems';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-blue-50/30 dark:bg-blue-950/30 backdrop-blur-md border-b border-blue-200/50 dark:border-blue-900/50 shadow-sm"
      initial="initial"
      animate="animate"
      variants={navVariants}
    >
      <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-6 py-4 max-sm:px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src="/images/logo2.png"
              alt="logo"
              width={50}
              height={50}
              // className="h-16 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav Items and Auth */}
        <div className="hidden md:flex items-center gap-8">
          <NavItems />
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-6 py-2 text-sm font-semibold"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-semibold transition-transform hover:scale-105"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'h-8 w-8',
                    userButtonTrigger: 'hover:scale-110 transition-transform',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-gray-600 dark:text-gray-300"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden bg-blue-50/30 dark:bg-blue-950/30 backdrop-blur-md border-t border-blue-200/50 dark:border-blue-900/50"
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <NavItems />
          <div className="flex flex-col items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-6 py-2 text-sm font-semibold w-full max-w-xs"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-semibold w-full max-w-xs transition-transform hover:scale-105"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'h-8 w-8',
                    userButtonTrigger: 'hover:scale-110 transition-transform',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}