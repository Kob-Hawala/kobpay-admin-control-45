
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/components/users/user-status";

interface UserGeneralInfoProps {
  user: any;
}

export default function UserGeneralInfo({ user }: UserGeneralInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>User's basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="break-all">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{user.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Country</p>
              <p>{user.kyc?.nationality || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p>{user.kyc?.dob || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Created</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>User verification and security details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Status</p>
              <div className="mt-1">
                <UserStatus status={user.accountStatus} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
              <div className="mt-1">
                <Badge 
                  variant={
                    user.kycStatus === "verified" ? "success" : 
                    user.kycStatus === "pending" ? "warning" : "destructive"
                  }
                  className="capitalize"
                >
                  {user.kycStatus}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">KOB Pay ID</p>
              <p className="font-mono">{user.kobPayId || "Not assigned"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">2FA Status</p>
              <Badge variant="outline" className="capitalize">
                {user.twoFAEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Limit</p>
              <p>${user.dailyLimit?.toLocaleString() || "0"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID Document</p>
              <p>{user.kyc?.idType || "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>User's recent login and activity history</CardDescription>
        </CardHeader>
        <CardContent>
          {user.activityLogs && user.activityLogs.length > 0 ? (
            <div className="space-y-6">
              {user.activityLogs.map((log: any, index: number) => (
                <div key={log.id} className="border-l-2 border-primary pl-4 pb-6 relative">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary"></div>
                  <time className="text-xs text-muted-foreground mb-1 block">
                    {new Date(log.timestamp).toLocaleString()}
                  </time>
                  <p className="text-sm">{log.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">IP: {log.ipAddress}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No activity logs available for this user.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
