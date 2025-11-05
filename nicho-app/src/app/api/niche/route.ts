import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await fetch(`http://localhost:3001/niche`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch niche ideas" },
      { status: 500 }
    );
  }
}
