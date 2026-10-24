import React, { useState } from 'react';
import { Calendar, Search, ArrowRight, X, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const { publishedNews } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const filteredNews = publishedNews.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#EFE6E4] pb-6">
        <div className="text-xs font-bold uppercase text-[#9C1C24] tracking-wider font-sans mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#E87928]" />
          <span>පුවත් සහ ආගමික නිවේදන (News & Announcements)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#650F18] font-sinhala-serif">
          මෙත් රූපවාහිනී පුවත් සඟරාව
        </h1>
        <p className="text-sm text-[#2B2526] mt-2 max-w-3xl leading-relaxed">
          මෙත් රූපවාහිනී නාලිකාවේ ඉදිරි වැඩසටහන්, සම්ප්‍රේෂණ තොරතුරු සහ විශේෂ ශාසනික නිවේදන.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="පුවත් මාතෘකාව හෝ විස්තර සොයන්න..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
        />
      </div>

      {/* Articles Grid */}
      <div>
        <div className="text-xs text-stone-500 mb-4">
          පුවත් <span className="font-bold text-[#650F18]">{filteredNews.length}</span> ක් හමුවිය
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE6E4] p-8">
            <p className="text-xs text-stone-500">පුවත් කිසිවක් හමු නොවීය.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE6E4] shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              >
                {article.coverImage && (
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-[#9C1C24]" />
                      <span>{article.publicationDate}</span>
                      {article.eventDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#9C1C24] font-semibold">උත්සව දිනය: {article.eventDate}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#650F18] group-hover:text-[#9C1C24] transition-colors leading-snug font-sinhala-serif">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2B2526] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                    <span className="text-[#9C1C24] font-bold flex items-center gap-1 group-hover:underline">
                      <span>සම්පූර්ණ පුවත කියවන්න</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EFE6E4]">
            {activeArticle.coverImage && (
              <div className="relative h-64 sm:h-80 bg-stone-900">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                  aria-label="වසන්න"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between text-xs text-stone-500 border-b border-[#EFE6E4] pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#9C1C24]" />
                  <span>ප්‍රකාශිත දිනය: {activeArticle.publicationDate}</span>
                </div>
                {!activeArticle.coverImage && (
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif leading-snug">
                {activeArticle.title}
              </h2>

              <div className="text-sm font-medium text-[#650F18] bg-[#FDF4F5] p-4 rounded-2xl border border-[#EFCED1] leading-relaxed font-sans">
                {activeArticle.summary}
              </div>

              <div className="text-sm text-[#2B2526] leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-[#EFE6E4] flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 bg-[#FAF7F5] hover:bg-[#FDF4F5] text-[#650F18] border border-[#EFE6E4] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  වසන්න (Close)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
