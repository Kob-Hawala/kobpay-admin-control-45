
export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  description: string;
  status: string;
  ipAddress: string;
  details?: Record<string, any>;
}

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log_1",
    timestamp: "2025-05-17T08:30:22Z",
    action: "Login",
    user: "admin@system.com",
    description: "Administrative login successful",
    status: "Success",
    ipAddress: "192.168.1.1",
    details: { browser: "Chrome", os: "Windows 11" }
  },
  {
    id: "log_2",
    timestamp: "2025-05-17T07:15:10Z",
    action: "Update",
    user: "admin@system.com",
    description: "Fee structure updated",
    status: "Success",
    ipAddress: "192.168.1.1",
    details: { oldFee: "1%", newFee: "0.8%" }
  },
  {
    id: "log_3",
    timestamp: "2025-05-16T22:45:30Z",
    action: "Create",
    user: "manager@system.com",
    description: "New user account created",
    status: "Success",
    ipAddress: "192.168.1.2",
    details: { userId: "user_789", userType: "Customer" }
  },
  {
    id: "log_4",
    timestamp: "2025-05-16T19:12:05Z",
    action: "Delete",
    user: "admin@system.com",
    description: "Transaction record deleted",
    status: "Warning",
    ipAddress: "192.168.1.1",
    details: { transactionId: "trx_456", reason: "Duplicate record" }
  },
  {
    id: "log_5",
    timestamp: "2025-05-16T16:30:45Z",
    action: "Update",
    user: "support@system.com",
    description: "Customer KYC data updated",
    status: "Success",
    ipAddress: "192.168.1.3",
    details: { userId: "user_123", fields: ["address", "phone"] }
  },
  {
    id: "log_6",
    timestamp: "2025-05-16T14:22:18Z",
    action: "Login",
    user: "manager@system.com",
    description: "Failed login attempt",
    status: "Error",
    ipAddress: "192.168.1.2",
    details: { reason: "Invalid password", attempts: 3 }
  },
  {
    id: "log_7",
    timestamp: "2025-05-16T11:05:52Z",
    action: "Create",
    user: "admin@system.com",
    description: "New system announcement created",
    status: "Success",
    ipAddress: "192.168.1.1",
    details: { announcementId: "ann_123", audience: "All Users" }
  },
  {
    id: "log_8",
    timestamp: "2025-05-15T23:57:33Z",
    action: "Update",
    user: "system",
    description: "Automated database backup completed",
    status: "Success",
    ipAddress: "127.0.0.1",
    details: { backupSize: "1.2GB", duration: "45s" }
  },
  {
    id: "log_9",
    timestamp: "2025-05-15T20:18:24Z",
    action: "Delete",
    user: "manager@system.com",
    description: "Outdated news articles removed",
    status: "Success",
    ipAddress: "192.168.1.2",
    details: { count: 5, olderThan: "90 days" }
  },
  {
    id: "log_10",
    timestamp: "2025-05-15T16:42:10Z",
    action: "Login",
    user: "support@system.com",
    description: "Login from new device",
    status: "Warning",
    ipAddress: "192.168.1.4",
    details: { device: "iPad", location: "New York" }
  },
  {
    id: "log_11",
    timestamp: "2025-05-15T14:33:29Z",
    action: "Update",
    user: "admin@system.com",
    description: "System settings modified",
    status: "Success",
    ipAddress: "192.168.1.1",
    details: { setting: "email.notifications.frequency", oldValue: "daily", newValue: "immediate" }
  },
  {
    id: "log_12",
    timestamp: "2025-05-15T10:11:44Z",
    action: "Create",
    user: "manager@system.com",
    description: "New promotional campaign created",
    status: "Success",
    ipAddress: "192.168.1.2",
    details: { campaignId: "camp_456", startDate: "2025-06-01" }
  },
  {
    id: "log_13",
    timestamp: "2025-05-14T22:08:17Z",
    action: "Login",
    user: "admin@system.com",
    description: "Administrative login successful",
    status: "Success",
    ipAddress: "192.168.1.1"
  },
  {
    id: "log_14",
    timestamp: "2025-05-14T19:23:05Z",
    action: "Update",
    user: "support@system.com",
    description: "User password reset",
    status: "Success",
    ipAddress: "192.168.1.3",
    details: { userId: "user_234", method: "admin reset" }
  },
  {
    id: "log_15",
    timestamp: "2025-05-14T15:47:31Z",
    action: "Delete",
    user: "admin@system.com",
    description: "Blocked user IP addresses cleared",
    status: "Warning",
    ipAddress: "192.168.1.1",
    details: { count: 12, reason: "Monthly security policy" }
  }
];
