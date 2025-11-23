import { useState, useEffect, useRef } from 'react';

export const useTicker = (initialValue, volatility = 1, isAccumulator = false) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [direction, setDirection] = useState('neutral');
  const prevValue = useRef(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      let newValue;
      // Si es acumulador (ej. robos totales), solo sube o se mantiene
      if (isAccumulator) {
        const shouldIncrement = Math.random() > 0.7; // 30% prob de subir
        newValue = shouldIncrement ? prevValue.current + 1 : prevValue.current;
      } else {
        // Si es financiero, sube y baja
        const change = (Math.random() - 0.5) * volatility;
        newValue = prevValue.current + change;
      }

      // Decidir color (Tendencia)
      if (newValue > prevValue.current) setDirection('up');
      else if (newValue < prevValue.current) setDirection('down');
      else setDirection('neutral');

      prevValue.current = newValue;
      setCurrentValue(newValue);
    }, 2000); // Se actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, [volatility, isAccumulator]);

  return { value: currentValue, direction };
};