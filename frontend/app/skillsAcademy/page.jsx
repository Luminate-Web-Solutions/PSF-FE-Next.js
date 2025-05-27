'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UsersIcon,
  SparklesIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

const SkillsAcademy = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      const fetchVerticalData = async () => {
        try {
          const res = await axios.get('http://localhost:4000/api/verticals?title=CPDP1');
          const item = Array.isArray(res.data) ? res.data[0] : res.data;
          setData(item);
        } catch (error) {
          console.error('Failed to fetch vertical data:', error);
        }
      };
  
      fetchVerticalData();
    }, []);

  if (!data) {
    return <div className="text-center p-10 text-gray-600">Loading...</div>;
  }
  const getImage = (img) => img ? `http://localhost:4000/${img}` : '';

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${data.image1})` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-80" />
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            {data.title.toUpperCase()}
          </h1>
          <p className="text-white mt-4 text-lg md:text-2xl font-medium max-w-xl mx-auto">
            {data.subtitle1}
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={data.image1}
            alt={`About ${data.title}`}
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-3xl font-bold text-[#2E77AE] flex items-center gap-2">
              <AcademicCapIcon className="h-8 w-8 text-[#2E77AE]" />
              About {data.title}
            </h2>
            <p className="text-lg font-medium leading-relaxed">
              {data.description1}
            </p>
          </div>
        </div>
      </section>

      {/* You can continue reusing data.image2, data.subtitle2, data.description2 etc. in other sections */}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out both;
        }
      `}</style>
    </>
  );
};

export default SkillsAcademy;
