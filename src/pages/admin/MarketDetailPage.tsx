
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin-layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/dashboard/LineChart";
import { CandlestickChart } from "@/components/dashboard/CandlestickChart";
import { mockCryptoData } from "@/data/mock-crypto-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BarChart3, LineChart as LineChartIcon, Download, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MarketDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [timeframe, setTimeframe] = useState<'1d' | '1w' | '1m' | '3m' | '1y'>('1d');
  
  // In a real app, this would fetch data based on the coinId
  const coinData = mockCryptoData.find(coin => coin.id.toLowerCase() === coinId?.toLowerCase());
  
  if (!coinData) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <h2 className="text-2xl font-bold mb-2">Market Not Found</h2>
          <p className="text-muted-foreground mb-4">The market data for {coinId} could not be found.</p>
          <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate('/admin/dashboard')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <img 
                src={coinData.iconUrl} 
                alt={coinData.name} 
                className="h-8 w-8 mr-2" 
              />
              {coinData.name} ({coinData.symbol})
            </h1>
            <p className="text-muted-foreground">
              Current Price: ${coinData.price.toLocaleString()} • 24h Change: 
              <span className={coinData.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                {coinData.change24h >= 0 ? " +" : " "}
                {coinData.change24h.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="orderbook">Order Book</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Price Chart</CardTitle>
                  <CardDescription>
                    {coinData.name} price chart in USD
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-1 border rounded-md overflow-hidden">
                    <Button 
                      variant={chartType === 'line' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setChartType('line')}
                      className="rounded-none"
                    >
                      <LineChartIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={chartType === 'candlestick' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setChartType('candlestick')}
                      className="rounded-none"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Button 
                    variant={timeframe === '1d' ? 'secondary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeframe('1d')}
                  >
                    1D
                  </Button>
                  <Button 
                    variant={timeframe === '1w' ? 'secondary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeframe('1w')}
                  >
                    1W
                  </Button>
                  <Button 
                    variant={timeframe === '1m' ? 'secondary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeframe('1m')}
                  >
                    1M
                  </Button>
                  <Button 
                    variant={timeframe === '3m' ? 'secondary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeframe('3m')}
                  >
                    3M
                  </Button>
                  <Button 
                    variant={timeframe === '1y' ? 'secondary' : 'outline'} 
                    size="sm"
                    onClick={() => setTimeframe('1y')}
                  >
                    1Y
                  </Button>
                </div>
                
                {chartType === 'line' ? (
                  <LineChart data={coinData.chartData || []} />
                ) : (
                  <CandlestickChart data={coinData.chartData || []} />
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Market Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="font-medium">${coinData.marketCap.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24h Volume</p>
                      <p className="font-medium">${coinData.volume24h.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">All Time High</p>
                      <p className="font-medium">${coinData.allTimeHigh.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Circulating Supply</p>
                      <p className="font-medium">{coinData.circulatingSupply.toLocaleString()} {coinData.symbol}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Exchange Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Exchange Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Trading Pairs</p>
                      <p className="font-medium">25</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Base Fee</p>
                      <p className="font-medium">0.1%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Min Order</p>
                      <p className="font-medium">0.001 {coinData.symbol}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-green-500">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Price Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Set up custom price alerts for significant changes in {coinData.symbol} price.</p>
                  <Button className="w-full">Configure Alerts</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>
                  Latest transactions for {coinData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Trade data will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orderbook" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Book</CardTitle>
                <CardDescription>
                  Current buy and sell orders for {coinData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order book data will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics for {coinData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Market analytics will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
