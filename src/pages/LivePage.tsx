import React, { useState } from 'react';
import { Tv, ExternalLink, Radio, Info, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { youtubeService, OFFICIAL_CHANNELS } from '../services/youtubeService';
import { BRAND_CONFIG } from '../config/brand';

interface LivePageProps {
  onNavigate: (route: string) => void;
}

export const LivePage: React.FC<LivePageProps> = ({ onNavigate }) => {
  const { settings, publishedPrograms } = useContent();
  const [streamError, setStreamError] = useState(false);

  // Determine if stream URL is a configured live link
  const isStreamConfigured = settings.livestreamUrl && !settings.livestreamUrl.includes('placeholder');
  const embedUrl = youtubeService.getEmbedUrl(settings.livestreamUrl);

  const upcomingToday = publishedPrograms.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner / Channel Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EFE6E4]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9C1C24] bg-[#FDF4F5] border border-[#EFCED1] px-3.5 py-1.5 rounded-full mb-2">
            <Radio className="w-3.5 h-3.5 text-[#9C1C24] animate-pulse" />
            <span>සජීවී විකාශය (Live Broadcast)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#650F18] font-sinhala-serif">
            {settings.livestreamTitle || 'මෙත් රූපවාහිනී සජීවී විකාශය'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            ශ්‍රී ලංකා ටෙලිකොම් PEO TV Channel 111 සහ YouTube සජීවී විකාශය
          </p>
        </div>

        {/* Transmission badge */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FDF4F5] border border-[#EFCED1] px-4 py-2 rounded-2xl text-center">
            <div className="text-[11px] text-[#9C1C24] font-bold uppercase tracking-wider">PEO TV</div>
            <div className="text-sm font-bold text-[#650F18]">Channel 111</div>
          </div>
          <button
            onClick={() => onNavigate('/admin')}
            className="text-xs text-[#9C1C24] hover:underline p-1 cursor-pointer"
          >
            විකාශ සැකසුම්
          </button>
        </div>
      </div>

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Video Player Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-xl border border-[#EFE6E4]">
            {isStreamConfigured && !streamError ? (
              <iframe
                src={embedUrl}
                title="METH TV Live Stream"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setStreamError(true)}
              />
            ) : (
              /* Fallback state when broadcast URL is placeholder or offline */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-b from-[#650F18] via-[#4A0B10] to-[#30050A]">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-[#F5C518]/40 flex items-center justify-center text-[#F5C518] mb-4">
                  <Tv className="w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-sinhala-serif text-white mb-2">
                  සජීවී විකාශය සම්බන්ධ වෙමින් පවතී
                </h3>
                <p className="text-xs sm:text-sm text-[#F5E6E8] max-w-md leading-relaxed mb-6">
                  මෙම මොහොතේ විශේෂ සජීවී විකාශයක් නොමැති නම් හෝ සම්ප්‍රේෂණය වෙමින් පවතින්නේ නම්, කරුණාකර අපගේ නිල YouTube නාලිකා ඔස්සේ හෝ SLT PEO TV Channel 111 ඔස්සේ නරඹන්න.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {OFFICIAL_CHANNELS.map((ch, idx) => (
                    <a
                      key={idx}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl text-xs text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-[#F5C518]" />
                      <span>{ch.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Under player metadata */}
          <div className="bg-white rounded-2xl p-5 border border-[#EFE6E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                මෙත් රූපවාහිනී සජීවී සද්ධර්ම මණ්ඩපය
              </h2>
              <p className="text-xs text-[#2B2526] mt-0.5">
                දිනපතා උදෑසන, දහවල් සහ රාත්‍රී ධර්ම දේශනා, සෙත් පිරිත් සහ ආශිර්වාද පූජාවන් විකාශය වේ.
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCnsOUPYQjiFj28SR4IWm5BQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>YouTube හි නරඹන්න</span>
            </a>
          </div>

          {/* Notice box */}
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#650F18]">
            <Info className="w-4 h-4 text-[#E87928] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">ප්‍රේක්ෂක අවධානයට: </span>
              අන්තර්ජාල සම්බන්ධතාවයේ වේගය අනුව වීඩියෝ ගුණාත්මකභාවය වෙනස් විය හැක. විකාශයේ ගැටලුවක් ඇත්නම් <strong>{BRAND_CONFIG.telephone}</strong> අංකයෙන් අප හා සම්බන්ධ වන්න.
            </div>
          </div>
        </div>

        {/* Sidebar Schedule Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE6E4] shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
              <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#9C1C24]" />
                <span>අද දවසේ විකාශ කාලසටහන</span>
              </h3>
              <span className="text-xs text-stone-500">අද දිනය</span>
            </div>

            <div className="space-y-4">
              {upcomingToday.map((prog) => (
                <div key={prog.id} className="group p-3 rounded-xl hover:bg-[#FAF7F5] transition-colors border border-transparent hover:border-[#EFE6E4]">
                  <div className="flex items-center gap-2 text-xs text-[#9C1C24] font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{prog.startTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-500 font-normal">{prog.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#650F18] font-sinhala-serif leading-snug group-hover:text-[#9C1C24] transition-colors">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {prog.venue}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EFE6E4]">
              <button
                onClick={() => onNavigate('/programs')}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#9C1C24] hover:bg-[#FDF4F5] rounded-xl transition-colors border border-[#EFE6E4] cursor-pointer"
              >
                සම්පූර්ණ වැඩසටහන් ලැයිස්තුව →
              </button>
            </div>
          </div>

          {/* PEO TV Details Card */}
          <div className="bg-gradient-to-br from-[#650F18] to-[#9C1C24] text-white rounded-3xl p-6 shadow-md space-y-3 border border-[#80141D]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C518]">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase text-[#F5C518] tracking-wider font-semibold">
                  ශ්‍රී ලංකා ටෙලිකොම්
                </div>
                <div className="text-lg font-bold">PEO TV Channel 111</div>
              </div>
            </div>
            <p className="text-xs text-[#F5E6E8] leading-relaxed">
              ඔබගේ PEO TV දුරස්ථ පාලකයේ 111 නාලිකා අංකය ඇතුළත් කර මෙත් රූපවාහිනිය පැය 24 පුරා පැහැදිලි රූප සහ හඬ ගුණාත්මකභාවයෙන් යුතුව නරඹන්න.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
