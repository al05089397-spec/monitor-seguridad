import React from 'react';

// Esta tarjeta NO inventa datos. Muestra la realidad comparativa.
const SecurityCard = ({ title, currentMonth, lastMonth, unit = '' }) => {
  
  // 1. Calculamos la diferencia real
  const difference = currentMonth - lastMonth;
  const percentChange = ((difference / lastMonth) * 100).toFixed(1);
  
  // 2. Determinamos si es "bueno" o "malo"
  // En seguridad: Si sube (+) es MALO (Rojo). Si baja (-) es BUENO (Verde).
  const isBadNews = difference > 0;
  
  const colorClass = isBadNews ? 'text-red-600' : 'text-green-600';
  const bgColorClass = isBadNews ? 'bg-red-50' : 'bg-green-50';
  const arrow = isBadNews ? '▲' : '▼';
  const sign = isBadNews ? '+' : '';

  return (
    <div className={`p-2 rounded-lg shadow border-l-4 ${isBadNews ? 'border-red-500' : 'border-green-500'} bg-white relative`}>
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
      
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-gray-800">
          {currentMonth.toLocaleString('es-MX')}
          <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </span>
      </div>

      {/* Sección de Comparativa Real */}
      <div className={`mt-2 inline-flex items-center px-2 py-1 rounded ${bgColorClass}`}>
        <span className={`text-sm font-bold ${colorClass} mr-1`}>
          {arrow} {sign}{percentChange}%
        </span>
        <span className="text-xs text-gray-500">vs mes anterior</span>
      </div>

      {/* Etiqueta de fecha */}
      <div className="absolute top-4 right-4 text-[10px] text-gray-400 border border-gray-200 px-1 rounded">
        OCT 2023
      </div>
    </div>
  );
};

export default SecurityCard;