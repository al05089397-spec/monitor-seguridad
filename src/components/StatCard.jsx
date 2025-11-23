import React from 'react';

const StatCard = ({ title, value, unit, trend, color = "text-slate-800" }) => {
  let trendColorClass = 'text-gray-800';
  let arrow = '';

  if (trend === 'up') {
    trendColorClass = 'text-red-600';
    arrow = '▲';
  } else if (trend === 'down') {
    trendColorClass = 'text-green-600';
    arrow = '▼';
  }

  return (
    // Aplicamos altura fija h-18 y padding uniforme
    <div className="bg-white p-2 rounded-lg shadow border-l-4 border-slate-400 h-18 flex flex-col justify-between">
      <h3 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h3>
      <div className="flex items-end mt-1 justify-between">
        <div>
            {/* Tamaño uniforme: text-xl */}
            <span className={`text-xl font-extrabold tracking-tighter ${color}`}>
            {value}
            </span>
            <span className="text-xs font-bold text-gray-400 ml-1 mb-1">{unit}</span>
        </div>
        {trend !== 'neutral' && (
            <span className={`text-xs font-bold ${trendColorClass}`}>{arrow}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;