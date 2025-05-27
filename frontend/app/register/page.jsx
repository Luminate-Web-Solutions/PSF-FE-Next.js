import React from 'react'
import { Construction } from 'lucide-react'; 

export const metadata = {
  title: 'PSF - Register',
  description: '...',
}

const Register = () => {
  return (
    <>
    <div>
    <div className="relative bg-cover bg-center h-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0d2137]"></div>
      <div className="relative z-10 text-center animate-[fadeInUp_1s_ease-out]">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
          REGISTRATION
        </h1>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-xl w-full animate-fadeInUp">
        <Construction className="w-16 h-16 text-[#d55e2d] mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          This Page is Under Construction
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          We’re working hard to bring you something amazing here. Please check back later.
        </p>
        {/* Optional CTA */}
        <button className="mt-6 bg-[#d55e2d] text-white px-5 py-2 rounded-lg hover:bg-[#b64b22] transition">
          Go to Home
        </button>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  </div>
</>
  )
}

export default Register