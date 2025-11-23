import React, { useState, useEffect } from 'react';

const DollarCard = () => {
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchBanxico = async () => {
    try {
      const token = import.meta.env.VITE_BANXICO_TOKEN;
      // Serie SF43718: Tipo de cambio Pesos por Dólar E.U.A. para solventar obligaciones (FIX)
      const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=${token}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const serie = data.bmx.series[0];
      const datoActual = serie.datos[0]; // El dato más reciente

      setRate(parseFloat(datoActual.dato));
      setLastUpdate(datoActual.fecha);
      setLoading(false);
    } catch (error) {
      console.error("Error Banxico:", error);
      // Fallback si falla Banxico (puedes dejar un valor fijo o intentar otra API)
      setRate(18.50); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanxico();
  }, []);

  return (
    <div className="bg-white p-3 rounded-lg shadow border-t-4 border-green-700 relative h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase">Dólar (Banxico Oficial)</h3>
          <span className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></span>
      </div>
      
      {loading ? (
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      ) : (
        <div>
            <div className="flex items-baseline">
                <span className="text-3xl font-extrabold tracking-tighter text-gray-900">
                    ${rate?.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-gray-500 ml-1">MXN</span>
            </div>
            <div className="mt-1 flex justify-between items-end">
                <div className="text-[9px] text-green-800 bg-green-100 px-2 py-0.5 rounded border border-green-200">
                    FIX OFICIAL
                </div>
                <div className="text-[8px] text-gray-400">
                    {lastUpdate}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
export default DollarCard;