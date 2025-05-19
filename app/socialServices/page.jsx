import React from 'react';
import { FaChalkboardTeacher, FaLaptopCode, FaPeopleCarry, FaUserShield, FaHeartbeat, FaVenus, FaUsers, FaBullseye, FaLightbulb, FaHandsHelping, FaPeopleArrows, FaChalkboard, FaShieldAlt } from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';

export const metadata = {
  title: 'PSF - Social Services',
  description: 'PSF Social Services empowers professionals to uplift communities through education, mentorship, emergency response, and women empowerment initiatives.',
};

const initiatives = [
  {
    icon: <FaUsers className="text-3xl text-[#2E77AE]" />,
    title: 'Youth Talk Programs',
    description: 'Engage young minds through inspiring conversations that promote values and leadership.',
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl text-[#2E77AE]" />,
    title: 'Teach The Student',
    description: 'Academic support and mentorship from skilled professionals for students who need extra help.',
  },
  {
    icon: <FaVenus className="text-3xl text-[#2E77AE]" />,
    title: 'Women Empowerment',
    description: 'Programs designed to skill, empower, and uplift women in leadership and economic roles.',
  },
  {
    icon: <FaLaptopCode className="text-3xl text-[#2E77AE]" />,
    title: 'Al-Khair Computer Training',
    description: 'Free digital literacy training to bridge the technology divide in underserved communities.',
  },
  {
    icon: <MdCampaign className="text-3xl text-[#2E77AE]" />,
    title: 'Drug Awareness Programs',
    description: 'Educational campaigns to prevent substance abuse in youth, in collaboration with partners.',
  },
  {
    icon: <FaUserShield className="text-3xl text-[#2E77AE]" />,
    title: 'Emergency Response Team',
    description: 'Rapid response teams that provide relief during disasters and emergencies.',
  },
  {
    icon: <FaPeopleCarry className="text-3xl text-[#2E77AE]" />,
    title: 'Slum Development',
    description: 'Collaborative work with NGOs to improve living standards in slum communities.',
  },
];

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
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">SOCIAL SERVICES</h1>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-16 px-6 md:px-20 bg-[#F0F6FC]">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="/social1.png"
            alt="Social Services"
            className="w-full md:w-2/5 rounded-xl shadow-xl object-cover"
          />
          <div className="space-y-6 text-[#0d2137]">
            <h2 className="text-2xl md:text-4xl font-bold text-[#2E77AE]">
              Serving Society, Building Nations
            </h2>
            <p className="text-base md:text-lg font-medium leading-relaxed">
              At PSF’s Social Service, we provide a platform for professionals to contribute their expertise and resources toward community upliftment. We lead initiatives in education, health, empowerment, and emergency relief.
            </p>
            <p className="text-base md:text-lg font-medium leading-relaxed">
              <span className="font-semibold text-[#2E77AE]">Youth Talk Programs</span> inspire the next generation with values, leadership, and guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-[#F0F6FC]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[#0d2137]">
          {/* Goals */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-[#2E77AE]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6 flex items-center gap-3">
              <FaBullseye className="text-[#2E77AE]" /> Our Goals
            </h2>
            <ul className="space-y-5 text-base md:text-lg font-medium">
              <li className="flex items-start gap-3">
                <FaLightbulb className="mt-1 text-[#2E77AE]" />
                Utilize professional expertise to support nation-building.
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 text-[#2E77AE]" />
                Ensure timely and effective crisis response.
              </li>
              <li className="flex items-start gap-3">
                <FaHandsHelping className="mt-1 text-[#2E77AE]" />
                Foster a culture of volunteerism and compassion.
              </li>
            </ul>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-[#2E77AE]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6 flex items-center gap-3">
              <FaLightbulb className="text-[#2E77AE]" /> Our Objectives
            </h2>
            <ul className="space-y-5 text-base md:text-lg font-medium">
              <li className="flex items-start gap-3">
                <FaChalkboardTeacher className="mt-1 text-[#2E77AE]" />
                Promote education and youth mentorship.
              </li>
              <li className="flex items-start gap-3">
                <FaHeartbeat className="mt-1 text-[#2E77AE]" />
                Improve social and health awareness.
              </li>
              <li className="flex items-start gap-3">
                <FaVenus className="mt-1 text-[#2E77AE]" />
                Support women empowerment and equity.
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 text-[#2E77AE]" />
                Provide emergency support and guidance.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Initiatives Cards */}
      <section className="bg-[#F0F6FC] py-16 px-6 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-10 text-center">Our Initiatives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {initiatives.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 border-t-4 border-[#2E77AE]"
            >
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <h3 className="text-xl font-semibold text-[#0d2137]">{item.title}</h3>
              </div>
              <p className="text-[#0d2137] text-sm md:text-base leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 md:px-20 text-[#0d2137]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2E77AE] mb-6">Impact So Far</h2>
        <p className="text-base md:text-lg font-medium leading-relaxed">
          Thousands of students and community members have been impacted positively through our diverse initiatives. From Youth Talks to emergency relief, our work strengthens community resilience and moral values.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-[#2E77AE] text-white text-center py-12 px-6 md:px-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Join PSF Social Service Today!</h2>
        <p className="text-base md:text-lg font-medium mb-6">
          Be a part of the change. Mentor youth, support women, and serve those in need. Together, let’s uplift society.
        </p>
        <p className="text-base md:text-lg font-semibold">
          Become a volunteer and make a difference.
        </p>
        <a
          href="https://join.psfhyd.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex mt-4 items-center bg-[#0d2137] hover:bg-[#3e5567] text-white px-5 py-2.5 rounded-full shadow-md transition duration-300"
        >
          JOIN MEMBERSHIP
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 3h7m0 0v7m0-7L10 14"
            />
          </svg>
        </a>
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
