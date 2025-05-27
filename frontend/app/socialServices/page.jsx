'use client'

import React, { useEffect, useState } from 'react';
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaPeopleCarry,
  FaUserShield,
  FaHeartbeat,
  FaVenus,
  FaUsers,
  FaBullseye,
  FaLightbulb,
  FaHandsHelping,
  FaShieldAlt,
} from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';
import axios from 'axios';


const iconMap = {
  FaUsers: <FaUsers className="text-3xl text-[#2E77AE]" />,
  FaChalkboardTeacher: <FaChalkboardTeacher className="text-3xl text-[#2E77AE]" />,
  FaVenus: <FaVenus className="text-3xl text-[#2E77AE]" />,
  FaLaptopCode: <FaLaptopCode className="text-3xl text-[#2E77AE]" />,
  MdCampaign: <MdCampaign className="text-3xl text-[#2E77AE]" />,
  FaUserShield: <FaUserShield className="text-3xl text-[#2E77AE]" />,
  FaPeopleCarry: <FaPeopleCarry className="text-3xl text-[#2E77AE]" />,
};

const SocialServices = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/socialservices')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to load:', err));
  }, []);

  if (!data) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${data.bannerImage})` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-90"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out] px-6">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">SOCIAL SERVICES</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-16 px-6 md:px-20 bg-[#F0F6FC]">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={data.bannerImage}
            alt="Social Services"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="space-y-6 text-[#0d2137]">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE]">{data.introHeading}</h2>
            <p className="text-base md:text-lg font-medium leading-relaxed">{data.introText}</p>
          </div>
        </div>
      </section>

      {/* Goals and Objectives */}
      <section className="py-16 px-6 md:px-20 bg-[#F0F6FC]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[#0d2137]">
          {/* Goals */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-[#2E77AE]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6 flex items-center gap-3">
              <FaBullseye className="text-[#2E77AE]" /> Our Goals
            </h2>
            <ul className="space-y-5 text-base md:text-lg font-medium">
              {data.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaLightbulb className="mt-1 text-[#2E77AE]" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-[#2E77AE]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6 flex items-center gap-3">
              <FaLightbulb className="text-[#2E77AE]" /> Our Objectives
            </h2>
            <ul className="space-y-5 text-base md:text-lg font-medium">
              {data.objectives.map((objective, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaShieldAlt className="mt-1 text-[#2E77AE]" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Initiatives Cards */}
      <section className="bg-[#F0F6FC] py-16 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-10 text-center">Our Initiatives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.initiatives.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-[#2E77AE]"
            >
              <div className="flex items-center gap-4 mb-4">
                {iconMap[item.icon] || <FaUsers className="text-3xl text-[#2E77AE]" />}
                <h3 className="text-xl font-semibold text-[#0d2137]">{item.title}</h3>
              </div>
              <p className="text-[#0d2137] text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 md:px-20 text-[#0d2137]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6">Impact So Far</h2>
        <p className="text-base md:text-lg font-medium leading-relaxed">{data.impact}</p>
      </section>

      {/* Call to Action */}
      <section className="bg-[#2E77AE] text-white text-center py-12 px-6 md:px-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Join PSF Social Service Today!</h2>
        <p className="text-base md:text-lg font-medium mb-6">
          Be a part of the change. Mentor youth, support women, and serve those in need. Together, let’s uplift society.
        </p>
        <p className="text-base md:text-lg font-semibold">
          Become a volunteer and make a difference.
        </p>
        <a
          href="https://join.psfhyd.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-4 items-center bg-[#0d2137] hover:bg-[#3e5567] text-white px-5 py-2.5 rounded-full shadow-md transition duration-300"
        >
          JOIN MEMBERSHIP
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 3h7m0 0v7m0-7L10 14"
            />
          </svg>
        </a>
      </section>

      {/* Animation Keyframes */}
      <style>{`
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
    </>
  );
};

export default SocialServices;
