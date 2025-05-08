import React from 'react';
import { ArrowRight } from 'lucide-react';

const EventCard = () => {
  return (
    <div className="bg-white shadow-lg shadow-[#2e77ae]/20 hover:shadow-[#2e77ae]/40 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 ring-1 ring-[#2e77ae]/30 hover:ring-[#2e77ae]/50">
      <div className="w-full h-56 sm:h-45 overflow-hidden">
        <img 
          src='/1.1.jpg'
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          alt="Event visual" 
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-4">
          <h2 className="font-bold text-xl text-[#0d2137]">Event Name</h2>
          <p className="text-[#2e77ae] mt-1 font-medium">Event 1</p>
        </div>

        <div className="mb-6">
          <p className="text-[#0d2137] leading-relaxed">
            Event Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quibusdam.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 font-semibold text-[#ff8e2b] hover:text-[#2e77ae] transition-colors duration-200 group">
            LEARN MORE
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
