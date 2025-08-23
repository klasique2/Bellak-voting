'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Vote, Shield, Users, Zap } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const features = [
        {
            icon: Shield,
            title: 'Secure',
            description: 'End-to-end encrypted voting'
        },
        {
            icon: Users,
            title: 'Transparent',
            description: 'Real-time results tracking'
        },
        {
            icon: Zap,
            title: 'Fast',
            description: 'Instant vote processing'
        }
    ];

    const footerLinks = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' }
    ];

    const containerVariants: Variants = {
        hidden: { 
            opacity: 0 
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 20 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.5, 
                ease: [0.25, 0.46, 0.45, 0.94] // Using cubic bezier instead of string
            }
        }
    };

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-500 rounded-full filter blur-3xl opacity-20" />
            </div>

            <div className="relative">
                {/* Main Footer Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                >
                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Brand Section */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 group w-fit focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-xl p-2 -m-2"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl blur-lg opacity-50" />
                                    <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                                        <Vote className="w-7 h-7 text-white" />
                                    </div>
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        Bellak
                                    </span>
                                    <span className="text-sm text-slate-400 -mt-1">
                                        Voting Platform
                                    </span>
                                </div>
                            </Link>

                            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                                Empowering democracy through secure, transparent, and accessible voting solutions.
                                Your voice matters, make it count.
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {features.map((feature) => (
                                    <motion.div
                                        key={feature.title}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                                    >
                                        <feature.icon className="w-6 h-6 text-purple-400 mb-2" />
                                        <span className="font-semibold text-white text-sm">{feature.title}</span>
                                        <span className="text-xs text-slate-400 mt-1">{feature.description}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Section */}
                    <motion.div
                        variants={itemVariants}
                        className="border-t border-slate-700 pt-8"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Links */}
                            <nav className="flex flex-wrap justify-center md:justify-start gap-6" role="navigation" aria-label="Footer navigation">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Copyright */}
                            <div className="flex items-center space-x-2 text-slate-400">
                                <span>&copy; {currentYear} Bellak. All rights reserved.</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;