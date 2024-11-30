import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for raw file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    // Convert raw request body to FormData
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table");
    const form = new FormData();
    form.append("file", file);
    console.log(table)
    console.log(table)
    console.log(table)
    console.log(table)
    // Forward FormData to Flask
    const response = await fetch(`http://127.0.0.1:5000/upload?table=${table}`, {
      method: "POST",
      body: form,
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Error forwarding file:", error);
    return NextResponse.json(
      { message: "Error forwarding file to Flask." },
      { status: 500 }
    );
  }
}
