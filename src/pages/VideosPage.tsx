import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Play, Info, AlertTriangle, X, Radio } from 'lucide-react';
import { youtubeService, OFFICIAL_CHANNELS, YouTubeFeedStatus } from '../services/youtubeService';
import { YouTubeVideoItem } from '../types';

export const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [feedStatus, setFeedStatus] = useState<YouTubeFeedStatus>({
    isApiConfigured: false,
    isLoading: true,
    error: null,
    channelTitles: {},
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideoItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    youtubeService.getRecentVideos().then((res) => {
      if (isMounted) {
        setVideos(res.videos);
        setFeedStatus(res.status);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel =
      selectedChannel === 'all' || v.channelId === selectedChannel;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#EFE6E4] pb-6">
        <div className="text-xs font-bold uppercase text-[#9C1C24] tracking-wider font-sans mb-1 flex items-center gap-1.5">
          <Play className="w-3.5 h-3.5 fill-[#9C1C24] text-[#9C1C24]" />
          <span>යූටියුබ් වීඩියෝ එකතුව (YouTube Video Feed)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#650F18] font-sinhala-serif">
          මෙත් රූපවාහිනී වීඩියෝ හා ධර්ම දේශනා
        </h1>
        <p className="text-sm text-[#2B2526] mt-2 max-w-3xl leading-relaxed">
          මෙත් රූපවාහිනී නිල යූටියුබ් නාලිකා ඔස්සේ නිකුත් කෙරෙන නවතම ධර්ම දේශනා, සජීවී විකාශයන් සහ සදහම් වැඩසටහන්.
        </p>
      </div>

      {/* API Status Banner */}
      {!feedStatus.isApiConfigured ? (
        <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-3xl p-5 text-[#650F18] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#E87928] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-bold text-sm text-[#650F18]">
                YouTube Data API සම්බන්ධතාව සක්‍රීය කර නොමැත (Prototype Demo Feed)
              </div>
              <p className="text-[#2B2526] leading-relaxed">
                සජීවී YouTube API යතුර (.env හි VITE_YOUTUBE_API_KEY) සකස් වන තුරු නිදර්ශන වීඩියෝ මෙහි ප්‍රදර්ශනය කෙරේ. නිල යූටියුබ් නාලිකා සෘජුවම නැරඹීමට පහත සබැඳි භාවිතා කරන්න.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {OFFICIAL_CHANNELS.map((ch, idx) => (
              <a
                key={idx}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#650F18] hover:text-[#9C1C24] border border-[#FED7AA] rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#9C1C24]" />
                <span>{ch.title}</span>
              </a>
            ))}
          </div>
        </div>
      ) : feedStatus.error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>YouTube API දෝෂය: {feedStatus.error}. නිදර්ශන දත්ත ප්‍රදර්ශනය කෙරේ.</span>
        </div>
      ) : null}

      {/* Search & Channel Filter */}
      <div className="bg-white p-5 rounded-3xl border border-[#EFE6E4] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="වීඩියෝ මාතෘකාව හෝ විස්තර සොයන්න..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#650F18] font-semibold transition-colors"
            >
              <option value="all">සියලු නිල නාලිකා</option>
              {OFFICIAL_CHANNELS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div>
        <div className="text-xs text-stone-500 mb-4">
          වීඩියෝ <span className="font-bold text-[#650F18]">{filteredVideos.length}</span> ක් හමුවිය
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
            <p className="text-xs text-stone-500">වීඩියෝ කිසිවක් හමු නොවීය.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                onClick={() => setActiveVideoModal(video)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden bg-stone-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-[#9C1C24]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-white" />
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-[#9C1C24] truncate">
                      {video.channelTitle}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors line-clamp-2 leading-snug font-sinhala-serif">
                      {video.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#EFE6E4] flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString('si-LK')}
                    </span>
                    <span className="text-[#9C1C24] font-bold group-hover:underline">
                      නරඹන්න →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Video Playback Modal */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EFE6E4]">
            <div className="relative aspect-video bg-black">
              <iframe
                src={youtubeService.getEmbedUrl(activeVideoModal.videoUrl)}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="වසන්න"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9C1C24] font-bold bg-[#FDF4F5] border border-[#EFCED1] px-3 py-1 rounded-lg">
                  {activeVideoModal.channelTitle}
                </span>
                <span className="text-xs text-stone-500">
                  {new Date(activeVideoModal.publishedAt).toLocaleDateString('si-LK')}
                </span>
              </div>

              <h2 className="text-lg font-bold text-[#650F18] font-sinhala-serif leading-snug">
                {activeVideoModal.title}
              </h2>

              <p className="text-xs text-[#2B2526] leading-relaxed whitespace-pre-line">
                {activeVideoModal.description}
              </p>

              <div className="pt-4 border-t border-[#EFE6E4] flex items-center justify-between">
                <a
                  href={activeVideoModal.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#9C1C24] hover:text-[#80141D] font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>YouTube හි මුල් වීඩියෝව විවෘත කරන්න</span>
                </a>

                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-5 py-2 bg-[#FAF7F5] hover:bg-[#FDF4F5] text-[#650F18] border border-[#EFE6E4] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  වසන්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
