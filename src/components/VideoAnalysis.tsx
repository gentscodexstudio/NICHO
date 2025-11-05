"use client";

import { useEffect, useState } from "react";

interface AnalysisData {
  summary: string;
  transcript: string;
  keyInsights: string[];
  sentiment: string;
  keywords: string[];
}

export default function VideoAnalysis({ video }: { video: any }) {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (video) {
      const fetchData = async () => {
        setIsLoading(true);
        setAnalysis(null);
        try {
          const res = await fetch(`/api/videos/${video.id}`);
          const data = await res.json();
          setAnalysis(data);
        } catch (error) {
          console.error("Failed to fetch video analysis:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [video]);

  if (!video) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
        <p className="text-gray-500">Select a video to see its analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
      <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
      <div className="flex items-center text-gray-600 mb-4 text-sm">
        <span>{video.channelName}</span>
        <span className="mx-2">•</span>
        <span>{video.publishDate}</span>
        <span className="mx-2">•</span>
        <span>{video.views} views</span>
      </div>
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      ) : (
        analysis && (
          <>
            <div>
              <h3 className="text-xl font-semibold mb-2">Summary</h3>
              <p className="text-gray-700">{analysis.summary}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Key Insights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {analysis.keyInsights.map((insight) => (
                  <li key={insight}>{insight}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Sentiment</h3>
              <p className="text-gray-700">{analysis.sentiment}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Transcript</h3>
              <p className="text-gray-700 h-32 overflow-y-auto border rounded-md p-2">
                {analysis.transcript}
              </p>
            </div>
          </>
        )
      )}
    </div>
  );
}
