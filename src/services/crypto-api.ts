export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// This is a placeholder for a real API service
export const fetchCryptoData = async (id: string) => {
  // In a real application, this would make an API call
  throw new Error('Not implemented yet');
};
