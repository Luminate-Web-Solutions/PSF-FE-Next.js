import React from 'react';

const ProfessionalsSummit = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64 md:h-96 flex items-center justify-center"
        style={{ backgroundImage: `url('/DONE-1024x341.png')` }}
      >
        <div className="absolute inset-0 "></div>
      </div>

      {/* Info Section */}
      <div className="p-6 md:p-12 max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          What is Professionals Summit?
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          The Professionals Summit 2024 Hyderabad is an event where professionals from diverse fields discuss the latest industry trends, share valuable knowledge, and enhance their communication skills. This forum is dedicated to fostering leadership development and providing unparalleled networking opportunities. Whether you’re looking to stay ahead in your industry, develop your professional skills, or connect with like-minded individuals, Professional Summit 2024 is the perfect platform to elevate your career and expand your horizons. Join us as part of a vibrant community of forward-thinking professionals.
        </p>

        <a
          href="https://professionalssummit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full shadow-md transition duration-300"
        >
          KNOW MORE
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

      </div>

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
          animation: fadeInUp 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalsSummit;
