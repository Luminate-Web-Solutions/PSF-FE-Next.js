"use client"
import React from 'react';
import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row gap-10 px-6 py-10 bg-gray-100 pr-15 pl-15'>
      {/* Logo */}
      <div className='flex justify-center md:justify-start'>
        <Link href='/'>
          <img src='/psf_logo.png' alt="PSF Logo" className='h-20' />
        </Link>
      </div>

      {/* Contact Info */}
      <div className='flex-1'>
        <h1 className='font-bold text-2xl mb-4'>Contact Info</h1>
        <h2 className='font-semibold'>Location:</h2>
        <p className='text-gray-800'>12-2-458/16/B, 2nd Floor Hills Colony, Mehdipatnam, Hyderabad, Telangana, 500028</p>
        <h2 className='font-semibold mt-2'>Phone No:</h2>
        <p className='text-gray-800'>+91-9988773493</p>
        <h2 className='font-semibold mt-2'>Email:</h2>
        <p className='text-gray-800'>contact@psf-india.org</p>
      </div>

      {/* Connect + Newsletter */}
      <div className='flex-1'>
        <div>
          <h1 className='font-bold text-2xl mb-4'>Connect with us</h1>
          <div className='flex flex-wrap gap-4'>
            <span className='bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 text-white'><a href='https://www.facebook.com/PSFHYD'><Facebook size={20} /></a></span>
            <span className='bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 text-white'><a href=""><Linkedin size={20} /></a></span>
            <span className='bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 text-white'><a href='https://x.com/PSFHYD'><Twitter size={20} /></a></span>
            <span className='bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 text-white'><a href='https://www.instagram.com/psfhyd/'><Instagram size={20} /></a></span>
            <span className='bg-blue-500 p-2 rounded-2xl hover:bg-blue-700 text-white'><a href='https://www.youtube.com/c/ProfessionalsSolidarityForum'><Youtube size={20} /></a></span>
          </div>
        </div>

        <div className='mt-6'>
          <h1 className='font-bold text-2xl mb-2'>Newsletter</h1>
          <p className='text-gray-800 pb-2'>Want to know what we're up to? Sign up for the newsletter and join our tribe.</p>
          <div className='flex flex-col sm:flex-row items-stretch gap-1 '>
            <input
              className='border-2 p-2 flex-1 outline-none'
              type="email"
              placeholder="Your Email"
            />
            <button className='bg-blue-500 text-white px-4 py-2 border-2 border-black hover:bg-blue-600 font-semibold'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
