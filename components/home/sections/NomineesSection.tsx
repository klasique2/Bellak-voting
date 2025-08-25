'use client';

import { motion, Variants } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Nominee, Category } from '@/types/general';
import { NomineeCard } from "@/components";

interface NomineesSectionProps {
    selectedCategory: number | null;
    allNominees: Nominee[];
}

const getCategoryById = async (id: number): Promise<Category | undefined> => {
    try {
        const response = await fetch(`/api/get-category-by-id?id=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch category');
        }

        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error fetching category:', error);
        return undefined;
    }
};

const NomineesSection: React.FC<NomineesSectionProps> = ({ allNominees, selectedCategory }) => {
    const [filteredNominees, setFilteredNominees] = useState<Nominee[]>([]);
    const [categoryName, setCategoryName] = useState<string>('All Categories');
    const [votingPrice, setVotingPrice] = useState<number>(0.50); // Default price
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getNomineesByCategory = async (categoryId: number | null): Promise<Nominee[]> => {
        if (categoryId === null) {
            // For "All Categories", return all nominees
            console.log("votingPrice for All Categories:", votingPrice);
            return allNominees;
        }

        try {
            const response = await fetch(`/api/get-nominees-by-category?category_id=${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch nominees');
            }

            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching nominees:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Get nominees for the selected category
                const nominees = await getNomineesByCategory(selectedCategory);
                setFilteredNominees(nominees);

                // Set category name and voting price
                if (selectedCategory !== null) {
                    const category = await getCategoryById(selectedCategory);
                    setCategoryName(category?.name || 'Unknown Category');
                    setVotingPrice(parseFloat(category?.voting_price || '0.50'));
                } else {
                    setCategoryName('All Categories');
                    setVotingPrice(0.50); // Default price for "All Categories"
                }
            } catch (err) {
                setError('Failed to load data');
                console.error('Error:', err);
                setFilteredNominees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory, allNominees]);

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

    const handleVoteClick = async (nominee: Nominee, quantity: number) => {
        try {
            console.log(`Initiating ${quantity} vote(s) for:`, nominee.name);
            console.log(`Total cost: GHC ${(quantity * votingPrice).toFixed(2)}`);

            const response = await fetch('/api/vote/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nominee_id: nominee.id,
                    number_of_votes: quantity, // Dynamic quantity
                    voter_name: 'Anonymous Voter'
                })
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                // Redirect to Paystack payment page
                window.location.href = result.data.payment_url;
            } else {
                // Handle error
                console.error('Failed to initiate payment:', result);
                alert(result.message || 'Failed to initiate payment. Please try again.');
            }

        } catch (error) {
            console.error('Error initiating vote:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    // Loading state
    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Loader2 className="w-12 h-12 text-slate-400 animate-spin" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">Loading nominees...</h3>
                        <p className="text-slate-300">Please wait while we fetch the latest data.</p>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-12 h-12 text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">Failed to load nominees</h3>
                        <p className="text-slate-300 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

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
                    <p className="text-xl text-slate-50 max-w-3xl mx-auto mb-2">
                        {selectedCategory
                            ? `Meet the nominees competing for ${categoryName?.toLowerCase()}`
                            : `Discover all ${filteredNominees.length} nominees across all categories`
                        }
                    </p>
                    
                    {/* Display voting price info */}
                    {selectedCategory && (
                        <p className="text-lg text-amber-300 font-semibold">
                            Voting Price: GHC {votingPrice.toFixed(2)} per vote
                        </p>
                    )}

                    {/* Stats Bar */}
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-4 sm:space-y-0 mt-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{filteredNominees.length}</div>
                            <div className="text-sm text-slate-600">Nominees</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">
                                {filteredNominees.reduce((sum, nominee) => sum + nominee.vote_count, 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-600">Total Votes</div>
                        </div>
                    </div>
                </motion.div>

                {/* Nominees Grid */}
                {filteredNominees.length > 0 ? (
                    <motion.div
                        key={selectedCategory} // Force re-render on category change
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredNominees.map((nominee, index) => (
                            <NomineeCard
                                key={`nominee-${nominee.id}`}
                                nominee={nominee}
                                index={index}
                                variants={cardVariants}
                                onVoteClick={handleVoteClick}
                                votingPrice={votingPrice} // Pass the category-specific price
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
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">No nominees found</h3>
                        <p className="text-slate-300">There are no nominees in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default NomineesSection;