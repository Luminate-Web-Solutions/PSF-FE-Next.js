'use client'

import React, { useState } from 'react';
import NewsletterCard from '../components/NewsletterCards';



const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('http://localhost:4000/api/subscribe/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setEmail('');
            } else {
                const errorData = await response.json();
                setSubmitStatus(`error: ${errorData.error || 'Failed to subscribe'}`);
            }
        } catch (error) {
            setSubmitStatus(`error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Top Banner Section */}
            {/* <div className="relative bg-cover bg-center h-[25vh] md:h-[40vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#0D2137]"></div>
                <div className="relative z-10 text-center animate-fadeInUp px-4">
                    <h1 className="text-white text-3xl md:text-6xl font-bold drop-shadow-lg">
                        NEWSLETTER
                    </h1>
                </div>
            </div> */}

            

            {/* All Issues Section */}
            <div className="bg-[#E0EAF5] pt-10">
                <h1 className="px-6 md:px-12 text-2xl md:text-3xl font-bold text-[#0D2137] mb-6">
                    NEWS LETTERS
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-12 pb-10">
                    <NewsletterCard />
                    <NewsletterCard />
                    <NewsletterCard />
                    <NewsletterCard />
                    <NewsletterCard />
                </div>
            </div>

            {/* Subscribe Section */}
            <div className="bg-[#E0EAF5] py-10 px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#0D2137]">
                    SUBSCRIBE TO NEWSLETTER
                </h1>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 pr-10 w-full sm:w-auto">
                    <input
                        className="border-2 border-[#0D2137] rounded-lg p-2 w-full sm:w-64 focus:outline-none"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#0D2137] text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-[#143358] transition duration-300 w-full sm:w-auto disabled:opacity-50"
                    >
                        {isSubmitting ? 'Subscribing...' : 'SUBSCRIBE'}
                    </button>
                </form>
            </div>

            {/* Status Message */}
            {submitStatus && (
                <div className={`text-center mx-auto px-12 ${
                    submitStatus.startsWith('error') 
                        ? 'text-red-600' 
                        : 'text-green-600'
                }`}>
                    {submitStatus.startsWith('error') 
                        ? `Error: ${submitStatus.replace('error: ', '')}`
                        : 'Thank you for subscribing! You will receive our newsletter updates.'}
                </div>
            )}

            {/* Keyframes for Animation */}
            <style>
                {`
                    @keyframes fadeInUp {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeInUp {
                        animation: fadeInUp 1s ease-out forwards;
                    }
                `}
            </style>
        </>
    );
};

export default Newsletter;