"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a keyword..."
          className="w-full px-6 py-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 h-full px-8 text-lg font-semibold text-white bg-primary rounded-r-full hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
}
