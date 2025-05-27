import React from 'react';
import NewsletterCard from '../components/NewsletterCards';

export const metadata = {
  title: 'PSF - Newsletter',
  description: '...',
}

const Newsletter = () => {
    return (
        <>
            {/* Top Banner Section */}
            <div className="relative bg-cover bg-center h-[25vh] md:h-[40vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#0D2137]"></div>
                <div className="relative z-10 text-center animate-fadeInUp px-4">
                    <h1 className="text-white text-3xl md:text-6xl font-bold drop-shadow-lg">
                        NEWSLETTER
                    </h1>
                </div>
            </div>

            {/* Subscribe Section */}
            <div className="bg-[#E0EAF5] py-10 px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-[#0D2137]">
                    SUBSCRIBE TO NEWSLETTER
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 pr-10">
                    <input
                        className="border-2 border-[#0D2137] rounded-lg p-2 w-64 focus:outline-none"
                        type="email"
                        placeholder="example@email.com"
                        required
                    />
                    <button className="bg-[#0D2137] text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-[#143358] transition duration-300">
                        SUBSCRIBE
                    </button>
                </div>
            </div>


            {/* All Issues Section */}
            <div className="bg-[#E0EAF5] pt-10">
                <h1 className="px-6 md:px-12 text-2xl md:text-3xl font-bold text-[#0D2137] mb-6">
                    ALL ISSUES
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-12 pb-10">
                    <NewsletterCard />
                    <NewsletterCard />
                    <NewsletterCard />
                    <NewsletterCard />
                </div>
            </div>

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
