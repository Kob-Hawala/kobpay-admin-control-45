
import { useState, useEffect } from "react";
import { fetchAllCryptoData, fetchCryptoData, CryptoData } from "@/services/crypto-api";

export function useCryptoData() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCryptoData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllCryptoData();
      setCryptoData(data);
      setError(null);
    } catch (err) {
      console.error("Error loading crypto data:", err);
      setError("Failed to load cryptocurrency data");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    loadCryptoData();

    // Set up periodic refetch (every 60 seconds)
    const interval = setInterval(loadCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  return { cryptoData, isLoading, error, refetch: loadCryptoData };
}

export function useSingleCryptoData(symbol: string) {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCryptoData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCryptoData(symbol);
      setCryptoData(data);
      setError(null);
    } catch (err) {
      console.error(`Error loading data for ${symbol}:`, err);
      setError(`Failed to load data for ${symbol}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    loadCryptoData();
    
    // Set up periodic refetch (every 60 seconds)
    const interval = setInterval(loadCryptoData, 60000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  return { cryptoData, isLoading, error, refetch: loadCryptoData };
}
