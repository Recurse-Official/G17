"use client";
import { useState } from "react";
import React from "react";
import Header from "../(components)/Header/header";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateInvoice = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch("/api/generate-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });
      const data = await response.json();
      console.log("Invoice Data:", data);
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div>
      <Header name="Generate Your Invoice in seconds" />
      <p>Select the start date from which the invoice should be generated</p>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <p>Select the end date up to which the invoice should be generated</p>
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleGenerateInvoice}>Generate Invoice</button>
    </div>
  );
}

export default Page;
