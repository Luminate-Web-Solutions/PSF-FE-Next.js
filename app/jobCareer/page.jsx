import React from 'react';

export const metadata = {
  title: 'PSF - Job & Career Guidance',
  description: '...',
}

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
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE]">
              Interview Clinics
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Our Interview Clinics connect aspirants to industries, helping them pivot career paths effectively. We offer a unique 10-day orientation program designed to sharpen interview skills, conducted across different city areas.
            </p>
            <ul className="list-disc list-inside text-base md:text-lg leading-relaxed font-medium">
              <li>Enroll via our official registration forms.</li>
              <li>10-day crash course for job-seekers' skill grooming.</li>
              <li>Mandatory form submission for participation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className=" py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img
            src='/job1.png'
            alt="Recruiters Connect"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="text-[#0d2137] space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE]">
              Recruiters Connect
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium">
              Through Recruiters Connect, we bridge the gap between recruiters and skilled candidates. HR professionals and recruiters are encouraged to drop their contact details, allowing us to link them with suitable profiles.
            </p>
            <ul className="list-disc list-inside text-base md:text-lg leading-relaxed font-medium">
              <li>Registration is mandatory for updates and sessions.</li>
              <li>Stay informed with flash updates from previous sessions.</li>
            </ul>
          </div>
        </div>
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
