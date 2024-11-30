import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nextDays, prevDays } = await req.json();

    console.log("nextDays:", nextDays);
    console.log("prevDays:", prevDays);

    const response = await fetch('http://127.0.0.1:5000/demandForecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ nextDays, prevDays }), 
    });
    const result = await response.json();
    console.log(result)
    const response1 = await fetch("http://localhost:8000/demandData", {
      method: "GET",
    });
  
    const data1 = await response1.json();
    console.log(data1)
    console.log(data1)
    console.log(data1)
    return NextResponse.json(data1, { status: response1.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to process the request." },
      { status: 500 }
    );
  }
}
