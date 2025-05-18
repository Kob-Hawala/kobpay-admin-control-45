
import { useEffect, useRef } from 'react';
import { ChartData } from '@/services/crypto-api';
import { createChart } from 'lightweight-charts';
import { useTheme } from "@/providers/theme-provider";

interface CandlestickChartProps {
  data: ChartData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;
    
    const chartOptions = {
      layout: {
        background: { color: isDarkMode ? '#1f2937' : '#ffffff' },
        textColor: isDarkMode ? '#d1d5db' : '#1f2937',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: {
          color: isDarkMode ? '#2d3748' : '#f3f4f6',
        },
        horzLines: {
          color: isDarkMode ? '#2d3748' : '#f3f4f6',
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };
    
    const chart = createChart(chartContainerRef.current, chartOptions);
    
    const candleSeries = chart.addSeries({
      type: 'Candlestick',
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });
    
    // Format data for candlestick chart
    const formattedData = data.map(item => ({
      time: new Date(item.time).toISOString().split('T')[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
    
    candleSeries.setData(formattedData);
    
    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, isDarkMode]);
  
  return (
    <div ref={chartContainerRef} className="h-96 w-full" />
  );
}
