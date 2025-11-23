import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

const DATA = [
    { name: 'ENE', crimen: 3150, dolar: 16.90, diesel: 24.10, cobre: 3.65, desempleo: 2.8, inflacion: 4.8, clima: 14 },
    { name: 'FEB', crimen: 3100, dolar: 16.95, diesel: 24.20, cobre: 3.70, desempleo: 2.7, inflacion: 4.7, clima: 15 },
    { name: 'MAR', crimen: 3250, dolar: 16.80, diesel: 24.45, cobre: 3.85, desempleo: 2.7, inflacion: 4.6, clima: 16 },
    { name: 'ABR', crimen: 3400, dolar: 16.60, diesel: 24.60, cobre: 3.90, desempleo: 2.6, inflacion: 4.6, clima: 18 },
    { name: 'MAYO', crimen: 3600, dolar: 16.50, diesel: 24.85, cobre: 4.05, desempleo: 2.6, inflacion: 4.5, clima: 20 },
    { name: 'JUN', crimen: 3900, dolar: 17.20, diesel: 25.10, cobre: 3.95, desempleo: 2.5, inflacion: 4.4, clima: 22 }, 
    { name: 'JUL', crimen: 4150, dolar: 17.80, diesel: 25.35, cobre: 3.80, desempleo: 2.5, inflacion: 4.4, clima: 24 },
    { name: 'AGO', crimen: 4400, dolar: 18.10, diesel: 25.50, cobre: 3.75, desempleo: 2.4, inflacion: 4.3, clima: 25 },
    { name: 'SEP', crimen: 4300, dolar: 18.25, diesel: 25.65, cobre: 3.70, desempleo: 2.4, inflacion: 4.4, clima: 23 },
    { name: 'OCT', crimen: 4100, dolar: 18.46, diesel: 25.89, cobre: 3.75, desempleo: 2.4, inflacion: 4.42, clima: 20 },
    { name: 'NOV', crimen: 4250, dolar: 18.90, diesel: 26.10, cobre: 3.80, desempleo: 2.5, inflacion: 4.5, clima: 17 },
    { name: 'DIC', crimen: 4500, dolar: 19.10, diesel: 26.30, cobre: 3.85, desempleo: 2.6, inflacion: 4.6, clima: 14, projected: true },
];

const CorrelationChart = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DATA.length);
    }, 2000); // Cambia cada 2 segundos
    return () => clearInterval(interval);
  }, []);

  const activeData = DATA[index];
  // Cálculo de posición corregido para que no se salga
  const leftPos = (index / (DATA.length - 1)) * 94; 

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-2 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-xs font-bold text-gray-600 uppercase">
            Análisis 360°: <span className="text-red-600">Incidencia</span> vs <span className="text-blue-600">Factores</span>
        </h3>
        <div className="flex items-center gap-2">
             <span className="text-[9px] font-mono text-gray-400">ESCANEO: {activeData.name} 2025...</span>
             <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px] relative">
        {/* Tooltip Automático */}
        <div 
            className="absolute top-0 z-20 bg-white/95 backdrop-blur-sm border border-gray-300 shadow-xl rounded-lg p-2 text-[10px] pointer-events-none transition-all duration-700 ease-in-out"
            style={{ left: `${leftPos}%`, transform: index > 6 ? 'translateX(-100%)' : 'translateX(0)' }}
        >
            <div className="font-bold text-gray-800 border-b border-gray-200 mb-1 pb-1">{activeData.name}</div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div className="text-red-600 font-bold">🚨 {activeData.crimen} Delitos</div>
                <div className="text-green-600">💵 ${activeData.dolar} Dólar</div>
                <div className="text-gray-600">⛽ ${activeData.diesel} Diésel</div>
                <div className="text-orange-600">🧱 ${activeData.cobre} Cobre</div>
                <div className="text-purple-600">📉 {activeData.desempleo}% Desemp.</div>
                <div className="text-yellow-600">☀️ {activeData.clima}°C</div>
            </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 9}} interval={0} />
            <YAxis yAxisId="left" orientation="left" tick={{fontSize: 9}} domain={[2000, 'auto']} width={30} />
            <YAxis yAxisId="right" orientation="right" tick={{fontSize: 9}} domain={[0, 30]} width={30} />
            <ReferenceLine x={activeData.name} stroke="#9ca3af" strokeDasharray="3 3" />
            
            {/* Gráficas */}
            <Area yAxisId="left" type="monotone" dataKey="crimen" fill="#fee2e2" stroke="#dc2626" strokeWidth={2} fillOpacity={0.4} />
            <Line yAxisId="right" type="monotone" dataKey="diesel" stroke="#374151" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="dolar" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="cobre" stroke="#d97706" strokeWidth={1.5} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="desempleo" stroke="#9333ea" strokeWidth={2} strokeDasharray="3 3" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="inflacion" stroke="#2563eb" strokeWidth={2} strokeDasharray="3 3" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="clima" stroke="#eab308" strokeWidth={1} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CorrelationChart;