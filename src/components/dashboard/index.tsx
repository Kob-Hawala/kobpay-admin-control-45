
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Bell, Info, AlertTriangle } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

// CircularProgressBar Component
export function CircularProgressBar({ 
  progress, 
  size = 100, 
  strokeWidth = 10,
  className
}: { 
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", className)}>
      <svg height={size} width={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/20"
        />
        {/* Progress circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500 ease-in-out"
        />
      </svg>
      <div 
        className="absolute inset-0 flex items-center justify-center text-xs font-medium"
      >
        {progress}%
      </div>
    </div>
  );
}

// CryptoRateCard Component
export function CryptoRateCard({ crypto }: { crypto: any }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-primary/10`}>
          {crypto.symbol.charAt(0)}
        </div>
        <div>
          <div className="font-medium">{crypto.symbol}</div>
          <div className="text-xs text-muted-foreground">{crypto.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">{crypto.price}</div>
        <div className={`text-xs ${crypto.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {crypto.change >= 0 ? '↑' : '↓'} {Math.abs(crypto.change)}%
        </div>
      </div>
    </div>
  );
}

// RevenueChart Component
export function RevenueChart() {
  // Mock data for the chart
  const data = [
    { name: 'Jan', revenue: 2800 },
    { name: 'Feb', revenue: 1800 },
    { name: 'Mar', revenue: 3500 },
    { name: 'Apr', revenue: 2000 },
    { name: 'May', revenue: 2780 },
    { name: 'Jun', revenue: 1890 },
    { name: 'Jul', revenue: 3200 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
          <XAxis 
            dataKey="name" 
            className="text-xs text-muted-foreground" 
            tick={{ fill: 'currentColor' }}
            axisLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
            tickLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
          />
          <YAxis 
            className="text-xs text-muted-foreground"
            tick={{ fill: 'currentColor' }}
            axisLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
            tickLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)', 
              borderColor: 'var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--card-foreground)'
            }}
            formatter={(value: any) => [`$${value}`, 'Revenue']}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// NewsCard Component
export function NewsCard({ item }: { item: any }) {
  return (
    <a 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-3 rounded-lg hover:bg-muted/30 transition-colors"
    >
      <h4 className="font-medium">{item.title}</h4>
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <span>{item.source}</span>
        <span className="mx-2">•</span>
        <span>{item.time}</span>
      </div>
    </a>
  );
}

// AlertCard Component
export function AlertCard({ alert }: { alert: any }) {
  const icons = {
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    error: <Bell className="h-4 w-4 text-rose-500" />,
    info: <Info className="h-4 w-4 text-sky-500" />,
  };

  const bgColors = {
    warning: "bg-amber-500/10",
    error: "bg-rose-500/10",
    info: "bg-sky-500/10",
  };

  return (
    <div className={`p-3 rounded-lg ${bgColors[alert.type as keyof typeof bgColors]}`}>
      <div className="flex items-center gap-2">
        {icons[alert.type as keyof typeof icons]}
        <span className="font-medium">{alert.message}</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1 ml-6">
        {alert.time}
      </div>
    </div>
  );
}
