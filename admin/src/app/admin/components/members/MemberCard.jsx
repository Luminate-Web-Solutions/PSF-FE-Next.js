'use client'

import { Trash2, PencilLine } from 'lucide-react';

const MemberCard = ({ member, onEdit, onDelete, isLoading }) => {
    const [imageSrc, setImageSrc] = useState('');

useEffect(() => {
  if (member.image) {
    setImageSrc(member.image.startsWith('http') 
      ? member.image 
      : `http://localhost:4000/${member.image}`
    );
  }
}, [member.image]);
  return (
    <div className="bg-[#0d2137] text-white p-3 rounded-lg relative group">
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEdit}
          className="p-1 text-white hover:text-blue-400 rounded-full"
          disabled={isLoading}
        >
          <PencilLine size={16} />
        </button>
        <button 
          onClick={onDelete}
          className="p-1 text-white hover:text-red-400 rounded-full"
          disabled={isLoading}
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="bg-gray-600 w-full h-32 md:h-40 rounded mb-2 flex items-center justify-center overflow-hidden">
        {member.image ? (
          <img 
            src={member.image.startsWith('http') ? member.image : `http://localhost:4000/${member.image}`}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23ccc"><rect width="100" height="100"/><text x="50%" y="50%" font-family="Arial" font-size="30" fill="%23fff" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-500 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-sm md:text-base">{member.name}</h3>
      <p className="text-xs md:text-sm text-blue-200">{member.role}</p>
    </div>
  );
};

export default MemberCard;