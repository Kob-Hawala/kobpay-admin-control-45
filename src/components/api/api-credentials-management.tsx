
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Key, RefreshCw } from "lucide-react";

// Mock API credentials
const mockApiCredentials = {
  hubtel: {
    apiKey: "hbt_sk_98a76sd8f76as8d76f",
    senderId: "KOBHAWALA",
    baseUrl: "https://api.hubtel.com/v2",
  },
  cryptoFeed: {
    apiKey: "crypto_7as6d7f6as7df68a7s6df8a7s6df",
    baseUrl: "https://api.cryptofeed.com/v1",
    plan: "Premium"
  },
  exchangeRate: {
    apiKey: "xr_876as8d76fas8df76",
    baseUrl: "https://openexchangerates.org/api",
    refreshInterval: "15"
  },
  fiatPayment: {
    mobileMoneyWebhook: "https://api.kobhawala.com/webhooks/mm-payment",
    bankTransferWebhook: "https://api.kobhawala.com/webhooks/bank-transfer",
    secretKey: "wh_sk_6as87df68a7s6df87as6d"
  }
};

export default function ApiCredentialsManagement() {
  const [credentials, setCredentials] = useState(mockApiCredentials);
  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({
    hubtel: false,
    cryptoFeed: false,
    exchangeRate: false,
    fiatPayment: false
  });
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({...mockApiCredentials});
  
  const toggleShowSecret = (section: string) => {
    setShowSecrets({
      ...showSecrets,
      [section]: !showSecrets[section]
    });
  };
  
  const startEditing = (section: string) => {
    setEditingSection(section);
    setFormValues({...credentials});
  };
  
  const saveChanges = () => {
    setCredentials({...formValues});
    setEditingSection(null);
    toast.success("API credentials updated successfully");
  };
  
  const cancelEditing = () => {
    setEditingSection(null);
  };
  
  const regenerateKey = (section: string) => {
    // In a real app, this would call an API to regenerate the key
    const newKey = "new_" + Math.random().toString(36).substring(2, 15);
    
    if (section === 'hubtel') {
      setCredentials({
        ...credentials,
        hubtel: {
          ...credentials.hubtel,
          apiKey: newKey
        }
      });
    } else if (section === 'cryptoFeed') {
      setCredentials({
        ...credentials,
        cryptoFeed: {
          ...credentials.cryptoFeed,
          apiKey: newKey
        }
      });
    } else if (section === 'exchangeRate') {
      setCredentials({
        ...credentials,
        exchangeRate: {
          ...credentials.exchangeRate,
          apiKey: newKey
        }
      });
    } else if (section === 'fiatPayment') {
      setCredentials({
        ...credentials,
        fiatPayment: {
          ...credentials.fiatPayment,
          secretKey: newKey
        }
      });
    }
    
    toast.success("API key regenerated successfully");
  };
  
  const renderSecretField = (value: string, section: string) => {
    return showSecrets[section] ? value : "••••••••••••••••••";
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sms">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="sms">SMS API</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Feed</TabsTrigger>
          <TabsTrigger value="exchange">Exchange Rate</TabsTrigger>
          <TabsTrigger value="payment">Payment Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>Hubtel SMS API Credentials</CardTitle>
              <CardDescription>
                Configure SMS notification service for OTP and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "hubtel" ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hubtel-key">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="hubtel-key" 
                        value={formValues.hubtel.apiKey} 
                        onChange={(e) => setFormValues({
                          ...formValues, 
                          hubtel: {
                            ...formValues.hubtel,
                            apiKey: e.target.value
                          }
                        })}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleShowSecret("hubtel")}
                        className="ml-2"
                      >
                        {showSecrets.hubtel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="hubtel-sender">Sender ID</Label>
                    <Input 
                      id="hubtel-sender" 
                      value={formValues.hubtel.senderId} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        hubtel: {
                          ...formValues.hubtel,
                          senderId: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="hubtel-url">Base URL</Label>
                    <Input 
                      id="hubtel-url" 
                      value={formValues.hubtel.baseUrl} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        hubtel: {
                          ...formValues.hubtel,
                          baseUrl: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">API Key</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm">
                          {renderSecretField(credentials.hubtel.apiKey, "hubtel")}
                        </p>
                        <button 
                          onClick={() => toggleShowSecret("hubtel")} 
                          className="text-primary text-xs"
                        >
                          {showSecrets.hubtel ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Sender ID</p>
                      <p>{credentials.hubtel.senderId}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="font-medium text-sm text-muted-foreground">Base URL</p>
                      <p className="font-mono text-sm">{credentials.hubtel.baseUrl}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    <Button onClick={() => startEditing("hubtel")}>
                      Edit Credentials
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate API Key
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Regenerate API Key</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to regenerate the Hubtel SMS API key? 
                            This action cannot be undone and will invalidate the current key.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => regenerateKey("hubtel")}>
                            Yes, Regenerate Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>Crypto Feed API Credentials</CardTitle>
              <CardDescription>
                Configure cryptocurrency market data feed API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "cryptoFeed" ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="crypto-key">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="crypto-key" 
                        value={formValues.cryptoFeed.apiKey} 
                        onChange={(e) => setFormValues({
                          ...formValues, 
                          cryptoFeed: {
                            ...formValues.cryptoFeed,
                            apiKey: e.target.value
                          }
                        })}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleShowSecret("cryptoFeed")}
                        className="ml-2"
                      >
                        {showSecrets.cryptoFeed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="crypto-url">Base URL</Label>
                    <Input 
                      id="crypto-url" 
                      value={formValues.cryptoFeed.baseUrl} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        cryptoFeed: {
                          ...formValues.cryptoFeed,
                          baseUrl: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="crypto-plan">Subscription Plan</Label>
                    <Input 
                      id="crypto-plan" 
                      value={formValues.cryptoFeed.plan} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        cryptoFeed: {
                          ...formValues.cryptoFeed,
                          plan: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">API Key</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm">
                          {renderSecretField(credentials.cryptoFeed.apiKey, "cryptoFeed")}
                        </p>
                        <button 
                          onClick={() => toggleShowSecret("cryptoFeed")} 
                          className="text-primary text-xs"
                        >
                          {showSecrets.cryptoFeed ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Subscription Plan</p>
                      <p>{credentials.cryptoFeed.plan}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="font-medium text-sm text-muted-foreground">Base URL</p>
                      <p className="font-mono text-sm">{credentials.cryptoFeed.baseUrl}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    <Button onClick={() => startEditing("cryptoFeed")}>
                      Edit Credentials
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate API Key
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Regenerate API Key</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to regenerate the Crypto Feed API key? 
                            This action cannot be undone and will invalidate the current key.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => regenerateKey("cryptoFeed")}>
                            Yes, Regenerate Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exchange">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Rate API Credentials</CardTitle>
              <CardDescription>
                Configure exchange rate data provider API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "exchangeRate" ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="exchange-key">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="exchange-key" 
                        value={formValues.exchangeRate.apiKey} 
                        onChange={(e) => setFormValues({
                          ...formValues, 
                          exchangeRate: {
                            ...formValues.exchangeRate,
                            apiKey: e.target.value
                          }
                        })}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleShowSecret("exchangeRate")}
                        className="ml-2"
                      >
                        {showSecrets.exchangeRate ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="exchange-url">Base URL</Label>
                    <Input 
                      id="exchange-url" 
                      value={formValues.exchangeRate.baseUrl} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        exchangeRate: {
                          ...formValues.exchangeRate,
                          baseUrl: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                    <Input 
                      id="refresh-interval" 
                      type="number"
                      min="1"
                      value={formValues.exchangeRate.refreshInterval} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        exchangeRate: {
                          ...formValues.exchangeRate,
                          refreshInterval: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">API Key</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm">
                          {renderSecretField(credentials.exchangeRate.apiKey, "exchangeRate")}
                        </p>
                        <button 
                          onClick={() => toggleShowSecret("exchangeRate")} 
                          className="text-primary text-xs"
                        >
                          {showSecrets.exchangeRate ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Refresh Interval</p>
                      <p>{credentials.exchangeRate.refreshInterval} minutes</p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="font-medium text-sm text-muted-foreground">Base URL</p>
                      <p className="font-mono text-sm">{credentials.exchangeRate.baseUrl}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    <Button onClick={() => startEditing("exchangeRate")}>
                      Edit Credentials
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate API Key
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Regenerate API Key</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to regenerate the Exchange Rate API key? 
                            This action cannot be undone and will invalidate the current key.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => regenerateKey("exchangeRate")}>
                            Yes, Regenerate Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Fiat Payment Webhook Endpoints</CardTitle>
              <CardDescription>
                Configure webhook endpoints for payment processing systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingSection === "fiatPayment" ? (
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mm-webhook">Mobile Money Webhook URL</Label>
                    <Input 
                      id="mm-webhook" 
                      value={formValues.fiatPayment.mobileMoneyWebhook} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        fiatPayment: {
                          ...formValues.fiatPayment,
                          mobileMoneyWebhook: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="bank-webhook">Bank Transfer Webhook URL</Label>
                    <Input 
                      id="bank-webhook" 
                      value={formValues.fiatPayment.bankTransferWebhook} 
                      onChange={(e) => setFormValues({
                        ...formValues, 
                        fiatPayment: {
                          ...formValues.fiatPayment,
                          bankTransferWebhook: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="webhook-secret">Webhook Secret Key</Label>
                    <div className="flex">
                      <Input 
                        id="webhook-secret" 
                        value={formValues.fiatPayment.secretKey} 
                        onChange={(e) => setFormValues({
                          ...formValues, 
                          fiatPayment: {
                            ...formValues.fiatPayment,
                            secretKey: e.target.value
                          }
                        })}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleShowSecret("fiatPayment")}
                        className="ml-2"
                      >
                        {showSecrets.fiatPayment ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-y-4">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Mobile Money Webhook URL</p>
                      <p className="font-mono text-sm">{credentials.fiatPayment.mobileMoneyWebhook}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Bank Transfer Webhook URL</p>
                      <p className="font-mono text-sm">{credentials.fiatPayment.bankTransferWebhook}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Webhook Secret Key</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm">
                          {renderSecretField(credentials.fiatPayment.secretKey, "fiatPayment")}
                        </p>
                        <button 
                          onClick={() => toggleShowSecret("fiatPayment")} 
                          className="text-primary text-xs"
                        >
                          {showSecrets.fiatPayment ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex space-x-3">
                    <Button onClick={() => startEditing("fiatPayment")}>
                      Edit Endpoints
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate Secret Key
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Regenerate Secret Key</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to regenerate the Webhook Secret Key? 
                            This action cannot be undone and will invalidate the current key.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => regenerateKey("fiatPayment")}>
                            Yes, Regenerate Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
