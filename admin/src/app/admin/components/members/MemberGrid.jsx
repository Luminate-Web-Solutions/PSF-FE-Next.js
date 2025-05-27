import MemberCard from './MemberCard';

const MemberGrid = ({ members, teamId, onAddMember, onEditMember, onDeleteMember, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {members.length > 0 ? (
        members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onEdit={() => onEditMember(teamId, member)}
            onDelete={() => onDeleteMember(teamId, member._id)}
            isLoading={isLoading}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-4 text-gray-500">
          No members added yet
        </div>
      )}
    </div>
  );
};

export default MemberGrid;