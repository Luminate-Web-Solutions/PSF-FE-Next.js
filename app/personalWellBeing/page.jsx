import React from 'react';

const ProfessionalWellBeing = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-[#0D2137]"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            PERSONAL WELLBEING
          </h1>
          <p className="text-[#f9f9f9] mt-4 text-xl md:text-2xl font-medium max-w-xl mx-auto">
            Personal Enablement Program
          </p>
        </div>
      </div>

      {/* About PEP */}
      <section className="px-4 md:px-20 py-10 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img src='coreteam1.jpg' alt="Personal Enablement" className="w-full md:w-2/5 rounded-xl shadow-lg" />
          <div className="space-y-6 text-[#0d2137]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE]">About PEP(Personal Enablement Program)</h2>
            <p className="text-base md:text-lg font-medium">
              The PEP (Personal Enablement Program) vertical of PSF focuses on the overall personality development of our members. 
              It does so by means of its comprehensive program which covers different dimensions of wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="px-4 md:px-20 py-10 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
          <img src='/pw.jpg' alt="Program Details" className="w-full md:w-2/5 rounded-xl shadow-lg" />
          <div className="space-y-6 text-[#0D2137]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE]">Program Details</h2>
            <p className="text-base md:text-lg font-medium">
              The program includes weekly sports activities, physical wellness, monthly spiritual wellness programs, 
              family programs, social and emotional wellness, financial literacy updates, and weekly PEP connects. 
              These provide a tracking system for individual, professional, and family goals.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-4 md:px-20 py-10 bg-[#E0EAF5]">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2E77AE] mb-10">Program Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#FF8E2B] mb-4">PSF Sports Club</h3>
            <p className="text-[#0D2137] font-medium">
              Weekly updates and activities to promote physical wellness.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#FF8E2B] mb-4">PEP Circles</h3>
            <p className="text-[#0D2137] font-medium">
              Weekly connects to monitor and discuss professional and family goals.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-[#FF8E2B] mb-4">Flea Market</h3>
            <p className="text-[#0D2137] font-medium">
              Quarterly flea markets for community engagement and social wellbeing.
            </p>
          </div>
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
