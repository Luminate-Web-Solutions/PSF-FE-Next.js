'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import GalleryTable from "../../components/GalleryTable";
import GalleryForm from "../../components/GalleryForm";

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGallery, setCurrentGallery] = useState(null);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch galleries
  useEffect(() => {
    const fetchGalleries = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/gallery");
        setGalleries(res.data);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        alert("Failed to load galleries");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  // Handle multiple images upload with preview
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const previews = [];
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === selectedFiles.length) {
          setPreviewImages(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Reset form
  const resetForm = () => {
    setImages([]);
    setPreviewImages([]);
    setExistingImages([]);
    setCurrentGallery(null);
  };

  // Submit handler (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    images.forEach((file) => {
      formDataToSend.append('images', file);
    });

    try {
      if (currentGallery) {
        // Update existing gallery
        await axios.put(`http://localhost:4000/api/gallery/${currentGallery.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // Create new gallery
        await axios.post("http://localhost:4000/api/gallery", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // Refresh galleries
      const res = await axios.get("http://localhost:4000/api/gallery");
      setGalleries(res.data);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving gallery:", error);
      alert(`Failed to save gallery: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit gallery
  const handleEdit = (gallery) => {
    setCurrentGallery(gallery);

    if (gallery.images) {
      const imgs = typeof gallery.images === 'string' ? JSON.parse(gallery.images) : gallery.images;
      setExistingImages(imgs);
    }

    setShowForm(true);
  };

  // Delete gallery
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery?")) return;
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/gallery/${id}`);
      setGalleries(galleries.filter(g => g.id !== id));
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("Failed to delete gallery");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove new image
  const removeNewImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:gap-10 md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gallery Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
          disabled={isLoading}
        >
          <Plus size={18} />
          Add Gallery
        </button>
      </div>

      <GalleryTable
        galleries={galleries}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {showForm && (
        <GalleryForm
          existingImages={existingImages}
          previewImages={previewImages}
          isLoading={isLoading}
          onClose={() => {
            setShowForm(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
          onImagesChange={handleImageChange}
          onRemoveExistingImage={removeExistingImage}
          onRemoveNewImage={removeNewImage}
        />
      )}
    </div>
  );
};

export default GalleryPage;
