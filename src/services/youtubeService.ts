import { YouTubeVideoItem } from '../types';

export interface YouTubeFeedStatus {
  isApiConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  channelTitles: Record<string, string>;
}

// Configured official channels from specification
export const OFFICIAL_CHANNELS = [
  {
    id: 'UCnsOUPYQjiFj28SR4IWm5BQ',
    title: 'METH TV Official',
    url: 'https://www.youtube.com/channel/UCnsOUPYQjiFj28SR4IWm5BQ'
  },
  {
    id: 'UC2mAd_TrVm1st6UO2FmzNqw',
    title: 'Galigamuwe Gnanadeepa Thero',
    url: 'https://www.youtube.com/channel/UC2mAd_TrVm1st6UO2FmzNqw'
  },
  {
    id: 'UCPGmdO4neBO3AQejn-4SU_w',
    title: 'METH TV Dhamma Deshana',
    url: 'https://www.youtube.com/channel/UCPGmdO4neBO3AQejn-4SU_w'
  }
];

// Curated high-quality video demonstrations for prototype view when API key is not yet configured
const DEMO_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'demo-vid-1',
    title: 'සිත සනසන මහා මෛත්‍රී භාවනාව - පූජ්‍ය ගලිගමුවේ ඥාණදීප ස්වාමීන් වහන්සේ',
    description: 'මෙත් රූපවාහිනිය ඔස්සේ විකාශය වූ විශේෂ මෛත්‍රී භාවනා වැඩසටහන. සියලු සත්වයන්ට මෙත් වඩමින් සිත සංසිඳුවා ගන්න.',
    thumbnailUrl: '/src/assets/images/program_dhamma_discussion_1791621325599.jpg',
    publishedAt: '2026-10-06T14:30:00Z',
    channelId: 'UC2mAd_TrVm1st6UO2FmzNqw',
    channelTitle: 'Galigamuwe Gnanadeepa Thero',
    videoUrl: 'https://www.youtube.com/watch?v=UC2mAd_TrVm1st6UO2FmzNqw'
  },
  {
    id: 'demo-vid-2',
    title: 'ජීවිතයට සැනසුම ගෙනදෙන උතුම් සද්ධර්ම දේශනාව - METH TV',
    description: 'ගිහි ජීවිතයේ ගැටලු නිරාකරණය කරගනිමින් ධර්මානුකූලව සැනසීමෙන් ජීවත් වන අයුරු පැහැදිලි කෙරෙන සද්ධර්ම දේශනාව.',
    thumbnailUrl: '/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg',
    publishedAt: '2026-10-04T09:15:00Z',
    channelId: 'UCnsOUPYQjiFj28SR4IWm5BQ',
    channelTitle: 'METH TV Official',
    videoUrl: 'https://www.youtube.com/watch?v=UCnsOUPYQjiFj28SR4IWm5BQ'
  },
  {
    id: 'demo-vid-3',
    title: 'අසිරිමත් රත්නමාලී මහා සෑ වන්දනාව සහ මල් පූජා පිංකම',
    description: 'ඓතිහාසික රුවන්වැලි මහා සෑ සමිඳුන් අභියස පැවැති නෙළුම් මල් පූජාව සහ ආශිර්වාද සෙත් පිරිත් දේශනාව.',
    thumbnailUrl: '/src/assets/images/event_poya_sil_program_1791621295192.jpg',
    publishedAt: '2026-09-29T11:00:00Z',
    channelId: 'UCnsOUPYQjiFj28SR4IWm5BQ',
    channelTitle: 'METH TV Official',
    videoUrl: 'https://www.youtube.com/watch?v=UCnsOUPYQjiFj28SR4IWm5BQ'
  },
  {
    id: 'demo-vid-4',
    title: 'සාංඝික කඨින මහා දානමය පුණ්‍යකර්මය - පූර්ණ විකාශය',
    description: 'මහා සංඝරත්නය උදෙසා පූජා කරන ලද උතුම් කඨින චීවර පූජා මහෝත්සවයේ විශේෂ අවස්ථා සහ ධර්ම දේශනාව.',
    thumbnailUrl: '/src/assets/images/event_kathina_ceremony_1791621311155.jpg',
    publishedAt: '2026-09-26T16:00:00Z',
    channelId: 'UCPGmdO4neBO3AQejn-4SU_w',
    channelTitle: 'METH TV Dhamma Deshana',
    videoUrl: 'https://www.youtube.com/watch?v=UCPGmdO4neBO3AQejn-4SU_w'
  }
];

class YouTubeService {
  private apiKey: string | null = null;
  private cache: Map<string, { timestamp: number; data: YouTubeVideoItem[] }> = new Map();
  private CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

  constructor() {
    // Check if YouTube API key is provided via environment
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      this.apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || null;
    }
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() !== '');
  }

  getEmbedUrl(urlOrId: string): string {
    if (!urlOrId) return '';
    // If it's a full URL, extract video id
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : urlOrId;
    
    // Return standard privacy-friendly embed URL with autoplay parameter option
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  async getRecentVideos(channelIds: string[] = []): Promise<{
    videos: YouTubeVideoItem[];
    status: YouTubeFeedStatus;
  }> {
    const channelsToFetch = channelIds.length > 0 ? channelIds : OFFICIAL_CHANNELS.map(c => c.id);
    const channelTitlesMap: Record<string, string> = {};
    OFFICIAL_CHANNELS.forEach(c => {
      channelTitlesMap[c.id] = c.title;
    });

    if (!this.isConfigured()) {
      return {
        videos: DEMO_VIDEOS,
        status: {
          isApiConfigured: false,
          isLoading: false,
          error: null,
          channelTitles: channelTitlesMap,
        }
      };
    }

    try {
      // Check cache first
      const cacheKey = channelsToFetch.sort().join(',');
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION_MS) {
        return {
          videos: cached.data,
          status: {
            isApiConfigured: true,
            isLoading: false,
            error: null,
            channelTitles: channelTitlesMap,
          }
        };
      }

      // Fetch from YouTube Data API v3
      const fetchedVideos: YouTubeVideoItem[] = [];
      for (const channelId of channelsToFetch) {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6&type=video`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`YouTube API returned status ${res.status}`);
        }
        const data = await res.json();
        if (data.items) {
          for (const item of data.items) {
            fetchedVideos.push({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || '',
              publishedAt: item.snippet.publishedAt,
              channelId: item.snippet.channelId,
              channelTitle: item.snippet.channelTitle,
              videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            });
          }
        }
      }

      // Sort by publication date descending
      fetchedVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      this.cache.set(cacheKey, { timestamp: Date.now(), data: fetchedVideos });

      return {
        videos: fetchedVideos,
        status: {
          isApiConfigured: true,
          isLoading: false,
          error: null,
          channelTitles: channelTitlesMap,
        }
      };
    } catch (err: any) {
      console.warn('YouTube API fetch failed, falling back to demo feed:', err);
      return {
        videos: DEMO_VIDEOS,
        status: {
          isApiConfigured: true,
          isLoading: false,
          error: err.message || 'YouTube Data API දෝෂයක් හටගැනිණි',
          channelTitles: channelTitlesMap,
        }
      };
    }
  }
}

export const youtubeService = new YouTubeService();
