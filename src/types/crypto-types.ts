
export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  allTimeHigh: number;
  circulatingSupply: number;
  chartData: ChartData[];
}
