import React from 'react';

const President = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[20vh] md:h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0D2137]"></div>
        <div className="relative z-10 text-center animate-fadeInUp px-4">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            MESSAGE FROM THE PRESIDENT
          </h1>
        </div>
      </div>

      {/* Message Section */}
      <div className="flex flex-col md:flex-row gap-8 px-6 py-10 items-center max-w-6xl mx-auto">
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src='./arif.jpg'
            alt="President Arif Sabeel"
            className="h-[300px] md:h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full text-justify">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0D2137] mb-1">
            ARIF SABEEL
          </h2>
          <p className="text-[#555] font-medium mb-4">
            President of PSF Hyderabad
          </p>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            quisquam, atque cumque quo quas rem! Fugiat, inventore dolorem.
            Repellendus, consequuntur eum quae quidem temporibus nostrum
            ducimus aspernatur facere praesentium, earum fugit iure illum vero
            nemo. Commodi autem rerum voluptatum temporibus? Maiores sed
            voluptate iusto consectetur explicabo recusandae labore, ad ab.
          </p>
        </div>
      </div>

      {/* Keyframes for Animation */}
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
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default President;
