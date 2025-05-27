"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BASEURL = "http://localhost:4000";

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get(`${BASEURL}/api/newsletter`);
      setNewsletters(res.data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("file", file);

    try {
      if (editId) {
        await axios.put(`${BASEURL}/api/newsletter/${editId}`, formData);
      } else {
        await axios.post(`${BASEURL}/api/newsletter`, formData);
      }
      setTitle("");
      setFile(null);
      setEditId(null);
      setIsModalOpen(false);
      fetchNewsletters();
    } catch (error) {
      console.error("Error submitting newsletter:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASEURL}/api/newsletter/${id}`);
      fetchNewsletters();
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    }
  };

  const handleEdit = (newsletter) => {
    setTitle(newsletter.title);
    setEditId(newsletter.id);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setTitle("");
    setFile(null);
    setEditId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setFile(null);
    setEditId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-130 items-center mb-6">
        <h2 className="text-2xl font-bold">Newsletters ({newsletters.length})</h2>
        <button
          onClick={openModal}
          className="bg-[#0d2137] text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          + Add Newsletter
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editId ? "Edit Newsletter" : "Add Newsletter"}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Newsletter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File
                </label>
                <input
                  type="file"
                  accept=".pdf,.docx,.jpg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editId ? "Update" : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newsletters.map((n) => (
              <tr key={n.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{n.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{n.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {n.file && (
                    <a
                      href={`${BASEURL}/${n.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      View File
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(n)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                     <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                     <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {newsletters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No newsletters found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;