import { X, Save, Clock3 } from "lucide-react";
import EventHeroImageUploader from "./EventHeroImageUploader";
import EventImageUploader from "./EventImageUploader";

const EventForm = ({ 
  formData, 
  currentEvent,
  previewHeroImage,
  existingImages,
  previewImages,
  isLoading,
  onClose,
  onSubmit,
  onChange,
  onHeroImageChange,
  onRemoveHeroImage,
  onImagesChange,
  onRemoveExistingImage,
  onRemoveNewImage 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Text Inputs */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle 1</label>
              <input
                type="text"
                name="subtitle1"
                value={formData.subtitle1}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 1</label>
              <textarea
                name="description1"
                value={formData.description1}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle 2</label>
              <input
                type="text"
                name="subtitle2"
                value={formData.subtitle2}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>           

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 2</label>
              <textarea
                name="description2"
                value={formData.description2}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10"
                  disabled={isLoading}
                />
                <Clock3 className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Image Uploaders */}
            <EventHeroImageUploader
              previewHeroImage={previewHeroImage}
              onImageChange={onHeroImageChange}
              onRemoveImage={onRemoveHeroImage}
            />

            <EventImageUploader
              existingImages={existingImages}
              previewImages={previewImages}
              onImageChange={onImagesChange}
              onRemoveExisting={onRemoveExistingImage}
              onRemoveNew={onRemoveNewImage}
              isLoading={isLoading}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  <Save size={16} />
                  {currentEvent ? 'Update Event' : 'Add Event'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;