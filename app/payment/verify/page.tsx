'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface VerificationResult {
    status: 'success' | 'error';
    message: string;
    data?: {
        id: number;
        nominee_name: string;
        category_name: string;
        amount_paid: string;
        payment_verified: boolean;
        created_at: string;
    };
}

const PaymentVerifyContent = () => {
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const reference = searchParams.get('reference');
    
    useEffect(() => {
        const verifyPayment = async () => {
            if (!reference) {
                setVerificationResult({
                    status: 'error',
                    message: 'No payment reference found'
                });
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch('/api/vote/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ reference })
                });
                
                const result: VerificationResult = await response.json();
                setVerificationResult(result);
                
            } catch (error) {
                console.error('Verification error:', error);
                setVerificationResult({
                    status: 'error',
                    message: 'Failed to verify payment'
                });
            } finally {
                setLoading(false);
            }
        };
        
        verifyPayment();
    }, [reference]);
    
    const handleGoHome = () => {
        router.push('/');
    };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment</h2>
                    <p className="text-slate-200">Please wait while we confirm your vote...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
                {verificationResult?.status === 'success' ? (
                    <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">Vote Confirmed!</h1>
                        <p className="text-slate-600 mb-6">{verificationResult.message}</p>
                        
                        {verificationResult.data && (
                            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-semibold text-slate-800 mb-2">Vote Details:</h3>
                                <div className="space-y-1 text-sm text-slate-600">
                                    <p><span className="font-medium">Nominee:</span> {verificationResult.data.nominee_name}</p>
                                    <p><span className="font-medium">Category:</span> {verificationResult.data.category_name}</p>
                                    <p><span className="font-medium">Amount:</span> ${verificationResult.data.amount_paid}</p>
                                    <p><span className="font-medium">Reference:</span> {reference}</p>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">Payment Failed</h1>
                        <p className="text-slate-600 mb-6">{verificationResult?.message || 'Something went wrong'}</p>
                    </>
                )}
                
                <button
                    onClick={handleGoHome}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    Return to Voting
                </button>
            </motion.div>
        </div>
    );
};

const PaymentVerifyPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
        }>
            <PaymentVerifyContent />
        </Suspense>
    );
};

export default PaymentVerifyPage;
