import React from 'react';
import { 
  Tv, 
  Play, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Image as ImageIcon, 
  Radio, 
  Clock, 
  Heart, 
  HeartHandshake, 
  ArrowRight,
  ShieldCheck,
  Phone,
  Volume2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { OFFICIAL_CHANNELS } from '../services/youtubeService';
import { BRAND_CONFIG } from '../config/brand';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { publishedPrograms, publishedEvents, publishedNews, settings } = useContent();

  const featuredPrograms = publishedPrograms.filter(p => p.isFeatured).slice(0, 3);
  const upcomingPrograms = publishedPrograms.filter(p => p.status === 'upcoming').slice(0, 4);
  const completedEvents = publishedEvents.slice(0, 3);
  const latestNews = publishedNews.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* 1. Hero Section (Broadcaster Architectural Baseline) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F6] via-[#FAF7F5] to-white border-b border-[#EFE6E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#9C1C24] font-sans tracking-wide">
                <span>ශ්‍රී ලංකා බෞද්ධ රූපවාහිනී නාලිකාව</span>
                <span aria-hidden="true">·</span>
                <span>PEO TV Channel 111</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">HD සම්ප්‍රේෂණය</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650F18] tracking-tight leading-[1.2] text-balance font-sinhala-serif">
                මෙත් රූපවාහිනී
                <span className="block text-xl sm:text-2xl lg:text-3xl font-normal text-[#9C1C24] mt-2 font-sinhala-serif">
                  {BRAND_CONFIG.tagline}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#2B2526] leading-relaxed max-w-2xl font-sans">
                පිරිසිදු නිර්මල ත්‍රිපිටක සද්ධර්මය ලොව පුරා විසිරී සිටින සුවහසක් සැදැහැවතුන්ගේ ආධ්‍යාත්මික සුවය පිණිස සම්ප්‍රේෂණය කරන පූජනීය බෞද්ධ රූපවාහිනී සේවාව.
              </p>

              {/* Action Buttons: 2 Clear Priorities */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('/live')}
                  className="flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#9C1C24] hover:bg-[#80141D] active:scale-[0.98] rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Radio className="w-5 h-5 text-[#F5C518]" />
                  <span>සජීවී විකාශය නරඹන්න (Live TV)</span>
                </button>

                <button
                  onClick={() => onNavigate('/programs')}
                  className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-[#650F18] bg-white hover:bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#9C1C24]" />
                  <span>වැඩසටහන් සහ මාධ්‍ය කේන්ද්‍රය</span>
                </button>
              </div>

              {/* Tuning Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#2B2526] font-sans">
                <div className="flex items-center gap-2 text-stone-600">
                  <Tv className="w-4 h-4 text-[#9C1C24] shrink-0" />
                  <span>SLT PEO TV: <strong className="text-stone-900 font-mono">CH 111</strong></span>
                </div>
                <span aria-hidden="true" className="text-stone-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-2 text-stone-600">
                  <Play className="w-4 h-4 text-[#9C1C24] shrink-0" />
                  <span>YouTube: <strong className="text-stone-900">METH TV Official</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Broadcast Monitor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EFE6E4] bg-stone-900 group">
                <img
                  src="/assets/images/hero_dhamma_broadcast_1791621278068.jpg"
                  alt="මෙත් රූපවාහිනී සජීවී විකාශය"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Overlaid Live badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#9C1C24] text-white text-xs font-bold uppercase rounded-md tracking-wider shadow">
                    <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-ping" />
                    සජීවී විකාශය (ON AIR)
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg font-bold font-sinhala-serif leading-snug mb-1">
                    {settings.livestreamTitle || 'මෙත් රූපවාහිනී සජීවී සද්ධර්ම දේශනා විකාශය'}
                  </h3>
                  <p className="text-xs text-stone-200 mb-3 line-clamp-1 font-sans">
                    PEO TV 111 සහ නිල යූටියුබ් නාලිකාව ඔස්සේ සම්ප්‍රේෂණය වේ
                  </p>
                  <button
                    onClick={() => onNavigate('/live')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5C518] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    <span>විකාශය නරඹන්න</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Television Network Live On-Air Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#EFE6E4] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF4F5] text-[#9C1C24] border border-[#EFCED1] rounded-lg text-xs font-bold shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#9C1C24] animate-pulse" />
              <span>දැන් විකාශය වේ</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#650F18] font-sinhala-serif truncate">
              {settings.livestreamTitle || 'මෙත් රූපවාහිනී සජීවී සද්ධර්ම දේශනාව'}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            {upcomingPrograms[0] && (
              <span className="text-stone-500 hidden lg:inline">
                ඊළඟට: <strong className="text-stone-800">{upcomingPrograms[0].title}</strong> ({upcomingPrograms[0].startTime})
              </span>
            )}
            <button
              onClick={() => onNavigate('/live')}
              className="px-3.5 py-1.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              සජීවීව එක්වන්න →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Unified Philanthropy Feature: Program Sponsorship vs General Donations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-1">
          <div className="text-xs font-semibold text-[#9C1C24] font-sans">
            ශාසනික දායකත්වය සහ ධර්ම දානය
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#650F18] font-sinhala-serif">
            පුණ්‍ය දායකත්වය සහ සදහම් පරිත්‍යාග
          </h2>
          <p className="text-xs sm:text-sm text-[#2B2526] max-w-2xl leading-relaxed">
            ඔබගේ උපන් දිනය, විවාහ සංවත්සරය හෝ මියගිය ඥාතීන්ට පිං පිණිස සජීවී වැඩසටහනක ප්‍රධාන දායකත්වය භාරගන්න; නැතහොත් නාලිකාවේ සදහම් මෙහෙවරට පරිත්‍යාගශීලී වන්න.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Dayakathwaya (Program Sponsorship) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6E4] shadow-xs flex flex-col justify-between space-y-5 hover:border-[#EFCED1] transition-colors">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#650F18]">
                <HeartHandshake className="w-4 h-4 text-[#9C1C24]" />
                <span>01. වැඩසටහන් දායකත්වය භාර ගැනීම</span>
              </div>
              <h3 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                ධර්ම දේශනාවක ප්‍රධාන දායකත්වය භාරගන්න
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2526] leading-relaxed">
                සජීවී ධර්ම දේශනාවක්, පෝය දින වැඩසටහනක් හෝ පිරිත් දේශනාවක් සඳහා දායකත්වය තෝරාගෙන ඔබගේ පින්කම නිල වශයෙන් ලියාපදිංචි කරන්න.
              </p>
              <div className="text-[11px] text-stone-500 font-sans flex items-center gap-2 pt-1">
                <span>· අවස්ථා 8ක තේරීම</span>
                <span>· නිල යොමු අංකයක් නිකුත් වේ</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/dayakathwaya')}
                className="px-5 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>දායකත්වයක් භාර ගන්න</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5C518]" />
              </button>
            </div>
          </div>

          {/* Card B: General Donations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6E4] shadow-xs flex flex-col justify-between space-y-5 hover:border-[#EFCED1] transition-colors">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#650F18]">
                <Heart className="w-4 h-4 text-[#9C1C24]" />
                <span>02. සදහම් ආධාර හා පරිත්‍යාග</span>
              </div>
              <h3 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                ධර්ම ප්‍රචාරයට ඔබගේ සැදැහැවත් අනුග්‍රහය
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2526] leading-relaxed">
                මෙත් රූපවාහිනී සදහම් විකාශන කටයුතු සහ විශේෂ ශාසනික ව්‍යාපෘති සඳහා කැමැති මුදලක් පරිත්‍යාග කර උතුම් ධර්ම දානමය කුසලයට දායක වන්න.
              </p>
              <div className="text-[11px] text-stone-500 font-sans flex items-center gap-2 pt-1">
                <span>· සාමාන්‍ය පරිත්‍යාග</span>
                <span>· විශේෂ ව්‍යාපෘති ආධාර</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/donations')}
                className="px-5 py-2.5 bg-white hover:bg-[#FAF7F5] text-[#650F18] border border-[#EFE6E4] rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>පරිත්‍යාග පිටුවට යන්න</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9C1C24]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Programs (Directly Connected to Unified Media Hub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#9C1C24] font-sans mb-1">
              වැඩසටහන් සහ මාධ්‍ය කේන්ද්‍රය
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#650F18] font-sinhala-serif">
              විශේෂිත ධර්ම වැඩසටහන්
            </h2>
            <p className="text-sm text-[#2B2526] mt-1">
              මෙත් රූපවාහිනිය ඔස්සේ විකාශය වන ප්‍රමුඛතම ධර්ම දේශනා සහ සදහම් සාකච්ඡා
            </p>
          </div>
          <button
            onClick={() => onNavigate('/programs')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#9C1C24] hover:text-[#650F18] transition-colors cursor-pointer"
          >
            <span>සියලු වැඩසටහන් හා මාධ්‍ය බලන්න</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrograms.map((program) => (
            <article
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              onClick={() => onNavigate('/programs')}
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <img
                  src={program.coverImage || '/assets/images/program_dhamma_discussion_1791621325599.jpg'}
                  alt={program.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#650F18]/90 text-white text-xs px-2.5 py-1 rounded-lg shadow font-medium">
                  {program.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                    <span>{program.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{program.startTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors line-clamp-2 leading-snug font-sinhala-serif">
                    {program.title}
                  </h3>

                  <p className="text-xs text-[#2B2526] line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                  <span className="text-stone-500 truncate max-w-[200px]">
                    {program.venue}
                  </span>
                  <span className="text-[#9C1C24] font-semibold group-hover:underline">
                    විස්තර බලන්න →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Completed Dhamma Programs & Photo Galleries Section */}
      <section className="bg-[#FAF7F5] py-16 border-y border-[#EFE6E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-[#9C1C24] font-sans mb-1">
                ඡායාරූප සංරක්ෂිතය (Photo Archive)
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#650F18] font-sinhala-serif">
                අවසන් වූ පුණ්‍යකර්ම හා ආගමික උත්සව
              </h2>
              <p className="text-sm text-[#2B2526] mt-1">
                මෙත් රූපවාහිනිය මඟින් සංවිධානය කළ සහ විකාශය කළ පුණ්‍යකර්මයන්හි ඡායාරූප එකතුව
              </p>
            </div>
            <button
              onClick={() => onNavigate('/programs/completed')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#9C1C24] hover:text-[#650F18] transition-colors cursor-pointer"
            >
              <span>සියලු ඡායාරූප ගැලරි</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
              <article
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => onNavigate(`/events/${event.id}`)}
              >
                <div className="relative aspect-video overflow-hidden bg-stone-200">
                  <img
                    src={event.coverImage || '/assets/images/event_poya_sil_program_1791621295192.jpg'}
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
                      ඡායාරූප බලන්න →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Religious Programs Schedule */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#EFE6E4] rounded-3xl bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#EFE6E4]">
            <div>
              <div className="text-xs font-semibold text-[#9C1C24] font-sans mb-1">
                විකාශන කාලසටහන
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif">
                ඉදිරි වැඩසටහන් හා පොහෝ දින විකාශ පෙළගැස්ම
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                සජීවීව සහභාගී විය හැකි ආගමික වැඩසටහන් කාලසටහන
              </p>
            </div>
            <button
              onClick={() => onNavigate('/programs')}
              className="px-4 py-2 text-xs font-semibold text-[#650F18] bg-[#FAF7F5] hover:bg-[#FDF4F5] border border-[#EFE6E4] rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              කාලසටහන සම්පූර්ණයෙන්
            </button>
          </div>

          <div className="divide-y divide-[#EFE6E4]">
            {upcomingPrograms.map((prog) => (
              <div
                key={prog.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF7F5] p-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => onNavigate('/programs')}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#9C1C24] font-semibold font-sans">
                    <span>{prog.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{prog.startTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-500 font-normal">{prog.category}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#650F18] font-sinhala-serif">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{prog.venue}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('/live');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#9C1C24] hover:bg-[#80141D] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    නාලිකාවෙන් නරඹන්න
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest News and Channel Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#650F18] font-sinhala-serif">
              නවතම පුවත් සහ නිවේදන
            </h2>
            <p className="text-sm text-[#2B2526] mt-1">
              මෙත් රූපවාහිනී නාලිකාවේ වැදගත් පුවත් සහ විශේෂ නිවේදන
            </p>
          </div>
          <button
            onClick={() => onNavigate('/news')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#9C1C24] hover:text-[#650F18] transition-colors cursor-pointer"
          >
            <span>සියලු පුවත්</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] p-6 flex flex-col justify-between hover:border-[#EFCED1] hover:shadow-xs transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="text-xs text-stone-400 font-sans">
                  {article.publicationDate}
                </div>
                <h3 className="text-base font-bold text-[#650F18] hover:text-[#9C1C24] transition-colors font-sinhala-serif leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-[#2B2526] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EFE6E4]">
                <button
                  onClick={() => onNavigate('/news')}
                  className="text-xs font-semibold text-[#9C1C24] hover:underline cursor-pointer"
                >
                  සම්පූර්ණ පුවත කියවන්න →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Broadcaster Brand Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#650F18] via-[#7F141E] to-[#9C1C24] rounded-3xl p-8 sm:p-12 text-white shadow-lg border border-[#A8242F]">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#F5C518] font-bold font-sans">
              මෙත් රූපවාහිනී සන්නාමය
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sinhala-serif text-white">
              බොදුනුවන්ගේ හදවතේ නාලිකාව — METH TV
            </h2>
            <p className="text-sm sm:text-base text-[#F5E6E8] leading-relaxed font-sans">
              ශ්‍රී ලංකා ටෙලිකොම් PEO TV Channel 111 ඔස්සේ සහ අන්තර්ජාලය ඔස්සේ මුළු මහත් ශ්‍රී ලාංකික බෞද්ධ ජනතාවටත්, විදෙස්ගත බොදුනු ප්‍රජාවටත් පිවිතුරු දහම් පණිවිඩය රැගෙන ඒම අපගේ අරමුණයි.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="px-6 py-3 bg-white hover:bg-[#FAF7F5] text-[#650F18] font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
              >
                නාලිකාව ගැන වැඩිදුරටත්
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-[#F5C518] font-medium rounded-xl text-xs sm:text-sm border border-white/20 transition-colors cursor-pointer"
              >
                අප අමතන්න ({BRAND_CONFIG.telephone})
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
