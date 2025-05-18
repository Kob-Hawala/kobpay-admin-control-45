
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

// List of supported tokens - updated to include all 20 tokens
export const SUPPORTED_TOKENS = [
  "BTC", "ETH", "SOL", "XRP", "BNB", 
  "USDT", "TRX", "DOT", "ADA", "LTC", 
  "DOGE", "SHIB", "LINK", "XLM", "APT", 
  "TON", "ICP", "NEAR", "FIL", "HBAR",
  "MATIC", "AVAX", "ATOM", "ARB"
];

// This is a placeholder for a real API service that would fetch data from a real API
export const fetchCryptoData = async (id: string): Promise<CryptoData> => {
  // For now, just return mock data for the requested coin ID
  const mockData = await import('@/data/mock-crypto-data');
  const crypto = mockData.mockCryptoData.find(
    (c) => c.id.toLowerCase() === id.toLowerCase() || c.symbol.toLowerCase() === id.toLowerCase()
  );
  
  if (!crypto) {
    throw new Error(`Cryptocurrency with ID or symbol ${id} not found`);
  }
  
  return crypto;
};

// Fetch all supported cryptocurrencies
export const fetchAllCryptoData = async (): Promise<CryptoData[]> => {
  // In a real implementation, this would make an API call
  const mockData = await import('@/data/mock-crypto-data');
  return mockData.mockCryptoData;
};
