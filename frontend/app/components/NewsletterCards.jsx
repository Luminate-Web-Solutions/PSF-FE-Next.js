'use client'; // if using Next.js App Router

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsletterCards = () => {
  const [newsletter, setNewsletter] = useState(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/newsletter');
        setNewsletter(res.data); // adjust if data is inside `res.data.newsletter`
      } catch (err) {
        console.error('Error fetching newsletter:', err);
      }
    };

    fetchNewsletter();
  }, []);

  const handleReadMore = () => {
    if (newsletter?.pdf) {
      const pdfUrl = `http://localhost:4000/${newsletter.pdf.replace(/\\/g, '/')}`;
      window.open(pdfUrl, '_blank');
    }
  };

  if (!newsletter) {
    return <div className="text-white text-center">Loading newsletter...</div>;
  }

  return (
    <div>
      <div className="bg-[#0D2137] rounded-2xl p-6 w-[90%] max-w-md shadow-lg flex flex-col">
        <img
          src={`http://localhost:4000/${newsletter.coverImage?.replace(/\\/g, '/') || 'Newsletter.png'}`}
          alt="Newsletter Cover"
          className="rounded-2xl h-[250px] w-full object-cover mb-6"
        />
        <div className="text-white text-center">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            {newsletter.title || 'January to June 2024 Newsletter covering our major activities'}
          </h2>
          <button
            onClick={handleReadMore}
            className="bg-[#e0eaf5] text-[#0d2137] font-semibold py-2 px-6 rounded-2xl hover:bg-[#c9d8eb] transition duration-300"
          >
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterCards;
