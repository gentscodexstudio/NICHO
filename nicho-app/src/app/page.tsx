"use client";

import SearchBar from "@/components/SearchBar";
import VideoList from "@/components/VideoList";
import VideoAnalysis from "@/components/VideoAnalysis";
import NicheFinder from "@/components/NicheFinder";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("research");
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setVideos([]);
    setSelectedVideo(null);
    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="py-4 px-8 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">NICHO</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("research")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "research"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            YouTube Research
          </button>
          <button
            onClick={() => setActiveTab("niche")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "niche"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            NICHE Finder
          </button>
        </div>
      </header>
      <main className="container mx-auto px-8 py-12">
        {activeTab === "research" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                YouTube Research, Elevated.
              </h2>
              <p className="text-lg text-gray-600">
                Find winning niches, analyze videos, and scale your channel smarter.
              </p>
            </div>
            <SearchBar onSearch={handleSearch} />
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VideoList
                  isLoading={isLoading}
                  videos={videos}
                  onVideoSelect={handleVideoSelect}
                />
              </div>
              <div>
                <VideoAnalysis video={selectedVideo} />
              </div>
            </div>
          </div>
        )}
        {activeTab === "niche" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Next Big Niche
              </h2>
              <p className="text-lg text-gray-600">
                Uncover trending sub-niches, content gaps, and audience intent.
              </p>
            </div>
            <NicheFinder />
          </div>
        )}
      </main>
    </div>
  );
}
