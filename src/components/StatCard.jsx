import React from 'react';

const StatCard = ({ title, value, unit, trend = 'neutral' }) => {
  // trend: 'up' (Verde), 'down' (Rojo), 'neutral' (Gris)
  
  let colorClass = 'text-gray-800';
  let arrow = '';

  if (trend === 'good') {
    colorClass = 'text-green-600';
    arrow = '▼'; // Asumimos que bajar es bueno en costos/delitos, o usa lógica inversa según necesites
  } else if (trend === 'bad') {
    colorClass = 'text-red-600';
    arrow = '▲';
  } else if (trend === 'up-good') {
     colorClass = 'text-green-600';
     arrow = '▲';
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-300">
      <h3 className="text-xs font-bold text-gray-500 uppercase">{title}</h3>
      <div className="mt-2 flex items-end justify-between">
        <span className={`text-2xl font-mono font-bold ${colorClass}`}>
           {value} <span className="text-sm text-gray-400">{unit}</span>
        </span>
        {/* Solo mostramos flecha si hay tendencia definida */}
        {trend !== 'neutral' && (
            <span className={`text-lg ${colorClass}`}>{arrow}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;