
// Mock data for activity logs

export type LogEntry = {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  details?: string;
  status: 'success' | 'warning' | 'error' | 'info';
  resource?: string;
};

export const mockLogs: LogEntry[] = [
  {
    id: "log_001",
    userId: "usr_1",
    userName: "John Doe",
    action: "User Login",
    timestamp: "2023-06-12T14:25:00Z",
    ipAddress: "192.168.1.1",
    status: "success",
  },
  {
    id: "log_002",
    userId: "usr_1",
    userName: "John Doe",
    action: "Changed 2FA Settings",
    timestamp: "2023-06-12T14:26:00Z",
    ipAddress: "192.168.1.1",
    details: "Enabled 2FA via authenticator app",
    status: "success",
  },
  {
    id: "log_003",
    userId: "usr_1",
    userName: "John Doe",
    action: "BTC Withdrawal",
    timestamp: "2023-06-12T14:30:00Z",
    ipAddress: "192.168.1.1",
    details: "Withdrew 0.25 BTC to external wallet bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    status: "success",
    resource: "Wallet"
  },
  {
    id: "log_004",
    userId: "usr_2",
    userName: "Jane Smith",
    action: "User Login",
    timestamp: "2023-06-11T10:15:00Z",
    ipAddress: "192.168.2.5",
    status: "success",
  },
  {
    id: "log_005",
    userId: "usr_2",
    userName: "Jane Smith",
    action: "P2P Purchase",
    timestamp: "2023-06-11T10:20:00Z",
    ipAddress: "192.168.2.5",
    details: "Purchased 0.15 BTC via P2P",
    status: "success",
    resource: "P2P Market"
  },
  {
    id: "log_006",
    userId: "usr_3",
    userName: "Michael Johnson",
    action: "Account Created",
    timestamp: "2023-06-05T15:20:00Z",
    ipAddress: "192.168.3.10",
    status: "info",
  },
  {
    id: "log_007",
    userId: "usr_3",
    userName: "Michael Johnson",
    action: "KYC Documents Uploaded",
    timestamp: "2023-06-05T15:25:00Z",
    ipAddress: "192.168.3.10",
    details: "Uploaded passport, selfie, and proof of address",
    status: "info",
    resource: "KYC"
  },
  {
    id: "log_008",
    userId: "admin_1",
    userName: "Admin User",
    action: "KYC Verification",
    timestamp: "2023-06-06T09:30:00Z",
    ipAddress: "192.168.4.20",
    details: "Approved KYC for user Michael Johnson",
    status: "success",
    resource: "KYC"
  },
  {
    id: "log_009",
    userId: "usr_4",
    userName: "Sarah Williams",
    action: "Failed Login Attempt",
    timestamp: "2023-06-01T08:30:00Z",
    ipAddress: "203.0.113.5",
    details: "Multiple failed login attempts detected",
    status: "warning",
  },
  {
    id: "log_010",
    userId: "admin_2",
    userName: "System Admin",
    action: "Account Suspension",
    timestamp: "2023-06-01T09:15:00Z",
    ipAddress: "192.168.4.15",
    details: "Suspended account of Sarah Williams due to suspicious activity",
    status: "warning",
  },
  {
    id: "log_011",
    userId: "system",
    userName: "System",
    action: "Daily Backup",
    timestamp: "2023-06-12T00:00:00Z",
    ipAddress: "internal",
    status: "success",
    resource: "Database"
  },
  {
    id: "log_012",
    userId: "system",
    userName: "System",
    action: "Exchange Rate Update",
    timestamp: "2023-06-12T00:15:00Z",
    ipAddress: "internal",
    status: "success",
    resource: "Exchange Rates"
  },
  {
    id: "log_013",
    userId: "admin_1",
    userName: "Admin User",
    action: "Fee Structure Update",
    timestamp: "2023-06-10T11:20:00Z",
    ipAddress: "192.168.4.20",
    details: "Updated withdrawal fees for BTC from 0.0005 to 0.0004",
    status: "info",
    resource: "Fee Structure"
  },
  {
    id: "log_014",
    userId: "usr_5",
    userName: "Robert Brown",
    action: "Large Deposit",
    timestamp: "2023-05-28T16:20:00Z",
    ipAddress: "192.168.5.20",
    details: "Deposited 1.5 BTC",
    status: "info",
    resource: "Wallet"
  },
  {
    id: "log_015",
    userId: "system",
    userName: "System",
    action: "API Error",
    timestamp: "2023-06-11T03:45:00Z",
    ipAddress: "internal",
    details: "Failed to connect to external exchange API. Timeout after 30s",
    status: "error",
    resource: "External API"
  }
];
