'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EventCard = ({ event }) => {
  const { id, name, heroImage, description1, description2, date } = event || {};
  const fullDescription = `${description1 || ''} ${description2 || ''}`.trim();
  const shortDescription = fullDescription.length > 100 ? fullDescription.slice(0, 100) + '...' : fullDescription;

  const BASEURL = 'http://localhost:4000'

  return (
    <div className="group w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-[3/4] cursor-pointer perspective">
      <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180 transition-transform">

        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg shadow-[#2e77ae]/20 hover:shadow-[#2e77ae]/40 ring-1 ring-[#2e77ae]/30 hover:ring-[#2e77ae]/50 overflow-hidden">
          <div className="h-2/5 overflow-hidden rounded-t-2xl">
            <img
              src={`${BASEURL}/${heroImage}`}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="h-3/5 p-3 sm:p-5 flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-[#0d2137]">{name}</h2>
              <p className="text-[#0d2137] text-xs sm:text-sm leading-relaxed mt-2">
                {shortDescription}
              </p>
              <p className="text-[#0d2137] text-xs sm:text-sm mt-2">
                📅 {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#2e77ae] text-white rounded-2xl flex flex-col justify-center items-center p-5 sm:p-6 text-center">
          <h3 className="text-lg sm:text-xl font-bold mb-3">More Details</h3>
          <p className="text-xs sm:text-sm">{shortDescription}</p>
          {id && (
            <Link
              href={`/events/${id}`}
              className="mt-5 px-4 py-1 sm:px-5 sm:py-2 bg-white text-[#2e77ae] rounded-full font-semibold hover:bg-gray-100 transition text-xs sm:text-sm"
            >
              Event Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
