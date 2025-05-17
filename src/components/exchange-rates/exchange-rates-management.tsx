
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { RefreshCw, Pause, Play, Upload } from "lucide-react";

// Mock exchange rate data
const mockExchangeRates = [
  { id: 1, symbol: "BTC/USD", rate: 55842.32, lastUpdated: "2025-05-17 10:30:25", source: "CoinGecko", overridden: false },
  { id: 2, symbol: "ETH/USD", rate: 2673.18, lastUpdated: "2025-05-17 10:30:25", source: "CoinGecko", overridden: false },
  { id: 3, symbol: "XRP/USD", rate: 0.6234, lastUpdated: "2025-05-17 10:30:25", source: "CoinGecko", overridden: false },
  { id: 4, symbol: "BNB/USD", rate: 534.91, lastUpdated: "2025-05-17 10:30:25", source: "CoinGecko", overridden: false },
  { id: 5, symbol: "SOL/USD", rate: 115.67, lastUpdated: "2025-05-17 10:30:25", source: "CoinGecko", overridden: false },
  { id: 6, symbol: "ADA/USD", rate: 0.4125, lastUpdated: "2025-05-17 10:25:45", source: "Manual", overridden: true },
];

export default function ExchangeRatesManagement() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("coingecko");
  const [refreshInterval, setRefreshInterval] = useState("15");
  const [rates, setRates] = useState(mockExchangeRates);
  const [editingRate, setEditingRate] = useState<null | { id: number, value: string, margin: string }>(null);
  
  const handleRefresh = () => {
    toast.success("Exchange rates refreshed successfully");
  };
  
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast.info(autoRefresh ? "Auto-refresh paused" : "Auto-refresh enabled");
  };
  
  const pushToApps = () => {
    toast.success("Exchange rates pushed to mobile apps");
  };
  
  const startEditing = (id: number, currentRate: number) => {
    setEditingRate({ id, value: currentRate.toString(), margin: "0" });
  };
  
  const saveRate = () => {
    if (editingRate) {
      setRates(rates.map(rate => 
        rate.id === editingRate.id 
          ? { ...rate, rate: parseFloat(editingRate.value), overridden: true, source: "Manual", lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19) } 
          : rate
      ));
      setEditingRate(null);
      toast.success("Rate updated successfully");
    }
  };
  
  const cancelEditing = () => {
    setEditingRate(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exchange Rate Provider Configuration</CardTitle>
          <CardDescription>
            Configure which provider to use for automatic exchange rate updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="provider">Provider</Label>
              <select 
                id="provider"
                className="w-full p-2 border rounded-md"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="coingecko">CoinGecko API</option>
                <option value="cryptocompare">CryptoCompare API</option>
                <option value="binance">Binance API</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interval">Refresh Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                min="1"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={toggleAutoRefresh} />
                <Label htmlFor="auto-refresh">Auto-refresh enabled</Label>
              </div>
              <Button onClick={toggleAutoRefresh} variant="outline" size="sm">
                {autoRefresh ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {autoRefresh ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Exchange Rates</CardTitle>
            <CardDescription>
              Manage cryptocurrency exchange rates and apply manual overrides.
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Now
            </Button>
            <Button variant="default" size="sm" onClick={pushToApps}>
              <Upload className="h-4 w-4 mr-2" />
              Push to Apps
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead>Rate (USD)</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.map(rate => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.symbol}</TableCell>
                    <TableCell>
                      {editingRate && editingRate.id === rate.id ? (
                        <div className="flex space-x-2">
                          <Input
                            className="w-24"
                            value={editingRate.value}
                            onChange={(e) => setEditingRate({...editingRate, value: e.target.value})}
                          />
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="default" onClick={saveRate}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={cancelEditing}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <span className={rate.overridden ? "text-amber-500 font-medium" : ""}>
                          {rate.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        rate.source === "Manual" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                      }`}>
                        {rate.source}
                      </span>
                    </TableCell>
                    <TableCell>{rate.lastUpdated}</TableCell>
                    <TableCell>
                      {!editingRate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(rate.id, rate.rate)}
                        >
                          Override
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
