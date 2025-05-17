
export interface KycUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface KycDocument {
  id: string;
  type: string;
  imageUrl: string;
  description: string;
  uploadedAt: string;
}

export interface KycAuditEntry {
  action: string;
  timestamp: string;
  adminId: string;
  adminName: string;
  details?: string;
}

export interface KycRequest {
  id: string;
  user: KycUser;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  documents: KycDocument[];
  reviewedAt?: string;
  reviewedBy?: {
    id: string;
    name: string;
  };
  kobPayId?: string;
  rejectionReason?: string;
  auditLog: KycAuditEntry[];
}
