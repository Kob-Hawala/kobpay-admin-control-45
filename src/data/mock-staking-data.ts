
export interface StakingPlan {
  id: string;
  name: string;
  asset: string;
  lockDuration: number; // in days
  yieldPercentage: number;
  minAmount: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStake {
  id: string;
  userId: string;
  userName: string;
  planId: string;
  planName: string;
  amount: number;
  asset: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  yieldEarned: number;
  remainingDays: number;
}

export const mockStakingPlans: StakingPlan[] = [
  {
    id: "plan-001",
    name: "BTC Hodler",
    asset: "BTC",
    lockDuration: 30,
    yieldPercentage: 5.5,
    minAmount: 0.05,
    active: true,
    createdAt: "2025-04-10T14:30:00Z",
    updatedAt: "2025-04-10T14:30:00Z"
  },
  {
    id: "plan-002",
    name: "ETH Staker Plus",
    asset: "ETH",
    lockDuration: 90,
    yieldPercentage: 8.75,
    minAmount: 0.5,
    active: true,
    createdAt: "2025-04-09T10:15:00Z",
    updatedAt: "2025-04-09T10:15:00Z"
  },
  {
    id: "plan-003",
    name: "Stable Returns",
    asset: "USDT",
    lockDuration: 60,
    yieldPercentage: 12,
    minAmount: 100,
    active: true,
    createdAt: "2025-04-08T16:45:00Z",
    updatedAt: "2025-04-08T16:45:00Z"
  },
  {
    id: "plan-004",
    name: "SOL Power",
    asset: "SOL",
    lockDuration: 45,
    yieldPercentage: 10.5,
    minAmount: 10,
    active: false,
    createdAt: "2025-04-07T09:05:00Z",
    updatedAt: "2025-04-07T09:05:00Z"
  },
  {
    id: "plan-005",
    name: "USDC Safe",
    asset: "USDC",
    lockDuration: 15,
    yieldPercentage: 4.2,
    minAmount: 50,
    active: true,
    createdAt: "2025-04-06T20:10:00Z",
    updatedAt: "2025-04-06T20:10:00Z"
  },
];

export const mockUserStakes: UserStake[] = [
  {
    id: "stake-001",
    userId: "user-123",
    userName: "Alice Johnson",
    planId: "plan-001",
    planName: "BTC Hodler",
    amount: 0.75,
    asset: "BTC",
    startDate: "2025-05-01T14:30:00Z",
    endDate: "2025-05-31T14:30:00Z",
    status: "active",
    yieldEarned: 0.002,
    remainingDays: 14
  },
  {
    id: "stake-002",
    userId: "user-456",
    userName: "Bob Smith",
    planId: "plan-002",
    planName: "ETH Staker Plus",
    amount: 5.5,
    asset: "ETH",
    startDate: "2025-04-15T10:15:00Z",
    endDate: "2025-07-14T10:15:00Z",
    status: "active",
    yieldEarned: 0.08,
    remainingDays: 58
  },
  {
    id: "stake-003",
    userId: "user-789",
    userName: "Carol Davis",
    planId: "plan-003",
    planName: "Stable Returns",
    amount: 5000,
    asset: "USDT",
    startDate: "2025-04-20T16:45:00Z",
    endDate: "2025-06-19T16:45:00Z",
    status: "active",
    yieldEarned: 100.25,
    remainingDays: 33
  },
  {
    id: "stake-004",
    userId: "user-234",
    userName: "David Wilson",
    planId: "plan-004",
    planName: "SOL Power",
    amount: 75,
    asset: "SOL",
    startDate: "2025-04-10T09:05:00Z",
    endDate: "2025-05-25T09:05:00Z",
    status: "completed",
    yieldEarned: 8.75,
    remainingDays: 0
  },
  {
    id: "stake-005",
    userId: "user-567",
    userName: "Eva Martinez",
    planId: "plan-005",
    planName: "USDC Safe",
    amount: 1000,
    asset: "USDC",
    startDate: "2025-05-05T20:10:00Z",
    endDate: "2025-05-20T20:10:00Z",
    status: "cancelled",
    yieldEarned: 0.85,
    remainingDays: 0
  },
];

export const mockStakingMetrics = {
  totalStaked: {
    BTC: 12.5,
    ETH: 145.75,
    USDT: 85000,
    SOL: 3500,
    USDC: 42000
  },
  totalUsers: 125,
  activeStakes: 98,
  completedStakes: 207,
  cancelledStakes: 15,
  totalYieldPaid: {
    BTC: 0.35,
    ETH: 5.2,
    USDT: 4250,
    SOL: 180.5,
    USDC: 750.25
  }
};
