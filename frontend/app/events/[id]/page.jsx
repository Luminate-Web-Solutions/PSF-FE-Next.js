import React from 'react';

const EventDetails = async ({ params }) => {
  const { id } = await params;

  let event = null;

  try {
  const res = await fetch(`http://localhost:4000/api/events/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error("Event not found");

  event = await res.json();

  // Fix: parse `event.image` if it's a JSON string
  if (typeof event.image === 'string') {
    try {
      event.image = imagesArray;
    } catch (e) {
      console.warn('Image parsing failed:', e.message);
      event.image = []; // fallback
    }
  }
} catch (error) {
  console.error('Error fetching event:', error);
  return <div className="text-center mt-10 text-gray-600">Error loading event.</div>;
}


  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Hero Image */}
        {event.heroImage && (
          <div className="h-64 sm:h-80 overflow-hidden">
            <img
              src={`http://localhost:4000/${event.heroImage}`}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-[#2e77ae]">{event.name}</h1>
          <p className="text-sm text-gray-500">
            📅 {new Date(event.date).toLocaleDateString()} ⏰ {event.time}
          </p>
          {event.subtitle1 && <p className="text-md font-medium text-gray-700">{event.subtitle1}</p>}
          {event.subtitle2 && <p className="text-md font-medium text-gray-700">{event.subtitle2}</p>}
          {event.description1 && <p className="mt-2 text-gray-700">{event.description1}</p>}
          {event.description2 && <p className="text-gray-700">{event.description2}</p>}
        </div>

        {/* Additional Images Grid */}
        {event.image.length > 0 && (
  <div className="p-6">
    <h2 className="text-xl font-semibold text-[#2e77ae] mb-4">Gallery</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {event.image.map((img, index) => {
        const imageUrl = `http://localhost:4000/${img}`;
        return (
          <div key={index} className="overflow-hidden rounded-lg shadow-sm">
            <img
              src={imageUrl}
              alt={`Event image ${index + 1}`}
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        );
      })}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default EventDetails;
