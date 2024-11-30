"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// import { ChartBar, Users, PackagePlus, FileText } from "lucide-react";

function DashBoard() {
  const router = useRouter();
  return (
    <div className="p-6  min-h-screen text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          <span className="text-gray-400">Hi, </span>{" "}
          <span className="text-purple-500">Krishna!</span>
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          Welcome back! Here's an overview of your business insights.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="col-span-2 xl:col-span-1 rounded-xl bg-gradient-to-r from-teal-400 to-green-500 p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Popular Products Overview
          </h2>
          <p className="text-gray-200">
            Get detailed insights on your most trending products and learn
            what's driving sales this season.
          </p>
          <button
            className="mt-4 bg-white text-teal-600 font-semibold px-4 py-2 rounded hover:bg-teal-100"
            onClick={() => router.push("/popularProducts")}
          >
            Explore Now
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Sales & Purchases</h2>
          <p className="text-gray-200">
            Access a summary of your sales, expenses, and purchase history to
            keep track of your finances.
          </p>
          <button
            className="mt-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100"
            onClick={() => router.push("/purchasesSales")}
          >
            View Report
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-xl bg-gradient-to-r from-pink-400 to-red-500 p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Customer Insights</h2>
          <p className="text-gray-200">
            Discover pending orders, active sales, and exclusive offers provided
            to your customers.
          </p>
          <button
            className="mt-4 bg-white text-pink-600 font-semibold px-4 py-2 rounded hover:bg-pink-100"
            onClick={() => router.push("/extraExpense")}
          >
            Learn More
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="col-span-2 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-700 p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Demand Forecasting</h2>
          <p className="text-gray-200">
            Analyze demand trends and access RAG documents for strategic
            planning.
          </p>
          <button
            className="mt-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded hover:bg-purple-100"
            onClick={() => router.push("/priceAnalysis")}
          >
            Get Forecast
          </button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="col-span-1 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-700 p-6 shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-2">Upload CSV</h2>
          <p className="text-gray-200">Upload Your Data</p>
          <button
            className="mt-4 bg-white text-purple-600 font-semibold px-4 py-2 rounded hover:bg-purple-100"
            onClick={() => router.push("/uploadData")}
          >
            For the demand
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default DashBoard;
