
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
} from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface UserReportsProps {
  user: any;
}

// Mock data for charts
const activityData = [
  { month: "Jan", trades: 12, deposits: 5, withdrawals: 3 },
  { month: "Feb", trades: 19, deposits: 7, withdrawals: 5 },
  { month: "Mar", trades: 8, deposits: 4, withdrawals: 2 },
  { month: "Apr", trades: 15, deposits: 6, withdrawals: 4 },
  { month: "May", trades: 25, deposits: 9, withdrawals: 7 },
];

const volumeData = [
  { date: "05/11", volume: 8500 },
  { date: "05/12", volume: 12000 },
  { date: "05/13", volume: 9800 },
  { date: "05/14", volume: 15000 },
  { date: "05/15", volume: 14200 },
  { date: "05/16", volume: 18500 },
  { date: "05/17", volume: 21000 },
];

const escrowData = [
  { name: "Escrow Used", value: 70 },
  { name: "Direct Transfer", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function UserReports({ user }: UserReportsProps) {
  const handleExportCSV = (type: string) => {
    // In a real app, this would generate and download a CSV file
    console.log(`Exporting ${type} data as CSV`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>
            Download transaction and activity data for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleExportCSV("transactions")}
            >
              <FileText className="h-4 w-4" />
              <span>All Transactions</span>
              <Download className="h-4 w-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleExportCSV("deposits")}
            >
              <FileText className="h-4 w-4" />
              <span>Deposit Logs</span>
              <Download className="h-4 w-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleExportCSV("withdrawals")}
            >
              <FileText className="h-4 w-4" />
              <span>Withdrawal Logs</span>
              <Download className="h-4 w-4 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => handleExportCSV("staking")}
            >
              <FileText className="h-4 w-4" />
              <span>Staking Summary</span>
              <Download className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trading Volume (Last 7 Days)</CardTitle>
            <CardDescription>
              Daily trading volume for this user
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={volumeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>
              Comparison of user transactions by type
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trades" fill="#8884d8" />
                <Bar dataKey="deposits" fill="#82ca9d" />
                <Bar dataKey="withdrawals" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escrow Usage Rate</CardTitle>
            <CardDescription>
              Proportion of trades using escrow service
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={escrowData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {escrowData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
