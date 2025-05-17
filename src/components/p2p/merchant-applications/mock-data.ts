
import { MerchantApplication } from "./types";

// Mock data for merchant applications
export const mockMerchantApplications: MerchantApplication[] = [
  {
    id: "app_1",
    userId: "usr_7842",
    email: "john.trader@example.com",
    applicationDate: "2025-05-10T14:22:10Z",
    volumeTraded: "$25,000",
    successfulTrades: 48,
    completionRate: "98%",
    status: "pending",
    notes: "Experienced trader with good feedback. Looking to expand business."
  },
  {
    id: "app_2",
    userId: "usr_5391",
    email: "bitcoin_pro@example.com",
    applicationDate: "2025-05-12T09:15:33Z",
    volumeTraded: "$102,000",
    successfulTrades: 156,
    completionRate: "99%",
    status: "approved",
    notes: "One of our best traders. Excellent customer service record."
  },
  {
    id: "app_3",
    userId: "usr_2845",
    email: "crypto_newbie@example.com",
    applicationDate: "2025-05-15T11:40:22Z",
    volumeTraded: "$5,600",
    successfulTrades: 12,
    completionRate: "85%",
    status: "pending",
    notes: "New trader, limited history but growing quickly."
  },
  {
    id: "app_4",
    userId: "usr_9367",
    email: "eth_master@example.com",
    applicationDate: "2025-05-08T16:33:45Z",
    volumeTraded: "$78,000",
    successfulTrades: 94,
    completionRate: "97%",
    status: "rejected",
    rejectionReason: "Failed verification checks. Suspicious trading pattern."
  },
  {
    id: "app_5",
    userId: "usr_6123",
    email: "trading_pro@example.com",
    applicationDate: "2025-05-16T10:12:05Z",
    volumeTraded: "$45,200",
    successfulTrades: 67,
    completionRate: "95%",
    status: "pending",
    notes: "Professional trader with consistent activity."
  }
];
