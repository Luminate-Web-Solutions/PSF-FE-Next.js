import React from 'react'

const Membership = () => {
  return (
    <>
      <div>
        <div
          className="relative bg-cover bg-center h-60 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-[#0d2137]"></div>
          <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
              MEMBERSHIP
            </h1>
          </div>
        </div>

        <div>
          <div className="p-6 md:p-12 max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Enroll in our PSF Membership Today!
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Invest in your future by developing critical skills, building connections, and unlocking career possibilities.
            </p>
            <a
              href="https://join.psfhyd.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#0d2137] hover:bg-[#3e5567] text-white px-5 py-2.5 rounded-full shadow-md transition duration-300"
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
          </div>
        </div>

        <style>
          {`
            @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
            }
        `}</style>
      </div>
    </>
  )
}

export default Membership