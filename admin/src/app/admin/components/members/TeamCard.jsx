import { Trash2, PencilLine, Plus } from 'lucide-react';
import MemberGrid from './MemberGrid';

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
    <div key={team._id} className="mb-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{team.title}</h2>
          {team.subTitle && <p className="text-gray-600 mt-1">{team.subTitle}</p>}
        </div>
        <div className="flex gap-2 self-end">
          <button 
            onClick={() => onEditTeam(team)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            <PencilLine size={18} />
          </button>
          <button 
            onClick={() => onAddMember(team._id)}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded"
            disabled={isLoading}
          >
            <Plus size={14} />
            Add Member
          </button>
          <button 
            onClick={() => onDeleteTeam(team._id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
            disabled={isLoading}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {team.description && <p className="text-gray-700 mb-6">{team.description}</p>}

      <MemberGrid
        members={team.members || []}
        teamId={team._id}
        onAddMember={onAddMember}
        onEditMember={onEditMember}
        onDeleteMember={onDeleteMember}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TeamCard;