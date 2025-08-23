'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Award, Vote, TrendingUp } from 'lucide-react';
import { Nominee } from '@/types/general';

interface NomineeCardProps {
    nominee: Nominee;
    index: number;
    variants?: Variants;
    onVoteClick?: (nominee: Nominee) => void;
}

const NomineeCard: React.FC<NomineeCardProps> = ({ 
    nominee, 
    index, 
    variants, 
    onVoteClick 
}) => {
    const handleVoteClick = () => {
        if (onVoteClick) {
            onVoteClick(nominee);
        }
    };

    return (
        <motion.div
            variants={variants}
            whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-200 hover:border-purple-300"
        >
            {/* Rank Badge */}
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    <Award className="w-4 h-4" />
                    <span>#{index + 1}</span>
                </div>
            </div>

            {/* Voting Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span>Live</span>
                </div>
            </div>

            {/* Nominee Photo */}
            <div className="relative h-64 overflow-hidden">
                {nominee.photo ? (
                    <Image
                        src={nominee.photo}
                        alt={`${nominee.name} portrait`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 4} // Prioritize first 4 images
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                        <div className="text-6xl font-bold text-purple-300">
                            {nominee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Vote Count Overlay */}
                <div className="absolute bottom-4 right-4">
                    <motion.div 
                        className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-bold text-slate-900"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Vote className="w-4 h-4 text-purple-600" />
                        <span>{nominee.vote_count.toLocaleString()}</span>
                    </motion.div>
                </div>
            </div>

            {/* Nominee Info */}
            <div className="p-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                    {nominee.name}
                </h3>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {nominee.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                    <motion.div 
                        className="flex items-center space-x-1 text-emerald-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-sm font-medium">
                            GHC {parseFloat(nominee.total_amount_raised).toLocaleString('en-GH', { minimumFractionDigits: 2 })}
                        </span>
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-1 text-indigo-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{nominee.vote_count} votes</span>
                    </motion.div>
                </div>

                {/* Vote Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-500">Voting Progress</span>
                        <span className="text-xs font-medium text-slate-600">
                            {((nominee.vote_count / Math.max(nominee.vote_count, 100)) * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((nominee.vote_count / 100) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Vote Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVoteClick}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 group/button cursor-pointer"
                >
                    <span className="flex items-center justify-center space-x-2">
                        <Vote className="w-4 h-4 group-hover/button:scale-110 transition-transform duration-200" />
                        <span>Vote for {nominee.name.split(' ')[0]}</span>
                    </span>
                </motion.button>

                {/* Additional Stats */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Rank #{index + 1}</span>
                        <span>ID: {nominee.id}</span>
                    </div>
                </div>
            </div>

            {/* Hover Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
            />

            {/* Shine Effect on Hover */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
                    transform: 'translateX(-100%)',
                }}
                whileHover={{
                    transform: 'translateX(100%)',
                    transition: { duration: 0.6 }
                }}
            />
        </motion.div>
    );
};

export default NomineeCard;