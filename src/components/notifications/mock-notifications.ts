
// Mock notifications data for the notifications page
export const mockNotifications = [
  {
    id: "not-001",
    type: "security",
    title: "Login Alert",
    message: "Unusual login detected from new IP address 192.168.1.105",
    timestamp: new Date('2025-04-15T09:23:45'),
    read: false,
    priority: "high"
  },
  {
    id: "not-002",
    type: "escrow",
    title: "Escrow Created",
    message: "New escrow contract #EC-28456 created for transaction ID #TX-985642",
    timestamp: new Date('2025-04-15T08:17:22'),
    read: false,
    priority: "medium"
  },
  {
    id: "not-003",
    type: "deposit",
    title: "Large Deposit",
    message: "Large deposit of 25,000 USDT detected for user ID #U-54872",
    timestamp: new Date('2025-04-14T23:45:11'),
    read: true,
    priority: "medium"
  },
  {
    id: "not-004",
    type: "system",
    title: "System Update",
    message: "System maintenance scheduled for April 18th at 02:00 UTC",
    timestamp: new Date('2025-04-14T19:30:00'),
    read: true,
    priority: "low"
  },
  {
    id: "not-005",
    type: "kyc",
    title: "KYC Verification",
    message: "10 new KYC verifications awaiting review",
    timestamp: new Date('2025-04-14T16:22:37'),
    read: false,
    priority: "high"
  },
  {
    id: "not-006",
    type: "security",
    title: "Failed Login Attempts",
    message: "Multiple failed login attempts for admin account admin@kobhawala.com",
    timestamp: new Date('2025-04-14T14:05:19'),
    read: true,
    priority: "high"
  },
  {
    id: "not-007",
    type: "escrow",
    title: "Escrow Dispute",
    message: "New dispute opened for escrow #EC-27844. User claims funds not received.",
    timestamp: new Date('2025-04-14T11:36:54'),
    read: false,
    priority: "high"
  },
  {
    id: "not-008",
    type: "system",
    title: "API Status",
    message: "Exchange API connection restored after 2-minute outage",
    timestamp: new Date('2025-04-13T22:14:02'),
    read: true,
    priority: "medium"
  },
  {
    id: "not-009",
    type: "deposit",
    title: "Deposit Confirmation",
    message: "Bank wire deposit of $15,000 confirmed for user #U-77891",
    timestamp: new Date('2025-04-13T17:28:45'),
    read: true,
    priority: "low"
  },
  {
    id: "not-010",
    type: "security",
    title: "Permission Change",
    message: "Admin permissions updated for user admin2@kobhawala.com",
    timestamp: new Date('2025-04-13T09:51:33'),
    read: false,
    priority: "medium"
  },
  {
    id: "not-011",
    type: "kyc",
    title: "Document Verification Failed",
    message: "KYC document verification failed for user #U-32147. Reason: Document expired.",
    timestamp: new Date('2025-04-12T14:22:17'),
    read: false,
    priority: "high"
  },
  {
    id: "not-012",
    type: "deposit",
    title: "Suspicious Deposit",
    message: "Multiple rapid deposits detected for user #U-18743. Possible structuring.",
    timestamp: new Date('2025-04-12T11:05:39'),
    read: true,
    priority: "high"
  }
];
