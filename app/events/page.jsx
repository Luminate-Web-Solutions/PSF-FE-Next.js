import React from 'react';
import EventCard from '../components/EventCard';

export const metadata = {
  title: 'PSF - Events',
  description: '...',
}

const Events = () => {
  return (
    <div className="px-6 py-10 bg-[#E0EAF5] min-h-screen space-y-12 pr-15 pl-15">
      
      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-[#0D2137] font-bold text-3xl mb-6 text-center border-b-2 ">
          FILTERS
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Date Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Date</label>
            <input
              type="date"
              className="border-2 border-[#2E77AE] rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8E2B]"
            />
          </div>

          {/* Location Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="border-2 border-[#2E77AE] rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8E2B]"
            />
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Category</label>
            <select
              className="border-2 border-[#2E77AE] rounded-xl p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8E2B]"
            >
              <option value="">All</option>
              <option value="tech">Tech</option>
              <option value="social">Social</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section>
        <h2 className="text-[#0D2137] font-bold text-4xl mb-8">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

      {/* All Events Section */}
      <section>
        <h2 className="text-[#0D2137] font-bold text-4xl mb-8">
          All Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

    </div>
  );
};

export default Events;
