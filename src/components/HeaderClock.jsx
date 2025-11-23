import React, { useState, useEffect } from 'react';

const HeaderClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  
  // FORZAMOS FORMATO 24 HORAS (MILITAR)
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  
  const dateString = currentTime.toLocaleDateString('es-MX', dateOptions);
  const timeString = currentTime.toLocaleTimeString('es-MX', timeOptions);

  return (
    <div className="flex flex-col items-end"> {/* Alineado a la derecha para verse mejor */}
        <div className="text-2xl font-mono font-bold tracking-widest leading-none text-white">
            {timeString}
        </div>
        <div className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-bold mt-1">
            {dateString}
        </div>
    </div>
  );
};

export default HeaderClock;