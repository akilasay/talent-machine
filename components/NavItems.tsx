'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Briefcase, UserCheck, Building2, Book, ChevronDown, Info, Mail, HelpCircle, FacebookIcon, Linkedin } from 'lucide-react';
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
    { 
        label: 'Company', 
        href: '#', 
        icon: Info,
        description: 'Company information',
        subItems: [
            { 
                label: 'About Us', 
                href: '/about-us', 
                icon: Info,
            },
            { 
                label: 'Contact Us', 
                href: '/contactus', 
                icon: Mail,
            },
            { 
                label: 'FAQ', 
                href: '/faq', 
                icon: HelpCircle,
            },
            { 
                label: 'Social Media', 
                href: '#', 
                icon: Info,
                type: 'social',
                socialLinks: [
                    {
                        name: 'Facebook',
                        url: 'https://www.facebook.com/profile.php?id=61585235332303',
                        icon: FacebookIcon,
                    },
                    {
                        name: 'LinkedIn',
                        url: 'https://www.linkedin.com/company/nextgen-talent-machine',
                        icon: Linkedin,
                    },
                    // {
                    //     name: 'Instagram',
                    //     url: 'https://www.instagram.com/',
                    //     icon: Instagram,
                    // },
                ]
            },
        ]
    },
]

const NavItems = (props: { onItemClick?: () => void; isHomePage?: boolean } = {}) => {
    const { onItemClick } = props;
    const pathname = usePathname();
    const { user } = useAuth();
    const [userType, setUserType] = useState<'candidate' | 'employer' | null>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown) {
                const dropdownElement = dropdownRefs.current[openDropdown];
                if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                    setOpenDropdown(null);
                }
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [openDropdown]);

    // Filter navigation items based on user type
    const filteredNavItems = navItems.filter(item => {
        if (!item.showForUserTypes) {
            return true; // Show all items that don't have restrictions
        }

        const currentUserType = user ? userType : 'not_logged_in';
        return item.showForUserTypes.includes(currentUserType as 'candidate' | 'employer' | 'not_logged_in');
    });

    const handleDropdownToggle = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <nav className="flex items-center gap-1 md:flex-row flex-col w-full md:w-auto">
            {filteredNavItems.map((item) => {
                const { label, href, icon: Icon, description, subItems } = item;
                const isActive = pathname === href || (subItems && subItems.some(subItem => pathname === subItem.href));
                const isDropdownOpen = openDropdown === label;
                const hasSubItems = subItems && subItems.length > 0;
                
                return (
                    <motion.div
                        key={label}
                        ref={(el) => {
                            if (hasSubItems) {
                                dropdownRefs.current[label] = el;
                            }
                        }}
                        className="relative group w-full md:w-auto"
                    >
                        {hasSubItems ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDropdownToggle(label)}
                                    className={cn(
                                        "relative px-4 py-3 md:py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out",
                                        "flex items-center gap-3 md:gap-2 w-full md:w-auto",
                                        "text-white hover:text-white hover:bg-blue-900/50",
                                        "hover:shadow-md hover:shadow-blue-900/30",
                                        "justify-start md:justify-center",
                                        "touch-manipulation",
                                        isActive && [
                                            "text-white bg-blue-900/50 font-semibold shadow-md shadow-blue-900/30"
                                        ]
                                    )}
                                >
                                    <Icon 
                                        className={cn(
                                            "w-5 h-5 md:w-4 md:h-4 transition-all duration-300 flex-shrink-0",
                                            isActive ? "text-white" : "text-white/90",
                                            "group-hover:scale-110"
                                        )} 
                                    />
                                    <span className="transition-all duration-300 text-left md:text-center">
                                        {label}
                                    </span>
                                    <ChevronDown 
                                        className={cn(
                                            "w-4 h-4 transition-transform duration-300 flex-shrink-0",
                                            isDropdownOpen && "rotate-180",
                                            "text-white/90"
                                        )} 
                                    />
                                </motion.button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={cn(
                                                "absolute top-full left-0 mt-2 w-56 sm:w-64 rounded-xl shadow-xl border overflow-hidden z-50",
                                                "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800"
                                            )}
                                        >
                                            {subItems.map((subItem, index) => {
                                                const SubIcon = subItem.icon;
                                                const isSubActive = pathname === subItem.href;
                                                const isSocialMedia = subItem.type === 'social';
                                                
                                                // Add divider before social media section
                                                if (isSocialMedia && index > 0) {
                                                    return (
                                                        <div key={`${subItem.href}-${index}`}>
                                                            <div className={cn(
                                                                "border-t my-1",
                                                                "border-gray-200 dark:border-gray-700"
                                                            )} />
                                                            <div className="px-4 py-3">
                                                                <span className={cn(
                                                                    "text-xs font-semibold uppercase tracking-wider",
                                                                    "text-gray-500 dark:text-gray-400"
                                                                )}>
                                                                    {subItem.label}
                                                                </span>
                                                                <div className="flex items-center gap-3 mt-3">
                                                                    {subItem.socialLinks?.map((social) => {
                                                                        const SocialIcon = social.icon;
                                                                        return (
                                                                            <motion.a
                                                                                key={social.name}
                                                                                href={social.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                whileHover={{ scale: 1.1, y: -2 }}
                                                                                whileTap={{ scale: 0.95 }}
                                                                                className={cn(
                                                                                    "p-2 rounded-lg transition-colors duration-200",
                                                                                    "bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                                                                )}
                                                                                aria-label={social.name}
                                                                            >
                                                                                <SocialIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                                            </motion.a>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                
                                                return (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        onClick={() => {
                                                            setOpenDropdown(null);
                                                            onItemClick?.();
                                                        }}
                                                    >
                                                        <motion.div
                                                            whileHover={{ x: 4 }}
                                                            className={cn(
                                                                "flex items-center gap-3 px-4 py-3 transition-colors duration-200",
                                                                isSubActive
                                                                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                                                                    : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                            )}
                                                        >
                                                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm font-medium">{subItem.label}</span>
                                                        </motion.div>
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <motion.div
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
                                            "text-white hover:text-white hover:bg-blue-900/50",
                                            "hover:shadow-md hover:shadow-blue-900/30",
                                            "justify-start md:justify-center",
                                            "touch-manipulation",
                                            isActive && [
                                                "text-white bg-blue-900/50 font-semibold shadow-md shadow-blue-900/30"
                                            ]
                                        )}
                            >
                                        <Icon 
                                            className={cn(
                                                "w-5 h-5 md:w-4 md:h-4 transition-all duration-300 flex-shrink-0",
                                                isActive ? "text-white" : "text-white/90",
                                                "group-hover:scale-110"
                                            )} 
                                        />
                                        <span className="transition-all duration-300 text-left md:text-center">
                                            {label}
                                        </span>
                                        
                                        {/* Active indicator - only show on desktop */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full hidden md:block bg-white"
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
                                            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                                                {description}
                                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-100"></div>
                                            </div>
                                        </motion.div>
                            </motion.button>
                        </Link>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </nav>
    )
}

export default NavItems