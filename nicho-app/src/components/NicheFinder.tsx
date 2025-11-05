"use client";

import { useState } from "react";

export default function NicheFinder() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);
    try {
      const response = await fetch(`/api/niche?q=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch niche ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a niche/topic..."
            className="w-full px-6 py-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-full px-8 text-lg font-semibold text-white bg-primary rounded-r-full hover:bg-blue-700 focus:outline-none"
          >
            Find Niche
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Trending Sub-Niches</h3>
            <ul className="list-disc list-inside text-gray-700">
              {results.trendingSubNiches.map((niche: string) => (
                <li key={niche}>{niche}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Content Gaps</h3>
            <ul className="list-disc list-inside text-gray-700">
              {results.contentGaps.map((gap: string) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Audience Intent</h3>
            <ul className="list-disc list-inside text-gray-700">
              {results.audienceIntent.map((intent: string) => (
                <li key={intent}>{intent}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Suggested Topics</h3>
            <ul className="list-disc list-inside text-gray-700">
              {results.suggestedTopics.map((topic: string) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
