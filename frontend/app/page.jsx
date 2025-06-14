'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import EventCard from './components/EventCard';
import TestimonialCarousel from './components/TestimonialCarousel';
import Link from 'next/link';
import ImageCarousel from './components/ImageCarousel';
import VerticalCard from './components/VerticalCard';
import {
  AcademicCapIcon,
  LightBulbIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// export const metadata = {
//   title: 'PSF - Home',
//   description: '...',
// }

const App = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);



  return (
    <>
      {/* Carousel Section */}
      <div className='mt-2'>
        <ImageCarousel />
      </div>

      {/* PSF Intro & 5 Verticals Intro */}
      <div className="mx-4 md:mx-16  mb-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center">
          <Image
            src="/psf_logo 1.png" // ✅ reference public/psf_logo.png
            alt="PSF Logo"
            width={150}
            height={50}
          />
          <p className="text-sm md:text-xl font-semibold text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed praesentium sequi inventore dolore, aliquam non, dolores quaerat dolorum nihil suscipit quia in harum, fugit optio dicta. Accusantium eius labore asperiores.
          </p>
        </div>
      </div>

      {/* 5 Verticals Section */}
      {/* 5 Verticals Section - Improved */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">5 Verticals</span> of PSF
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive programs designed to empower individuals and communities
            </p>
          </div>

          {/* Vertical Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Personal Wellbeing",
                desc: "Comprehensive program covering different dimensions of wellness through weekly activities.",
                link: '/personalWellBeing',
              },
              {
                title: "Professional Development",
                desc: "Promote continuous learning & development for professionals.",
                link: '/professionalDev',
              },
              {
                title: "Skills Academy",
                desc: "High-quality training in various subjects through our academy.",
                link: '/skillsAcademy',
              },
              {
                title: "Job & Career Guidance",
                desc: "Flagship employment readiness program for job seekers.",
                link: '/jobCareer',
              },
              {
                title: "Social Services",
                desc: "Platform for professionals to contribute to society.",
                link: '/socialServices',
              },
            ].map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <div className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-blue-600 text-2xl font-bold mb-2">{`0${index + 1}`}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{vertical.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base mb-6 flex-1">{vertical.desc}</p>
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Link href={vertical.link}>
                      <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        Learn more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-[#EOEAF5] py-12 px-4 md:px-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D2137]">
            UPCOMING EVENTS
          </h1>
          <p className="text-[#2E77AE] text-md md:text-lg font-medium mt-2">
            Discover impactful experiences and engaging events happening soon.
          </p>
          <div className="mt-4 mx-auto w-24 md:w-40 border-b-4 border-[#FF8E2B]"></div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-15"
        >
          {events.map((event, index) => (
            <SwiperSlide key={event.id || index}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Events Button */}
        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-block bg-[#FF8E2B] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#e57719] transition duration-300"
          >
            VIEW ALL EVENTS
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-4 md:px-10 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">WHAT PEOPLE SAY</h1>
        <TestimonialCarousel />
      </div>


      {/* 3 Reasons Why PSF - Modernized */}
      <div className="w-full bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Header */}
            <div className="lg:w-2/5">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">3 Reasons</span> <br />   Why PSF?
              </h1>
              <p className="text-lg text-gray-600">
                Discover what makes PSF a unique platform for growth, impact, and connection.
              </p>
            </div>

            {/* Reasons Grid */}
            <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reason 1 - Impact */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 group">
                <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 mx-auto">
                  <LightBulbIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Create Meaningful Impact</h2>
                <p className="text-center text-gray-600 leading-relaxed">
                  Join PSF to contribute meaningfully to society. Grow personally and professionally by empowering lives through education, skill development, and social upliftment.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="inline-block h-1 w-16 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-300"></span>
                </div>
              </div>

              {/* Reason 2 - Learn */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 group">
                <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 mx-auto">
                  <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Learn, Upskill and Grow</h2>
                <p className="text-center text-gray-600 leading-relaxed">
                  Through PSF's Skills Academy, access opportunities for skills-based education, upskilling, re-skilling, and job-readiness programs.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="inline-block h-1 w-16 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-300"></span>
                </div>
              </div>

              {/* Reason 3 - Network */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 group md:col-span-2">
                <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 mx-auto">
                  <UserGroupIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Network with Purpose-Driven People</h2>
                <p className="text-center text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Join a strong, values-based network of professionals, changemakers, and mentors. Collaborate with diverse individuals while working toward a common cause.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="inline-block h-1 w-16 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-300"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" text-[#0D2137] py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Enroll in our PSF Membership Today!</h2>
        <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg">
          Invest in your future by developing critical skills, building connections, and unlocking career possibilities.
        </p>
        <Link
          href="/membership"
          className="inline-block bg-[#0D2137] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d55e2d] hover:text-white transition-all"
        >
          MEMBERSHIP
        </Link>
      </section>


    </>
  );
};

export default App;
