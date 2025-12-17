import React from 'react';
import { X } from 'lucide-react';

const Alert = ({ message, type = 'error', onClose }) => {
  const bgColor = type === 'success' 
    ? 'bg-green-100 border-green-400 text-green-700' 
    : 'bg-red-100 border-red-400 text-red-700';
  
  return (
    <div className={`border px-4 py-3 rounded relative mb-4 ${bgColor}`}>
      <span className="block sm:inline">{message}</span>
      <span 
        className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" 
        onClick={onClose}
      >
        <X size={20} />
      </span>
    </div>
  );
};

export default Alert;