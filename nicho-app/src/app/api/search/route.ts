import { NextResponse } from "next/server";

const mockVideos = [
  {
    id: 1,
    thumbnail: "https://via.placeholder.com/320x180",
    title: "The Rise of Faceless YouTube Channels",
    channelName: "Creator Insights",
    publishDate: "Oct 28, 2025",
    views: "1.2M",
  },
  {
    id: 2,
    thumbnail: "https://via.placeholder.com/320x180",
    title: "How to Find a Profitable Niche in 2025",
    channelName: "Niche Navigator",
    publishDate: "Oct 25, 2025",
    views: "850K",
  },
  {
    id: 3,
    thumbnail: "https://via.placeholder.com/320x180",
    title: "AI-Powered Content Creation for YouTube",
    channelName: "Future Tech",
    publishDate: "Oct 22, 2025",
    views: "2.1M",
  },
];

export async function GET(request: Request) {
  return NextResponse.json(mockVideos);
}
