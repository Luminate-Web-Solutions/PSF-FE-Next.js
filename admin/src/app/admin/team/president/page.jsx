'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import axios from 'axios';

const President = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presidentData, setPresidentData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    description1: '',
    description2: '',
    description3: '',
    description4: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch president data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/president');
        setPresidentData(response.data);
      } catch (error) {
        console.error('Error fetching president data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (isEditing) {
        // Update existing
        await axios.put(`http://localhost:4000/api/president/${currentId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new
        await axios.post('http://localhost:4000/api/president', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Refresh data
      const response = await axios.get('http://localhost:4000/api/president');
      setPresidentData(response.data);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving president data:', error);
    }
  };

  const handleEdit = (president) => {
    setFormData({
      title: president.title,
      image: null,
      description1: president.description1,
      description2: president.description2,
      description3: president.description3,
      description4: president.description4
    });
    setPreviewImage(president.image ? `http://localhost:4000/${president.image}` : '');
    setIsEditing(true);
    setCurrentId(president.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/president/${id}`);
      setPresidentData(presidentData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting president data:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: null,
      description1: '',
      description2: '',
      description3: '',
      description4: ''
    });
    setPreviewImage('');
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">President</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={18} />
          Add President Details
        </button>
      </div>

      {/* President Content */}
      {presidentData.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            {presidentData[0].image && (
              <img
                src={`http://localhost:4000/${presidentData[0].image}`}
                alt={presidentData[0].title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleEdit(presidentData[0])}
                className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(presidentData[0].id)}
                className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {presidentData[0].title}
            </h2>

            <div className="space-y-6">
              {presidentData[0].image && (
                <img
                  src={`http://localhost:4000/${presidentData[0].image1}`}
                  alt={vertical.title}
                  className="h-40 w-full object-cover mb-4 rounded"
                />
              )}
              {presidentData[0].description1 && (
                <p className="text-gray-700 leading-relaxed">
                  {presidentData[0].description1}
                </p>
              )}
              {presidentData[0].description2 && (
                <p className="text-gray-700 leading-relaxed">
                  {presidentData[0].description2}
                </p>
              )}
              {presidentData[0].description3 && (
                <p className="text-gray-700 leading-relaxed">
                  {presidentData[0].description3}
                </p>
              )}
              {presidentData[0].description4 && (
                <p className="text-gray-700 leading-relaxed">
                  {presidentData[0].description4}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">No president details available. Add some to get started.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Edit President Details' : 'Add President Details'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {previewImage && (
                    <div className="mt-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-40 rounded-md border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description {num}
                    </label>
                    <textarea
                      name={`description${num}`}
                      value={formData[`description${num}`]}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Save size={16} />
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default President;