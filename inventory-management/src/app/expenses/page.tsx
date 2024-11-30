"use client";
import { ExpenseByCategory, useGetExpensesQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import Header from "../(components)/Header/header";
import Select from "@mui/material/Select";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Tooltip } from "@mui/material";

interface Props {}

interface expenseType {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: BigInt;
  date: string;
}

interface style {
  label: string;
  selectInput: string;
}
const classNames: style = {
  label: "block text-sm font-medium text-gray-700 ",
  selectInput:
    "mt-1 block w-full pl-3 py-2 border-gray-300 focus:border-indigo-500 sm:text-sm rounded-sm",
};

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

function Page(props: Props) {
  const {} = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data: expensesData, isLoading } = useGetExpensesQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);
  console.log(expensesData);
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedDataItems: AggregatedDataItem[] = useMemo(() => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ];
    const filtered = expenses
      .filter((data: ExpenseByCategory) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          (!startDate || dataDate >= startDate) &&
          (!endDate || dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce(
        (acc: Record<string, AggregatedDataItem>, data: ExpenseByCategory) => {
          const amount = Number(data.amount.toString());
          if (!acc[data.category]) {
            acc[data.category] = {
              name: data.category,
              amount: 0,
              color: colors[Object.keys(acc).length % colors.length],
            };
          }
          acc[data.category].amount += amount;
          return acc;
        },
        {}
      );

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="">
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full  bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter By Category and Date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                defaultValue={"All"}
              >
                <option value="All">All</option>
                <option value="Daily">Daily</option>
                <option value="Machines">Machines</option>
                <option value="Powder">Powder</option>
                <option value="Office">Office</option>
                <option value="Salaries">Salaries</option>
                <option value="Food">Food</option>
              </select>
            </div>
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                onChange={(e) => setStartDate(e.target.value)}
                className={classNames.selectInput}
              />
            </div>
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                onChange={(e) => setEndDate(e.target.value)}
                className={classNames.selectInput}
              />
            </div>
          </div>
          <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
            <ResponsiveContainer width={"100%"} height={400}>
              <PieChart>
                <Pie
                  data={aggregatedDataItems}
                  dataKey={"amount"}
                  cx={"50%"}
                  cy={"50%"}
                  label
                  outerRadius={150}
                  fill="#8884d8"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {aggregatedDataItems.map(
                    (entry: AggregatedDataItem, index: Number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === activeIndex ? "rgb(2,58,29)" : entry.color
                        }
                      />
                    )
                  )}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
