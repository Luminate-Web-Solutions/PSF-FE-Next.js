'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const VerticalCard = ({ index, vertical }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-80 md:h-96 rounded-2xl bg-gradient-to-br from-[#1a4b7a] to-[#2E77AE] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between p-6 relative group"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]"></div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top Section */}
      <div className="relative z-10">
        <div className="text-blue-200/80 text-3xl md:text-4xl font-bold mb-2 tracking-tighter">
          {`0${index + 1}`}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {vertical.title}
        </h2>
        <p className="text-blue-100/90 text-base md:text-lg leading-relaxed">
          {vertical.desc}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex justify-end mt-6">
        <Link href={vertical.link} className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full">
          <motion.span 
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-6 py-3 rounded-full text-sm md:text-base hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default VerticalCard;