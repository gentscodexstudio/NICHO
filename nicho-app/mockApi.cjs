const express = require("express");
const app = express();
const port = 3001;

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

app.get("/search", (req, res) => {
  res.json(mockVideos);
});

app.get("/videos/:id", (req, res) => {
  res.json({
    summary: `This is a summary for video ${req.params.id}.`,
    transcript: `This is a transcript for video ${req.params.id}.`,
    keyInsights: [
      "Faceless channels are growing 2x faster than traditional channels.",
      "AI tools can automate 80% of the content creation process.",
      "The average RPM for faceless channels is $12.",
    ],
    sentiment: "Positive",
    keywords: ["faceless youtube", "ai content creation", "youtube automation"],
  });
});

app.get("/niche", (req, res) => {
  res.json(mockNicheResults);
});

app.listen(port, () => {
  console.log(`Mock API server listening at http://localhost:${port}`);
});
