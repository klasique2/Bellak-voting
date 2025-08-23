'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/static';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setIsScrolled(currentScrollY > 10);
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const throttledHandleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 10);
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [handleScroll]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <motion.header
                animate={{ y: isVisible ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <motion.nav
                    animate={{
                        backgroundColor: isScrolled 
                            ? 'rgba(255, 255, 255, 0.98)' 
                            : 'rgba(255, 255, 255, 0)',
                        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                        borderBottomColor: isScrolled 
                            ? 'rgba(148, 163, 184, 0.1)' 
                            : 'rgba(148, 163, 184, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="border-b"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-1 -m-1"
                                aria-label="Go to Bellak homepage"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative"
                                >
                                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
                                        <Vote className="w-4 h-4 text-white" aria-hidden="true" />
                                    </div>
                                </motion.div>
                                <div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        Bellak
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md ${
                                                isActive
                                                    ? 'text-purple-600'
                                                    : 'text-slate-600 hover:text-purple-600'
                                            }`}
                                            aria-label={link.ariaLabel}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {link.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-navigation"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isMobileMenuOpen ? 'close' : 'menu'}
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="w-5 h-5" />
                                        ) : (
                                            <Menu className="w-5 h-5" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </motion.nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            id="mobile-navigation"
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="fixed top-16 left-4 right-4 bg-white/98 backdrop-blur-xl rounded-xl shadow-xl border border-slate-200/50 z-50 md:hidden"
                            role="dialog"
                            aria-labelledby="mobile-nav-title"
                        >
                            <div className="p-4">
                                <h2 id="mobile-nav-title" className="sr-only">
                                    Mobile Navigation Menu
                                </h2>

                                {/* Navigation Links */}
                                <div className="space-y-1">
                                    {navLinks.map((link, index) => {
                                        const isActive = pathname === link.href;

                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                    duration: 0.2,
                                                    ease: [0.4, 0, 0.2, 1]
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                        isActive
                                                            ? 'bg-purple-600 text-purple-50'
                                                            : 'text-slate-600 hover:bg-slate-100 hover:text-purple-600'
                                                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                                                    onClick={closeMobileMenu}
                                                    aria-label={link.ariaLabel}
                                                    aria-current={isActive ? 'page' : undefined}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;