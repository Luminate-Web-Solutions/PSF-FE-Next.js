import React from 'react';
import { BriefcaseIcon, AcademicCapIcon, DocumentTextIcon, UsersIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

export const metadata = {
  title: 'PSF - Job & Career Guidance',
  description: 'Grooming job seekers with essential skills to approach interviews confidently through resume building, LinkedIn optimization, clinics, and drives.',
};

const JobCareer = () => {
  return (
    <>
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url('/job1.png')` }}
      >
        <div className="absolute inset-0 bg-[#0d2137] bg-opacity-90"></div>
        <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out] px-6">
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            JOB & CAREER GUIDANCE (JCG)
          </h1>
          <p className="text-[#ddd] mt-3 md:text-lg font-medium">
            Bridging the gap between talent and opportunity
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-[#F0F6FC] py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src='/job2.webp'
            alt="Interview Clinics"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE] flex items-center gap-3">
              <UsersIcon className="h-8 w-8 text-[#2E77AE]" />
              Interview Clinics
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Our Interview Clinics connect aspirants to industries, helping them pivot career paths effectively. We offer a unique 10-day orientation program designed to sharpen interview skills, conducted across different city areas.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRightCircleIcon className="h-5 w-5 text-[#2E77AE]" />
                Enroll via our official registration forms.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRightCircleIcon className="h-5 w-5 text-[#2E77AE]" />
                10-day crash course for job-seekers' skill grooming.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRightCircleIcon className="h-5 w-5 text-[#2E77AE]" />
                Mandatory form submission for participation.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Recruiters Connect Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img
            src='/job1.png'
            alt="Recruiters Connect"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE] flex items-center gap-3">
              <BriefcaseIcon className="h-8 w-8 text-[#2E77AE]" />
              Recruiters Connect
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Through Recruiters Connect, we bridge the gap between recruiters and skilled candidates. HR professionals and recruiters are encouraged to drop their contact details, allowing us to link them with suitable profiles.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRightCircleIcon className="h-5 w-5 text-[#2E77AE]" />
                Registration is mandatory for updates and sessions.
              </li>
              <li className="flex items-start gap-2">
                <ArrowRightCircleIcon className="h-5 w-5 text-[#2E77AE]" />
                Stay informed with flash updates from previous sessions.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Initiatives Overview */}
      <section className="bg-[#F0F6FC] py-16 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2E77AE] mb-12">
          Our Key Initiatives
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center text-[#0d2137]">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 hover:shadow-xl transition">
            <AcademicCapIcon className="h-10 w-10 text-[#2E77AE] mx-auto" />
            <h3 className="text-xl font-bold">College Connect</h3>
            <p className="text-base font-medium">
              Career guidance sessions & workshops in colleges, helping students prepare for placements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 hover:shadow-xl transition">
            <UsersIcon className="h-10 w-10 text-[#2E77AE] mx-auto" />
            <h3 className="text-xl font-bold">Interview Clinics</h3>
            <p className="text-base font-medium">
              Monthly 10-day orientation program for interview prep, grooming, and confidence building.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 hover:shadow-xl transition">
            <BriefcaseIcon className="h-10 w-10 text-[#2E77AE] mx-auto" />
            <h3 className="text-xl font-bold">Job Drive</h3>
            <p className="text-base font-medium">
              Creating pathways for job seekers to connect directly with employers for faster hiring.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#2E77AE] text-white py-16 px-6 md:px-20 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Take the First Step Towards Your Dream Career
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Enroll in our programs to build confidence, polish your professional profiles, and connect directly with employers.
        </p>
        <button className="bg-white text-[#2E77AE] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          Join Now
        </button>
      </section>

      {/* Animation Styles */}
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

export default JobCareer;
