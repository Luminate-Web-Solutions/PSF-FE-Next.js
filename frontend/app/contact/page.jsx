'use client'

import React, { useState } from 'react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:4000/api/subscribe/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          number: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus(`error: ${errorData.error || 'Failed to submit form'}`);
      }
    } catch (error) {
      setSubmitStatus(`error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <div className='flex gap-4 flex-col lg:flex-row'>
            {/* Contact Info */}
            <div className="mb-8 space-y-3 text-[#0D2137]">
              <h2 className="text-2xl font-semibold border-b-4 border-[#2E77AE] inline-block pb-1 mb-3">
                Contact Info
              </h2>
              <p><strong>📧 Email:</strong></p>
              <p><span className="text-[#2E77AE]">contact@psf-india.org</span></p>
              <p><strong>📞 Phone:</strong></p>
              <p><span className="text-[#2E77AE]">+91-9988773493</span></p>
              <p><strong>📍 Location:</strong></p>
              <p><span className="text-[#2E77AE]">12-2-458/16/B, Hills Colony, Mehdipatnam, Hyderabad, Telangana, 500028</span></p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
                required
              />
              <input
                type="tel"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none"
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#2E77AE] outline-none resize-none"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2E77AE] hover:bg-[#FF8E2B] text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus && (
                <div className={`mt-2 p-3 rounded-lg text-center ${
                  submitStatus.startsWith('error') 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {submitStatus.startsWith('error') 
                    ? `Error: ${submitStatus.replace('error: ', '')}`
                    : 'Message sent successfully! We will contact you soon.'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;