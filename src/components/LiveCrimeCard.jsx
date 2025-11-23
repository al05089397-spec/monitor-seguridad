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
    <div className={`p-3 rounded-lg shadow border-t-4 ${isBadTrend ? 'border-red-500' : 'border-green-500'} bg-white h-full flex flex-col justify-between transition-all duration-300 ${flash ? 'bg-red-50' : 'bg-white'}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h3>
        <div className="flex items-center gap-1">
            <span className="text-[8px] bg-gray-100 text-gray-500 px-1 rounded">HOY</span>
            <span className={`h-1.5 w-1.5 rounded-full ${flash ? 'bg-red-600' : 'bg-gray-300'} ${flash ? 'animate-ping' : ''}`}></span>
        </div>
      </div>
      <div className="mt-1 flex items-baseline justify-between">
        {/* CAMBIO AQUÍ: text-3xl font-extrabold tracking-tighter */}
        <span className={`text-3xl font-extrabold tracking-tighter text-gray-800 ${flash ? 'scale-110' : ''} transition-transform`}>
          {count}
        </span>
        <span className={`text-[10px] font-bold ${isBadTrend ? 'text-red-600' : 'text-green-600'}`}>
          {isBadTrend ? '▲' : '▼'} {Math.abs(trendPct)}%
        </span>
      </div>
      <p className="text-[8px] text-gray-400 mt-1 text-right">Total Mes: {monthlyTotal}</p>
    </div>
  );
};

export default LiveCrimeCard;