import React from 'react';

const SalarioCard = () => {
  const rate = 419.88; 
  const date = '2025';

  return (
    <div className="bg-white p-2 rounded-lg shadow border-l-4 border-yellow-700 h-18 flex flex-col justify-between">
      <div className="flex justify-between items-start">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase">Salario Diario (Oficial BC)</h3>
          <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1 rounded border border-yellow-300">
            {date}
          </span>
      </div>
      
      <div className="flex items-end mt-1">
          {/* Tamaño uniforme: text-xl */}
          <span className="text-xl font-extrabold tracking-tighter text-gray-900">
              ${rate.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-gray-500 ml-1">MXN</span>
      </div>
    </div>
  );
};
export default SalarioCard;