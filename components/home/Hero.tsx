'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, useMotionTemplate } from 'framer-motion';
import { Vote, Users, Shield, Zap, CheckCircle, Star } from 'lucide-react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    // Mouse tracking for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    // Transform values for the gradient
    const gradientX = useTransform(springX, [-1, 1], [45, 55]);
    const gradientY = useTransform(springY, [-1, 1], [45, 55]);

    // Transform values for parallax effects (moved to top level)
    const parallaxX = useTransform(springX, [-1, 1], [-5, 5]);
    const parallaxY = useTransform(springY, [-1, 1], [-2, 2]);

    // Create the dynamic gradient using useMotionTemplate
    const dynamicGradient = useMotionTemplate`radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                mouseX.set((e.clientX - centerX) / 25);
                mouseY.set((e.clientY - centerY) / 25);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Stabilize particles array with useMemo to prevent hook order issues
    const particles = useMemo(() => {
        const iconTypes = [Vote, Users, Shield, Zap, CheckCircle, Star];
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            icon: iconTypes[i % iconTypes.length],
            size: Math.random() * 20 + 15,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
        }));
    }, []); // Empty dependency array ensures this only runs once

    const titleWords = ['Secure', 'Democratic', 'Voting', 'Made', 'Simple'];

    // Dynamic stats array - you can add/remove items here without hook issues
    const stats = [
        { label: 'Votes Cast', value: '2.5M+', icon: Vote },
        { label: 'Active Users', value: '150K+', icon: Users },
        { label: 'Security Rate', value: '99.9%', icon: Shield },
        // { label: 'Response Time', value: '<1ms', icon: Zap }, // Can be toggled
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/50 to-purple-500"
        >
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -150, 0],
                        y: [0, 100, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                    className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-r from-amber-300/20 to-purple-400/25 rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, 75, -75, 0],
                        y: [0, -50, 50, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-300/15 to-purple-300/15 rounded-full blur-2xl"
                />
            </div>

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={`particle-${particle.id}`} // Stable key
                    className="absolute pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(particle.id) * 20, 0],
                        rotate: [0, 360],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: particle.delay,
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        className="p-2 bg-white/40 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
                        style={{
                            width: particle.size,
                            height: particle.size,
                        }}
                    >
                        <particle.icon
                            className="w-full h-full text-purple-300/80"
                            strokeWidth={1.5}
                        />
                    </motion.div>
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        delay: 0.2,
                    }}
                    className="mb-8"
                >
                    <div className="mb-16">
                        {/* <Vote className="w-10 h-10 text-white" /> */}
                    </div>
                </motion.div>

                {/* Animated Title */}
                <div className="mb-8">
                    {titleWords.map((word, index) => (
                        <motion.span
                            key={`title-${word}-${index}`} // Stable key
                            initial={{ opacity: 0, y: 50, rotateX: -90 }}
                            animate={isInView ? {
                                opacity: 1,
                                y: 0,
                                rotateX: 0
                            } : {
                                opacity: 0,
                                y: 50,
                                rotateX: -90
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3 + index * 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="inline-block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-slate-100 bg-clip-text text-transparent mr-4 md:mr-6"
                            style={{
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {/* Subtitle with Typewriter Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="mb-12"
                >
                    <motion.p
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 'auto' } : { width: 0 }}
                        transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
                        className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed overflow-hidden whitespace-nowrap"
                        style={{ fontFamily: 'monospace' }}
                    >
                        Empowering democracy through secure voting
                    </motion.p>
                    <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 3.8 }}
                        className="inline-block w-1 h-8 bg-purple-400 ml-1"
                    />
                </motion.div>

                {/* Feature Stats - Dynamic Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className={`grid gap-8 mb-16 ${
                        stats.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
                        stats.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
                        stats.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto' :
                        'grid-cols-2 md:grid-cols-4'
                    }`}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={`stat-${stat.label}`} // Use stable key based on content
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 20,
                                delay: 2.4 + index * 0.1,
                            }}
                            whileHover={{
                                scale: 1.1,
                                y: -10,
                                transition: { duration: 0.2 }
                            }}
                            className="relative group"
                        >
                            <motion.div
                                style={{ 
                                    x: parallaxX,  // Now using the hooks defined at top level
                                    y: parallaxY   // Now using the hooks defined at top level
                                }}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-xl hover:border-white/20 transition-all duration-300"
                            >
                                <stat.icon className="w-8 h-8 text-purple-300 mx-auto mb-3" />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ delay: 2.6 + index * 0.1, duration: 0.5 }}
                                    className="text-2xl md:text-3xl font-bold text-white mb-1"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm text-slate-300 font-medium">
                                    {stat.label}
                                </div>

                                {/* Hover Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 3 }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1 h-3 bg-gradient-to-b from-purple-400 to-transparent rounded-full mt-2"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Interactive Gradient Overlay */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: dynamicGradient,
                }}
            />
        </section>
    );
};

export default Hero;