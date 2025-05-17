import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { RefreshCw, Eye, Filter } from "lucide-react";

// Mock news sources and articles
const mockNewsSources = [
  { id: 1, name: "CryptoPanic", apiUrl: "https://cryptopanic.com/api/v1/posts/", enabled: true, refreshInterval: 15 },
  { id: 2, name: "CoinDesk API", apiUrl: "https://api.coindesk.com/v2/news", enabled: false, refreshInterval: 30 },
  { id: 3, name: "CryptoNews API", apiUrl: "https://cryptonews-api.com/api/v1", enabled: true, refreshInterval: 60 },
];

const mockNewsArticles = [
  { id: 1, title: "Bitcoin Surges to New Heights as Institutional Investment Grows", source: "CryptoPanic", date: "2025-05-17 08:45:22", published: true },
  { id: 2, title: "Ethereum Layer 2 Solutions See Massive Adoption Increase", source: "CryptoPanic", date: "2025-05-17 07:30:15", published: true },
  { id: 3, title: "Central Banks Around the World Explore CBDC Options", source: "CryptoNews API", date: "2025-05-16 22:15:33", published: true },
  { id: 4, title: "Market Analysis: Altcoins Performance in Current Bull Cycle", source: "CryptoPanic", date: "2025-05-16 18:20:05", published: false },
  { id: 5, title: "Regulatory Concerns Grow as Crypto Market Expands", source: "CryptoNews API", date: "2025-05-16 14:10:48", published: true },
];

export default function NewsSettingsManagement() {
  const [newsSources, setNewsSources] = useState(mockNewsSources);
  const [articles, setArticles] = useState(mockNewsArticles);
  const [editingSource, setEditingSource] = useState<null | { id: number | null, name: string, apiUrl: string, enabled: boolean, refreshInterval: number }>(null);
  
  const handleSourceToggle = (id: number) => {
    setNewsSources(newsSources.map(source => 
      source.id === id ? { ...source, enabled: !source.enabled } : source
    ));
    toast.success("News source status updated");
  };
  
  const handleArticleToggle = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, published: !article.published } : article
    ));
    toast.success("Article visibility updated");
  };
  
  const refreshArticles = () => {
    toast.success("News articles refreshed successfully");
  };
  
  const startEditing = (source: any) => {
    setEditingSource({ ...source });
  };
  
  const startAddingNew = () => {
    setEditingSource({ id: null, name: "", apiUrl: "", enabled: true, refreshInterval: 30 });
  };
  
  const saveSource = () => {
    if (editingSource) {
      if (editingSource.id === null) {
        // Adding new source
        const newId = Math.max(...newsSources.map(s => s.id)) + 1;
        setNewsSources([...newsSources, { ...editingSource, id: newId }]);
        toast.success("News source added successfully");
      } else {
        // Updating existing source
        setNewsSources(newsSources.map(source => 
          source.id === editingSource.id ? editingSource : source
        ));
        toast.success("News source updated successfully");
      }
      setEditingSource(null);
    }
  };
  
  const cancelEditing = () => {
    setEditingSource(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>News Feed Sources</CardTitle>
            <CardDescription>
              Configure API endpoints for crypto news feeds.
            </CardDescription>
          </div>
          <Button onClick={startAddingNew}>
            Add News Source
          </Button>
        </CardHeader>
        <CardContent>
          {editingSource && (
            <div className="bg-muted p-4 rounded-md mb-4 space-y-4">
              <h3 className="font-medium">{editingSource.id ? "Edit News Source" : "Add News Source"}</h3>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="source-name">Name</Label>
                  <Input 
                    id="source-name" 
                    value={editingSource.name} 
                    onChange={(e) => setEditingSource({...editingSource, name: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source-url">API URL</Label>
                  <Input 
                    id="source-url" 
                    value={editingSource.apiUrl} 
                    onChange={(e) => setEditingSource({...editingSource, apiUrl: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                  <Input 
                    id="refresh-interval" 
                    type="number" 
                    min="5" 
                    value={editingSource.refreshInterval} 
                    onChange={(e) => setEditingSource({...editingSource, refreshInterval: parseInt(e.target.value)})} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="source-enabled" 
                    checked={editingSource.enabled} 
                    onCheckedChange={(checked) => setEditingSource({...editingSource, enabled: checked})} 
                  />
                  <Label htmlFor="source-enabled">Enable this source</Label>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button onClick={saveSource}>Save</Button>
                  <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API URL</TableHead>
                  <TableHead>Refresh Interval</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsSources.map(source => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{source.apiUrl}</TableCell>
                    <TableCell>{source.refreshInterval} min</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={source.enabled} 
                          onCheckedChange={() => handleSourceToggle(source.id)} 
                        />
                        <span>{source.enabled ? "Enabled" : "Disabled"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => startEditing(source)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Recent News Articles</CardTitle>
            <CardDescription>
              Preview and manage articles before they appear in the app.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={refreshArticles}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Articles
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map(article => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.source}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={article.published} 
                          onCheckedChange={() => handleArticleToggle(article.id)} 
                        />
                        <span>{article.published ? "Published" : "Hidden"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
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
