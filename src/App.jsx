import React from 'react';

// IMPORTACIÓN DE COMPONENTES
import LiveCrimeCard from './components/LiveCrimeCard';
import NationalCard from './components/NationalCard';
import DollarCard from './components/DollarCard';
import LiveMarketCard from './components/LiveMarketCard';
import CorrelationChart from './components/CorrelationChart';
import HeaderWeather from './components/HeaderWeather';
import HeaderClock from './components/HeaderClock';
import MetalsCard from './components/MetalsCard';
import InegiCard from './components/InegiCard';
import StatCard from './components/StatCard';
import SalarioCard from './components/SalarioCard';

function App() {
  return (
    // LAYOUT FINAL: h-screen y overflow-hidden para CERO SCROLL
    <div className="h-screen w-full bg-slate-50 p-2 font-sans flex flex-col gap-2 overflow-hidden">
      
      {/* HEADER CORPORATIVO FINAL */}
      <header className="bg-slate-900 text-white p-2 rounded-lg shadow-lg flex justify-between items-center border-b-4 border-orange-500 sticky top-2 z-50 h-20">
        <div className="flex items-center z-20 w-1/3 self-center">
            <div className="bg-white rounded-lg p-1 h-10 w-auto flex items-center justify-center shadow-sm">
                <img src="/logo.jpg" alt="Logo" className="h-full w-auto object-contain" />
            </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <h1 className="text-xl font-extrabold tracking-wide leading-none text-white drop-shadow-md">ANÁLISIS ESTRATÉGICO</h1>
            <p className="text-[8px] text-slate-400 opacity-90 tracking-[0.3em] uppercase mt-1 font-semibold">INCIDENCIA DELICTIVA Y FACTORES DE RIESGO</p>
        </div>
        <div className="flex items-center gap-4 z-20 w-1/3 justify-end self-center">
            <HeaderClock />
            <div className="border-l border-slate-600 pl-4"><HeaderWeather /></div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL: 3 COLUMNAS RÍGIDAS CON ALTURA MINIMIZADA */}
      <main className="flex-1 grid grid-cols-12 gap-1 pb-2 min-h-0">
        
        {/* === COLUMNA IZQUIERDA (3/12): OPERATIVA / DELITOS === */}
        <div className="col-span-3 flex flex-col gap-1">
            <h2 className="text-slate-800 font-bold text-[10px] uppercase border-b border-slate-300 pb-1">🚨 Delitos y Municipios</h2>
            
            <div className="grid grid-cols-2 gap-1">
                <LiveCrimeCard title="Robos Totales" monthlyTotal={180851} trendPct={-2.4} />
                <LiveCrimeCard title="Homicidios" monthlyTotal={9350} trendPct={10.9} />
                <LiveCrimeCard title="Secuestros" monthlyTotal={536} trendPct={-5.0} />
                <LiveCrimeCard title="Extorsiones" monthlyTotal={1452} trendPct={8.2} />
            </div>

            <div className="flex flex-col gap-1 bg-white rounded-lg shadow p-1">
                <h3 className="text-slate-800 font-bold text-[10px] uppercase mb-1 border-b border-gray-200 pb-1">📍 Incidencia por Municipio</h3>
                <LiveCrimeCard title="Tijuana" monthlyTotal={32157} trendPct={4.1} />
                <LiveCrimeCard title="Mexicali" monthlyTotal={15432} trendPct={-1.2} />
                <LiveCrimeCard title="Ensenada" monthlyTotal={9076} trendPct={0.5} />
                <LiveCrimeCard title="Rosarito" monthlyTotal={3267} trendPct={2.8} />
                <LiveCrimeCard title="Tecate" monthlyTotal={2551} trendPct={-3.0} />
            </div>
        </div>

        {/* === COLUMNA CENTRAL (6/12): MACRO Y ANÁLISIS (Sección 1) === */}
        <div className="col-span-6 flex flex-col gap-1">
            
            <h2 className="text-slate-800 font-bold text-[11px] uppercase border-b border-slate-300 pb-1">🇲🇽 Indicadores Oficiales</h2>
            <div className="grid grid-cols-5 gap-1 shrink-0">
                <InegiCard title="Desempleo MX" indicatorID="SL.UEM.TOTL.ZS" unit="%" trendOverride="good" />
                <InegiCard title="Inflación Anual" indicatorID="FP.CPI.TOTL.ZG" unit="%" trendOverride="bad" />
                <StatCard title="Deuda Pública" value="35b" unit="MDP" />
                <StatCard title="Costo Criminalidad" value="84b" unit="MXN" trend="up" />
                <StatCard title="PIB per Cápita" value="289,432" unit="MXN" />
            </div>

            {/* GRÁFICA DE CORRELACIÓN (Ahora tiene más espacio vertical) */}
            <section className="flex-1 min-h-[400px]">
                <h2 className="text-slate-800 font-bold text-sm uppercase mb-1">📊 Análisis de Correlación 360°</h2>
                <div className="h-full w-full relative bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <CorrelationChart />
                </div>
            </section>
        </div>

        {/* === COLUMNA DERECHA (3/12): MERCADO Y CONTEXTO === */}
        <div className="col-span-3 flex flex-col gap-1">
            
            <h2 className="text-slate-800 font-bold text-[10px] uppercase border-b border-slate-300 pb-1">🏦 Mercado, Divisas y Metales</h2>
            <div className="grid grid-cols-2 gap-1">
                <MetalsCard symbol="XCU" title="Cobre" />
                <LiveMarketCard title="Oro (Oz)" baseValue={2035.50} unit="USD" />
                <LiveMarketCard title="Plata (Kg)" baseValue={785.20} unit="USD" />
                <LiveMarketCard title="Litro Diésel" baseValue={25.89} unit="MXN" trendDirection="up" />
            </div>

            <h2 className="text-slate-800 font-bold text-[11px] uppercase border-b border-slate-300 pb-1">👥 Contexto Social y Eficiencia</h2>
            <div className="flex flex-col gap-2"> 
                <DollarCard /> 
                <SalarioCard />
                <StatCard title="Población BC" value="3.76" unit="M" color="text-blue-900" />
                <StatCard title="Pob. Carcelaria" value="12,246" unit="Internos" trend="up" />
                <StatCard title="Casos Resueltos" value="6.8" unit="%" trend="up" />
                <StatCard title="Policías / Hab" value="0.2" unit="%" trend="down" />
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;