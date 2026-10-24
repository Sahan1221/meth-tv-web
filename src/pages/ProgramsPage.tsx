import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  Play, 
  X, 
  ExternalLink, 
  Filter, 
  Image as ImageIcon,
  Radio,
  Tv,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Program, YouTubeVideoItem, DhammaEvent } from '../types';
import { youtubeService, OFFICIAL_CHANNELS, YouTubeFeedStatus } from '../services/youtubeService';

interface ProgramsPageProps {
  onNavigate: (route: string) => void;
  initialTab?: 'schedule' | 'videos' | 'galleries';
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ 
  onNavigate, 
  initialTab = 'schedule' 
}) => {
  const { publishedPrograms, publishedEvents } = useContent();

  // Unified Media Hub Tab State
  const [activeTab, setActiveTab] = useState<'schedule' | 'videos' | 'galleries'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Tab 1 (Schedule) States
  const [scheduleSearch, setScheduleSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);

  // Tab 2 (YouTube Videos) States
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [feedStatus, setFeedStatus] = useState<YouTubeFeedStatus>({
    isApiConfigured: false,
    isLoading: true,
    error: null,
    channelTitles: {},
  });
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<YouTubeVideoItem | null>(null);

  // Tab 3 (Photo Galleries) States
  const [gallerySearch, setGallerySearch] = useState('');

  // Fetch YouTube Videos when component mounts
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

  // Filtered Programs
  const categories = [
    { id: 'all', label: 'සියලු වැඩසටහන්' },
    { id: 'ධර්ම දේශනා', label: 'ධර්ම දේශනා' },
    { id: 'භාවනා වැඩසටහන්', label: 'භාවනා වැඩසටහන්' },
    { id: 'ධර්ම සාකච්ඡා', label: 'ධර්ම සාකච්ඡා' },
    { id: 'විශේෂ පෝය විකාශ', label: 'පෝය විකාශ' },
    { id: 'පිරිත් දේශනා', label: 'පිරිත් දේශනා' },
  ];

  const statuses = [
    { id: 'all', label: 'සියලු තත්ත්ව' },
    { id: 'upcoming', label: 'ඉදිරි වැඩසටහන්' },
    { id: 'completed', label: 'අවසන් වූ වැඩසටහන්' },
  ];

  const filteredPrograms = publishedPrograms.filter((prog) => {
    const matchesSearch =
      prog.title.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
      prog.description.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
      prog.venue.toLowerCase().includes(scheduleSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || prog.category === selectedCategory;
    const matchesStat = selectedStatus === 'all' || prog.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  // Filtered Videos
  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.description.toLowerCase().includes(videoSearch.toLowerCase());
    const matchesChan = selectedChannel === 'all' || v.channelId === selectedChannel;
    return matchesSearch && matchesChan;
  });

  // Filtered Galleries
  const filteredEvents = publishedEvents.filter((ev) => {
    return (
      ev.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      ev.venue.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      ev.description.toLowerCase().includes(gallerySearch.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fadeIn">
      {/* 1. Page Header with Title & Editorial Description */}
      <div className="border-b border-[#EFE6E4] pb-6 space-y-3">
        <div className="text-xs font-semibold text-[#9C1C24] font-sans flex items-center gap-1.5">
          <span>මෙත් රූපවාහිනී මාධ්‍ය සංරක්ෂිතය</span>
          <span aria-hidden="true">·</span>
          <span>PEO TV 111 & Digital Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650F18] font-sinhala-serif">
          වැඩසටහන් සහ මාධ්‍ය කේන්ද්‍රය
        </h1>
        <p className="text-sm sm:text-base text-[#2B2526] max-w-3xl leading-relaxed">
          පූජනීය මහා සංඝරත්නය විසින් දේශනා කරන ලද නිර්මල ත්‍රිපිටක සද්ධර්මය, සජීවී ආගමික වැඩසටහන් කාලසටහන, යූටියුබ් වීඩියෝ සහ පින්කම් ඡායාරූප එකතුව එකම තැනකින් නරඹන්න.
        </p>
      </div>

      {/* 2. Unified Broadcaster Segmented Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#EFE6E4] rounded-2xl shadow-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'text-[#650F18] hover:bg-[#FAF7F5]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>වැඩසටහන් කාලසටහන</span>
            <span className="text-[11px] opacity-80 hidden md:inline">({publishedPrograms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'text-[#650F18] hover:bg-[#FAF7F5]'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>වීඩියෝ සංරක්ෂිතය</span>
            <span className="text-[11px] opacity-80 hidden md:inline">({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('galleries')}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'galleries'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'text-[#650F18] hover:bg-[#FAF7F5]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>පුණ්‍යකර්ම ඡායාරූප</span>
            <span className="text-[11px] opacity-80 hidden md:inline">({publishedEvents.length})</span>
          </button>
        </div>

        {/* Quick action button to live TV */}
        <button
          onClick={() => onNavigate('/live')}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#650F18] bg-white hover:bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Tv className="w-4 h-4 text-[#9C1C24]" />
          <span>දැන් විකාශය වන සජීවී නාලිකාවට</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: SCHEDULE & CATEGORIES                                   */}
      {/* ============================================================== */}
      {activeTab === 'schedule' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Filters Bar */}
          <div className="space-y-4 bg-white p-5 rounded-3xl border border-[#EFE6E4] shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={scheduleSearch}
                  onChange={(e) => setScheduleSearch(e.target.value)}
                  placeholder="වැඩසටහන් නම, ස්ථානය හෝ විස්තර සොයන්න..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                />
                {scheduleSearch && (
                  <button
                    onClick={() => setScheduleSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="md:col-span-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#650F18] font-semibold transition-colors"
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Segmented Controls */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#9C1C24] text-white shadow-xs'
                        : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5] border border-[#EFE6E4]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Programs */}
          <div>
            <div className="text-xs text-stone-500 mb-4 font-sans">
              වැඩසටහන් <strong className="text-[#650F18]">{filteredPrograms.length}</strong> ක් හමුවිය
            </div>

            {filteredPrograms.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
                <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                  වැඩසටහන් කිසිවක් හමු නොවීය
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  වෙනත් සෙවුම් පදයක් භාවිතා කර හෝ පෙරහන වෙනස් කර නැවත උත්සාහ කරන්න.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((prog) => (
                  <article
                    key={prog.id}
                    onClick={() => setActiveModalProgram(prog)}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-100">
                      <img
                        src={prog.coverImage || '/src/assets/images/program_dhamma_discussion_1791621325599.jpg'}
                        alt={prog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#650F18]/90 text-white text-xs px-2.5 py-1 rounded-lg shadow font-medium">
                        {prog.category}
                      </div>

                      {prog.status === 'completed' && (
                        <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-xs px-2 py-0.5 rounded-lg shadow">
                          අවසන් වූ
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                          <span>{prog.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{prog.startTime}</span>
                        </div>

                        <h3 className="text-base font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors line-clamp-2 leading-snug font-sinhala-serif">
                          {prog.title}
                        </h3>

                        <p className="text-xs text-[#2B2526] line-clamp-2 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                        <span className="text-stone-500 flex items-center gap-1 truncate max-w-[200px]">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          {prog.venue}
                        </span>
                        <span className="text-[#9C1C24] font-semibold group-hover:underline">
                          විස්තර බලන්න →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: YOUTUBE VIDEO ARCHIVE                                   */}
      {/* ============================================================== */}
      {activeTab === 'videos' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Search & Channel Filters */}
          <div className="space-y-4 bg-white p-5 rounded-3xl border border-[#EFE6E4] shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={videoSearch}
                  onChange={(e) => setVideoSearch(e.target.value)}
                  placeholder="වීඩියෝ හෝ ධර්ම දේශනා මාතෘකාව සොයන්න..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526]"
                />
              </div>

              <div className="md:col-span-4">
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#650F18] font-semibold"
                >
                  <option value="all">සියලු නිල යූටියුබ් නාලිකා</option>
                  {OFFICIAL_CHANNELS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div>
            <div className="text-xs text-stone-500 mb-4 font-sans">
              වීඩියෝ <strong className="text-[#650F18]">{filteredVideos.length}</strong> ක් හමුවිය
            </div>

            {filteredVideos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
                <Play className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                  වීඩියෝ හමු නොවීය
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <article
                    key={video.id}
                    onClick={() => setActiveVideoModal(video)}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-950">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#9C1C24]/90 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#9C1C24] transition-all shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-white text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] text-[#9C1C24] font-semibold mb-1">
                          {video.channelTitle}
                        </div>
                        <h3 className="text-sm font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors line-clamp-2 leading-snug font-sinhala-serif">
                          {video.title}
                        </h3>
                        <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                          {video.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs text-stone-400 font-sans">
                        <span>{video.publishedAt.split('T')[0]}</span>
                        <span className="text-[#9C1C24] font-semibold flex items-center gap-1 group-hover:underline">
                          නරඹන්න
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: DHAMMA EVENTS & PHOTO ARCHIVE                           */}
      {/* ============================================================== */}
      {activeTab === 'galleries' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Search */}
          <div className="bg-white p-5 rounded-3xl border border-[#EFE6E4] shadow-xs">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gallerySearch}
                onChange={(e) => setGallerySearch(e.target.value)}
                placeholder="පුණ්‍යකර්ම නම හෝ ස්ථානය සොයන්න..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-500 mb-4 font-sans">
              පුණ්‍යකර්ම ගැලරි <strong className="text-[#650F18]">{filteredEvents.length}</strong> ක් හමුවිය
            </div>

            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
                <ImageIcon className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                  ඡායාරූප ගැලරි හමු නොවීය
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-shadow group cursor-pointer"
                    onClick={() => onNavigate(`/events/${event.id}`)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-stone-200">
                      <img
                        src={event.coverImage || '/src/assets/images/event_poya_sil_program_1791621295192.jpg'}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
                        <ImageIcon className="w-3.5 h-3.5 text-[#F5C518]" />
                        <span>{event.photos?.length || 0} ඡායාරූප</span>
                      </div>

                      <div className="absolute bottom-3 left-3 text-xs text-stone-200 font-sans">
                        {event.eventDate}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors line-clamp-2 leading-snug font-sinhala-serif">
                        {event.title}
                      </h3>

                      <p className="text-xs text-[#2B2526] line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs border-t border-[#EFE6E4]">
                        <span className="text-stone-500 truncate max-w-[180px]">
                          {event.venue}
                        </span>
                        <span className="text-[#9C1C24] font-semibold group-hover:underline">
                          ගැලරිය බලන්න →
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {activeModalProgram && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EFE6E4]">
            <div className="relative h-64 sm:h-72 bg-stone-900">
              {activeModalProgram.youtubeUrl ? (
                <iframe
                  src={youtubeService.getEmbedUrl(activeModalProgram.youtubeUrl)}
                  title={activeModalProgram.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeModalProgram.coverImage || '/src/assets/images/program_dhamma_discussion_1791621325599.jpg'}
                  alt={activeModalProgram.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => setActiveModalProgram(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="වසන්න"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="text-[#9C1C24] font-bold">
                  {activeModalProgram.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeModalProgram.status === 'upcoming' ? 'ඉදිරි වැඩසටහනකි' : 'අවසන් වූ වැඩසටහනකි'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif leading-tight">
                {activeModalProgram.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#2B2526] leading-relaxed">
                {activeModalProgram.description}
              </p>

              <div className="bg-[#FAF7F5] rounded-2xl p-4 border border-[#EFE6E4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-stone-400">දිනය:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{activeModalProgram.date}</div>
                </div>
                <div>
                  <div className="text-stone-400">වේලාව:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{activeModalProgram.startTime}</div>
                </div>
                <div>
                  <div className="text-stone-400">ස්ථානය:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{activeModalProgram.venue}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#EFE6E4]">
                <button
                  onClick={() => onNavigate('/dayakathwaya')}
                  className="text-xs font-semibold text-[#9C1C24] hover:underline"
                >
                  මෙම වැඩසටහන සඳහා දායකත්වය ලබාගන්න →
                </button>

                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
                >
                  වසන්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Playback Modal */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
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
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="වසන්න"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="text-xs text-[#9C1C24] font-semibold">
                {activeVideoModal.channelTitle} · {activeVideoModal.publishedAt.split('T')[0]}
              </div>
              <h2 className="text-lg font-bold text-[#650F18] font-sinhala-serif">
                {activeVideoModal.title}
              </h2>
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {activeVideoModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
