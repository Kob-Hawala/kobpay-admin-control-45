
export const feeData = [
  {
    id: "fee_1a2b3c4d5e6f7g8h",
    name: "Standard Transaction Fee",
    type: "percentage",
    value: 0.25,
    assetType: "ALL",
    active: true,
    lastModified: "2025-04-15T10:30:00Z"
  },
  {
    id: "fee_2b3c4d5e6f7g8h9i",
    name: "Bitcoin Withdrawal Fee",
    type: "flat",
    value: 0.0001,
    assetType: "BTC",
    active: true,
    lastModified: "2025-04-20T14:45:00Z"
  },
  {
    id: "fee_3c4d5e6f7g8h9i0j",
    name: "Ethereum Gas Fee",
    type: "flat",
    value: 0.003,
    assetType: "ETH",
    active: true,
    lastModified: "2025-04-25T09:15:00Z"
  },
  {
    id: "fee_4d5e6f7g8h9i0j1k",
    name: "USDT Transfer Fee",
    type: "flat",
    value: 1.0,
    assetType: "USDT",
    active: true,
    lastModified: "2025-04-18T16:30:00Z"
  },
  {
    id: "fee_5e6f7g8h9i0j1k2l",
    name: "Premium User Fee",
    type: "percentage",
    value: 0.1,
    assetType: "ALL",
    active: true,
    lastModified: "2025-04-22T11:20:00Z"
  },
  {
    id: "fee_6f7g8h9i0j1k2l3m",
    name: "Express Transaction Fee",
    type: "percentage",
    value: 0.5,
    assetType: "ALL",
    active: false,
    lastModified: "2025-04-10T15:50:00Z"
  },
  {
    id: "fee_7g8h9i0j1k2l3m4n",
    name: "KOB Pay ID Fee",
    type: "flat",
    value: 5.0,
    assetType: "ALL",
    active: false,
    lastModified: "2025-04-05T13:40:00Z"
  },
  {
    id: "fee_8h9i0j1k2l3m4n5o",
    name: "API Access Fee",
    type: "flat",
    value: 10.0,
    assetType: "ALL",
    active: true,
    lastModified: "2025-04-28T10:10:00Z"
  }
];

export const feeRevenueData = [
  { month: "Jan", revenue: 28450 },
  { month: "Feb", revenue: 32180 },
  { month: "Mar", revenue: 35920 },
  { month: "Apr", revenue: 42350 },
  { month: "May", revenue: 45290 },
  { month: "Jun", revenue: 40120 }
];

export const feeDistributionData = [
  { name: "BTC", value: 18750 },
  { name: "ETH", value: 12340 },
  { name: "USDT", value: 9450 },
  { name: "USDC", value: 3250 },
  { name: "Other", value: 1500 }
];
