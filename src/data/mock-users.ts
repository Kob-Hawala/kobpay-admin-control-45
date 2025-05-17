
export const mockUsers = [
  {
    id: "usr_1",
    name: "John Doe",
    email: "john.doe@example.com",
    kobPayId: "KOB7384950",
    kycStatus: "verified",
    accountStatus: "active",
    dailyLimit: 20000,
    createdAt: "2023-04-15T10:30:00Z",
    wallets: [
      {
        currency: "BTC",
        networkType: "BTC",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        balance: 0.75,
        fiatEquivalent: 48750
      },
      {
        currency: "ETH",
        networkType: "ERC20",
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        balance: 12.5,
        fiatEquivalent: 43125
      },
      {
        currency: "USDT",
        networkType: "TRC20",
        address: "TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireY9",
        balance: 15000,
        fiatEquivalent: 15000
      },
      {
        currency: "TRX",
        networkType: "TRX",
        address: "TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireY9",
        balance: 75000,
        fiatEquivalent: 9000
      }
    ],
    transactions: [
      {
        id: "tx_1001",
        type: "Deposit",
        amount: 0.25,
        currency: "BTC",
        fiatValue: 16250,
        date: "2023-06-12T14:25:00Z"
      },
      {
        id: "tx_1002",
        type: "Withdrawal",
        amount: -5.0,
        currency: "ETH",
        fiatValue: 17250,
        date: "2023-06-10T09:15:00Z"
      },
      {
        id: "tx_1003",
        type: "P2P Sale",
        amount: -0.1,
        currency: "BTC",
        fiatValue: 6500,
        date: "2023-06-08T16:40:00Z"
      }
    ],
    kyc: {
      dob: "1985-07-12",
      nationality: "USA",
      idType: "Passport",
      documents: [
        { type: "Passport", verified: true },
        { type: "Selfie", verified: true },
        { type: "Proof of Address", verified: true }
      ]
    },
    activityLogs: [
      {
        id: "log_1",
        timestamp: "2023-06-12T14:25:00Z",
        action: "Logged in successfully",
        ipAddress: "192.168.1.1"
      },
      {
        id: "log_2",
        timestamp: "2023-06-12T14:26:00Z",
        action: "Changed 2FA settings",
        ipAddress: "192.168.1.1"
      },
      {
        id: "log_3",
        timestamp: "2023-06-12T14:30:00Z",
        action: "Initiated BTC withdrawal",
        ipAddress: "192.168.1.1"
      }
    ]
  },
  {
    id: "usr_2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    kobPayId: "KOB9273841",
    kycStatus: "verified",
    accountStatus: "active",
    dailyLimit: 10000,
    createdAt: "2023-05-22T08:45:00Z",
    wallets: [
      {
        currency: "BTC",
        networkType: "BTC",
        address: "bc1q9h6tgmqr9p8az8pf4qv9m2zyq7kl3h6y3z7jt",
        balance: 0.3,
        fiatEquivalent: 19500
      },
      {
        currency: "ETH",
        networkType: "ERC20",
        address: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
        balance: 5.75,
        fiatEquivalent: 19838
      }
    ],
    transactions: [
      {
        id: "tx_2001",
        type: "P2P Purchase",
        amount: 0.15,
        currency: "BTC",
        fiatValue: 9750,
        date: "2023-06-11T10:20:00Z"
      }
    ],
    kyc: {
      dob: "1990-03-25",
      nationality: "UK",
      idType: "Driver's License",
      documents: [
        { type: "Driver's License", verified: true },
        { type: "Selfie", verified: true },
        { type: "Proof of Address", verified: true }
      ]
    },
    activityLogs: [
      {
        id: "log_4",
        timestamp: "2023-06-11T10:15:00Z",
        action: "Logged in successfully",
        ipAddress: "192.168.2.5"
      },
      {
        id: "log_5",
        timestamp: "2023-06-11T10:20:00Z",
        action: "Initiated P2P purchase",
        ipAddress: "192.168.2.5"
      }
    ]
  },
  {
    id: "usr_3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    kobPayId: null,
    kycStatus: "pending",
    accountStatus: "restricted",
    dailyLimit: 1000,
    createdAt: "2023-06-05T15:20:00Z",
    wallets: [
      {
        currency: "USDT",
        networkType: "TRC20",
        address: "TJRyWwFs9wTFGZg3JbrVriFbNfCug5tDeC",
        balance: 500,
        fiatEquivalent: 500
      }
    ],
    transactions: [],
    kyc: {
      dob: "1988-11-30",
      nationality: "Canada",
      idType: "National ID",
      documents: [
        { type: "National ID", verified: false },
        { type: "Selfie", verified: false },
        { type: "Proof of Address", verified: false }
      ]
    },
    activityLogs: [
      {
        id: "log_6",
        timestamp: "2023-06-05T15:20:00Z",
        action: "Account created",
        ipAddress: "192.168.3.10"
      },
      {
        id: "log_7",
        timestamp: "2023-06-05T15:25:00Z",
        action: "KYC documents uploaded",
        ipAddress: "192.168.3.10"
      }
    ]
  },
  {
    id: "usr_4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    kobPayId: "KOB4928374",
    kycStatus: "verified",
    accountStatus: "suspended",
    dailyLimit: 5000,
    createdAt: "2023-03-10T09:15:00Z",
    wallets: [
      {
        currency: "BTC",
        networkType: "BTC",
        address: "bc1qm4z8p0fx5t6v4r3s8qtr789r9x5rh3u5j6q2eh",
        balance: 0.05,
        fiatEquivalent: 3250
      },
      {
        currency: "ETH",
        networkType: "ERC20",
        address: "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
        balance: 2.3,
        fiatEquivalent: 7935
      }
    ],
    transactions: [
      {
        id: "tx_4001",
        type: "Withdrawal",
        amount: -0.2,
        currency: "BTC",
        fiatValue: 13000,
        date: "2023-04-05T11:45:00Z"
      }
    ],
    kyc: {
      dob: "1986-09-18",
      nationality: "Australia",
      idType: "Passport",
      documents: [
        { type: "Passport", verified: true },
        { type: "Selfie", verified: true },
        { type: "Proof of Address", verified: true }
      ]
    },
    activityLogs: [
      {
        id: "log_8",
        timestamp: "2023-06-01T08:30:00Z",
        action: "Suspicious login attempt",
        ipAddress: "203.0.113.5"
      },
      {
        id: "log_9",
        timestamp: "2023-06-01T09:15:00Z",
        action: "Account suspended by admin",
        ipAddress: "192.168.4.15"
      }
    ]
  },
  {
    id: "usr_5",
    name: "Robert Brown",
    email: "robert.b@example.com",
    kobPayId: "KOB2837465",
    kycStatus: "verified",
    accountStatus: "active",
    dailyLimit: 50000,
    createdAt: "2022-11-15T14:30:00Z",
    wallets: [
      {
        currency: "BTC",
        networkType: "BTC",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        balance: 3.2,
        fiatEquivalent: 208000
      },
      {
        currency: "ETH",
        networkType: "ERC20",
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        balance: 45.8,
        fiatEquivalent: 158010
      },
      {
        currency: "USDT",
        networkType: "TRC20",
        address: "TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireY9",
        balance: 120000,
        fiatEquivalent: 120000
      }
    ],
    transactions: [
      {
        id: "tx_5001",
        type: "Deposit",
        amount: 1.5,
        currency: "BTC",
        fiatValue: 97500,
        date: "2023-05-28T16:20:00Z"
      },
      {
        id: "tx_5002",
        type: "P2P Sale",
        amount: -0.5,
        currency: "BTC",
        fiatValue: 32500,
        date: "2023-05-25T11:10:00Z"
      }
    ],
    kyc: {
      dob: "1975-04-02",
      nationality: "USA",
      idType: "Driver's License",
      documents: [
        { type: "Driver's License", verified: true },
        { type: "Selfie", verified: true },
        { type: "Proof of Address", verified: true }
      ]
    },
    activityLogs: [
      {
        id: "log_10",
        timestamp: "2023-05-28T16:20:00Z",
        action: "BTC deposit confirmed",
        ipAddress: "192.168.5.20"
      }
    ]
  }
];
