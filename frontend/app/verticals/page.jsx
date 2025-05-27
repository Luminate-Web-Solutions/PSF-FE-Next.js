import React from 'react'
import VerticalCard from '../components/VerticalCard';
import PhotoGallery from '../components/PhotoGallery';

export const metadata = {
  title: 'PSF - Verticals',
  description: '...',
}


const Verticals = () => {

  
  return (
    <div>
      {/* Intro Section */}
      <div
        className="relative bg-cover bg-center h-100 flex items-center justify-center px-4"
        style={{ backgroundImage: `url('/27.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137]/60"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
            VERTICALS OF PSF
          </h1>
          <p className="text-[#f9f9f9] mt-4 text-sm md:text-lg font-light max-w-xl mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta expedita dolore quidem explicabo cum in id consequatur, rem eaque? Neque.
          </p>
        </div>
      </div>

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

      {/* Verticals */}
      <div className="py-10 pr-6 pl-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">5 VERTICALS OF PSF</h1>
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
              link: '/skillsAcademy',
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

      {/* Photo Gallery Carousel */}
      <div>
        <PhotoGallery/>
      </div>
      
    </div>
    
  );
};

export default Verticals;
