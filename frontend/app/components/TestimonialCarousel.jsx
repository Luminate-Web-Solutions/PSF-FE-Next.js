// --- TestimonialCarousel.jsx ---
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        testimonials.length > 0 ? (prevIndex + 1) % testimonials.length : 0
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <figure className="transition-all duration-500 ease-in-out">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-semibold text-gray-800">
              “{current.content}”
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-4">
            <img
              className="w-10 h-10 rounded-full shadow-md"
              src={current.image}
              alt={current.name}
            />
            <div className="flex items-center divide-x-2 divide-gray-400">
              <cite className="pr-3 font-medium text-gray-900">
                {current.name}
              </cite>
              <cite className="pl-3 text-sm text-gray-500">{current.title}</cite>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Arrow Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          onClick={() => setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % testimonials.length)}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;