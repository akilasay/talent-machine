import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const Navbar = () => {
  return (
    <nav className='  flex items-center justify-between mx-auto w-full px-14 py-4  max-sm:px-4'>
        <Link href="/">
        <div className='flex items-center gap-2.5 cursor-pointer'>
            <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={120}
                        height={120}
                    />
        </div>
        </Link>
            <div className="flex items-center gap-8">
                <NavItems />
{/*                 
                <SignedOut>
                    <SignInButton>
                        <button className="border hover:bg-sky-200 border-blue-700  rounded-2xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn> */}

              <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            
            </div>
    </nav>
  )
}

export default Navbar