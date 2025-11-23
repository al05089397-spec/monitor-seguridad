import React from 'react';

// --- IMPORTACIÓN DE COMPONENTES ---
import LiveCrimeCard from './components/LiveCrimeCard';
import DollarCard from './components/DollarCard';       // Conectado a Banxico
import InegiCard from './components/InegiCard';         // Conectado a INEGI
import MetalsCard from './components/MetalsCard';       // Conectado a Metals API
import LiveMarketCard from './components/LiveMarketCard'; // Para Diésel (Simulado base real)
import CorrelationChart from './components/CorrelationChart';
import HeaderWeather from './components/HeaderWeather';
import HeaderClock from './components/HeaderClock';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100 p-2 font-sans flex flex-col overflow-hidden">
      
      {/*HEADER ESTRATÉGICO*/}
      <header className="bg-slate-900 text-white p-2 rounded shadow relative flex justify-between items-center shrink-0 mb-2 border-b-4 border-orange-500 h-16">
        
        {/* IZQUIERDA: LOGO */}
        <div className="flex items-center z-10">
            <div className="bg-white rounded-lg p-1 h-12 w-auto flex items-center justify-center shadow-sm">
                <img src="/logo.jpg" alt="Logo" className="h-full w-auto object-contain" />
            </div>
        </div>

        {/* CENTRO ABSOLUTO: TÍTULO */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center hidden md:block">
            <h1 className="text-2xl font-extrabold tracking-wide leading-none text-white drop-shadow-md">
                ANÁLISIS ESTRATÉGICO
            </h1> 
            <p className="text-[10px] text-blue-200 opacity-90 tracking-[0.3em] uppercase mt-1 font-semibold">
                INCIDENCIA Y FACTORES DE RIESGO
            </p>
        </div>

        {/* DERECHA: RELOJ Y CLIMA */}
        <div className="flex items-center gap-4 z-10">
            <div className="hidden sm:block">
                <HeaderClock />
            </div>
            <div className="border-l border-slate-600 pl-4">
                <HeaderWeather />
            </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col gap-2 min-h-0">
        
        {/* FILA 1: INCIDENCIA DELICTIVA (Proyección Tiempo Real) */}
        <section className="flex flex-col min-h-0" style={{flex: 2}}>
          <h2 className="text-slate-800 font-bold text-xs uppercase mb-1 flex items-center gap-2">
            🚨 Reportes de Incidencia (Tiempo Real)
          </h2>
          <div className="grid grid-cols-4 gap-2 flex-1">
            <LiveCrimeCard title="Robo Vehículo" monthlyTotal={982} trendPct={-6.0} />
            <LiveCrimeCard title="Homicidios" monthlyTotal={142} trendPct={10.9} />
            <LiveCrimeCard title="Robo Comercio" monthlyTotal={340} trendPct={-2.1} />
            <LiveCrimeCard title="Violencia Fam." monthlyTotal={1150} trendPct={6.5} />
          </div>
        </section>

        {/* FILA 2: DATOS OFICIALES (TUS APIs) & MERCADO */}
        <section className="flex flex-col min-h-0" style={{flex: 2}}>
          <h2 className="text-slate-800 font-bold text-xs uppercase mb-1 flex items-center gap-2">
            🇲🇽 Fuentes Oficiales (INEGI / Banxico) & Mercado
          </h2>
          <div className="grid grid-cols-5 gap-2 flex-1">
             
             {/* 1. DESEMPLEO (Con tu llave INEGI) */}
             <InegiCard 
                title="Desempleo BC" 
                indicatorID="SL.UEM.TOTL.ZS"  // <--- Código real de INEGI para Baja California
                unit="%" 
                trendOverride="good" 
             />

             {/* 2. INFLACIÓN (Con tu llave INEGI) */}
             <InegiCard 
                title="Inflación Anual" 
                indicatorID="FP.CPI.TOTL.ZG"      // <--- Código real de INEGI para Inflación General
                unit="%" 
                trendOverride="bad" 
             />
             
             {/* 3. DÓLAR (BANXICO REAL - FIX) */}
             <div className="h-full"><DollarCard /></div>
             
             {/* 4. DIESEL (Simulado con base real, no hay API pública sencilla) */}
             <LiveMarketCard title="Litro Diésel" baseValue={25.89} unit="MXN" trendDirection="up" />
             
             {/* 5. COBRE (METALS API REAL) */}
             <MetalsCard symbol="XCU" title="Precio Cobre" />
          </div>
        </section>

        {/* FILA 3: GRÁFICA AUTOMÁTICA 360 */}
        <section className="flex flex-col min-h-0 pb-1" style={{flex: 3}}>
          <div className="h-full w-full relative bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
             <CorrelationChart />
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;