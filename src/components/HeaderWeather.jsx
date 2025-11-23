import React, { useState, useEffect } from 'react';

const HeaderWeather = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=32.5149&longitude=-117.0382&current_weather=true&timezone=America%2FTijuana'
      );
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (!weather) return <div className="text-[10px] text-white">...</div>;

  return (
    // Diseño compacto para la esquina derecha
    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded border border-slate-600">
        <span className="text-lg">🌡️</span>
        <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-white">{weather.temperature}°C</span>
            <span className="text-[8px] text-blue-200 uppercase tracking-wider">TIJUANA</span>
        </div>
    </div>
  );
};

export default HeaderWeather;