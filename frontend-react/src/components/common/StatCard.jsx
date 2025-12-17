import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <Icon size={48} className="text-gray-400" />
      </div>
    </div>
  );
};

export default StatCard;