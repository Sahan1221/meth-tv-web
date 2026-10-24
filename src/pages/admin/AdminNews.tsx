import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  X, 
  Check, 
  AlertTriangle,
  Upload,
  FileText
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';
import { NewsArticle, PublicationStatus } from '../../types';

export const AdminNews: React.FC = () => {
  const { news, refreshData } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPub, setFilterPub] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>('published');

  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setTitle('');
    setSummary('');
    setContent('');
    setCoverImage('/src/assets/images/hero_dhamma_broadcast_1791621278068.jpg');
    setPublicationDate(new Date().toISOString().split('T')[0]);
    setEventDate('');
    setPublicationStatus('published');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setSummary(article.summary);
    setContent(article.content);
    setCoverImage(article.coverImage);
    setPublicationDate(article.publicationDate);
    setEventDate(article.eventDate || '');
    setPublicationStatus(article.publicationStatus);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, coverImage: 'කරුණාකර ඡායාරූප ගොනුවක් පමණක් තෝරන්න.' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'පුවත් මාතෘකාව ඇතුළත් කිරීම අනිවාර්ය වේ.';
    if (!summary.trim()) errs.summary = 'සංක්ෂිප්ත සාරාංශය ඇතුළත් කිරීම අනිවාර්ය වේ.';
    if (!content.trim()) errs.content = 'පුවතේ සම්පූර්ණ අන්තර්ගතය ඇතුළත් කිරීම අනිවාර්ය වේ.';
    if (!publicationDate) errs.publicationDate = 'ප්‍රකාශිත දිනය තෝරන්න.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingArticle) {
      contentRepo.updateNews(editingArticle.id, {
        title,
        summary,
        content,
        coverImage,
        publicationDate,
        eventDate: eventDate || undefined,
        publicationStatus,
      });
      setSuccessToast('පුවත සාර්ථකව යාවත්කාලීන කරන ලදී.');
    } else {
      contentRepo.createNews({
        title,
        summary,
        content,
        coverImage,
        publicationDate,
        eventDate: eventDate || undefined,
        publicationStatus,
      });
      setSuccessToast('නව පුවත සාර්ථකව නිර්මාණය කරන ලදී.');
    }

    refreshData();
    setIsModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDelete = () => {
    if (!articleToDelete) return;
    contentRepo.deleteNews(articleToDelete.id);
    refreshData();
    setArticleToDelete(null);
    setSuccessToast('පුවත සාර්ථකව මකා දමන ලදී.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleTogglePublication = (art: NewsArticle) => {
    contentRepo.toggleNewsPublication(art.id);
    refreshData();
  };

  const filteredNews = news.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPub = filterPub === 'all' || n.publicationStatus === filterPub;
    return matchesSearch && matchesPub;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-sinhala-serif">
            පුවත් සහ නිවේදන කළමනාකරණය
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            මෙත් රූපවාහිනී නාලිකාවේ විශේෂ නිවේදන සහ ශාසනික පුවත් පළ කිරීම
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#801426] hover:bg-[#68101e] text-white rounded-xl text-xs font-semibold shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>නව පුවතක් එක් කරන්න (Add News)</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="පුවත් මාතෘකාව හෝ විස්තර සොයන්න..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] focus:bg-white"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={filterPub}
            onChange={(e) => setFilterPub(e.target.value)}
            className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-700"
          >
            <option value="all">සියලු ප්‍රකාශන තත්ත්ව</option>
            <option value="published">ප්‍රකාශිතයි (Published)</option>
            <option value="draft">කෙටුම්පතක් (Draft)</option>
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">පුවත / නිවේදනය</th>
                <th className="py-3.5 px-4">ප්‍රකාශිත දිනය</th>
                <th className="py-3.5 px-4">ප්‍රකාශන තත්ත්වය</th>
                <th className="py-3.5 px-4 text-right">ක්‍රියාමාර්ග</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-stone-500">
                    පුවත් කිසිවක් හමු නොවීය.
                  </td>
                </tr>
              ) : (
                filteredNews.map((art) => (
                  <tr key={art.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {art.coverImage && (
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-12 h-9 rounded object-cover border border-stone-200 shrink-0"
                          />
                        )}
                        <div className="max-w-md">
                          <div className="font-semibold text-stone-900 font-sinhala-serif truncate">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">
                            {art.summary}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-stone-600">
                      {art.publicationDate}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublication(art)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                          art.publicationStatus === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                        }`}
                        title="ප්‍රකාශන තත්ත්වය වෙනස් කරන්න"
                      >
                        {art.publicationStatus === 'published' ? 'ප්‍රකාශිතයි' : 'කෙටුම්පතක්'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 text-stone-500 hover:text-[#801426] hover:bg-stone-100 rounded-lg transition-colors"
                          title="සංස්කරණය කරන්න"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setArticleToDelete(art)}
                          className="p-1.5 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="මකා දමන්න"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* News Create/Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#6B1724] font-sinhala-serif">
                {editingArticle ? 'පුවත සංස්කරණය කරන්න' : 'නව පුවතක් හෝ නිවේදනයක් පළ කරන්න'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-stone-700">
                  පුවත් මාතෘකාව <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="උදා: මෙත් රූපවාහිනිය PEO TV Channel 111 ඔස්සේ විකාශය වේ"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-900"
                />
                {errors.title && <p className="text-[11px] text-red-600">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-stone-700">
                    ප්‍රකාශිත දිනය <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-800"
                  />
                  {errors.publicationDate && <p className="text-[11px] text-red-600">{errors.publicationDate}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700">
                    විකල්ප උත්සව දිනය (Event Date)
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700">
                  සංක්ෂිප්ත සාරාංශය (Summary) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="මුල් පිටුවේ සහ ලැයිස්තුවේ පෙන්වන කෙටි සටහන..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-800"
                />
                {errors.summary && <p className="text-[11px] text-red-600">{errors.summary}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700">
                  සම්පූර්ණ පුවත (Full Content) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="පුවත හෝ නිවේදනය පිළිබඳ සම්පූර්ණ විස්තරය..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#801426] text-stone-800"
                />
                {errors.content && <p className="text-[11px] text-red-600">{errors.content}</p>}
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="font-medium text-stone-700">ආවරණ ඡායාරූපය</label>
                <div className="flex items-center gap-4">
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-16 h-12 rounded object-cover border border-stone-300 shrink-0"
                    />
                  )}
                  <label className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ඡායාරූපයක් තෝරන්න</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Publication Status */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-700">ප්‍රකාශන තත්ත්වය:</span>
                  <select
                    value={publicationStatus}
                    onChange={(e) => setPublicationStatus(e.target.value as PublicationStatus)}
                    className="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-lg font-medium text-stone-800"
                  >
                    <option value="published">ප්‍රකාශයට පත් කරන්න (Published)</option>
                    <option value="draft">කෙටුම්පතක් ලෙස සුරකින්න (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#801426] hover:bg-[#68101e] text-white rounded-lg font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingArticle ? 'වෙනස්කම් සුරකින්න' : 'පුවත පළ කරන්න'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
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
                මෙම පුවත මකා දැමීමට සහතිකද?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                "<strong>{articleToDelete.title}</strong>" පුවත පද්ධතියෙන් ඉවත් කරනු ලැබේ.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium"
              >
                අවලංගු කරන්න
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
              >
                ඔව්, මකා දමන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
