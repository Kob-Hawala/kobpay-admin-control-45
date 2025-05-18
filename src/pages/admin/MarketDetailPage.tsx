
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { RevenueChart } from "@/components/dashboard";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: string;
  price_num: number;
  change: number;
  market_cap: string;
  volume: string;
}

export default function MarketDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1D");
  const [activeTab, setActiveTab] = useState<"chart" | "news">("chart");

  // Mock crypto data
  const mockCryptoData: Record<string, CryptoData> = {
    bitcoin: { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: "$64,892.50", price_num: 64892.5, change: 2.34, market_cap: "$1.2T", volume: "$45.2B" },
    ethereum: { id: "ethereum", symbol: "ETH", name: "Ethereum", price: "$3,457.32", price_num: 3457.32, change: 1.25, market_cap: "$415.8B", volume: "$18.5B" },
    tether: { id: "tether", symbol: "USDT", name: "Tether", price: "$1.00", price_num: 1.00, change: 0.01, market_cap: "$96.7B", volume: "$89.1B" },
    tron: { id: "tron", symbol: "TRX", name: "TRON", price: "$0.12", price_num: 0.12, change: -0.85, market_cap: "$11.2B", volume: "$1.5B" },
  };

  // Mock crypto news
  const cryptoNews: Record<string, Array<{ title: string; source: string; time: string; url: string }>> = {
    bitcoin: [
      { title: "Bitcoin ETFs See Record Inflows as Price Soars", source: "CoinDesk", time: "2 hours ago", url: "#" },
      { title: "El Salvador Adds 100 BTC to National Treasury", source: "Bitcoin Magazine", time: "1 day ago", url: "#" },
      { title: "BTC Mining Difficulty Reaches All-Time High", source: "CryptoSlate", time: "3 days ago", url: "#" },
      { title: "Bitcoin Halving Impact Analysis: What to Expect", source: "Forbes Crypto", time: "4 days ago", url: "#" },
      { title: "Institutional Adoption Surges as Banks Launch BTC Custody", source: "The Block", time: "5 days ago", url: "#" },
      { title: "Bitcoin Address Activity Reaches 3-Year High", source: "CoinMetrics", time: "1 week ago", url: "#" },
      { title: "Lightning Network Capacity Exceeds 5000 BTC", source: "Bitcoin Magazine", time: "1 week ago", url: "#" },
    ],
    ethereum: [
      { title: "Ethereum Layer 2 Solutions See Exponential Growth", source: "Decrypt", time: "5 hours ago", url: "#" },
      { title: "ETH Staking APY Rises After Latest Network Upgrade", source: "CoinTelegraph", time: "1 day ago", url: "#" },
      { title: "Major DeFi Protocol to Build Exclusively on Ethereum", source: "The Block", time: "2 days ago", url: "#" },
      { title: "Ethereum Layer 2 TVL Surpasses $45 Billion", source: "DeFi Pulse", time: "3 days ago", url: "#" },
      { title: "ETH Gas Fees Drop 40% Following EIP-4844 Implementation", source: "Ethereum Foundation", time: "5 days ago", url: "#" },
      { title: "Ethereum 2.0 Validators Surpass 1 Million", source: "Etherscan", time: "1 week ago", url: "#" },
      { title: "ETH Privacy Solution ZK-SNARKs Integration Complete", source: "ConsenSys", time: "2 weeks ago", url: "#" },
    ],
    tether: [
      { title: "Tether Issues Transparency Report for Q1 2025", source: "Tether", time: "12 hours ago", url: "#" },
      { title: "USDT Trading Volume Exceeds $100B on Major Exchanges", source: "CoinGecko", time: "2 days ago", url: "#" },
      { title: "Tether Expands Reserves with Short-Term Treasury Bills", source: "Bloomberg", time: "3 days ago", url: "#" },
      { title: "USDT Launches on New Blockchain Network", source: "Tether Blog", time: "4 days ago", url: "#" },
      { title: "Regulatory Compliance: Tether Passes Third-Party Audit", source: "Crypto News", time: "1 week ago", url: "#" },
      { title: "USDT Market Cap Reaches New All-Time High", source: "CoinMarketCap", time: "8 days ago", url: "#" },
      { title: "Tether CTO Discusses Future of Stablecoins", source: "Podcast Transcript", time: "2 weeks ago", url: "#" },
    ],
    tron: [
      { title: "TRON's DeFi TVL Reaches $14 Billion", source: "DeFi Pulse", time: "6 hours ago", url: "#" },
      { title: "Justin Sun Announces Major TRON Ecosystem Updates", source: "CryptoPotato", time: "1 day ago", url: "#" },
      { title: "TRON Transaction Volume Surpasses Ethereum for Third Day", source: "Coin Journal", time: "4 days ago", url: "#" },
      { title: "TRON Launches $100M Developer Incentive Program", source: "TRON Foundation", time: "5 days ago", url: "#" },
      { title: "TRX Staking Rewards to Increase by 15%", source: "TRON Blog", time: "1 week ago", url: "#" },
      { title: "TRON Partners with Major Payment Processor", source: "Finance Magnates", time: "10 days ago", url: "#" },
      { title: "Analysis: TRON Ecosystem Growth YTD 2025", source: "DappRadar", time: "2 weeks ago", url: "#" },
    ],
  };

  useEffect(() => {
    // Simulating API fetch
    setIsLoading(true);
    setTimeout(() => {
      if (coinId && mockCryptoData[coinId]) {
        setCryptoData(mockCryptoData[coinId]);
      }
      setIsLoading(false);
    }, 1000);
  }, [coinId]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="text-lg">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!cryptoData) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)]">
            <p className="text-lg font-medium">Cryptocurrency not found</p>
            <p className="text-muted-foreground">The requested cryptocurrency information is not available.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{cryptoData.name} ({cryptoData.symbol})</h1>
            <div className="flex items-center">
              <p className="text-xl">{cryptoData.price}</p>
              <span className={`ml-2 ${cryptoData.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {cryptoData.change >= 0 ? '+' : ''}{cryptoData.change}%
              </span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-sm text-muted-foreground">Market Cap</h3>
                <p className="text-lg font-medium">{cryptoData.market_cap}</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">24h Trading Volume</h3>
                <p className="text-lg font-medium">{cryptoData.volume}</p>
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Current Price</h3>
                <p className="text-lg font-medium">{cryptoData.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chart" | "news")}>
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="chart">Price Chart</TabsTrigger>
                <TabsTrigger value="news">Latest News</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="chart" className="space-y-4 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <Button 
                    variant={chartType === "line" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("line")}
                  >
                    Line
                  </Button>
                  <Button 
                    variant={chartType === "candlestick" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("candlestick")}
                  >
                    Candlestick
                  </Button>
                </div>
                <div className="flex space-x-1">
                  {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                    <Button 
                      key={period} 
                      variant={timeframe === period ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe(period as any)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="h-96">
                <RevenueChart />
              </div>
            </TabsContent>
            
            <TabsContent value="news" className="pt-4">
              <div className="space-y-4">
                {cryptoNews[coinId || ""]?.map((item, i) => (
                  <div key={i} className="p-4 rounded-lg hover:bg-muted/30 transition-colors border">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <span>{item.source}</span>
                      <span className="mx-2">•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
