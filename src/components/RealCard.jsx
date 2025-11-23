import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RealCard = () => {
  const [price, setPrice] = useState(null);
  const [historyData, setHistoryData] = useState([]); 
  const [trend, setTrend] = useState('neutral');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365');
      const data = await response.json();
      
      const pricesArray = data.prices;
      const currentPrice = pricesArray[pricesArray.length - 1][1];
      const startPrice = pricesArray[0][1];

      if (currentPrice > startPrice) setTrend('up');
      else setTrend('down');

      setPrice(currentPrice);

      const formattedHistory = pricesArray.map((item) => ({
        time: item[0],
        value: item[1],
      }));
      
      setHistoryData(formattedHistory);
      setLoading(false);
    } catch (error) {
      console.error("Error API:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 300000); 
    return () => clearInterval(interval);
  }, []);

  const colorHex = trend === 'up' ? '#16a34a' : '#dc2626'; 
  const colorClass = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const arrow = trend === 'up' ? '▲' : '▼';

  return (
    <div className="bg-white p-4 rounded-lg shadow border-t-4 border-yellow-500 relative overflow-hidden h-40 flex flex-col justify-between">
      
      {/* Encabezado */}
      <div>
        <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Bitcoin</h3>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] text-green-700 font-bold tracking-wider">EN VIVO</span>
            </div>
        </div>
        
        {loading ? (
            <div className="mt-2 h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        ) : (
            <div className="mt-1 flex items-end">
                <span className={`text-2xl font-mono font-bold ${colorClass}`}>
                    ${price?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1 mb-1">USD</span>
                <span className={`text-sm ml-auto ${colorClass} font-bold`}>{arrow}</span>
            </div>
        )}
      </div>

      {/* Gráfica Recharts */}
      <div className="h-20 -mx-4 -mb-4 relative opacity-60">
        <svg style={{ height: 0 }}>
            <defs>
                <linearGradient id="colorTrendBTC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colorHex} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={colorHex} stopOpacity={0}/>
                </linearGradient>
            </defs>
        </svg>
        
        {historyData.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historyData}>
            <XAxis dataKey="time" hide={true} />
            <YAxis hide={true} domain={['auto', 'auto']} /> 
            <Tooltip cursor={false} content={<></>} />
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke={colorHex} 
                fillOpacity={1} 
                fill="url(#colorTrendBTC)" 
                strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}; // <--- ESTO ES LO QUE TE FALTABA (El cierre de llave y punto y coma)

export default RealCard;