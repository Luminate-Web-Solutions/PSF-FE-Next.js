import React, { useState } from "react";
import GalleryForm from "./GalleryForm";

const GalleryContainer = () => {
  const [existingImages, setExistingImages] = useState([
    "/uploads/image1.jpg",
    "/uploads/image2.jpg",
  ]);
  const [newFiles, setNewFiles] = useState([]);  // File objects from input
  const [previewImages, setPreviewImages] = useState([]); // preview URLs for newFiles
  const [isLoading, setIsLoading] = useState(false);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const onRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onRemoveNewImage = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare form data for upload
    const formData = new FormData();

    // Append new files
    newFiles.forEach((file) => formData.append("newImages", file));

    // Append existing images info (e.g., their URLs or IDs)
    formData.append("existingImages", JSON.stringify(existingImages));

    // Send formData to your backend API
    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      // handle response
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GalleryForm
      existingImages={existingImages}
      previewImages={previewImages}
      isLoading={isLoading}
      onClose={() => {/* close modal logic */}}
      onSubmit={onSubmit}
      onImagesChange={onImagesChange}
      onRemoveExistingImage={onRemoveExistingImage}
      onRemoveNewImage={onRemoveNewImage}
    />
  );
};

export default GalleryContainer;
