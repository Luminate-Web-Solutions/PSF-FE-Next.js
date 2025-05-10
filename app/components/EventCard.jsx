'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EventCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto aspect-[3/4] perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-white shadow-lg shadow-[#2e77ae]/20 hover:shadow-[#2e77ae]/40 rounded-2xl overflow-hidden ring-1 ring-[#2e77ae]/30 hover:ring-[#2e77ae]/50">
          <div className="w-full h-1/2 sm:h-2/5 overflow-hidden">
            <img
              src="/1.1.jpg"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              alt="Event visual"
            />
          </div>
          <div className="p-4 sm:p-6 md:p-8 h-1/2 sm:h-3/5 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-[#0d2137]">Event Name</h2>
              <p className="text-[#2e77ae] mt-1 text-sm sm:text-base font-medium">Event 1</p>
              <p className="text-[#0d2137] text-sm sm:text-base leading-relaxed mt-3">
                Event Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quibusdam.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="flex items-center gap-2 font-semibold text-[#ff8e2b] hover:text-[#2e77ae] transition-colors duration-200 group text-sm sm:text-base">
                LEARN MORE
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#2e77ae] text-white rounded-2xl flex flex-col justify-center items-center p-6 sm:p-8 text-center shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">More Details</h3>
          <p className="text-sm sm:text-base">
            This event includes workshops, expert talks, and networking sessions. Join us to explore and learn!
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="mt-6 px-4 py-2 sm:px-5 sm:py-2 bg-white text-[#2e77ae] rounded-full font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventCard;
