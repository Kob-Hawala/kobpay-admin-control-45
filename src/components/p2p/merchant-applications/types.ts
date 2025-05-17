
// Define the type for merchant applications
export type MerchantApplication = {
  id: string;
  userId: string;
  email: string;
  applicationDate: string;
  volumeTraded: string;
  successfulTrades: number;
  completionRate: string;
  status: string;
  notes?: string;
  rejectionReason?: string;
};
