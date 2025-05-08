'use client';

import React from 'react';
import Link from 'next/link';

const VerticalCard = ({ index, vertical }) => {
  return (
    <div className="w-full h-80 md:h-96 bg-[#E0EAF5] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col justify-between p-6">
      
      {/* Top Section */}
      <div>
        <div className="text-[#0D2137] text-sm md:text-3xl font-semibold mb-2">{`0${index + 1}`}</div>
        <h2 className="text-xl md:text-xl font-bold text-gray-800 mb-2">{vertical.title}</h2>
        <p className="text-gray-600 text-sm md:text-base">
          {vertical.desc}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-end mt-6">
        <Link href={vertical.link}>
          <span className="inline-block bg-[#0D2137] text-white font-medium px-5 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-all">
            Learn More →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default VerticalCard;
