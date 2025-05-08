import React from 'react';

const SkillsAcademy = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url('/1.4.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-80"></div>
        <div className="relative z-10 text-center animate-fadeInUp">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            SKILL ACADEMY
          </h1>
          <p className="text-white mt-4 text-lg md:text-2xl font-medium max-w-2xl mx-auto px-6">
            Leading with Purpose. Serving with Passion.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 md:px-20 py-16 bg-[#F0F6FC]">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src='/1.4.jpg'
            alt="About PSF Skills Academy"
            className="w-full md:w-2/5 rounded-xl shadow-lg object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E77AE]">
              About PSF Skills Academy
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              PSF, a non-profit organization founded by a group of professionals from diverse industries, offers a forum for all professionals to use their expertise, free time, and creativity for community development and improving the lives of the poor and oppressed in society.
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="px-6 md:px-20 py-16 bg-[#E0EAF5]">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img
            src='/1.4.jpg'
            alt="Program Details"
            className="w-full md:w-2/5 rounded-xl shadow-lg object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E77AE]">
              Program Details
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              There is an ongoing problem on a global scale due to the severe lack of trained workers in many industries. In order to keep up with the industry’s rapid expansion and development, we must master new technology and prepare ourselves for the difficulties that lie ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Bridging the Skills Gap */}
      <section className="px-6 md:px-20 py-16 bg-[#F0F6FC]">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src='/1.4.jpg'
            alt="Bridging the Skills Gap"
            className="w-full md:w-2/5 rounded-xl shadow-lg object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E77AE]">
              Bridging the Skills Gap
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              We must be ready for the constant updating of technology to meet market demands. We intend to close that gap by offering high-quality training in a variety of subjects, and engaging professionals who are specialists in their industries through the PSF Skills Academy.
            </p>
          </div>
        </div>
      </section>

      {/* Preparing for the Future */}
      <section className="px-6 md:px-20 py-16 bg-[#E0EAF5]">
        <div className="flex flex-col items-center text-center text-[#0d2137] space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2E77AE]">
            Preparing for the Future
          </h2>
          <p className="text-base md:text-lg leading-relaxed font-medium max-w-3xl">
            Our specialized training combines subject expertise, personality development, and hands-on
            experience to make individuals industry-ready and future-proof.
          </p>
          <button className="bg-[#2E77AE] hover:bg-[#1b5c8a] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
            Courses Offered: Coming Soon!
          </button>
        </div>
      </section>

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
