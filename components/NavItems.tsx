'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Home, Users, Briefcase, UserCheck, Building2, Book } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

const navItems = [
    { 
        label: 'Home', 
        href: '/', 
        icon: Home,
        description: 'Welcome to our platform'
    },
    { 
        label: 'Find Talents', 
        href: '/candidates', 
        icon: Users,
        description: 'Discover skilled professionals'
    },
    { 
        label: 'Jobs', 
        href: '/jobs', 
        icon: Briefcase,
        description: 'Browse job opportunities'
    },
    { 
        label: 'Job Seekers', 
        href: '/job-seekers', 
        icon: UserCheck,
        description: 'Create your profile'
    },
    { 
        label: 'Employers', 
        href: '/employers', 
        icon: Building2,
        description: 'Post jobs and find talent',
        showForUserTypes: ['not_logged_in', 'employer'] // Show for not logged in users and employers only
    },
    { 
        label: 'Resources', 
        href: '/resources', 
        icon: Book,
        description: 'resources',
    },
]

const NavItems = (props: { onItemClick?: () => void; isHomePage?: boolean } = {}) => {
    const { onItemClick, isHomePage = false } = props;
    const pathname = usePathname();
    const { user } = useAuth();
    const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);

    // Check user type
    useEffect(() => {
        const checkUserType = async () => {
            if (!user) {
                setUserType(null);
                return;
            }

            try {
                const supabase = createClient();
                const { data: userProfile } = await supabase
                    .from('user_profiles')
                    .select('user_type')
                    .eq('user_id', user.id)
                    .single();

                setUserType(userProfile?.user_type || null);
            } catch (error) {
                console.error('Error checking user type:', error);
                setUserType(null);
            }
        };

        checkUserType();
    }, [user]);

    // Filter navigation items based on user type
    const filteredNavItems = navItems.filter(item => {
        if (!item.showForUserTypes) {
            return true; // Show all items that don't have restrictions
        }

        const currentUserType = user ? userType : 'not_logged_in';
        return item.showForUserTypes.includes(currentUserType as 'candidate' | 'employer' | 'not_logged_in');
    });

    return (
        <nav className="flex items-center gap-1 md:flex-row flex-col w-full md:w-auto">
            {filteredNavItems.map(({ label, href, icon: Icon, description }) => {
                const isActive = pathname === href;
                
                return (
                    <motion.div
                        key={label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group w-full md:w-auto"
                    >
                        <Link 
                            href={href} 
                            className="w-full"
                            onClick={onItemClick}
                        >
                            <motion.button
                                className={cn(
                                    "relative px-4 py-3 md:py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out",
                                    "flex items-center gap-3 md:gap-2 group-hover:gap-3 w-full md:w-auto",
                                    isHomePage 
                                        ? "text-white hover:text-white/90 hover:bg-white/10"
                                        : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30",
                                    !isHomePage && "hover:shadow-md hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20",
                                    "justify-start md:justify-center",
                                    "touch-manipulation", // Improves touch responsiveness
                                    isActive && [
                                        isHomePage 
                                            ? "text-white bg-white/20 font-semibold"
                                            : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 shadow-md shadow-blue-100/50 dark:shadow-blue-900/20 font-semibold"
                                    ]
                                )}
                            >
                                <Icon 
                                    className={cn(
                                        "w-5 h-5 md:w-4 md:h-4 transition-all duration-300 flex-shrink-0",
                                        isHomePage 
                                            ? (isActive ? "text-white" : "text-white/90")
                                            : (isActive && "text-blue-600 dark:text-blue-400"),
                                        "group-hover:scale-110"
                                    )} 
                                />
                                <span className="transition-all duration-300 text-left md:text-center">
                                    {label}
                                </span>
                                
                                {/* Active indicator - only show on desktop */}
                                {isActive && (
                                    <motion.div
                                        className={`absolute -bottom-1 left-1/2 w-1 h-1 rounded-full hidden md:block ${
                                            isHomePage ? 'bg-white' : 'bg-blue-600 dark:bg-blue-400'
                                        }`}
                                        initial={{ scale: 0, x: "-50%" }}
                                        animate={{ scale: 1, x: "-50%" }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                
                                {/* Hover tooltip - only show on desktop */}
                                <motion.div
                                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className={`${
                                        isHomePage 
                                            ? 'bg-white text-green-900' 
                                            : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                                    } text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap`}>
                                        {description}
                                        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                                            isHomePage 
                                                ? 'bg-white' 
                                                : 'bg-gray-900 dark:bg-gray-100'
                                        }`}></div>
                                    </div>
                                </motion.div>
                            </motion.button>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    )
}

export default NavItems