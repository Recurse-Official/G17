import React from "react";
import {
  DashboardMetrics,
  ExpenseByCategory,
  useGetDashboardMetricQuery,
} from "@/state/api";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface Props {}
type ExpenseSums = {
  [category: string]: number;
};

function CardExpensesSummary(props: Props) {
  const colors = ["#00C49F", "#0088FE", "#FFBB28"];
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricQuery();
  const expenseByCategorySummary = dashboardMetrics?.expenseByCategory || [];
  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategory) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const expenseSummary = dashboardMetrics?.expenseSummary[0];
  const formattedTotalExpense = totalExpenses.toFixed(2);

  return (
    <div className="xl:row-span-4 xl:col-span-2 bg-white shadow-md rounded-2xl flex flex-col justify-between p-6">
      {!isLoading ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Expense Summary</h2>
          <hr className="mb-4" />
          <div className="flex flex-col xl:flex-row items-center gap-8">
            {/* Pie Chart Section */}
            <div className="relative w-full xl:basis-3/5 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="font-bold text-xl">
                  ${formattedTotalExpense}
                </span>
              </div>
            </div>

            {/* Legend Section */}
            <div className="flex flex-col items-center xl:items-start">
              <ul className="flex flex-wrap justify-center xl:justify-start gap-3">
                {expenseCategories.map((entry, index) => (
                  <li
                    key={`legend-${index}`}
                    className="flex items-center text-xs"
                  >
                    <span
                      className="mr-2 w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: colors[index % colors.length],
                      }}
                    ></span>
                    {entry.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          {expenseSummary && (
            <div className="flex justify-between items-center">
              <p className="text-sm">
                Average:{" "}
                <span className="font-semibold">
                  ${expenseSummary.totalExpenses.toFixed(2)}
                </span>
              </p>
              <span className="flex items-center">
                <TrendingUp className="mr-2 text-green-500" />
                30%
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">Loading...</div>
      )}
    </div>
  );
}

export default CardExpensesSummary;
