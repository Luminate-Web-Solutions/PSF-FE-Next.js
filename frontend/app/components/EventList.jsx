'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import Link from 'next/link';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map(event => (
        <Link key={event.id} href={`/events/${event.id}`} className="block">
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
};

export default EventList;
