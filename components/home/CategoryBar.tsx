'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock } from 'lucide-react';
import { categories } from '@/data/dummy';
import { Category } from '@/types/general';

interface CategoryBarProps {
    selectedCategory: number | null;
    onCategorySelect: (categoryId: number | null) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onCategorySelect }) => {
    const allCategoriesItem = {
        id: null as number | null,
        name: 'All Categories',
        nominee_count: categories.reduce((sum, cat) => sum + cat.nominee_count, 0),
        is_voting_open: true,
    };

    const categoryItems = [allCategoriesItem, ...categories];

    return (
        <section className="py-12 bg-gradient-to-r from-slate-700 to-purple-800 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-300 mb-4">
                        Voting Categories
                    </h2>
                    <p className="text-lg text-slate-100 max-w-2xl mx-auto">
                        Choose a category to view nominees, or browse all categories to see everyone
                    </p>
                </motion.div>

                {/* Categories Scroll Container */}
                <div className="relative">
                    <div className="overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex space-x-4 min-w-max px-2">
                            {categoryItems.map((item, index) => {
                                const isSelected = selectedCategory === item.id;
                                const isAll = item.id === null;

                                return (
                                    <motion.button
                                        key={isAll ? 'all' : `category-${item.id}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onCategorySelect(item.id)}
                                        className={`relative flex-shrink-0 w-80 p-6 rounded-2xl transition-all duration-300 text-left group cursor-pointer ${isSelected
                                                ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl ring-2 ring-purple-300 ring-offset-2'
                                                : 'bg-white hover:bg-slate-50 text-slate-700 shadow-lg hover:shadow-xl border border-slate-200 hover:border-purple-200'
                                            }`}
                                        aria-pressed={isSelected}
                                        role="tab"
                                    >
                                        {/* Background Effects */}
                                        {!isSelected && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={false}
                                            />
                                        )}

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors duration-300 ${isSelected
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                                                }`}>
                                                {isAll ? (
                                                    <Users className="w-6 h-6" />
                                                ) : (
                                                    <Award className="w-6 h-6" />
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-purple-700'
                                                }`}>
                                                {item.name}
                                            </h3>

                                            {/* Description for non-all categories */}
                                            {!isAll && (item as Category).description && (
                                                <p className={`text-sm mb-4 line-clamp-2 transition-colors duration-300 ${isSelected ? 'text-purple-100' : 'text-slate-600 group-hover:text-slate-700'
                                                    }`}>
                                                    {(item as Category).description}
                                                </p>
                                            )}

                                            {/* Stats */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {/* Nominee Count */}
                                                    <div className="flex items-center space-x-1">
                                                        <Users className={`w-4 h-4 ${isSelected ? 'text-purple-200' : 'text-slate-500'
                                                            }`} />
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-600'
                                                            }`}>
                                                            {item.nominee_count} nominees
                                                        </span>
                                                    </div>

                                                    {/* Voting Price for specific categories */}
                                                    {!isAll && (item as Category).voting_price && (
                                                        <div className="flex items-center space-x-1">
                                                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-600'
                                                                }`}>
                                                                GHC {(item as Category).voting_price}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Voting Status */}
                                                {!isAll && (
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${(item as Category).is_voting_open
                                                            ? isSelected
                                                                ? 'bg-emerald-500/20 text-emerald-100'
                                                                : 'bg-emerald-100 text-emerald-700'
                                                            : isSelected
                                                                ? 'bg-red-500/20 text-red-100'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {(item as Category).is_voting_open ? 'Open' : 'Closed'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <motion.div
                                                layoutId="categorySelection"
                                                className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl"
                                                style={{ zIndex: -1 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Fade edges for scroll indication */}
                    <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-purple-50 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default CategoryBar;