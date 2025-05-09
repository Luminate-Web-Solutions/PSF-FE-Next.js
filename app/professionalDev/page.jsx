import React from 'react';

export const metadata = {
  title: 'PSF - Professional Development',
  description: '...',
}

const ProfessionalDev = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[#0D2137]"></div>
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            PROFESSIONAL DEVELOPMENT
          </h1>
          <p className="text-[#E0EAF5] mt-4 text-xl md:text-2xl font-semibold max-w-2xl mx-auto">
            Career Professional Development Program (CPDP)
          </p>
        </div>
      </div>

      {/* About CPDP Section */}
      <section className="px-4 md:px-20 py-14 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img src='/1.2.jpg' alt="Professional Enablement" className="w-full md:w-2/5 rounded-2xl shadow-xl" />
          <div className="space-y-6 text-[#0D2137]">
            <h2 className="text-3xl font-bold text-[#2E77AE]">About CPDP</h2>
            <p className="text-base md:text-lg font-medium">
              The Career Professional Development Program (CPDP) focuses on professional growth through a structured mentor-mentee program, allowing individuals to learn essential skills directly from industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Mentoring Section */}
      <section className="px-4 md:px-20 py-14 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
          <img src='/ver1.jpeg' alt="Mentorship" className="w-full md:w-2/5 rounded-2xl shadow-xl" />
          <div className="space-y-6 text-[#0D2137]">
            <h2 className="text-3xl font-bold text-[#2E77AE]">Professional Mentoring</h2>
            <p className="text-base md:text-lg font-medium">
              We provide professional mentoring opportunities by connecting mentees with experienced mentors based on shared interests and career aspirations. Intake forms for both mentors and mentees ensure the best possible matches.
            </p>
          </div>
        </div>
      </section>

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
