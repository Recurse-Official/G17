"use client";
import { useGetDemandQuery } from "@/state/api";
import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
interface Props {}

function Page(props: Props) {
  const {} = props;
  const [nextDays, setNextDays] = useState(0);
  const [prevDays, setPrevDays] = useState(0);
  const { data: demand, isLoading, isError } = useGetDemandQuery();
  // const handleForcast = async () => {
  //   try {
  //     const response = await fetch(`/api/demandForecast`, {
  //       method: "POST",
  //       body: JSON.stringify({ nextDays, prevDays }),
  //     });

  //     const result = await response.json();
  //     alert(result.message);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     alert("Failed to upload the file.");
  //   }
  // };
  console.log(demand);
  return (
    <div className="">
      <input
        type="number"
        onChange={(e) => {
          setNextDays(Number(e.target.value));
        }}
      />
      {/* <Button>Next Days</Button> */}
      <input
        type="number"
        onChange={(e) => {
          setPrevDays(Number(e.target.value));
        }}
      />
      {/* <Button>Prev Days</Button> */}
      {/* <Button onClick={handleForcast}>Predict Demand</Button> */}
    </div>
  );
}

export default Page;
