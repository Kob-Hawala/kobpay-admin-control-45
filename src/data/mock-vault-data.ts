
export interface VaultTransfer {
  id: string;
  fromVault: "cold" | "hot";
  toVault: "cold" | "hot";
  asset: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  initiatedBy: string;
  confirmedBy?: string;
  timestamp: string;
  reason: string;
}

export interface VaultBalance {
  asset: string;
  hotWallet: number;
  coldWallet: number;
  threshold: number;
  lowLiquidityWarning: boolean;
}

export const mockVaultTransfers: VaultTransfer[] = [
  {
    id: "vt-001",
    fromVault: "cold",
    toVault: "hot",
    asset: "BTC",
    amount: 5.5,
    status: "completed",
    initiatedBy: "admin-1",
    confirmedBy: "admin-2",
    timestamp: "2025-05-10T14:30:00Z",
    reason: "Low hot wallet balance"
  },
  {
    id: "vt-002",
    fromVault: "hot",
    toVault: "cold",
    asset: "ETH",
    amount: 45.75,
    status: "completed",
    initiatedBy: "admin-1",
    confirmedBy: "admin-2",
    timestamp: "2025-05-09T10:15:00Z",
    reason: "Security measure"
  },
  {
    id: "vt-003",
    fromVault: "cold",
    toVault: "hot",
    asset: "USDT",
    amount: 25000,
    status: "pending",
    initiatedBy: "admin-1",
    timestamp: "2025-05-11T16:45:00Z",
    reason: "Threshold triggered"
  },
  {
    id: "vt-004",
    fromVault: "cold",
    toVault: "hot",
    asset: "BTC",
    amount: 2.25,
    status: "failed",
    initiatedBy: "admin-2",
    timestamp: "2025-05-08T09:05:00Z",
    reason: "2FA confirmation failed"
  },
  {
    id: "vt-005",
    fromVault: "hot",
    toVault: "cold",
    asset: "SOL",
    amount: 1200,
    status: "completed",
    initiatedBy: "admin-1",
    confirmedBy: "admin-2",
    timestamp: "2025-05-07T20:10:00Z",
    reason: "Excess balance in hot wallet"
  },
];

export const mockVaultBalances: VaultBalance[] = [
  {
    asset: "BTC",
    hotWallet: 2.5,
    coldWallet: 25.5,
    threshold: 3.0,
    lowLiquidityWarning: true
  },
  {
    asset: "ETH",
    hotWallet: 45.0,
    coldWallet: 350.75,
    threshold: 30.0,
    lowLiquidityWarning: false
  },
  {
    asset: "USDT",
    hotWallet: 15000,
    coldWallet: 250000,
    threshold: 20000,
    lowLiquidityWarning: true
  },
  {
    asset: "SOL",
    hotWallet: 500,
    coldWallet: 7500,
    threshold: 400,
    lowLiquidityWarning: false
  },
  {
    asset: "USDC",
    hotWallet: 22000,
    coldWallet: 180000,
    threshold: 25000,
    lowLiquidityWarning: true
  },
];
