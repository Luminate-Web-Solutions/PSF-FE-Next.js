import React from 'react';

const SocialServices = () => {
  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url('/social1.png')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-90"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out] px-6">
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            SOCIAL SERVICES
          </h1>
        </div>
      </div>

      {/* About Section */}
      <section className=" py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src='/social1.png'
            alt="Social Services"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE]">
              Serving Society, Building Nations
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Through our Social Services initiatives, we offer professionals a platform to contribute their time, skills, and efforts towards societal upliftment and nation-building. We stand together during crises, extending help where it matters the most.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Our <span className="font-semibold text-[#2E77AE]">Youth Talk Programs</span> are crafted to inspire and empower the younger generation. By being a friend and mentor, we aim to restore moral values and positive leadership traits early in life.
            </p>
          </div>
        </div>
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
