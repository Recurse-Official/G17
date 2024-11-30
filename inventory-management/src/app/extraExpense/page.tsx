"use client";
import React from "react";
import StatCard from "../(components)/DashboardComp/StatCard";
import { CheckCircle, Package, TrendingUp } from "lucide-react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div>
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-500 h-6" />}
        dateRange="22 - 29 Nov 2024"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
        ]}
      />
      <StatCard
        title="Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-500 w-6 h-6" />}
        dateRange="22 - 29 Nov 2024"
        details={[
          {
            title: "Dues",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Dues",
            amount: "75.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Dues",
            amount: "75.00",
            changePercentage: -89,
            IconComponent: TrendingUp,
          },
        ]}
      />
      <StatCard
        title="Sales & Offers Provided"
        primaryIcon={<Package className="text-blue-500 w-6 h-6" />}
        dateRange="22 - 29 Nov 2024"
        details={[
          {
            title: "Sales",
            amount: "10000.00",
            changePercentage: 10,
            IconComponent: TrendingUp,
          },
          {
            title: "Sales",
            amount: "10000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
        ]}
      />
    </div>
  );
}

export default Page;
