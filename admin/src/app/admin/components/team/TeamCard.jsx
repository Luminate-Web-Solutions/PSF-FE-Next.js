import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const TeamCard = ({ 
  team, 
  onEditTeam, 
  onDeleteTeam, 
  onAddMember, 
  onEditMember, 
  onDeleteMember, 
  isLoading 
}) => {
  return (
    <div className="mb-8 border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{team.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onEditTeam(team)}
            className="p-2 text-gray-600 hover:text-blue-600"
            disabled={isLoading}
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDeleteTeam(team.id)}
            className="p-2 text-gray-600 hover:text-red-600"
            disabled={isLoading}
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onAddMember(team.id)}
            className="p-2 text-gray-600 hover:text-green-600"
            disabled={isLoading}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.members?.map((member) => (
          <div key={member.id} className="border rounded-lg p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEditMember(member)}
                className="text-gray-500 hover:text-blue-500"
                disabled={isLoading}
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDeleteMember(member.id)}
                className="text-gray-500 hover:text-red-500"
                disabled={isLoading}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;