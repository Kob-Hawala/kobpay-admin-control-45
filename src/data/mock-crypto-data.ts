
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
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=024',
    price: 1.0001,
    change24h: 0.01,
    marketCap: 95000000000,
    volume24h: 75000000000,
    allTimeHigh: 1.05,
    circulatingSupply: 94900000000,
    chartData: generateChartData(30, 1, 0.001)
  },
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    iconUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=024',
    price: 0.1324,
    change24h: 2.13,
    marketCap: 12500000000,
    volume24h: 1250000000,
    allTimeHigh: 0.23,
    circulatingSupply: 90000000000,
    chartData: generateChartData(30, 0.13, 0.03)
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    iconUrl: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=024',
    price: 6.78,
    change24h: -0.87,
    marketCap: 9500000000,
    volume24h: 450000000,
    allTimeHigh: 55.00,
    circulatingSupply: 1400000000,
    chartData: generateChartData(30, 6.8, 0.04)
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    iconUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=024',
    price: 0.45,
    change24h: 1.20,
    marketCap: 16000000000,
    volume24h: 550000000,
    allTimeHigh: 3.10,
    circulatingSupply: 35500000000,
    chartData: generateChartData(30, 0.45, 0.03)
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    iconUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=024',
    price: 83.45,
    change24h: 3.21,
    marketCap: 6200000000,
    volume24h: 400000000,
    allTimeHigh: 412.96,
    circulatingSupply: 74000000,
    chartData: generateChartData(30, 83, 0.03)
  },
  // Additional 5 tokens from previous data
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    iconUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=024',
    price: 0.1235,
    change24h: 4.56,
    marketCap: 16700000000,
    volume24h: 980000000,
    allTimeHigh: 0.74,
    circulatingSupply: 135000000000,
    chartData: generateChartData(30, 0.12, 0.05)
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    iconUrl: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=024',
    price: 0.00002345,
    change24h: 5.67,
    marketCap: 13800000000,
    volume24h: 870000000,
    allTimeHigh: 0.000088,
    circulatingSupply: 589000000000000,
    chartData: generateChartData(30, 0.00002, 0.06)
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    iconUrl: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=024',
    price: 15.67,
    change24h: 2.34,
    marketCap: 8900000000,
    volume24h: 430000000,
    allTimeHigh: 52.88,
    circulatingSupply: 562000000,
    chartData: generateChartData(30, 15, 0.04)
  },
  {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    iconUrl: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=024',
    price: 0.1123,
    change24h: -1.23,
    marketCap: 3100000000,
    volume24h: 210000000,
    allTimeHigh: 0.94,
    circulatingSupply: 27700000000,
    chartData: generateChartData(30, 0.11, 0.03)
  },
  {
    id: 'aptos',
    name: 'Aptos',
    symbol: 'APT',
    iconUrl: 'https://cryptologos.cc/logos/aptos-apt-logo.svg?v=024',
    price: 8.34,
    change24h: 3.45,
    marketCap: 2400000000,
    volume24h: 180000000,
    allTimeHigh: 19.92,
    circulatingSupply: 290000000,
    chartData: generateChartData(30, 8.3, 0.04)
  },
  // 5 more tokens
  {
    id: 'the-open-network',
    name: 'The Open Network',
    symbol: 'TON',
    iconUrl: 'https://cryptologos.cc/logos/toncoin-ton-logo.svg?v=024',
    price: 5.23,
    change24h: 2.78,
    marketCap: 17900000000,
    volume24h: 78000000,
    allTimeHigh: 7.2,
    circulatingSupply: 3423000000,
    chartData: generateChartData(30, 5.2, 0.04)
  },
  {
    id: 'internet-computer',
    name: 'Internet Computer',
    symbol: 'ICP',
    iconUrl: 'https://cryptologos.cc/logos/internet-computer-icp-logo.svg?v=024',
    price: 11.87,
    change24h: -3.12,
    marketCap: 5340000000,
    volume24h: 173000000,
    allTimeHigh: 700.65,
    circulatingSupply: 450000000,
    chartData: generateChartData(30, 11.9, 0.05)
  },
  {
    id: 'near-protocol',
    name: 'NEAR Protocol',
    symbol: 'NEAR',
    iconUrl: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=024',
    price: 4.35,
    change24h: 1.56,
    marketCap: 4380000000,
    volume24h: 245000000,
    allTimeHigh: 20.42,
    circulatingSupply: 1007000000,
    chartData: generateChartData(30, 4.3, 0.04)
  },
  {
    id: 'filecoin',
    name: 'Filecoin',
    symbol: 'FIL',
    iconUrl: 'https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=024',
    price: 4.75,
    change24h: 0.89,
    marketCap: 2240000000,
    volume24h: 156000000,
    allTimeHigh: 236.84,
    circulatingSupply: 471000000,
    chartData: generateChartData(30, 4.7, 0.03)
  },
  {
    id: 'hedera',
    name: 'Hedera',
    symbol: 'HBAR',
    iconUrl: 'https://cryptologos.cc/logos/hedera-hbar-logo.svg?v=024',
    price: 0.0978,
    change24h: 2.34,
    marketCap: 3180000000,
    volume24h: 87000000,
    allTimeHigh: 0.57,
    circulatingSupply: 32500000000,
    chartData: generateChartData(30, 0.097, 0.03)
  },
  // More tokens to make total of 20
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    iconUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=024',
    price: 0.61,
    change24h: -1.78,
    marketCap: 5900000000,
    volume24h: 354000000,
    allTimeHigh: 2.92,
    circulatingSupply: 9700000000,
    chartData: generateChartData(30, 0.61, 0.04)
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024',
    price: 31.42,
    change24h: 3.67,
    marketCap: 11300000000,
    volume24h: 764000000,
    allTimeHigh: 144.96,
    circulatingSupply: 359000000,
    chartData: generateChartData(30, 31, 0.05)
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    symbol: 'ATOM',
    iconUrl: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=024',
    price: 7.89,
    change24h: -0.92,
    marketCap: 2980000000,
    volume24h: 168000000,
    allTimeHigh: 44.45,
    circulatingSupply: 378000000,
    chartData: generateChartData(30, 7.9, 0.03)
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    symbol: 'ARB',
    iconUrl: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=024',
    price: 1.05,
    change24h: 4.12,
    marketCap: 2680000000,
    volume24h: 196000000,
    allTimeHigh: 1.88,
    circulatingSupply: 2550000000,
    chartData: generateChartData(30, 1.05, 0.04)
  }
];
