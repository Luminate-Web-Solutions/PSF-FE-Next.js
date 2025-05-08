'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Michael Gough",
    title: "Career Coach",
    content:
      "This platform made my career choice so much easier! The quiz is insightful and the suggestions were spot on.",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
  },
  {
    name: "Jane Smith",
    title: "UI Designer",
    content:
      "Loved the UI and the results were incredibly accurate. It helped me realize my true calling!",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
  },
  {
    name: "Ali Khan",
    title: "Engineering Student",
    content:
      "The quiz was really engaging and surprisingly deep. I learned a lot about my strengths.",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 15000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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
          onClick={handlePrev}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          onClick={handleNext}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
