import React, { useState, useEffect, useRef } from 'react';

const LiveMarketCard = ({ title, baseValue, unit, type = 'currency' }) => {
  const [value, setValue] = useState(baseValue);
  const [trend, setTrend] = useState('neutral');
  const prevValueRef = useRef(baseValue);

  useEffect(() => {
    const volatility = type === 'percent' ? 0.01 : 0.05; 
    const interval = setInterval(() => {
      setValue((current) => {
        const change = (Math.random() - 0.5) * volatility;
        const newValue = current + change;
        if (newValue > prevValueRef.current) setTrend('up');
        else if (newValue < prevValueRef.current) setTrend('down');
        prevValueRef.current = newValue;
        return newValue;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [type]);

  const colorClass = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-800';
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '•';

  return (
    <div className="bg-white p-2 rounded-lg shadow border-l-4 border-blue-500 h-18 flex flex-col justify-between relative overflow-hidden">
      <div className="flex justify-between items-start z-10">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h3>
        <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-18 w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
      </div>
      <div className="flex items-end justify-between z-10 mt-1">
        <div>
            {/* CAMBIO AQUÍ: text-xl font-extrabold tracking-tighter */}
            <span className={`text-xl font-extrabold tracking-tighter ${colorClass} transition-colors duration-500`}>
              {type === 'currency' ? '$' : ''}{value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-gray-400 ml-1 font-bold">{unit}</span>
        </div>
        <span className={`text-xs ${colorClass}`}>{arrow}</span>
      </div>
    </div>
  );
};
export default LiveMarketCard;