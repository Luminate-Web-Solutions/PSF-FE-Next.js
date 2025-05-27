'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { X } from 'lucide-react';


const PhotoGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/gallery');
        const images = response.data.flatMap((gallery) =>
          (gallery.images || []).map((img) => `http://localhost:4000${img.replace('/uploads/', '/uploads/gallery/')}`)
        );
        setGalleryImages(images);
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      }
    };

    fetchGallery();
  }, []);

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
          autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                <img
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
