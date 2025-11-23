import React, { useState, useEffect } from 'react';

const LiveCrimeCard = ({ title, monthlyTotal, trendPct }) => {
  const dailyAverage = Math.floor(monthlyTotal / 30);
  const [count, setCount] = useState(dailyAverage); 
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const probability = Math.random();
      if (probability > 0.7) { 
        setCount(c => c + 1);
        setFlash(true);
        setTimeout(() => setFlash(false), 1000);
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const isBadTrend = trendPct > 0; 

  return (
    // Utilizamos h-18 para estabilidad, ajustando internamente
    <div className={`p-2 rounded-lg shadow border-t-4 ${isBadTrend ? 'border-red-500' : 'border-green-500'} bg-white h-18 flex flex-col justify-between transition-all duration-300 ${flash ? 'bg-red-50' : 'bg-white'}`}>
      
      <div className="flex justify-between items-start">
        <h3 className="text-[9px] font-bold text-gray-500 uppercase">{title.toUpperCase()}</h3>
        <span className={`text-[8px] bg-red-100/50 text-red-600 px-1 rounded-full ${flash ? 'animate-pulse' : ''}`}>HOY</span>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className={`text-xl font-extrabold tracking-tighter text-gray-800 ${flash ? 'scale-105' : ''} transition-transform`}>
          {count}
        </span>
        <span className={`text-xs font-bold ${isBadTrend ? 'text-red-600' : 'text-green-600'}`}>
          {isBadTrend ? '▲' : '▼'}
        </span>
      </div>

      <div className="flex justify-between items-end text-[9px] mt-0.5 border-t border-gray-100 pt-0.5">
          <span className={`font-bold ${isBadTrend ? 'text-red-600' : 'text-green-600'}`}>
              {isBadTrend ? '+' : ''}{Math.abs(trendPct)}%
          </span>
          <span className="text-[7px] text-gray-400">Total Mes: {monthlyTotal}</span>
      </div>
    </div>
  );
};

export default LiveCrimeCard; // <--- LA LETRA 'L' ES MAYÚSCULA