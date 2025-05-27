'use client'; // if using Next.js App Router

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfessionalDev = () => {
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
    return <div className="text-center py-20 text-[#0D2137]">Loading...</div>;
  }

  const getImage = (img) => img ? `http://localhost:4000/${img}` : '';

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0D2137]"></div>
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            {data.title.toUpperCase()}
          </h1>
          <p className="text-[#E0EAF5] mt-4 text-xl md:text-2xl font-semibold max-w-2xl mx-auto">
            {data.subtitle1}
          </p>
        </div>
      </div>

      {/* First Section */}
      <section className="px-4 md:px-20 py-14 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img src={getImage(data.image1)} alt="Section 1" className="w-full md:w-2/5 rounded-2xl shadow-xl" />
          <div className="space-y-6 text-[#0D2137]">
            <h2 className="text-3xl font-bold text-[#2E77AE]">{data.subtitle1}</h2>
            <p className="text-base md:text-lg font-medium">{data.description1}</p>
          </div>
        </div>
      </section>

      {/* Second Section */}
      {data.image2 && (
        <section className="px-4 md:px-20 py-14 bg-[#E0EAF5]">
          <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
            <img src={getImage(data.image2)} alt="Section 2" className="w-full md:w-2/5 rounded-2xl shadow-xl" />
            <div className="space-y-6 text-[#0D2137]">
              <h2 className="text-3xl font-bold text-[#2E77AE]">{data.subtitle2}</h2>
              <p className="text-base md:text-lg font-medium">{data.description2}</p>
            </div>
          </div>
        </section>
      )}

      {/* Repeat the pattern for image3...image5 if they exist */}
      {[3, 4, 5].map((i) => {
        const img = data[`image${i}`];
        const subtitle = data[`subtitle${i}`];
        const desc = data[`description${i}`];
        if (!img) return null;

        const isEven = i % 2 === 0;
        return (
          <section key={i} className="px-4 md:px-20 py-14 bg-[#E0EAF5]">
            <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}>
              <img src={getImage(img)} alt={`Section ${i}`} className="w-full md:w-2/5 rounded-2xl shadow-xl" />
              <div className="space-y-6 text-[#0D2137]">
                <h2 className="text-3xl font-bold text-[#2E77AE]">{subtitle}</h2>
                <p className="text-base md:text-lg font-medium">{desc}</p>
              </div>
            </div>
          </section>
        );
      })}

      {/* Keyframes for Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}
      </style>
    </>
  );
};

export default ProfessionalDev;
