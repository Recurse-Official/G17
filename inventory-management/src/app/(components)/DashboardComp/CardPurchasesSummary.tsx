import { useGetDashboardMetricQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {}

function CardPurchasesSummary(props: Props) {
  const {} = props;
  const { data, isLoading } = useGetDashboardMetricQuery();
  const purchaseData = data?.purchaseSummary || [];
  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  const conversionFactor = 83;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-4 col-span-1 md:col-span-2 xl:col-span-2 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div className="header">
            <h2 className=" text-lg font-semibold mb-2 px-7 pt-5">
              Purchases Summary
            </h2>
            <hr />
          </div>
          <div>
            <div className="mb-4 mt-5 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? `${numeral(
                        (lastDataPoint.totalPurchased * conversionFactor) /
                          10000000
                      ).format("0.00")} Cr`
                    : "0 Cr"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250} className="p-2">
              <AreaChart
                data={purchaseData}
                margin={{ top: -0, right: 10, left: -50, bottom: 45 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis tick={false} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => {
                    const valueInINR = (value * conversionFactor) / 10000000;
                    return [`₹${valueInINR.toFixed(2)} Cr`];
                  }}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-IN", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
                <Area
                  type={"linear"}
                  fill="#8884d8"
                  stroke="#8884d8"
                  dataKey="totalPurchased"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default CardPurchasesSummary;
