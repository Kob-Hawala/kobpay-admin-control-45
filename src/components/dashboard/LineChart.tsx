
import { useEffect, useRef } from 'react';
import { ChartData } from '@/services/crypto-api';
import { createChart } from 'lightweight-charts';
import { useTheme } from "@/providers/theme-provider";

interface LineChartProps {
  data: ChartData[];
}

export function LineChart({ data }: LineChartProps) {
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
    
    // Create an area series with the proper method and options
    const areaSeries = chart.addSeries({
      type: 'area',
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
      lineColor: isDarkMode ? '#7e57c2' : '#6366f1',
      topColor: isDarkMode ? 'rgba(126, 87, 194, 0.4)' : 'rgba(99, 102, 241, 0.4)',
      bottomColor: isDarkMode ? 'rgba(126, 87, 194, 0.1)' : 'rgba(99, 102, 241, 0.1)',
      lineWidth: 2,
    });
    
    // Format data for line chart
    const formattedData = data.map(item => ({
      time: new Date(item.time).toISOString().split('T')[0],
      value: item.close,
    }));
    
    areaSeries.setData(formattedData);
    
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
