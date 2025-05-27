import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const TestimonialTable = ({ testimonials, onEdit, onDelete, isLoading }) => (
  <div className="overflow-x-auto rounded-lg border shadow-sm mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {isLoading ? (
          <tr>
            <td colSpan="4" className="px-6 py-4 text-center">
              <div className="flex justify-center">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </td>
          </tr>
        ) : testimonials.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No testimonials found</td>
          </tr>
        ) : (
          testimonials.map((testimonial, index) => (
            <tr key={testimonial.id || testimonial.emailId || index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testimonial.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{testimonial.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(testimonial)} 
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                    disabled={isLoading}
                  >
                    <Edit size={18} />
                    <span className="sr-only">Edit</span>
                  </button>
                  <button 
                    onClick={() => onDelete(testimonial.id)} 
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                    disabled={isLoading}
                  >
                    <Trash2 size={18} />
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default TestimonialTable;