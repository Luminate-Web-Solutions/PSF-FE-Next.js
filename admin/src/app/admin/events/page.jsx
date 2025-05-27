'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import EventTable from "../components/EventTable";
import EventForm from "../components/EventForm";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    subtitle1: "",
    subtitle2: "",
    description1: "",
    description2: "",
    date: "",
    time: "",
    status: "upcoming",
  });

  const [heroImage, setHeroImage] = useState(null);
  const [images, setImages] = useState([]);
  const [previewHeroImage, setPreviewHeroImage] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle hero image upload with preview
  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewHeroImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle multiple images upload with preview
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + (existingImages?.length || 0) > 10) {
      alert("You can upload a maximum of 10 images total.");
      return;
    }
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
    setFormData({
      name: "",
      subtitle1: "",
      subtitle2: "",
      description1: "",
      description2: "",
      date: "",
      time: "",
      status: "upcoming",
    });
    setHeroImage(null);
    setImages([]);
    setPreviewHeroImage("");
    setPreviewImages([]);
    setExistingImages([]);
    setCurrentEvent(null);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    // Append images - match backend expectations
    formDataToSend.append('heroImage', heroImage);
    images.forEach((file) => {
      formDataToSend.append('images', file);
    });


    try {
      if (currentEvent) {
        // Update existing event
        await axios.put(`http://localhost:4000/api/events/${currentEvent.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // Create new event
        await axios.post("http://localhost:4000/api/events", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      // Refresh events
      const res = await axios.get("http://localhost:4000/api/events");
      setEvents(res.data);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
      alert(`Failed to save event: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit event
  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      name: event.name,
      subtitle1: event.subtitle1,
      subtitle2: event.subtitle2,
      description1: event.description1,
      description2: event.description2,
      date: event.date,
      status: event.status,
    });

    // Handle existing images
    if (event.heroImage) {
      setPreviewHeroImage(`http://localhost:4000/${event.heroImage}`);
    }

    if (event.images) {
      // Parse images if they're stored as JSON string
      const parsedImages = typeof event.images === 'string' ? JSON.parse(event.images) : event.images;
      setExistingImages(parsedImages);
    }

    setShowForm(true);
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove existing image
  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
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

  // Remove hero image
  const removeHeroImage = () => {
    setHeroImage(null);
    setPreviewHeroImage("");
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:gap-110 md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Events Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
          disabled={isLoading}
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <EventTable
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {showForm && (
        <EventForm
          formData={formData}
          currentEvent={currentEvent}
          previewHeroImage={previewHeroImage}
          existingImages={existingImages}
          previewImages={previewImages}
          isLoading={isLoading}
          onClose={() => {
            setShowForm(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onHeroImageChange={handleHeroImageChange}
          onRemoveHeroImage={removeHeroImage}
          onImagesChange={handleImageChange}
          onRemoveExistingImage={removeExistingImage}
          onRemoveNewImage={removeNewImage}
        />
      )}
    </div>
  );
};

export default EventPage;