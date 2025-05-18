
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CircularProgressBar, 
  CryptoRateCard,
  RevenueChart,
  NewsCard,
  AlertCard
} from "@/components/dashboard";
import { 
  User,
  Database, 
  Eye,
  Lock,
  ArrowUp,
  Bell,
  Filter
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function DashboardPage() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: "$64,892.50", price_num: 64892.5, change: 2.34, market_cap: "$1.2T", volume: "$45.2B" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum", price: "$3,457.32", price_num: 3457.32, change: 1.25, market_cap: "$415.8B", volume: "$18.5B" },
    { id: "tether", symbol: "USDT", name: "Tether", price: "$1.00", price_num: 1.00, change: 0.01, market_cap: "$96.7B", volume: "$89.1B" },
    { id: "tron", symbol: "TRX", name: "TRON", price: "$0.12", price_num: 0.12, change: -0.85, market_cap: "$11.2B", volume: "$1.5B" },
  ]);
  
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1D");
  const [activeTab, setActiveTab] = useState<"chart" | "news">("chart");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for dashboard
  const statsData = {
    totalUsers: 5824,
    kycRatio: 78,
    escrowVolume: "$1,245,890",
    vaultBalances: {
      btc: { hot: "2.58", cold: "15.75" },
      eth: { hot: "45.21", cold: "120.50" },
      usdt: { hot: "250,000", cold: "1,100,000" },
      trx: { hot: "1,450,000", cold: "5,890,000" },
    },
    revenue: "$42,590",
  };

  const alerts = [
    {
      type: "warning",
      message: "USDT liquidity below 50,000 threshold",
      time: "10 minutes ago",
    },
    {
      type: "error",
      message: "Failed transactions for user ID #58924",
      time: "1 hour ago",
    },
    {
      type: "info",
      message: "BTC/USD rate updated manually by Admin",
      time: "3 hours ago",
    },
  ];

  const newsItems = [
    {
      title: "Bitcoin Hits New All-Time High Above $65,000",
      source: "CryptoNews",
      time: "2 hours ago",
      url: "#",
    },
    {
      title: "Ethereum Merge Successfully Completed",
      source: "CoinDesk",
      time: "5 hours ago",
      url: "#",
    },
    {
      title: "Regulatory Changes Impact Crypto Exchanges",
      source: "Bloomberg",
      time: "1 day ago",
      url: "#",
    },
  ];

  // Mock crypto news for the selected crypto
  const cryptoNews = {
    bitcoin: [
      { title: "Bitcoin ETFs See Record Inflows as Price Soars", source: "CoinDesk", time: "2 hours ago", url: "#" },
      { title: "El Salvador Adds 100 BTC to National Treasury", source: "Bitcoin Magazine", time: "1 day ago", url: "#" },
      { title: "BTC Mining Difficulty Reaches All-Time High", source: "CryptoSlate", time: "3 days ago", url: "#" },
    ],
    ethereum: [
      { title: "Ethereum Layer 2 Solutions See Exponential Growth", source: "Decrypt", time: "5 hours ago", url: "#" },
      { title: "ETH Staking APY Rises After Latest Network Upgrade", source: "CoinTelegraph", time: "1 day ago", url: "#" },
      { title: "Major DeFi Protocol to Build Exclusively on Ethereum", source: "The Block", time: "2 days ago", url: "#" },
    ],
    tether: [
      { title: "Tether Issues Transparency Report for Q1 2025", source: "Tether", time: "12 hours ago", url: "#" },
      { title: "USDT Trading Volume Exceeds $100B on Major Exchanges", source: "CoinGecko", time: "2 days ago", url: "#" },
      { title: "Tether Expands Reserves with Short-Term Treasury Bills", source: "Bloomberg", time: "3 days ago", url: "#" },
    ],
    tron: [
      { title: "TRON's DeFi TVL Reaches $14 Billion", source: "DeFi Pulse", time: "6 hours ago", url: "#" },
      { title: "Justin Sun Announces Major TRON Ecosystem Updates", source: "CryptoPotato", time: "1 day ago", url: "#" },
      { title: "TRON Transaction Volume Surpasses Ethereum for Third Day", source: "Coin Journal", time: "4 days ago", url: "#" },
    ],
  };

  // Effect to fetch crypto data (simulated)
  useEffect(() => {
    // In a real implementation, you would make an API call to Coindesk here
    // For now, we'll use the mock data initialized above
    
    // Simulating API call
    const fetchCryptoData = async () => {
      try {
        // In a real implementation, this would be replaced with actual API call
        // const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        // const data = await res.json();
        // Process data and setCryptoData(processed_data)
        
        // For now we'll just use a timeout to simulate API call
        setIsLoading(true);
        setTimeout(() => {
          // Our mock data is already set in state
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  const handleCryptoClick = (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
    setChartDialogOpen(true);
    setActiveTab("chart");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.totalUsers}</div>
              <div className="flex items-center gap-4 mt-4">
                <CircularProgressBar 
                  progress={statsData.kycRatio} 
                  size={60} 
                  strokeWidth={5}
                />
                <div>
                  <p className="text-sm text-muted-foreground">
                    KYC Completion
                  </p>
                  <p className="text-lg font-semibold">
                    {statsData.kycRatio}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Escrow Volume Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Escrow Volume
              </CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.escrowVolume}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total fiat value in active escrows
              </p>
              <div className="w-full bg-muted/40 rounded-full h-1.5 mt-4">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>0</span>
                <span>$2M</span>
              </div>
            </CardContent>
          </Card>

          {/* Vault Balances Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Vault Balances
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">BTC</span>
                <span className="text-sm">
                  {statsData.vaultBalances.btc.hot} / {statsData.vaultBalances.btc.cold}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">ETH</span>
                <span className="text-sm">
                  {statsData.vaultBalances.eth.hot} / {statsData.vaultBalances.eth.cold}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">USDT</span>
                <span className="text-sm">
                  {statsData.vaultBalances.usdt.hot} / {statsData.vaultBalances.usdt.cold}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Hot / Cold wallet balances
              </div>
            </CardContent>
          </Card>

          {/* Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Fee Revenue</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsData.revenue}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total revenue from transaction fees
              </p>
              <div className="flex items-center text-sm mt-4">
                <div className="flex items-center gap-1 text-emerald-500">
                  <ArrowUp className="h-3 w-3" />
                  <span>12.5%</span>
                </div>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crypto Overview Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cryptocurrency Market Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cryptoData.map((crypto) => (
                <div 
                  key={crypto.id} 
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleCryptoClick(crypto)}
                >
                  <CryptoRateCard crypto={crypto} />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Click on any cryptocurrency for detailed market data and news
            </p>
          </CardContent>
        </Card>

        {/* Exchange Rates and Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          {/* News and Alerts Row */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* News Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Latest Crypto News</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {newsItems.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crypto Detail Dialog */}
        <Dialog open={chartDialogOpen} onOpenChange={setChartDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedCrypto?.name} ({selectedCrypto?.symbol}) - {selectedCrypto?.price}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chart" | "news")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Market Chart</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chart" className="space-y-4 pt-2">
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
                
                <div className="h-64 bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-center text-muted-foreground">
                    {selectedCrypto?.name} {chartType} chart for {timeframe} timeframe
                    <br />
                    <span className="text-sm">
                      (TradingView chart would be embedded here in production)
                    </span>
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-medium">{selectedCrypto?.market_cap}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="font-medium">{selectedCrypto?.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className={`font-medium ${selectedCrypto?.change && selectedCrypto.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {selectedCrypto?.change}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">{selectedCrypto?.price}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="news" className="pt-2">
                <div className="space-y-4">
                  {selectedCrypto && cryptoNews[selectedCrypto.id as keyof typeof cryptoNews]?.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg hover:bg-muted/30 transition-colors border">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{item.source}</span>
                        <span className="mx-2">•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
