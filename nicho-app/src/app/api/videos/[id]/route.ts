import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return NextResponse.json({
    summary: `This is a summary for video ${id}.`,
    transcript: `This is a transcript for video ${id}.`,
    keyInsights: [
      "Faceless channels are growing 2x faster than traditional channels.",
      "AI tools can automate 80% of the content creation process.",
      "The average RPM for faceless channels is $12.",
    ],
    sentiment: "Positive",
    keywords: ["faceless youtube", "ai content creation", "youtube automation"],
  });
}
