import React from 'react';
import { 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  PlusCircle, 
  Tv, 
  CheckCircle2, 
  Clock, 
  Layers,
  Heart,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { programs, events, news, settings, donations, dayakathwayaRequests } = useContent();

  const totalPrograms = programs.length;
  const upcomingPrograms = programs.filter(p => p.status === 'upcoming').length;
  const completedPrograms = programs.filter(p => p.status === 'completed').length;
  const publishedNewsCount = news.filter(n => n.publicationStatus === 'published').length;
  const totalGalleries = events.length;
  const totalPhotos = events.reduce((acc, curr) => acc + (curr.photos?.length || 0), 0);
  const totalDonationAmount = donations.reduce((acc, curr) => acc + (curr.intendedAmount || 0), 0);
  const newDonations = donations.filter(d => d.status === 'නව ඉල්ලීම').length;
  const newDayakathwaya = dayakathwayaRequests.filter(r => r.requestStatus === 'නව ඉල්ලීම').length;

  const kpis = [
    {
      label: 'මුළු වැඩසටහන්',
      value: totalPrograms,
      sub: `${upcomingPrograms} ක් ඉදිරියට`,
      icon: Calendar,
      color: 'text-[#9C1C24] bg-[#FDF4F5]',
    },
    {
      label: 'පරිත්‍යාග අභිප්‍රායන්',
      value: donations.length,
      sub: `රු. ${totalDonationAmount.toLocaleString()}`,
      icon: Heart,
      color: 'text-[#E87928] bg-[#FFF7ED]',
    },
    {
      label: 'දායකත්ව ඉල්ලීම්',
      value: dayakathwayaRequests.length,
      sub: `${newDayakathwaya} ක් නව ඉල්ලීම්`,
      icon: HeartHandshake,
      color: 'text-[#650F18] bg-[#FAF7F5]',
    },
    {
      label: 'පුණ්‍යකර්ම ගැලරි',
      value: totalGalleries,
      sub: `${totalPhotos} ඡායාරූප ඇතුළත්`,
      icon: ImageIcon,
      color: 'text-[#9C1C24] bg-[#FDF4F5]',
    },
    {
      label: 'උඩුගත කළ ඡායාරූප',
      value: totalPhotos,
      sub: 'ගැලරි සියල්ලෙහි එකතුව',
      icon: Layers,
      color: 'text-[#2045A3] bg-indigo-50',
    },
    {
      label: 'ප්‍රකාශිත පුවත්',
      value: publishedNewsCount,
      sub: 'වෙබ් අඩවියේ ප්‍රදර්ශනය වේ',
      icon: FileText,
      color: 'text-emerald-800 bg-emerald-50',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif">
            මෙත් රූපවාහිනී පාලක මණ්ඩලය
          </h1>
          <p className="text-xs text-[#2B2526] mt-1">
            METH TV අන්තර්ගත කළමනාකරණය, සජීවී විකාශය, පරිත්‍යාග සහ දායකත්ව පාලනය
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('programs')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#F5C518]" />
            <span>අලුත් වැඩසටහනක්</span>
          </button>

          <button
            onClick={() => onNavigateTab('donations')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#650F18] hover:bg-[#4A0B10] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-[#F5C518]" />
            <span>පරිත්‍යාග ({newDonations} නව)</span>
          </button>

          <button
            onClick={() => onNavigateTab('dayakathwaya')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FDF4F5] hover:bg-[#F5DADC] text-[#9C1C24] border border-[#EFCED1] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#9C1C24]" />
            <span>දායකත්ව ({newDayakathwaya} නව)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-stone-500 truncate">{kpi.label}</span>
                <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#650F18] font-mono">
                {kpi.value}
              </div>
              <div className="text-[10px] text-stone-500 truncate">
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Livestream Preview & Quick Config */}
      <div className="bg-white rounded-2xl p-6 border border-[#EFE6E4] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#9C1C24]" />
            <h2 className="text-base font-bold text-[#650F18] font-sinhala-serif">
              වත්මන් සජීවී විකාශ තත්ත්වය
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('settings')}
            className="text-xs font-semibold text-[#9C1C24] hover:underline cursor-pointer"
          >
            සැකසුම් වෙනස් කරන්න →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FAF7F5] p-4 rounded-xl space-y-1.5 border border-[#EFE6E4]">
            <div className="text-stone-500">විකාශ මාතෘකාව:</div>
            <div className="font-semibold text-[#650F18] font-sinhala-serif">
              {settings.livestreamTitle || 'නොමැත'}
            </div>
          </div>
          <div className="bg-[#FAF7F5] p-4 rounded-xl space-y-1.5 border border-[#EFE6E4]">
            <div className="text-stone-500">YouTube විකාශ සබැඳිය (URL):</div>
            <div className="font-mono text-stone-700 truncate">
              {settings.livestreamUrl || 'සකස් කර නොමැත'}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Content Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Programs */}
        <div className="bg-white rounded-2xl p-6 border border-[#EFE6E4] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
            <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
              නවතම වැඩසටහන්
            </h3>
            <button
              onClick={() => onNavigateTab('programs')}
              className="text-xs font-semibold text-[#9C1C24] hover:underline cursor-pointer"
            >
              සියල්ල බලන්න
            </button>
          </div>

          <div className="divide-y divide-[#EFE6E4] space-y-2">
            {programs.slice(0, 4).map((prog) => (
              <div key={prog.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="truncate space-y-0.5">
                  <div className="font-semibold text-[#650F18] truncate font-sinhala-serif">
                    {prog.title}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {prog.date} · {prog.category}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                    prog.publicationStatus === 'published'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {prog.publicationStatus === 'published' ? 'ප්‍රකාශිතයි' : 'කෙටුම්පතක්'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Galleries */}
        <div className="bg-white rounded-2xl p-6 border border-[#EFE6E4] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
            <h3 className="text-base font-bold text-[#650F18] font-sinhala-serif">
              නවතම පුණ්‍යකර්ම ගැලරි
            </h3>
            <button
              onClick={() => onNavigateTab('events')}
              className="text-xs font-semibold text-[#9C1C24] hover:underline cursor-pointer"
            >
              සියල්ල බලන්න
            </button>
          </div>

          <div className="divide-y divide-[#EFE6E4] space-y-2">
            {events.slice(0, 4).map((ev) => (
              <div key={ev.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="truncate space-y-0.5">
                  <div className="font-semibold text-[#650F18] truncate font-sinhala-serif">
                    {ev.title}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {ev.eventDate} · ඡායාරූප {ev.photos?.length || 0} ක්
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                    ev.publicationStatus === 'published'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {ev.publicationStatus === 'published' ? 'ප්‍රකාශිතයි' : 'කෙටුම්පතක්'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
