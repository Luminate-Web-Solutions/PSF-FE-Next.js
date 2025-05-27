import React from "react";
import { Edit, Trash2 } from 'lucide-react';

const GalleryTable = ({ galleries, onEdit, onDelete, isLoading }) => {
  if (isLoading) return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-600">Loading galleries...</span>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Images
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {galleries.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                No galleries found.
              </td>
            </tr>
          ) : (
            galleries.map((gallery) => (
              <tr key={gallery.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {(gallery.images || []).map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={`http://localhost:4000${img.replace('/uploads/', '/uploads/gallery/')}`}
                          alt={`Gallery ${idx + 1}`}
                          className="h-20 w-20 object-cover rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/80?text=Image+Not+Found";
                          }}
                        />
                        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md"></div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => onEdit(gallery)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                   <Edit size={18} /> 
                  </button>
                  <button
                    onClick={() => onDelete(gallery.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <Trash2 size={18} /> 
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryTable;