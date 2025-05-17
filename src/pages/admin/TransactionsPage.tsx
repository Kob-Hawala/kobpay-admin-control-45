
import React from "react";
import AdminLayout from "@/components/admin-layout";
import TransactionLog from "@/components/transactions/transaction-log";

const TransactionsPage = () => {
  return (
    <AdminLayout>
      <TransactionLog />
    </AdminLayout>
  );
};

export default TransactionsPage;
