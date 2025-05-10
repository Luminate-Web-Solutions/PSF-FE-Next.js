import React from 'react';
import Image from 'next/image';
import EventCard from './components/EventCard';
import TestimonialCarousel from './components/TestimonialCarousel';
import Link from 'next/link';
import ImageCarousel from './components/ImageCarousel';
import VerticalCard from './components/VerticalCard';

export const metadata = {
  title: 'PSF - Home',
  description: '...',
}

const App = () => {
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
      <div className="py-10 pr-10 pl-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">5 VERTICALS OF PSF</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-4 md:px-10">
          {[
            {
              title: "Personal Wellbeing",
              desc: "This comprehensive program covers different dimensions of wellness that include weekly activities.",
              link: '/personalWellBeing',
            },
            {
              title: "Professional Development",
              desc: "Promote a culture of continuous learning & development and help professionals who are willing to learn and grow.",
              link: '/professionalDev',
            },
            {
              title: "Skills Academy",
              desc: "We intend to close that gap by offering high-quality training in a variety of subjects through the PSF Skills Academy.",
              link: '/skillAcademy',
            },
            {
              title: "Job & Career Guidance",
              desc: "We groom job seekers and unemployed youth, through our flagship employment readiness program.",
              link: '/jobCareer',
            },
            {
              title: "Social Services",
              desc: "We provide a platform for professionals where they can contribute to upliftment of society and nation building as whole.",
              link: '/socialServices',
            },
          ].map((vertical, index) => (
            <VerticalCard key={index} index={index} vertical={vertical} />
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-[#EOEAF5] py-12 px-4 md:px-20">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D2137]">
            UPCOMING EVENTS
          </h1>
          <p className="text-[#2E77AE] text-md md:text-lg font-medium mt-2">
            Discover impactful experiences and engaging events happening soon.
          </p>
          <div className="mt-4 mx-auto w-24 md:w-40 border-b-4 border-[#FF8E2B]"></div>
        </div>

        {/* Event Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        {/* View All Events Link */}
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


      {/* 3 Reasons Why PSF */}
      <div className="flex flex-col text-center items-center lg:flex-row gap-10 px-4 md:px-10 py-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-blue-500 w-full lg:w-2/5 text-center lg:text-left pl-10 flex justify-center">
          3 REASONS WHY PSF?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-3/5 pr-10 pl-10">
          {[1, 2, 3].map((reason) => (
            <div key={reason} className="bg-blue-50 p-6 rounded-xl shadow-lg">
              <h1 className="text-xl font-bold text-center pb-2">Logo/Img</h1>
              <p className="font-semibold text-center md:text-left">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem atque cum recusandae! Amet aperiam nisi sit dolorum totam numquam voluptatem.
              </p>
            </div>
          ))}


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
