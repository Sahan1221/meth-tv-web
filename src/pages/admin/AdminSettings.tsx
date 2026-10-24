import React, { useState } from 'react';
import { Settings, Tv, Phone, Mail, RotateCcw, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';

export const AdminSettings: React.FC = () => {
  const { settings, refreshData, resetAll } = useContent();

  const [livestreamUrl, setLivestreamUrl] = useState(settings.livestreamUrl || '');
  const [livestreamTitle, setLivestreamTitle] = useState(settings.livestreamTitle || '');
  const [isLiveActive, setIsLiveActive] = useState(settings.isLiveActive ?? true);
  const [telephone, setTelephone] = useState(settings.contactTelephone || '0342 263 646');
  const [email, setEmail] = useState(settings.contactEmail || 'info@galigamuwethero.com');
  const [peoTv, setPeoTv] = useState(settings.peoTvChannel || 'Channel 111');
  const [websiteUrl, setWebsiteUrl] = useState(settings.websiteUrl || 'https://methtv.lk');

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    contentRepo.updateSettings({
      livestreamUrl,
      livestreamTitle,
      isLiveActive,
      contactTelephone: telephone,
      contactEmail: email,
      peoTvChannel: peoTv,
      websiteUrl,
    });
    refreshData();
    setSuccessToast('සැකසුම් සාර්ථකව යාවත්කාලීන කරන ලදී.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleReset = () => {
    resetAll();
    setIsResetConfirmOpen(false);
    setSuccessToast('සියලු දත්ත ආරම්භක තත්ත්වයට ප්‍රතිස්ථාපනය විය.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-sinhala-serif">
          නාලිකා සැකසුම් හා සජීවී විකාශය
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          සජීවී විකාශන සබැඳිය (YouTube Live URL), සම්බන්ධතා තොරතුරු සහ පද්ධති සැකසුම්
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6 text-xs">
        {/* Section 1: Live Stream Configuration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#6B1724] font-sinhala-serif border-b border-stone-100 pb-2">
            <Tv className="w-4 h-4 text-red-600" />
            <span>1. සජීවී විකාශන සැකසුම් (Livestream Configuration)</span>
          </div>

          <div className="space-y-1">
            <label className="font-medium text-stone-700">
              සජීවී විකාශන මාතෘකාව (Stream Title)
            </label>
            <input
              type="text"
              value={livestreamTitle}
              onChange={(e) => setLivestreamTitle(e.target.value)}
              placeholder="උදා: මෙත් රූපවාහිනී සජීවී විකාශය - ධර්ම දේශනා සහ පිරිත් සජ්ඣායනා"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-stone-700">
              YouTube සජීවී විකාශ සබැඳිය (YouTube Live Video URL or ID)
            </label>
            <input
              type="text"
              value={livestreamUrl}
              onChange={(e) => setLivestreamUrl(e.target.value)}
              placeholder="උදා: https://www.youtube.com/watch?v=..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] font-mono text-stone-900"
            />
            <p className="text-[11px] text-stone-400">
              මෙම සබැඳිය ප්‍රසිද්ධ වෙබ් අඩවියේ `/live` පිටුවේ සහ මුල් පිටුවේ සජීවී වාදකය සඳහා සෘජුවම යොදා ගැනේ.
            </p>
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2 text-sm font-bold text-[#6B1724] font-sinhala-serif border-b border-stone-100 pb-2">
            <Phone className="w-4 h-4 text-amber-700" />
            <span>2. ප්‍රසිද්ධ සම්බන්ධතා තොරතුරු (Public Contact Details)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-medium text-stone-700">දුරකථන අංකය</label>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="0342 263 646"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-stone-700">විද්‍යුත් තැපෑල (Email)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@galigamuwethero.com"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-stone-700">SLT PEO TV නාලිකා අංකය</label>
              <input
                type="text"
                value={peoTv}
                onChange={(e) => setPeoTv(e.target.value)}
                placeholder="Channel 111"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-stone-700">නිල වෙබ් ලිපිනය</label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://methtv.lk"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#801426] hover:bg-[#68101e] text-white rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>සැකසුම් සුරකින්න (Save Settings)</span>
          </button>
        </div>
      </form>

      {/* Reset System Data Card */}
      <div className="bg-red-50/50 p-6 rounded-2xl border border-red-200 space-y-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-red-900 text-sm font-sinhala-serif">
          <RotateCcw className="w-4 h-4 text-red-700" />
          <span>දත්ත ආරම්භක තත්ත්වයට පත් කිරීම (Reset to Seed Data)</span>
        </div>
        <p className="text-red-800 leading-relaxed">
          මූලාකෘති පරීක්ෂණයේදී සිදුකළ සංස්කරණයන් ඉවත් කර, නිල METH TV ආරම්භක වැඩසටහන් සහ ඡායාරූප ගැලරි දත්ත නැවත ලබා ගැනීමට මෙම විකල්පය භාවිතා කරන්න.
        </p>
        <button
          type="button"
          onClick={() => setIsResetConfirmOpen(true)}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors"
        >
          සියලු දත්ත නැවත සකසන්න
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-base font-bold text-stone-900 font-sinhala-serif">
                සියලු දත්ත නැවත සකසනවාද?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                ඔබ විසින් ඇතුළත් කළ සියලු නව වැඩසටහන් සහ ඡායාරූප ඉවත් වී මූලික නිදර්ශන දත්ත ප්‍රතිස්ථාපනය වනු ඇත.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium"
              >
                අවලංගු කරන්න
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                ඔව්, ප්‍රතිස්ථාපනය කරන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
