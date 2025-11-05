import { NextResponse } from "next/server";

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
        { error: "Search query not found." },
        { status: 400 }
      );
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=10&type=video`);
    const data = await response.json();

    if (data.error) {
        return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');

    const videoDetailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`);
    const videoDetailsData = await videoDetailsResponse.json();

    if (videoDetailsData.error) {
        return NextResponse.json({ error: videoDetailsData.error.message }, { status: 500 });
    }

    const videos = videoDetailsData.items.map((item: any) => ({
      id: item.id,
      thumbnail: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      publishDate: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      views: item.statistics.viewCount,
    }));

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from YouTube API." }, { status: 500 });
  }
}
