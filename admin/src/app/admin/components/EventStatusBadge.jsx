import { Clock, Loader2, CheckCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    upcoming: { 
      color: "bg-yellow-100 text-yellow-800", 
      icon: <Clock size={16} /> 
    },
    ongoing: { 
      color: "bg-blue-100 text-blue-800", 
      icon: <Loader2 size={16} className="animate-spin" /> 
    },
    completed: { 
      color: "bg-green-100 text-green-800", 
      icon: <CheckCircle size={16} /> 
    },
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
      {statusConfig[status].icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;