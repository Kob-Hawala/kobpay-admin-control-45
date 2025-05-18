
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useSingleCryptoData } from "@/hooks/use-crypto-data";
import { fetchChartData, fetchTokenNews, ChartData } from "@/services/crypto-api";
import { CandlestickChart } from "@/components/dashboard/CandlestickChart";
import { LineChart } from "@/components/dashboard/LineChart";

export default function MarketDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const symbol = coinId?.toUpperCase() || "BTC";
  const { cryptoData, isLoading: isLoadingCrypto } = useSingleCryptoData(symbol);
  
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [timeframe, setTimeframe] = useState<"1h" | "1d" | "1w" | "1m" | "3m" | "1y">("1d");
  const [activeTab, setActiveTab] = useState<"chart" | "news">("chart");

  // Fetch chart data when timeframe changes
  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoadingChart(true);
        const data = await fetchChartData(symbol, timeframe);
        setChartData(data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setIsLoadingChart(false);
      }
    };
    
    loadChartData();
  }, [symbol, timeframe]);

  // Fetch news data
  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setIsLoadingNews(true);
        const news = await fetchTokenNews(symbol);
        setNewsItems(news);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setIsLoadingNews(false);
      }
    };
    
    if (activeTab === "news") {
      loadNewsData();
    }
  }, [symbol, activeTab]);

  if (isLoadingCrypto) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p className="text-lg">Loading market data...</p>
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
            <Button variant="outline" size="sm" className="dark:bg-background dark:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{cryptoData.name} ({cryptoData.symbol})</h1>
            <div className="flex items-center">
              <p className="text-xl">{cryptoData.price}</p>
              <span className={`ml-2 ${cryptoData.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {cryptoData.change >= 0 ? '+' : ''}{cryptoData.change.toFixed(2)}%
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
                    className="dark:bg-primary dark:text-primary-foreground dark:border-primary/30"
                  >
                    Line
                  </Button>
                  <Button 
                    variant={chartType === "candlestick" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartType("candlestick")}
                    className="dark:bg-primary dark:text-primary-foreground dark:border-primary/30"
                  >
                    Candlestick
                  </Button>
                </div>
                <div className="flex space-x-1">
                  {[
                    { key: "1h", label: "1H" },
                    { key: "1d", label: "1D" },
                    { key: "1w", label: "1W" },
                    { key: "1m", label: "1M" },
                    { key: "3m", label: "3M" },
                    { key: "1y", label: "1Y" }
                  ].map((period) => (
                    <Button 
                      key={period.key} 
                      variant={timeframe === period.key ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimeframe(period.key as any)}
                      className="dark:bg-primary dark:text-primary-foreground dark:border-primary/30"
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="h-96 w-full">
                {isLoadingChart ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Loading chart data...</p>
                  </div>
                ) : chartType === "candlestick" ? (
                  <CandlestickChart data={chartData} />
                ) : (
                  <LineChart data={chartData} />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="news" className="pt-4">
              {isLoadingNews ? (
                <div className="flex items-center justify-center h-40">
                  <p>Loading news articles...</p>
                </div>
              ) : newsItems.length > 0 ? (
                <div className="space-y-4">
                  {newsItems.map((item, i) => (
                    <div key={i} className="p-4 rounded-lg hover:bg-muted/30 transition-colors border dark:border-gray-800">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.summary && (
                        <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span>{item.source}</span>
                        <span className="mx-2">•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No news articles found for {cryptoData.name}</p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
