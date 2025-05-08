import React from 'react';
import { ArrowUpNarrowWide, Users, ContactRound, Handshake } from 'lucide-react';
import Link  from 'next/link';

const Cpdp = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0D2137] "></div>
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-2xl md:text-5xl font-bold drop-shadow-lg">
            Continuous Professional Development Program
          </h1>
          <p className="text-[#E0EAF5] mt-4 text-base md:text-xl max-w-2xl mx-auto font-medium">
            Empower professionals with the skills and insights needed to excel and advance in their careers.
          </p>
        </div>
      </div>

      {/* Description */}
      <section className="max-w-screen-xl mx-auto px-10 md:px-8 py-10 md:py-16 ">
        <p className="text-base md:text-lg leading-relaxed text-justify">
          At PSF Hyderabad, the Continuous Professional Development Program (CPDP) is designed to empower professionals
          with essential skills, insights, and competencies needed to thrive in today’s dynamic and competitive
          workplace. Through a blend of targeted programs, CPDP focuses on enhancing leadership abilities,
          strengthening organizational skills, and fostering critical behavioral competencies – all with the goal of
          accelerating your career growth.
        </p>
      </section>

      {/* CPDP Goals */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#0D2137]">CPDP AIMS TO</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: '/18.jpg', title: "Build Leadership Excellence", desc: "Equip yourself with the skills to lead effectively and inspire others." },
              { img: '/19.jpg', title: "Strengthen Organizational Skills", desc: "Master time management, project planning, and strategic execution to boost productivity." },
              { img: '/ver1.jpeg', title: "Enhance Behavioral Skills", desc: "Improve emotional intelligence, communication, and conflict resolution abilities." },
              { img: '/17.jpg', title: "Foster Continuous Learning", desc: "Stay ahead of industry trends with ongoing education and development." },
              { img: '/14.jpg', title: "Advance Your Career", desc: "Unlock new opportunities and prepare for leadership through development programs." },
              { img: '/22.jpg', title: "Expand Your Network", desc: "Connect with professionals and build valuable relationships." }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#d55e2d] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#0D2137]">OUR INITIATIVES</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              icon: <ArrowUpNarrowWide className="text-[#d55e2d] w-8 h-8 mt-1" />,
              title: "1. Elevate Your Career Program",
              desc: "Accelerate your growth, build a personal brand, and gain visibility through leadership strategies."
            },
            {
              icon: <Users className="text-[#d55e2d] w-8 h-8 mt-1" />,
              title: "2. Mentor-Mentee Program",
              desc: "Personalized guidance from mentors to help you achieve your career goals."
            },
            {
              icon: <ContactRound className="text-[#d55e2d] w-8 h-8 mt-1" />,
              title: "3. LinkedIn for Career Visibility",
              desc: "Learn how to create a standout LinkedIn profile, write ATS-friendly resumes, and excel in interviews."
            },
            {
              icon: <Handshake className="text-[#d55e2d] w-8 h-8 mt-1" />,
              title: "4. Meet the Professionals",
              desc: "Network with industry leaders, gain insights, and explore professional opportunities."
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              {item.icon}
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0D2137] text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Enroll in our CPDP Programs today!</h2>
        <p className="max-w-2xl mx-auto mb-6 text-base md:text-lg">
          Invest in your future by developing critical skills, building connections, and unlocking career possibilities.
        </p>
        <Link
          href="/membership"
          className="inline-block bg-white text-[#0D2137] px-6 py-3 rounded-lg font-semibold hover:bg-[#d55e2d] hover:text-white transition-all"
        >
          MEMBERSHIP
        </Link>
      </section>

      {/* Animation */}
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
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Cpdp;
