
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
  Key,
  Filter
} from "lucide-react";

export default function DashboardPage() {
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

  const cryptoRates = [
    { symbol: "BTC", name: "Bitcoin", price: "$64,892.50", change: 2.34 },
    { symbol: "ETH", name: "Ethereum", price: "$3,457.32", change: 1.25 },
    { symbol: "USDT", name: "Tether", price: "$1.00", change: 0.01 },
    { symbol: "TRX", name: "TRON", price: "$0.12", change: -0.85 },
  ];

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
              <User className="h-4 w-4 text-muted-foreground" />
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
              <Lock className="h-4 w-4 text-muted-foreground" />
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
              <Database className="h-4 w-4 text-muted-foreground" />
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
              <Filter className="h-4 w-4 text-muted-foreground" />
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

        {/* Exchange Rates and Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exchange Rates Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Exchange Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cryptoRates.map((crypto) => (
                  <CryptoRateCard key={crypto.symbol} crypto={crypto} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </div>

        {/* News and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Latest Crypto News</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {newsItems.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))}
            </CardContent>
          </Card>

          {/* Alerts Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* API Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Hubtel API</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Key className="h-4 w-4" />
                  <div className="font-mono text-sm">••••••••••••••••3f8a</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">News API Source</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <div className="text-sm">api.cryptonews.com/v1/feed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
