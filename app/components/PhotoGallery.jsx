'use client'; // if using in an app directory

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { X } from 'lucide-react';
import Image from 'next/image';

const galleryImages = [
  '/10.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg',
  '/6.jpg', '/7.jpg', '/8.jpg', '/9.jpg', '/11.jpg',
  '/12.jpg', '/13.jpg', '/14.jpg', '/15.jpg', '/16.jpg',
  '/17.jpg', '/18.jpg', '/19.jpg', '/20.jpg', '/21.jpg',
  '/22.jpg', '/23.jpg',
];

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">PHOTO GALLERY</h1>

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          navigation={true}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {galleryImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="group overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={src}
                  alt={`Gallery ${index}`}
                  width={600}
                  height={400}
                  onClick={() => openImage(src)}
                  className="w-full h-[300px] md:h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-5 right-5 text-white text-3xl z-50"
            onClick={closeModal}
          >
            <X />
          </button>
          <Image
            src={selectedImage}
            alt="Preview"
            width={1000}
            height={700}
            className="max-w-full max-h-[90vh] rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
