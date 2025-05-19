import React from 'react';
import { FaRunning, FaBrain, FaHandHoldingHeart, FaLeaf, FaCoins, FaBriefcase, FaUsers, FaBalanceScale } from 'react-icons/fa';

export const metadata = {
  title: 'PSF - Personal Wellbeing',
  description: 'Holistic development through the Personal Enablement Program (PEP) by PSF.',
};

const wellnessAreas = [
  { icon: <FaRunning />, title: 'Physical Wellness' },
  { icon: <FaBrain />, title: 'Mental Wellness' },
  { icon: <FaUsers />, title: 'Social Wellness' },
  { icon: <FaHandHoldingHeart />, title: 'Emotional Wellness' },
  { icon: <FaBalanceScale />, title: 'Spiritual Wellness' },
  { icon: <FaCoins />, title: 'Financial Wellness' },
  { icon: <FaBriefcase />, title: 'Occupational Wellness' },
  { icon: <FaLeaf />, title: 'Environmental Wellness' },
];

const initiatives = [
  {
    title: 'Explore Hyderabad',
    description:
      'Rediscover the city’s hidden gems and enjoy cultural bonding through City Chronicles and Heritage & Harmony programs.',
  },
  {
    title: 'Sports Club',
    description:
      'Stay fit together! Group fitness and sports to build stamina, teamwork, and a winning mindset.',
  },
  {
    title: 'Flea Market',
    description:
      'A fun entrepreneurial space with "Kidpreneurs in Action" and community-driven commerce experiences.',
  },
  {
    title: 'Mental Wellness',
    description:
      'Support workshops and growth sessions under "Mind Matters" and "Thrive Together" for mental health.',
  },
  {
    title: 'Financial Wellness',
    description:
      '"Smart Money Moves" and "Wealth Wise" to enhance financial literacy and confidence for a secure future.',
  },
];

const ProfessionalWellBeing = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[45vh] md:h-[55vh] flex items-center justify-center px-4 bg-[url('/hero-pep.jpg')]">
        <div className="absolute inset-0 bg-[#0D2137]" />
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            PERSONAL WELLBEING
          </h1>
          <p className="text-[#f9f9f9] mt-4 text-xl md:text-2xl font-medium max-w-xl mx-auto">
            Personal Enablement Program (PEP)
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="px-4 md:px-20 py-12 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            src="/coreteam1.jpg"
            alt="Personal Enablement"
            className="w-full md:w-2/5 rounded-xl shadow-xl"
          />
          <div className="space-y-5 text-[#0d2137]">
            <h2 className="text-3xl font-bold text-[#2E77AE]">About PEP</h2>
            <p className="text-lg font-medium">
              The Personal Enablement Program (PEP) by PSF is dedicated to the holistic development of professionals and their families. PEP focuses on 8 key wellness areas to help members lead balanced, fulfilling lives—both personally and professionally.
            </p>
          </div>
        </div>
      </section>

      {/* Wellness Dimensions */}
      <section className="px-4 md:px-20 py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#2E77AE] mb-8">Dimensions of Wellness</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[#0D2137]">
          {wellnessAreas.map((area, index) => (
            <div key={index} className="bg-[#E0EAF5] p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl text-[#FF8E2B] mb-3">{area.icon}</div>
              <h3 className="text-lg font-semibold">{area.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Initiatives */}
      <section className="px-4 md:px-20 py-12 bg-[#E0EAF5]">
        <h2 className="text-3xl font-bold text-center text-[#2E77AE] mb-10">Our Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initiatives.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#FF8E2B] mb-3">{item.title}</h3>
              <p className="text-[#0D2137] font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default ProfessionalWellBeing;
