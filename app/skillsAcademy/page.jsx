import React from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UsersIcon,
  SparklesIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

export const metadata = {
  title: 'PSF - Skills Academy',
  description: 'Transforming lives through world-class skill development programs, empowering individuals for industry readiness and economic growth.',
};

const SkillsAcademy = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url('/1.4.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-80" />
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            SKILLS ACADEMY
          </h1>
          <p className="text-white mt-4 text-lg md:text-2xl font-medium max-w-xl mx-auto">
            Empowering lives through industry-ready skills and training.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="/1.4.jpg"
            alt="About PSF Skills Academy"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-3xl font-bold text-[#2E77AE] flex items-center gap-2">
              <AcademicCapIcon className="h-8 w-8 text-[#2E77AE]" />
              About PSF Skills Academy
            </h2>
            <p className="text-lg font-medium leading-relaxed">
              PSF Skills Academy is a non-profit initiative committed to transforming lives through skill development. We offer world-class training programs designed to produce job-ready professionals who contribute meaningfully to the industry and the economy.
            </p>
          </div>
        </div>
      </section>

      {/* Goals & Objectives */}
      <section className="px-6 md:px-20 py-16 bg-[#F0F6FC] text-[#0d2137]">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#2E77AE]">
          🎯 Our Goals & Objectives
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Skill-based trainings for placement readiness",
            "Continuous course improvements aligned with industry standards",
            "College connect bootcamps to bridge academia and industry",
            "Interview clinics and HR collaborations",
            "Upskilling programs for tech advancement",
            "Peer learning through skill-based groups"
          ].map((goal, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-[#2E77AE] text-xl font-semibold mb-2">
                <LightBulbIcon className="h-6 w-6 inline-block mr-2" />
                {goal}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#2E77AE] mb-10">🚀 Our Initiatives</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Job-Oriented Courses', icon: <BriefcaseIcon className="h-6 w-6 text-[#2E77AE]" />, desc: 'Courses focused on real-world job skills and industry readiness.' },
            { title: 'College Connect Bootcamps', icon: <AcademicCapIcon className="h-6 w-6 text-[#2E77AE]" />, desc: 'Specialized sessions to bridge the academic-industry divide.' },
            { title: 'Interview Clinics & Industry Connect', icon: <UsersIcon className="h-6 w-6 text-[#2E77AE]" />, desc: 'Workshops and placement assistance via HR/job agency tie-ups.' },
            { title: 'Upskilling Programs', icon: <SparklesIcon className="h-6 w-6 text-[#2E77AE]" />, desc: 'Advanced courses to level up in emerging technologies.' },
            { title: 'Skill-Based Peer Groups', icon: <ChartBarIcon className="h-6 w-6 text-[#2E77AE]" />, desc: 'Community-driven learning and mentorship opportunities.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-[#F0F6FC] p-6 rounded-lg shadow-sm hover:shadow-md">
              <div>{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-[#0d2137]">{item.title}</h3>
                <p className="text-base font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Impact */}
      <section className="px-6 md:px-20 py-16 bg-[#E0EAF5] text-center text-[#0d2137]">
        <h2 className="text-3xl font-bold text-[#2E77AE] mb-6">🌟 Our Vision</h2>
        <p className="text-lg font-medium max-w-3xl mx-auto mb-10">
          Bridging the gap between education, skills, and industry needs.
        </p>

        <h2 className="text-3xl font-bold text-[#2E77AE] mb-6">📊 Our Impact</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 text-left max-w-4xl mx-auto text-lg font-medium">
          <div>✅ Trained over <strong>500+</strong> students</div>
          <div>💼 Enabled <strong>200+</strong> job placements</div>
          <div>💡 Empowered individuals for nation-building</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-16 bg-white text-center text-[#0d2137]">
        <h2 className="text-3xl font-bold text-[#2E77AE] mb-6">🙌 Join the Movement</h2>
        <p className="text-lg font-medium max-w-3xl mx-auto mb-8">
          Be a part of PSF Skills Academy – let’s create a skilled and resilient generation together.
        </p>
        <button className="bg-[#2E77AE] hover:bg-[#1b5c8a] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
          Get Job-Ready with Us!
        </button>
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
