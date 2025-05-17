
export interface FiatDeposit {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  receiptUrl: string;
  status: "pending" | "approved" | "rejected";
  comment?: string;
  createdAt: string;
  updatedAt: string;
  adminId?: string;
  source: string;
}

export const mockFiatDeposits: FiatDeposit[] = [
  {
    id: "fd-001",
    userId: "user-123",
    userName: "Alice Johnson",
    amount: 1000,
    currency: "USD",
    receiptUrl: "https://placehold.co/600x400?text=Receipt+Image",
    status: "pending",
    createdAt: "2025-05-10T14:30:00Z",
    updatedAt: "2025-05-10T14:30:00Z",
    source: "Bank Transfer"
  },
  {
    id: "fd-002",
    userId: "user-456",
    userName: "Bob Smith",
    amount: 5000,
    currency: "EUR",
    receiptUrl: "https://placehold.co/600x400?text=Receipt+Image",
    status: "approved",
    comment: "Valid receipt verified",
    createdAt: "2025-05-09T10:15:00Z",
    updatedAt: "2025-05-09T11:22:00Z",
    adminId: "admin-1",
    source: "Credit Card"
  },
  {
    id: "fd-003",
    userId: "user-789",
    userName: "Carol Davis",
    amount: 2500,
    currency: "GBP",
    receiptUrl: "https://placehold.co/600x400?text=Receipt+Image",
    status: "rejected",
    comment: "Unclear receipt image. Please resend.",
    createdAt: "2025-05-08T16:45:00Z",
    updatedAt: "2025-05-08T17:20:00Z",
    adminId: "admin-1",
    source: "Wire Transfer"
  },
  {
    id: "fd-004",
    userId: "user-234",
    userName: "David Wilson",
    amount: 750,
    currency: "USD",
    receiptUrl: "https://placehold.co/600x400?text=Receipt+Image",
    status: "pending",
    createdAt: "2025-05-11T09:05:00Z", 
    updatedAt: "2025-05-11T09:05:00Z",
    source: "SEPA Transfer"
  },
  {
    id: "fd-005",
    userId: "user-567",
    userName: "Eva Martinez",
    amount: 3000,
    currency: "USD",
    receiptUrl: "https://placehold.co/600x400?text=Receipt+Image",
    status: "pending",
    createdAt: "2025-05-10T20:10:00Z",
    updatedAt: "2025-05-10T20:10:00Z",
    source: "PayPal"
  },
];
