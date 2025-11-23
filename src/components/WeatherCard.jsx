import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Diccionario para traducir códigos WMO del clima
  const weatherCodes = {
    0: { label: 'Despejado', icon: '☀️', color: 'text-yellow-500' },
    1: { label: 'Mayormente Despejado', icon: '🌤️', color: 'text-blue-400' },
    2: { label: 'Parcialmente Nublado', icon: '⛅', color: 'text-gray-400' },
    3: { label: 'Nublado', icon: '☁️', color: 'text-gray-500' },
    45: { label: 'Niebla', icon: '🌫️', color: 'text-gray-400' },
    48: { label: 'Niebla Escarcha', icon: '🌫️', color: 'text-gray-400' },
    51: { label: 'Llovizna Ligera', icon: '🌦️', color: 'text-blue-400' },
    61: { label: 'Lluvia', icon: '🌧️', color: 'text-blue-600' },
    63: { label: 'Lluvia Moderada', icon: '🌧️', color: 'text-blue-700' },
    80: { label: 'Chubascos', icon: '⛈️', color: 'text-purple-600' },
    95: { label: 'Tormenta', icon: '⚡', color: 'text-yellow-600' },
  };

  const fetchWeather = async () => {
    try {
      // Coordenadas de Tijuana: 32.5149, -117.0382
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=32.5149&longitude=-117.0382&current_weather=true&timezone=America%2FTijuana'
      );
      const data = await response.json();
      setWeather(data.current_weather);
      setLoading(false);
    } catch (error) {
      console.error("Error clima:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Actualizar cada 10 minutos (el clima no cambia por segundo)
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // Obtener datos visuales según el código
  const currentCondition = weather ? weatherCodes[weather.weathercode] || { label: 'Variable', icon: '🌡️', color: 'text-gray-600' } : {};

  return (
    <div className="bg-white p-3 rounded-lg shadow border-l-4 border-sky-400 h-full flex flex-col justify-between relative">
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase">Clima Tijuana (Operativo)</h3>
        <span className="text-[8px] bg-sky-50 text-sky-600 px-1 rounded border border-sky-100">
            TIEMPO REAL
        </span>
      </div>

      {loading ? (
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse mt-2"></div>
      ) : (
        <div className="flex items-end justify-between mt-1">
            <div>
                <div className="flex items-center">
                    <span className="text-3xl mr-2">{currentCondition.icon}</span>
                    <span className="text-2xl font-mono font-bold text-gray-800">
                        {weather.temperature}°
                    </span>
                    <span className="text-xs font-bold text-gray-400 mb-1">C</span>
                </div>
                <div className={`text-[10px] font-bold ${currentCondition.color} uppercase`}>
                    {currentCondition.label}
                </div>
            </div>
            
            <div className="text-right">
                <div className="text-[10px] text-gray-400 uppercase">Viento</div>
                <div className="text-xs font-bold text-gray-600">{weather.windspeed} km/h</div>
            </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;