import { NextResponse } from "next/server";

// Helper function to extract keywords from titles
const extractKeywords = (titles: string[]): string[] => {
    const keywordCounts: { [key: string]: number } = {};
    const stopWords = new Set(['the', 'a', 'an', 'in', 'is', 'of', 'to', 'for', 'and', 'with', 'on', 'how']);

    titles.forEach(title => {
        const words = title.toLowerCase().replace(/[^a-zA-Z\s]/g, "").split(/\s+/);
        words.forEach(word => {
            if (word && !stopWords.has(word)) {
                keywordCounts[word] = (keywordCounts[word] || 0) + 1;
            }
        });
    });

    // Sort keywords by frequency and return the top 5
    const sortedKeywords = Object.keys(keywordCounts).sort((a, b) => keywordCounts[b] - keywordCounts[a]);
    return sortedKeywords.slice(0, 5);
};

export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key not found." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
        { error: "Niche query not found." },
        { status: 400 }
      );
  }

  try {
    // Search for popular videos in the given niche
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=20&type=video&relevanceLanguage=en&order=viewCount`);
    const data = await response.json();

    if (data.error) {
        return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const videoTitles = data.items.map((item: any) => item.snippet.title);
    const keywords = extractKeywords(videoTitles);

    const nicheResults = {
      trendingSubNiches: keywords.map(k => `${k} tutorials`),
      suggestedTopics: data.items.slice(0, 5).map((item: any) => item.snippet.title),
      // NOTE: These are placeholders. A real implementation would require more advanced analysis.
      contentGaps: [
        `Beginner guides to ${query}`,
        `Advanced techniques in ${query}`,
      ],
      audienceIntent: [
        `Learning about ${query}`,
        `Finding tutorials for ${query}`,
      ],
    };

    return NextResponse.json(nicheResults);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from YouTube API." }, { status: 500 });
  }
}
