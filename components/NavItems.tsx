'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {cn} from "@/lib/utils";


const navItems = [
    { label:'Home', href: '/' },
    { label: 'Find talents', href: '/candidates' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Job Seekers', href: '/job-seekers' },

    { label: 'Employers', href: '/employers' },
]

const NavItems = () => {
     const pathname = usePathname();

  return (
     <nav className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}   
                   className={cn(pathname === href && 'text-primary text-slate-900 hover:bg-sky-200 font-semibold')}
             >
            <button className=" p-1 rounded-md hover:text-lg">
            {label}
            </button>
                   
                </Link>
            ))}
        </nav>
  )
}

export default NavItems