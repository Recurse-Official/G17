"use client";

import { useGetDemandQuery } from "@/state/api";
import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [nextDays, setNextDays] = useState(0);
  const [prevDays, setPrevDays] = useState(0);
  const [array, setArray] = useState<number[][]>([]);
  const { data: demand, isLoading, isError } = useGetDemandQuery();

  const handleDemand = () => {
    if (!demand) return;

    const arr: number[][] = [];
    for (let i = 0; i < nextDays; i++) {
      const list = demand.map((item) => Number(item.available));
      arr.push(list);
    }
    setArray(arr);
    console.log("Predicted Demand Array:", arr);
  };

  const predictDemand = async () => {
    try {
      const days = {
        prev_days: prevDays,
        future_days: nextDays,
        sales_data: [
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1],
          [1, 2, 3, 4, 5],
        ],
      };

      const response = await axios.post(
        "http://44.244.77.112:5000/predict",
        days,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Prediction Result:", response.data);
      alert(`Prediction Result: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error(
        "Error during prediction:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  const makeApiCall = async (url: string, payload: any) => {
    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API Response:", response.data);
      alert(`API Response: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };
  const predictOnlyOneProduct = async () => {
    const days = [
      {
        periods: 3,
        dates: [
          "2023-01-01",
          "2023-01-02",
          "2023-01-03",
          "2023-01-04",
          "2023-01-05",
          "2023-01-06",
          "2023-01-07",
          "2023-01-08",
          "2023-01-09",
          "2023-01-10",
          "2023-01-11",
          "2023-01-12",
          "2023-01-13",
          "2023-01-14",
          "2023-01-15",
          "2023-01-16",
          "2023-01-17",
          "2023-01-18",
          "2023-01-19",
          "2023-01-20",
          "2023-01-21",
          "2023-01-22",
          "2023-01-23",
          "2023-01-24",
          "2023-01-25",
          "2023-01-26",
          "2023-01-27",
          "2023-01-28",
          "2023-01-29",
          "2023-01-30",
          "2023-01-31",
          "2023-02-01",
          "2023-02-02",
          "2023-02-03",
          "2023-02-04",
          "2023-02-05",
          "2023-02-06",
          "2023-02-07",
          "2023-02-08",
          "2023-02-09",
          "2023-02-10",
          "2023-02-11",
          "2023-02-12",
          "2023-02-13",
          "2023-02-14",
          "2023-02-15",
          "2023-02-16",
          "2023-02-17",
          "2023-02-18",
          "2023-02-19",
        ],
        values: [
          74, 94, 83, 94, 70, 75, 49, 5, 5, 98, 13, 65, 79, 29, 55, 52, 47, 76,
          9, 74, 90, 65, 1, 65, 95, 80, 55, 30, 100, 85, 110, 120, 95, 105, 75,
          60, 45, 35, 50, 55, 70, 80, 60, 90, 80, 75, 60, 65, 90, 110,
        ],
      },
      {
        dates: [
          "Mon, 20 Feb 2023 00:00:00 GMT",
          "Tue, 21 Feb 2023 00:00:00 GMT",
          "Wed, 22 Feb 2023 00:00:00 GMT",
        ],
        values: [150.28374519170734, 185.73767850325902, 204.48395943824832],
      },
    ];

    await makeApiCall("http://52.32.172.239:5000/predictone", days);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading demand data.</div>;

  return (
    <div>
      <input
        type="number"
        placeholder="Next Days"
        onChange={(e) => setNextDays(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Prev Days"
        onChange={(e) => setPrevDays(Number(e.target.value))}
      />
      <Button onClick={handleDemand}>Handle Demand</Button>
      <Button onClick={predictDemand}>Predict Demand</Button>

      {array.length > 0 && (
        <div>
          <h3>Predicted Demand:</h3>
          {array.map((day, index) => (
            <div key={index}>
              Day {index + 1}: {day.join(", ")}
            </div>
          ))}
        </div>
      )}
      <div>
        <Button
          onClick={() => {
            predictOnlyOneProduct();
          }}
        >
          Predict Only for One product
        </Button>
      </div>
    </div>
  );
}

export default Page;
