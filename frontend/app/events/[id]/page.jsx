import React from 'react';

const EventDetails = async ({ params }) => {
  const { id } = params;

  let event = null;
  let comments = [];

  try {
    // Fetch event data
    const eventRes = await fetch(`http://localhost:4000/api/events/${id}`, {
      cache: 'no-store',
    });
    if (!eventRes.ok) throw new Error("Event not found");
    event = await eventRes.json();

    // Parse image field if it's a string
    if (typeof event.image === 'string') {
      try {
        event.image = JSON.parse(event.image);
      } catch (e) {
        console.warn('Image parsing failed:', e.message);
        event.image = []; // fallback
      }
    } else if (!Array.isArray(event.image)) {
      event.image = []; // ensure it's always an array
    }

    // Fetch comments
    const commentsRes = await fetch(`http://localhost:4000/api/events/${id}/comments`, {
      cache: 'no-store',
    });
    if (commentsRes.ok) {
      comments = await commentsRes.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading event</h2>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {event.heroImage && (
            <div className="relative h-64 sm:h-96 overflow-hidden">
              <img
                src={`http://localhost:4000/${event.heroImage}`}
                alt={event.name}
                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-95"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{event.name}</h1>
                <div className="flex items-center mt-2 text-white/90">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  {event.time && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {event.status && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
          {(event.subtitle1 || event.subtitle2) && (
            <div className="mb-6 space-y-2">
              {event.subtitle1 && <h2 className="text-xl font-semibold text-gray-800">{event.subtitle1}</h2>}
              {event.subtitle2 && <h3 className="text-lg font-medium text-gray-700">{event.subtitle2}</h3>}
            </div>
          )}

          <div className="prose max-w-none text-gray-700">
            {event.description1 && <p className="mb-4">{event.description1}</p>}
            {event.description2 && <p className="mb-4">{event.description2}</p>}
          </div>
        </div>

        {/* Gallery Section */}
        {event.image && event.image.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.image.map((img, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={`http://localhost:4000/${img}`}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form className="mb-8">
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-4 mb-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Your Name"
              ></input>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Share your thoughts about this event..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                        {comment.user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{comment.user.name}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;