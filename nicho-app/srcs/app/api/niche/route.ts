import { NextResponse } from "next/server";

const mockNicheResults = {
  trendingSubNiches: [
    "AI-powered faceless channels",
    "Luxury lifestyle motivation",
    "Tech reviews with animated avatars",
  ],
  contentGaps: [
    "Beginner guides to crypto trading bots",
    "Deep dives into historical events (animated)",
  ],
  audienceIntent: [
    "Learning a new skill",
    "Finding financial freedom",
    "Entertainment and relaxation",
  ],
  suggestedTopics: [
    "Top 5 AI Tools for Faceless Creators",
    "How to Animate a YouTube Video in 1 Hour",
  ],
};

export async function GET(request: Request) {
  return NextResponse.json(mockNicheResults);
}
