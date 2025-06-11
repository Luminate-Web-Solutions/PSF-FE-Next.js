'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EventCard = ({ event }) => {
  const { id, name, heroImage, description1, description2, date } = event || {};
  const fullDescription = `${description1 || ''} ${description2 || ''}`.trim();
  const shortDescription = fullDescription.length > 100 ? fullDescription.slice(0, 200) + '...' : fullDescription;

  const BASEURL = 'http://localhost:4000';

  return (
    <div className="group w-full max-w-xs sm:max-w-sm mx-auto aspect-[3/4] cursor-pointer perspective rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-full duration-700 transform-style preserve-3d group-hover:rotate-y-180 transition-transform rounded-2xl">
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
          <div className="h-2/5 relative overflow-hidden rounded-t-2xl">
            <img
              src={`${BASEURL}/${heroImage}`}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-white text-sm font-medium">
                📅 {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="h-3/5 p-5 flex flex-col">
            <h2 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2">{name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {shortDescription}
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-xs text-gray-500">Click to flip for details</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col overflow-hidden">
          {/* Extended image with blue overlay */}
          <div className="absolute inset-0">
            <img
              src={`${BASEURL}/${heroImage}`}
              alt={name}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-blue-900/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6 text-center justify-center items-center text-white">
            <h3 className="text-xl font-bold mb-4">{name}</h3>
            <p className="text-sm mb-6 flex-grow">{shortDescription}</p>
            {id && (
              <Link
                href={`/events/${id}`}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-all text-sm shadow-md hover:shadow-lg"
              >
                View Event Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;