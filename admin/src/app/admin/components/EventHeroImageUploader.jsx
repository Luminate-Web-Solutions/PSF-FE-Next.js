import { X } from "lucide-react";

const EventHeroImageUploader = ({ 
  heroImage, 
  previewHeroImage, 
  onImageChange, 
  onRemoveImage 
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Hero Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {previewHeroImage && (
        <div className="mt-2 relative">
          <img
            src={previewHeroImage}
            alt="Preview"
            className="h-32 w-auto rounded border border-gray-200"
          />
          <button
            type="button"
            onClick={onRemoveImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EventHeroImageUploader;