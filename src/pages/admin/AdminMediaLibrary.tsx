import React, { useState } from 'react';
import { FolderOpen, Search, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { contentRepo } from '../../services/contentRepository';

export const AdminMediaLibrary: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mediaList = contentRepo.getAllMedia();

  const filtered = mediaList.filter((m) => {
    return (
      m.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sourceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.caption && m.caption.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleCopyUrl = (url: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-sinhala-serif">
            මාධ්‍ය පුස්තකාලය (Media Library)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            වැඩසටහන්, පුණ්‍යකර්ම ගැලරි සහ පුවත් සඳහා උඩුගත කරන ලද සියලුම ඡායාරූප
          </p>
        </div>

        <div className="text-xs font-medium text-stone-600 bg-stone-100 px-3.5 py-1.5 rounded-lg shrink-0">
          මුළු මාධ්‍ය ගොනු: <span className="font-bold text-stone-900 font-mono">{mediaList.length}</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ඡායාරූප විස්තරය හෝ මූලාශ්‍රය සොයන්න..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] focus:bg-white"
        />
      </div>

      {/* Media Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-2">
          <ImageIcon className="w-8 h-8 text-stone-400 mx-auto" />
          <div className="text-sm font-semibold text-stone-800">මාධ්‍ය ගොනු කිසිවක් හමු නොවීය</div>
          <div className="text-xs text-stone-500">සෙවුම් පදය වෙනස් කර නැවත උත්සාහ කරන්න.</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col group text-xs"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  {item.sourceType === 'event' ? 'පුණ්‍යකර්ම' : item.sourceType === 'program' ? 'වැඩසටහන්' : 'පුවත්'}
                </span>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900 truncate" title={item.altText}>
                    {item.altText}
                  </div>
                  <div className="text-[10px] text-stone-500 truncate" title={item.sourceTitle}>
                    {item.sourceTitle}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleCopyUrl(item.imageUrl, item.id)}
                    className="p-1 text-stone-500 hover:text-[#801426] transition-colors"
                    title="සබැඳිය පිටපත් කරන්න"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
