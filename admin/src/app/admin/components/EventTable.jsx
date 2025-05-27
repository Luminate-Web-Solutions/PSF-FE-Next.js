import { Edit, Trash2, Calendar } from "lucide-react";
import StatusBadge from "./EventStatusBadge";

const EventTable = ({ events, onEdit, onDelete, isLoading }) => {
  if (isLoading && events.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">No events found. Add your first event to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={event.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}>
                <td className="px-4 py-4">
                  <div className="text-xs text-gray-500 break-all">{event.id}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-semibold text-gray-900">{event.name}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                  <StatusBadge status={event.status} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(event)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(event.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;