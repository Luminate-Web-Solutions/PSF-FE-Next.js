'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, PencilLine, Plus, X } from 'lucide-react';
import axios from 'axios';

const Verticals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVerticalId, setCurrentVerticalId] = useState(null);
  const [verticalData, setVerticalData] = useState({
    title: '',
    image1: null,
    subtitle1: '',
    description1: '',
    image2: null,
    subtitle2: '',
    description2: '',
    image3: null,
    subtitle3: '',
    description3: '',
    image4: null,
    subtitle4: '',
    description4: '',
    image5: null,
    subtitle5: '',
    description5: '',
  });
  const [verticals, setVerticals] = useState([]);
  const [previewImages, setPreviewImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  // Fetch verticals on component mount
  useEffect(() => {
    fetchVerticals();
  }, []);

  const fetchVerticals = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/verticals');
      setVerticals(response.data);
    } catch (error) {
      console.error('Error fetching verticals:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVerticalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setVerticalData(prev => ({
        ...prev,
        [fieldName]: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => ({
          ...prev,
          [fieldName]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all fields to formData
      Object.keys(verticalData).forEach(key => {
        if (key.includes('image') && verticalData[key]) {
          formData.append(key, verticalData[key]);
        } else {
          formData.append(key, verticalData[key]);
        }
      });

      let response;
      if (isEditMode && currentVerticalId) {
        // Update existing vertical
        response = await axios.put(
          `http://localhost:4000/api/verticals/${currentVerticalId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        // Create new vertical
        response = await axios.post(
          'http://localhost:4000/api/verticals',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      fetchVerticals(); // Refresh the list
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving vertical:', error);
    }
  };

  const handleEdit = (vertical) => {
    setCurrentVerticalId(vertical.id);
    setIsEditMode(true);
    setIsModalOpen(true);

    // Set form data with the vertical's current values
    setVerticalData({
      title: vertical.title || '',
      image1: null,
      subtitle1: vertical.subtitle1 || '',
      description1: vertical.description1 || '',
      image2: null,
      subtitle2: vertical.subtitle2 || '',
      description2: vertical.description2 || '',
      image3: null,
      subtitle3: vertical.subtitle3 || '',
      description3: vertical.description3 || '',
      image4: null,
      subtitle4: vertical.subtitle4 || '',
      description4: vertical.description4 || '',
      image5: null,
      subtitle5: vertical.subtitle5 || '',
      description5: vertical.description5 || '',
    });

    // Set preview images if they exist
    const previews = {};
    for (let i = 1; i <= 5; i++) {
      const imageKey = `image${i}`;
      if (vertical[imageKey]) {
        previews[imageKey] = `http://localhost:4000/${vertical[imageKey]}`;
      }
    }
    setPreviewImages(previews);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vertical?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/verticals/${id}`);
      fetchVerticals(); // Refresh the list
    } catch (error) {
      console.error('Error deleting vertical:', error);
    }
  };

  const resetForm = () => {
    setVerticalData({
      title: '',
      image1: null,
      subtitle1: '',
      description1: '',
      image2: null,
      subtitle2: '',
      description2: '',
      image3: null,
      subtitle3: '',
      description3: '',
      image4: null,
      subtitle4: '',
      description4: '',
      image5: null,
      subtitle5: '',
      description5: '',
    });
    setPreviewImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
    });
    setIsEditMode(false);
    setCurrentVerticalId(null);
  };

  const renderImageUpload = (fieldName, label) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, fieldName)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {previewImages[fieldName] && (
        <div className="mt-2">
          <img
            src={previewImages[fieldName]}
            alt="Preview"
            className="h-20 w-auto rounded"
          />
        </div>
      )}
    </div>
  );

  const renderTextInput = (fieldName, label, placeholder = '') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={fieldName}
        value={verticalData[fieldName]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const renderTextArea = (fieldName, label, placeholder = '') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={fieldName}
        value={verticalData[fieldName]}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with title and Add Vertical button */}
      <div className="flex gap-120 items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Verticals</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#0d2137] hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={18} />
          Add Vertical
        </button>
      </div>

      {/* Vertical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {verticals.map((vertical) => (
          <div
            key={vertical.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold text-gray-800">{vertical.title}</h2>
              </div>
              {vertical.image1 && (
                <img
                  src={`http://localhost:4000/${vertical.image1}`}
                  alt={vertical.title}
                  className="h-40 w-full object-cover mb-4 rounded"
                />
              )}
              <p className="text-gray-600 mb-4">{vertical.subtitle1}</p>
            </div>

            <div className="px-5 py-3 bg-[#0d2137] border-t border-[#0d2137] flex justify-end">
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(vertical)}
                  className="p-2 text-white hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                >
                  <PencilLine size={18} />
                </button>
                <button
                  onClick={() => handleDelete(vertical.id)}
                  className="p-2 text-white hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Vertical Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditMode ? 'Edit Vertical' : 'Add New Vertical'}
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
              {renderTextInput('title', 'Vertical Title', 'Enter vertical title')}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Section 1</h3>
                  {renderImageUpload('image1', 'Image 1')}
                  {renderTextInput('subtitle1', 'Subtitle 1')}
                  {renderTextArea('description1', 'Description 1')}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Section 2</h3>
                  {renderImageUpload('image2', 'Image 2')}
                  {renderTextInput('subtitle2', 'Subtitle 2')}
                  {renderTextArea('description2', 'Description 2')}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Section 3</h3>
                  {renderImageUpload('image3', 'Image 3')}
                  {renderTextInput('subtitle3', 'Subtitle 3')}
                  {renderTextArea('description3', 'Description 3')}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Section 4</h3>
                  {renderImageUpload('image4', 'Image 4')}
                  {renderTextInput('subtitle4', 'Subtitle 4')}
                  {renderTextArea('description4', 'Description 4')}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Section 5</h3>
                  {renderImageUpload('image5', 'Image 5')}
                  {renderTextInput('subtitle5', 'Subtitle 5')}
                  {renderTextArea('description5', 'Description 5')}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0d2137] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditMode ? 'Update Vertical' : 'Save Vertical'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verticals;