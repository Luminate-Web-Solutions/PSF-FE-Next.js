import React, { useState, useEffect } from 'react';

const Subscribers = () => {
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  const [contactSubscribers, setContactSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTable, setExpandedTable] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        
        // Fetch both types of subscribers in parallel
        const [newsletterRes, contactRes] = await Promise.all([
          fetch('http://localhost:4000/api/subscribe/news'),
          fetch('http://localhost:4000/api/subscribe/contact')
        ]);

        if (!newsletterRes.ok || !contactRes.ok) {
          throw new Error('Failed to fetch subscribers');
        }

        const newsletterData = await newsletterRes.json();
        const contactData = await contactRes.json();

        setNewsletterSubscribers(newsletterData);
        setContactSubscribers(contactData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const toggleTable = (table) => {
    setExpandedTable(expandedTable === table ? null : table);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0D2137]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0D2137] mb-8">Subscribers Management</h1>
      
      {/* Newsletter Subscribers Section */}
      <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-[#0D2137] text-white cursor-pointer"
          onClick={() => toggleTable('newsletter')}
        >
          <h2 className="text-xl font-semibold">
            Newsletter Subscribers ({newsletterSubscribers.length})
          </h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${
              expandedTable === 'newsletter' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedTable === 'newsletter' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsletterSubscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(subscriber.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Contact Subscribers Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-[#0D2137] text-white cursor-pointer"
          onClick={() => toggleTable('contact')}
        >
          <h2 className="text-xl font-semibold">
            Contact Form Subscribers ({contactSubscribers.length})
          </h2>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${
              expandedTable === 'contact' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expandedTable === 'contact' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contactSubscribers.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.number}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribers;