"use client";
import React from "react";
import CardSalesSummary from "../(components)/DashboardComp/CardSalesSummary";
import CardPurchasesSummary from "../(components)/DashboardComp/CardPurchasesSummary";
import CardExpensesSummary from "../(components)/DashboardComp/CardExpensesSummary";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardSalesSummary />
      <CardPurchasesSummary />
      <CardExpensesSummary />
    </div>
  );
}

export default Page;
