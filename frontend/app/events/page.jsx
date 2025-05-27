'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';


const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  // Apply filters
  const filteredEvents = events.filter((event) => {
    const matchesDate = selectedDate ? event.date?.startsWith(selectedDate) : true;
    const matchesLocation = location
      ? event.location?.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesCategory = category ? event.category === category : true;
    return matchesDate && matchesLocation && matchesCategory;
  });

  return (
    <div className="px-6 py-10 bg-[#E0EAF5] min-h-screen space-y-12">
      {/* Filters Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-[#0D2137] font-bold text-3xl mb-6 text-center border-b-2">
          FILTERS
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Date Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 border-[#2E77AE] rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8E2B]"
            />
          </div>

          {/* Location Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="border-2 border-[#2E77AE] rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8E2B]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[#2E77AE] font-semibold mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

     

      {/* All Events Section */}
      <section>
        <h2 className="text-[#0D2137] font-bold text-4xl mb-8">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id || event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
