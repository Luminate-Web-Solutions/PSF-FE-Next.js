import { X } from "lucide-react";

const EventImageUploader = ({ 
  existingImages = [], 
  previewImages = [], 
  onImageChange, 
  onRemoveExisting, 
  onRemoveNew,
  isLoading 
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Event Images (Max 10) - {existingImages.length + previewImages.length}/10
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        disabled={isLoading || (existingImages.length + previewImages.length >= 10)}
      />

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Existing Images</h4>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img, idx) => (
              <div key={`existing-${idx}`} className="relative">
                <img
                  src={`http://localhost:4000/${img}`}
                  alt={`Existing ${idx}`}
                  className="h-20 w-auto rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => onRemoveExisting(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      {previewImages.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-1">New Images</h4>
          <div className="flex flex-wrap gap-2">
            {previewImages.map((img, idx) => (
              <div key={`new-${idx}`} className="relative">
                <img
                  src={img}
                  alt={`Preview ${idx}`}
                  className="h-20 w-auto rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => onRemoveNew(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventImageUploader;