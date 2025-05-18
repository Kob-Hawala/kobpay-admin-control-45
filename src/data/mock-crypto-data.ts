
import { CryptoData } from '@/types/crypto-types';

// Generate some random chart data
const generateChartData = (days: number, startPrice: number, volatility: number) => {
  const data = [];
  let currentPrice = startPrice;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random price movement
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(0.1, currentPrice * (1 + change));
    
    // Create a candlestick data point
    const open = currentPrice;
    const close = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    data.push({
      time: date.toISOString(),
      open,
      high,
      low,
      close,
    });
  }
  
  return data;
};

export const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024',
    price: 55842.32,
    change24h: 2.35,
    marketCap: 1094563781245,
    volume24h: 28765432123,
    allTimeHigh: 69000,
    circulatingSupply: 19500000,
    chartData: generateChartData(30, 55000, 0.03)
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024',
    price: 2673.18,
    change24h: -1.04,
    marketCap: 321456789012,
    volume24h: 12543678901,
    allTimeHigh: 4890,
    circulatingSupply: 120500000,
    chartData: generateChartData(30, 2650, 0.04)
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    iconUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=024',
    price: 115.67,
    change24h: 5.23,
    marketCap: 48765432109,
    volume24h: 2987654321,
    allTimeHigh: 260,
    circulatingSupply: 420500000,
    chartData: generateChartData(30, 110, 0.05)
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    iconUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=024',
    price: 0.6234,
    change24h: -0.54,
    marketCap: 32156789012,
    volume24h: 1543678901,
    allTimeHigh: 3.84,
    circulatingSupply: 51500000000,
    chartData: generateChartData(30, 0.62, 0.03)
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024',
    price: 534.91,
    change24h: 1.45,
    marketCap: 83156789012,
    volume24h: 2543678901,
    allTimeHigh: 690,
    circulatingSupply: 155500000,
    chartData: generateChartData(30, 530, 0.02)
  }
];
