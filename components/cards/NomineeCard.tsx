'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Award, Vote, TrendingUp, Plus, Minus } from 'lucide-react';
import { Nominee } from '@/types/general';

interface NomineeCardProps {
    nominee: Nominee;
    index: number;
    variants?: Variants;
    onVoteClick?: (nominee: Nominee, quantity: number) => void;
    votingPrice?: number; // Price per vote in GHC
}

const NomineeCard: React.FC<NomineeCardProps> = ({
    nominee,
    index,
    variants,
    onVoteClick,
    votingPrice = 0.50 // Default price per vote
}) => {
    const [voteQuantity, setVoteQuantity] = useState(1);
    const [isVoting, setIsVoting] = useState(false);

    const handleVoteClick = async () => {
        if (onVoteClick && !isVoting) {
            setIsVoting(true);
            try {
                onVoteClick(nominee, voteQuantity);
            } finally {
                setIsVoting(false);
            }
        }
    };

    const incrementQuantity = () => {
        setVoteQuantity(prev => Math.min(prev + 1, 999)); // Max 999 votes
    };

    const decrementQuantity = () => {
        setVoteQuantity(prev => Math.max(prev - 1, 1)); // Min 1 vote
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1;
        setVoteQuantity(Math.max(1, Math.min(999, value)));
    };

    const totalCost = voteQuantity * votingPrice;

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

            {/* Nominee Photo */}
            <div className="relative h-64 overflow-hidden">
                {nominee.photo ? (
                    <Image
                        src={nominee.photo}
                        alt={`${nominee.name} portrait`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index < 4}
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
            </div>

            {/* Nominee Info */}
            <div className="p-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                    {nominee.name}
                </h3>

                <p className="text-slate-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {nominee.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center mb-2">
                    <motion.div
                        className="flex items-center space-x-1 text-indigo-600"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{nominee.vote_count.toLocaleString()} votes</span>
                    </motion.div>
                </div>

                {/* Vote Progress Bar */}
                <div className="mb-2">
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

                {/* Vote Quantity Selector */}
                <div className="mb-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                        <label
                            htmlFor={`vote-quantity-${nominee.id}`}
                            className="text-sm font-medium text-slate-700"
                        >
                            Number of votes
                        </label>
                        <span className="text-xs text-slate-500">
                            GHC {votingPrice.toFixed(2)} per vote
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Decrease Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={decrementQuantity}
                            disabled={voteQuantity <= 1 || isVoting}
                            className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 disabled:bg-slate-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                            aria-label="Decrease vote quantity"
                            type="button"
                        >
                            <Minus className="w-4 h-4 text-purple-600" />
                        </motion.button>

                        {/* Quantity Input */}
                        <div className="flex-1 relative">
                            <input
                                id={`vote-quantity-${nominee.id}`}
                                type="number"
                                min="1"
                                max="999"
                                value={voteQuantity}
                                onChange={handleQuantityChange}
                                disabled={isVoting}
                                className="w-full text-center text-lg font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
                                aria-label={`Vote quantity for ${nominee.name}`}
                            />
                        </div>

                        {/* Increase Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={incrementQuantity}
                            disabled={voteQuantity >= 999 || isVoting}
                            className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 disabled:bg-slate-100 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                            aria-label="Increase vote quantity"
                            type="button"
                        >
                            <Plus className="w-4 h-4 text-purple-600" />
                        </motion.button>
                    </div>

                    {/* Total Cost Display */}
                    <div className="mt-2 text-center">
                        <span className="text-lg font-bold text-purple-600">
                            Total: GHC {totalCost.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Vote Button */}
                <motion.button
                    whileHover={{ scale: isVoting ? 1 : 1.02 }}
                    whileTap={{ scale: isVoting ? 1 : 0.98 }}
                    onClick={handleVoteClick}
                    disabled={isVoting}
                    className={`w-full px-4 py-3 font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isVoting
                            ? 'bg-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl cursor-pointer'
                        } text-white group/button`}
                    aria-label={`Vote ${voteQuantity} time${voteQuantity > 1 ? 's' : ''} for ${nominee.name} - Total cost GHC ${totalCost.toFixed(2)}`}
                >
                    <span className="flex items-center justify-center space-x-2">
                        {isVoting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Vote className="w-4 h-4 group-hover/button:scale-110 transition-transform duration-200" />
                                <span>
                                    Buy {voteQuantity} Vote{voteQuantity > 1 ? 's' : ''}
                                </span>
                            </>
                        )}
                    </span>
                </motion.button>

                {/* Quick Select Buttons */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {[5, 10, 25, 50].map((quickAmount) => (
                        <motion.button
                            key={quickAmount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVoteQuantity(quickAmount)}
                            disabled={isVoting}
                            className="px-3 py-1 text-xs font-medium bg-purple-100 hover:bg-purple-200 disabled:bg-slate-100 disabled:cursor-not-allowed text-purple-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                            aria-label={`Set vote quantity to ${quickAmount}`}
                        >
                            {quickAmount}
                        </motion.button>
                    ))}
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