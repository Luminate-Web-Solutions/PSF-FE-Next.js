'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import TestimonialTable from '../components/TestimonialTable';

const TestimonialForm = dynamic(
  () => import('../components/TestimonalForm'),
  { ssr: false }
);

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    title: '', 
    emailId: '', 
    content: '', 
    avatar: '' 
  });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Define all functions at the top level of the component
  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:4000/api/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      title: '', 
      emailId: '', 
      content: '', 
      avatar: '' 
    });
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('emailId', formData.emailId);
      data.append('content', formData.content);
      if (formData.avatar instanceof File) {
        data.append('avatar', formData.avatar);
      }

      if (editId) {
        await axios.put(`http://localhost:4000/api/testimonials/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:4000/api/testimonials', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      resetForm();
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert('Failed to save testimonial');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name || '',
      title: testimonial.title || '',
      emailId: testimonial.emailId || '',
      content: testimonial.content || '',
      avatar: testimonial.avatar || ''
    });
    setEditId(testimonial._id || testimonial.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/testimonials/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Testimonials</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">
                {editId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <TestimonialForm 
                formData={formData} 
                setFormData={setFormData} 
                handleSubmit={handleSubmit} 
                isLoading={isLoading}
                onCancel={resetForm}
                editId={editId}
              />
            </div>
          </div>
        </div>
      )}

      <TestimonialTable 
        testimonials={testimonials} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default TestimonialPage;