import React from 'react';

const TestimonialForm = ({ 
  formData, 
  setFormData, 
  handleSubmit, 
  isLoading, 
  onCancel,
  editId 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="CEO, Company Inc."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
          placeholder="john@example.com"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Testimonial</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Share your experience..."
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {formData.avatar && !(formData.avatar instanceof File) ? 'Current Avatar' : 'Upload Avatar'}
        </label>
        {formData.avatar && !(formData.avatar instanceof File) && (
          <div className="mb-2 flex items-center space-x-4">
            <img 
              src={`http://localhost:4000${formData.avatar}`} 
              alt="Current avatar" 
              className="h-16 w-16 object-cover rounded-full"
            />
            <span className="text-sm text-gray-500">Current photo</span>
          </div>
        )}
        <div className="relative">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editId ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            editId ? 'Update Testimonial' : 'Add Testimonial'
          )}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;