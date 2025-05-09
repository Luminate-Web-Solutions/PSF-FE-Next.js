import React from 'react';
import { Rocket, Gem, Telescope } from 'lucide-react';
import Link  from 'next/link';

export const metadata = {
  title: 'PSF - About',
  description: '...',
}

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-100 flex items-center justify-center px-4"
        style={{ backgroundImage: `url('/2.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137]/60"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            ABOUT PSF HYDERABAD
          </h1>
          <p className="text-[#f9f9f9] mt-4 text-sm md:text-lg font-light max-w-xl mx-auto">
            Empowering professionals to lead change with purpose and passion.
          </p>
        </div>
      </div>

      <style >{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* PRESIDENT'S MESSAGE */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-6 md:p-16 bg-[#f9f9f9]">
        <img
          src='./arif.jpg'
          alt="President"
          className="rounded-2xl w-40 h-40 md:w-72 md:h-72 shadow-xl hover:shadow-[#2f5d8c] transition duration-300 ease-in-out hover:scale-110 "
        />
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2f5d8c] mb-4">PRESIDENT'S MESSAGE (2025)</h2>
          <p className="text-[#2f2f2f] font-medium leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, corporis.
          </p>

          <Link
            href="/president"
            className="inline-block bg-[#0D2137] text-white px-6 py-3 mt-6 md:mt-20 rounded-lg font-semibold hover:bg-[#d55e2d] transition"
          >
            READ MORE
          </Link>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-16 px-8">
        {/* MISSION */}
        <div className="relative bg-white rounded-xl p-8 text-center shadow-md border-t-4 border-[#ff8e2b] transition duration-300 ease-in-out hover:scale-105 max-w-sm w-full">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#ff8e2b] w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Rocket size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-[#d55e2d] text-xl font-bold mt-12 mb-4">MISSION</h2>
          <p className="text-[#2f2f2f] text-sm font-medium">
            To empower professionals to leverage their skills, time, and creativity to have a positive impact on self and society.
          </p>
        </div>

        {/* VISION */}
        <div className="relative bg-white rounded-xl p-8 text-center shadow-md border-t-4 border-[#2f5d8c] transition duration-300 ease-in-out hover:scale-105 max-w-sm w-full">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#2f5d8c] w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Telescope size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-[#2f5d8c] text-xl font-bold mt-12 mb-4">VISION</h2>
          <p className="text-[#2f2f2f] text-sm font-medium">
            To be a Valued Professional network catering to the Personal & Professional well-being of the Individuals.
          </p>
        </div>

        {/* VALUES */}
        <div className="relative bg-white rounded-xl p-8 text-center shadow-md border-t-4 border-[#ff8e2b] transition duration-300 ease-in-out hover:scale-105 max-w-sm w-full">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="bg-[#ff8e2b] w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <Gem size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-[#d55e2d] text-xl font-bold mt-12 mb-4">VALUES</h2>
          <p className="text-[#2f2f2f] text-sm font-medium">
            Accountability, One-Team Culture, Creativity & Innovation, Commitment & Dedication, Punctuality & Time-Management
          </p>
        </div>
      </div>

      {/* OUR CORE TEAM */}
      <div className="px-6 md:px-20 py-10 bg-white">
        <h1 className="text-3xl font-bold text-center text-[#d55e2d] border-b-4 border-[#d8d8d6] mb-6 pb-4">OUR CORE TEAM</h1>
        <p className="text-lg font-medium text-center text-[#2f2f2f] max-w-4xl mx-auto mb-6">
          Meet the passionate leaders driving PSF’s mission forward — from strategic direction to on-ground impact. Learn more about our Organisation Leadership Team, Permanent Members, and Vertical Leads who form the backbone of our initiatives.
        </p>
        <div className="flex justify-center items-center">
          <Link href="/coreteam">
            <button className="bg-[#2f5d8c] text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-[#234768] transition">
              EXPLORE OUR CORE TEAM
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
