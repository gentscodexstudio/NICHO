import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

// Helper function to format the transcript
const formatTranscript = (transcript: any[]) => {
  return transcript.map((item: any) => item.text).join(" ");
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key not found." },
      { status: 500 }
    );
  }

  const { id } = await params;

  try {
    // 1. Fetch Video Details
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${apiKey}`
    );
    const videoDetailsData = await videoDetailsResponse.json();

    if (videoDetailsData.error || videoDetailsData.items.length === 0) {
      return NextResponse.json(
        { error: "Failed to fetch video details." },
        { status: 500 }
      );
    }

    const videoDetails = videoDetailsData.items[0];

    // 2. Fetch Transcript (Captions)
    const captionListResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${id}&key=${apiKey}`
    );
    const captionListData = await captionListResponse.json();

    let transcript = "Transcript not available for this video.";

    if (captionListData.items && captionListData.items.length > 0) {
      const captionTrack = captionListData.items[0]; // Defaulting to the first available track
      const captionId = captionTrack.id;

      const transcriptResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}&tfmt=ttml`
      );
      const transcriptXML = await transcriptResponse.text();

      // YouTube returns transcript in TTML format (XML), so we need to parse it.
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
      });
      const ttml = parser.parse(transcriptXML);

      if (ttml.tt && ttml.tt.body && ttml.tt.body.div && ttml.tt.body.div.p) {
        const lines = Array.isArray(ttml.tt.body.div.p) ? ttml.tt.body.div.p : [ttml.tt.body.div.p];
        transcript = lines.map((line: any) => line['#text']).join(' ');
      }
    }

    // 3. Combine with Mock Analysis Data (as YouTube API doesn't provide this)
    const analysisData = {
      // NOTE: These are placeholders. In a real application, you would
      // use a separate AI/NLP service to generate these based on the transcript.
      summary: `This is a summary for the video titled "${videoDetails.snippet.title}". A real implementation would use an AI service to generate this.`,
      keyInsights: [
        "Faceless channels are growing 2x faster than traditional channels.",
        "AI tools can automate 80% of the content creation process.",
        "The average RPM for faceless channels is $12.",
      ],
      sentiment: "Positive",
      keywords: [
        "faceless youtube",
        "ai content creation",
        "youtube automation",
      ],
    };

    const response = {
      ...videoDetails,
      transcript,
      ...analysisData,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from YouTube API." },
      { status: 500 }
    );
  }
}
