import React from "react";

const GalleryForm = ({
  existingImages,
  previewImages,
  isLoading,
  onClose,
  onSubmit,
  onImagesChange,
  onRemoveExistingImage,
  onRemoveNewImage,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg p-6 w-full max-w-lg overflow-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold mb-4">
          {existingImages.length > 0 ? "Edit Gallery" : "Add Gallery"}
        </h2>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <p className="mb-2 font-medium">Existing Images:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={`http://localhost:4000${img.replace('/uploads/', '/uploads/gallery/')}`}
                    alt={`Existing ${idx}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images Upload */}
        <label className="block mb-2 font-medium">Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImagesChange}
          className="mb-4"
          disabled={isLoading}
        />

        {/* Preview New Images */}
        {previewImages.length > 0 && (
          <div>
            <p className="mb-2 font-medium">New Images Preview:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {previewImages.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${idx}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveNewImage(idx)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
