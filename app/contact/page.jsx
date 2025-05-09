import React from 'react';

export const metadata = {
  title: 'PSF - Contact',
  description: '...',
}

const Contact = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#E0EAF5] min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src='/contact.avif'
            alt="Contact"
            className="max-w-full lg:max-w-md rounded-2xl shadow-2xl object-cover"
          />
        </div>

        {/* Right Section - Contact Info + Form */}
        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-[#0D2137] mb-4">Get in Touch</h1>
          <p className="text-gray-700 mb-8">
            We'd love to hear from you! Fill out the form below or reach out to us directly.
          </p>

          <div className='flex gap-4'>
          {/* Contact Info */}
          <div className="mb-8 space-y-3 text-[#0D2137]">
            <h2 className="text-2xl font-semibold border-b-4 border-[#2E77AE] inline-block pb-1 mb-3">
              Contact Info
            </h2>
            <p><strong>📧 Email:</strong> 
            <p><span className="text-[#2E77AE]">contact@psf-india.org</span></p>
            </p>
            <p><strong>📞 Phone:</strong> 
            <p><span className="text-[#2E77AE]">+91-9988773493</span></p> 
            </p>
            <p><strong>📍 Location:</strong> 
            <p><span className="text-[#2E77AE]">12-2-458/16/B, Hills Colony, Mehdipatnam, Hyderabad, Telangana, 500028</span></p>
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#2E77AE] hover:bg-[#FF8E2B] text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
