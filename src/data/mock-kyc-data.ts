
import { KycRequest } from "@/types/kyc-types";

// Mock KYC requests data
export const mockKycRequests: KycRequest[] = [
  {
    id: "kyc-001",
    user: {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    status: "pending",
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    documents: [
      {
        id: "doc-1-1",
        type: "Passport",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=Passport",
        description: "Front page of passport",
        uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: "doc-1-2",
        type: "Utility Bill",
        imageUrl: "https://placehold.co/600x800/212245/FFFFFF?text=Utility+Bill",
        description: "Recent electricity bill (last 3 months)",
        uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ],
    auditLog: []
  },
  {
    id: "kyc-002",
    user: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    status: "approved",
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    reviewedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    reviewedBy: {
      id: "admin-1",
      name: "Admin User"
    },
    kobPayId: "KOB12345678",
    documents: [
      {
        id: "doc-2-1",
        type: "ID Card",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=ID+Card+Front",
        description: "Front side of ID card",
        uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "doc-2-2",
        type: "ID Card (Back)",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=ID+Card+Back",
        description: "Back side of ID card",
        uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "doc-2-3",
        type: "Address Proof",
        imageUrl: "https://placehold.co/600x800/212245/FFFFFF?text=Address+Proof",
        description: "Bank statement as address proof",
        uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ],
    auditLog: [
      {
        action: "submitted",
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        adminId: "system",
        adminName: "System",
        details: "KYC documents submitted for review"
      },
      {
        action: "approved",
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        adminId: "admin-1",
        adminName: "Admin User",
        details: "KYC approved and KOB Pay ID generated"
      }
    ]
  },
  {
    id: "kyc-003",
    user: {
      id: "user-3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    status: "rejected",
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    reviewedAt: new Date(Date.now() - 3600000 * 36).toISOString(), // 36 hours ago
    reviewedBy: {
      id: "admin-1",
      name: "Admin User"
    },
    rejectionReason: "Documents unclear or appear to be modified. Please resubmit clear, unedited documents.",
    documents: [
      {
        id: "doc-3-1",
        type: "Passport",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=Passport+Blurry",
        description: "Passport main page",
        uploadedAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ],
    auditLog: [
      {
        action: "submitted",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        adminId: "system",
        adminName: "System",
        details: "KYC documents submitted for review"
      },
      {
        action: "rejected",
        timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
        adminId: "admin-1",
        adminName: "Admin User",
        details: "KYC rejected. Reason: Documents unclear or appear to be modified. Please resubmit clear, unedited documents."
      }
    ]
  },
  {
    id: "kyc-004",
    user: {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    status: "pending",
    submittedAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
    documents: [
      {
        id: "doc-4-1",
        type: "Driver's License",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=Drivers+License",
        description: "Driver's license front",
        uploadedAt: new Date(Date.now() - 3600000 * 1).toISOString()
      },
      {
        id: "doc-4-2",
        type: "Driver's License (Back)",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=Drivers+License+Back",
        description: "Driver's license back",
        uploadedAt: new Date(Date.now() - 3600000 * 1).toISOString()
      },
      {
        id: "doc-4-3",
        type: "Selfie with ID",
        imageUrl: "https://placehold.co/600x800/212245/FFFFFF?text=Selfie+with+ID",
        description: "Selfie while holding ID card",
        uploadedAt: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ],
    auditLog: [
      {
        action: "submitted",
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        adminId: "system",
        adminName: "System",
        details: "KYC documents submitted for review"
      }
    ]
  },
  {
    id: "kyc-005",
    user: {
      id: "user-5",
      name: "David Brown",
      email: "david.brown@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    status: "approved",
    submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    reviewedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    reviewedBy: {
      id: "admin-2",
      name: "Admin Manager"
    },
    kobPayId: "KOB98765432",
    documents: [
      {
        id: "doc-5-1",
        type: "Passport",
        imageUrl: "https://placehold.co/600x400/212245/FFFFFF?text=Passport",
        description: "Passport identification page",
        uploadedAt: new Date(Date.now() - 3600000 * 72).toISOString()
      },
      {
        id: "doc-5-2",
        type: "Bank Statement",
        imageUrl: "https://placehold.co/600x800/212245/FFFFFF?text=Bank+Statement",
        description: "Recent bank statement with address",
        uploadedAt: new Date(Date.now() - 3600000 * 72).toISOString()
      }
    ],
    auditLog: [
      {
        action: "submitted",
        timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
        adminId: "system",
        adminName: "System",
        details: "KYC documents submitted for review"
      },
      {
        action: "reviewed",
        timestamp: new Date(Date.now() - 3600000 * 60).toISOString(),
        adminId: "admin-1",
        adminName: "Admin User",
        details: "Documents verified against database"
      },
      {
        action: "approved",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        adminId: "admin-2",
        adminName: "Admin Manager",
        details: "KYC approved and KOB Pay ID generated"
      }
    ]
  }
];

// Function to simulate fetching KYC requests
export const getMockKycRequests = (): Promise<KycRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockKycRequests);
    }, 800); // Simulate network delay
  });
};
