import React, { useState, useEffect } from 'react';

const InegiCard = ({ title, indicatorID, unit, trendOverride }) => {
  const [value, setValue] = useState(null);
  const [period, setPeriod] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // CONEXIÓN DIRECTA A API BANCO MUNDIAL (Datos Reales México)
        // MX = México | format=json
        const response = await fetch(`https://api.worldbank.org/v2/country/MX/indicator/${indicatorID}?format=json&per_page=2`);
        
        if (!response.ok) throw new Error("Error red");

        const data = await response.json();
        
        // El Banco Mundial devuelve una lista. Buscamos el dato más reciente válido.
        // data[1] es la lista de años.
        const validData = data[1].find(item => item.value !== null);

        if (validData) {
            setValue(parseFloat(validData.value));
            setPeriod(validData.date); // Año del reporte
        }
      } catch (error) {
        console.error("Error obteniendo dato real:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [indicatorID]);

  let colorClass = 'text-gray-800';
  if (trendOverride === 'bad') colorClass = 'text-red-600';
  if (trendOverride === 'good') colorClass = 'text-green-600';

  return (
    <div className="bg-white p-2 rounded-lg shadow border-l-4 border-pink-600 h-18 flex flex-col justify-between relative">
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h3>
        <span className="text-[8px] bg-pink-50 text-pink-700 px-1 rounded border border-pink-100 font-bold">
            {loading ? 'CARGANDO...' : `OFICIAL ${period}`}
        </span>
      </div>

      <div className="flex items-end mt-1">
          {loading ? (
             <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : (
             <span className={`text-2xl font-extrabold tracking-tighter ${colorClass}`}>
               {value ? value.toFixed(2) : '--'}
            </span>
          )}
          <span className="text-xs font-bold text-gray-400 ml-1 mb-1">{unit}</span>
      </div>
    </div>
  );
};
export default InegiCard;