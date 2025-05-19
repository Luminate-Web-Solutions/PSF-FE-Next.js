'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EventCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[3/4] cursor-pointer">
      {/* Static Top Image */}
      <div className="w-full h-1/2 sm:h-2/5 overflow-hidden rounded-t-2xl">
        <img
          src="/1.1.jpg"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          alt="Event visual"
        />
      </div>

      {/* Flipping Section */}
      <div
        className="relative w-full h-1/2 sm:h-3/5 bg-white shadow-lg shadow-[#2e77ae]/20 hover:shadow-[#2e77ae]/40 ring-1 ring-[#2e77ae]/30 hover:ring-[#2e77ae]/50 rounded-b-2xl overflow-hidden"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Content */}
          <div className="absolute inset-0 backface-hidden p-3 sm:p-5 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-[#0d2137]">Event Name</h2>
              <p className="text-[#2e77ae] mt-1 text-xs sm:text-sm font-medium">Event 1</p>
              <p className="text-[#0d2137] text-xs sm:text-sm leading-relaxed mt-2">
                Event Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quibusdam.
              </p>
            </div>
            <div className="flex justify-center mt-3">
              <button className="flex items-center gap-2 font-semibold text-[#ff8e2b] hover:text-[#2e77ae] transition-colors duration-200 group text-xs sm:text-sm">
                LEARN MORE
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Back Content */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#2e77ae] text-white rounded-b-2xl flex flex-col justify-center items-center p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3">More Details</h3>
            <p className="text-xs sm:text-sm">
              This event includes workshops, expert talks, and networking sessions. Join us to explore and learn!
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              className="mt-5 px-4 py-1 sm:px-5 sm:py-2 bg-white text-[#2e77ae] rounded-full font-semibold hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              Event Details
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCard;
