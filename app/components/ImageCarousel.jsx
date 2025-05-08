'use client';

import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    src: '/1.1.jpg',
    title: 'Explore Opportunities',
    description: 'Discover the best career options tailored just for you.',
  },
  {
    src: '/1.2.jpg',
    title: 'Learn and Grow',
    description: 'Access top learning resources and mentorship programs.',
  },
  {
    src: '/DONE-1024x341.png',
    title: 'Join Our Community',
    description: 'Be a part of a supportive and growing tech community.',
  },
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="w-full max-w-screen-3xl mx-auto mb-20"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      ref={carouselRef}
    >
      <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
        {/* Carousel Slides */}
        <div
          className="flex transition-transform duration-900 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] flex-shrink-0"
            >
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Frosted Text Box */}
              <div className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl max-w-md text-white">
                <h2 className="text-lg sm:text-2xl font-bold">{slide.title}</h2>
                <p className="text-sm sm:text-base mt-1">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black/30 hover:bg-black/50 rounded-full p-2 z-10 transition"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black/30 hover:bg-black/50 rounded-full p-2 z-10 transition"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === current ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
