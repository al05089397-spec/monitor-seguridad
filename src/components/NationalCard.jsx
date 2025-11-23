import React, { useState, useEffect } from 'react';

const NationalCard = ({ title, indicatorCode, unit, trendOverride }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API DEL BANCO MUNDIAL
        const response = await fetch(`https://api.worldbank.org/v2/country/MX/indicator/${indicatorCode}?format=json&per_page=1`);
        const data = await response.json();
        
        // Buscamos el último dato válido (que no sea null)
        const validData = data[1].find(item => item.value !== null);

        if (validData) {
            setValue(validData.value);
            setYear(validData.date);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error Banco Mundial:", error);
      }
    };

    fetchData();
  }, [indicatorCode]);

  // Lógica de colores
  let colorClass = 'text-gray-800';
  if (trendOverride === 'bad') colorClass = 'text-red-600';
  if (trendOverride === 'good') colorClass = 'text-green-600';

  return (
    <div className="bg-white p-3 rounded-lg shadow border-l-4 border-indigo-500 h-full flex flex-col justify-between relative">
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h3>
        <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 rounded border border-indigo-100">
            OFICIAL {year}
        </span>
      </div>

      {loading ? (
        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse mt-2"></div>
      ) : (
        <div className="flex items-end mt-1">
            {/* CAMBIO AQUÍ: text-3xl font-extrabold tracking-tighter */}
            <span className={`text-3xl font-extrabold tracking-tighter ${colorClass}`}>
               {value?.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-gray-400 ml-1 mb-1">{unit}</span>
        </div>
      )}
      
      <div className="text-[8px] text-gray-400 mt-1 text-right">Fuente: Banco Mundial / INEGI</div>
    </div>
  );
};

export default NationalCard;