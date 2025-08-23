'use client';

import { motion, Variants } from 'framer-motion';
import { Users } from 'lucide-react';
import { Nominee } from '@/types/general';
import { getNomineesByCategory, getCategoryById } from '@/data/dummy';
import {NomineeCard} from "@/components"; 

interface NomineesSectionProps {
    selectedCategory: number | null;
}

const NomineesSection: React.FC<NomineesSectionProps> = ({ selectedCategory }) => {
    const nominees = getNomineesByCategory(selectedCategory);
    const categoryName = selectedCategory ? getCategoryById(selectedCategory)?.name : 'All Categories';

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

    const cardVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 30, 
            scale: 0.9 
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const handleVoteClick = (nominee: Nominee) => {
        // TODO: Implement voting logic
        console.log('Voting for:', nominee.name);
        // This would typically open a modal or navigate to a voting page
    };

    return (
        <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-slate-200 mb-4"
                        layoutId="sectionTitle"
                    >
                        {categoryName}
                    </motion.h2>
                    <p className="text-xl text-slate-50 max-w-3xl mx-auto">
                        {selectedCategory
                            ? `Meet the nominees competing for ${categoryName?.toLowerCase()}`
                            : `Discover all ${nominees.length} nominees across all categories`
                        }
                    </p>

                    {/* Stats Bar */}
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-4 sm:space-y-0 mt-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{nominees.length}</div>
                            <div className="text-sm text-slate-600">Nominees</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">
                                {nominees.reduce((sum, nominee) => sum + nominee.vote_count, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-600">Total Votes</div>
                        </div>
                    </div>
                </motion.div>

                {/* Nominees Grid */}
                {nominees.length > 0 ? (
                    <motion.div
                        key={selectedCategory} // Force re-render on category change
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {nominees.map((nominee, index) => (
                            <NomineeCard
                                key={`nominee-${nominee.id}`}
                                nominee={nominee}
                                index={index}
                                variants={cardVariants}
                                onVoteClick={handleVoteClick}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No nominees found</h3>
                        <p className="text-slate-600">There are no nominees in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default NomineesSection;