const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const VideoCard = ({ video, onVideoSelect }: { video: any; onVideoSelect: (video: any) => void }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    onClick={() => onVideoSelect(video)}
  >
    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
      <p className="text-gray-600">{video.channel}</p>
      <p className="text-gray-500 text-sm mt-1">{video.views} views</p>
    </div>
  </div>
);

export default function VideoList({
  isLoading,
  videos,
  onVideoSelect,
}: {
  isLoading: boolean;
  videos: any[];
  onVideoSelect: (video: any) => void;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
      ))}
    </div>
  );
}
