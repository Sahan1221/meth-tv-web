import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  X, 
  Check, 
  AlertTriangle,
  Upload,
  Globe,
  FileCheck
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';
import { Program, ProgramCategory, ProgramStatus, PublicationStatus } from '../../types';

export const AdminPrograms: React.FC = () => {
  const { programs, refreshData } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPublication, setFilterPublication] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProgramCategory>('ධර්ම දේශනා');
  const [coverImage, setCoverImage] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [venue, setVenue] = useState('');
  const [status, setStatus] = useState<ProgramStatus>('upcoming');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>('published');

  // Delete Confirm Modal
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const categories: ProgramCategory[] = [
    'ධර්ම දේශනා',
    'භාවනා වැඩසටහන්',
    'ධර්ම සාකච්ඡා',
    'විශේෂ පෝය විකාශ',
    'පිරිත් දේශනා',
    'ළමා හා යොවුන් වැඩසටහන්',
  ];

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setTitle('');
    setDescription('');
    setCategory('ධර්ම දේශනා');
    setCoverImage('/assets/images/program_dhamma_discussion_1791621325599.jpg');
    setDate(new Date().toISOString().split('T')[0]);
    setStartTime('ප.ව. 07:00');
    setVenue('මෙත් රූපවාහිනී ප්‍රධාන මැදිරිය');
    setStatus('upcoming');
    setYoutubeUrl('');
    setIsFeatured(false);
    setPublicationStatus('published');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prog: Program) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setDescription(prog.description);
    setCategory(prog.category);
    setCoverImage(prog.coverImage);
    setDate(prog.date);
    setStartTime(prog.startTime);
    setVenue(prog.venue);
    setStatus(prog.status);
    setYoutubeUrl(prog.youtubeUrl || '');
    setIsFeatured(prog.isFeatured);
    setPublicationStatus(prog.publicationStatus);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'වැඩසටහන් මාතෘකාව අනිවාර්යයි.';
    if (!description.trim()) errs.description = 'විස්තරය අනිවාර්යයි.';
    if (!date) errs.date = 'දිනය අනිවාර්යයි.';
    if (!startTime.trim()) errs.startTime = 'වේලාව අනිවාර්යයි.';
    if (!venue.trim()) errs.venue = 'ස්ථානය අනිවාර්යයි.';
    if (!coverImage) errs.coverImage = 'මුල් ඡායාරූපය අනිවාර්යයි.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingProgram) {
      contentRepo.updateProgram(editingProgram.id, {
        title,
        description,
        category,
        coverImage,
        date,
        startTime,
        venue,
        status,
        youtubeUrl: youtubeUrl.trim() || undefined,
        isFeatured,
        publicationStatus,
      });
      setSuccessToast('වැඩසටහන සාර්ථකව යාවත්කාලීන කරන ලදී.');
    } else {
      contentRepo.createProgram({
        title,
        description,
        category,
        coverImage,
        date,
        startTime,
        venue,
        status,
        youtubeUrl: youtubeUrl.trim() || undefined,
        isFeatured,
        publicationStatus,
      });
      setSuccessToast('නව වැඩසටහන සාර්ථකව එක් කරන ලදී.');
    }

    refreshData();
    setIsModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDelete = () => {
    if (!programToDelete) return;
    contentRepo.deleteProgram(programToDelete.id);
    refreshData();
    setProgramToDelete(null);
    setSuccessToast('වැඩසටහන සාර්ථකව මකා දමන ලදී.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleTogglePublish = (prog: Program) => {
    contentRepo.toggleProgramPublication(prog.id);
    refreshData();
  };

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesPub = filterPublication === 'all' || p.publicationStatus === filterPublication;
    return matchesSearch && matchesCat && matchesPub;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#16466D] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-[#B8DDF8]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif">
            වැඩසටහන් කළමනාකරණය
          </h1>
          <p className="text-xs text-[#2B2526] mt-1">
            මෙත් රූපවාහිනී වැඩසටහන් එක් කිරීම, සංස්කරණය සහ ප්‍රකාශනය
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold shadow-xs transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>වැඩසටහනක් එක් කරන්න</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="වැඩසටහන් නම හෝ ස්ථානය සොයන්න..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526]"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#650F18] font-medium"
          >
            <option value="all">සියලු කාණ්ඩ</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={filterPublication}
            onChange={(e) => setFilterPublication(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#650F18] font-medium"
          >
            <option value="all">සියලු ප්‍රකාශන තත්ත්ව</option>
            <option value="published">ප්‍රකාශිතයි (Published)</option>
            <option value="draft">කෙටුම්පතක් (Draft)</option>
          </select>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F5] border-b border-[#EFE6E4] text-[#650F18] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">වැඩසටහන</th>
                <th className="py-3.5 px-4">කාණ්ඩය</th>
                <th className="py-3.5 px-4">දිනය හා වේලාව</th>
                <th className="py-3.5 px-4">ස්ථානය</th>
                <th className="py-3.5 px-4">තත්ත්වය</th>
                <th className="py-3.5 px-4">ප්‍රකාශනය</th>
                <th className="py-3.5 px-4 text-right">ක්‍රියාමාර්ග</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6E4]">
              {filteredPrograms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    වැඩසටහන් කිසිවක් හමු නොවීය.
                  </td>
                </tr>
              ) : (
                filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prog.coverImage || '/assets/images/program_dhamma_discussion_1791621325599.jpg'}
                          alt={prog.title}
                          className="w-12 h-9 rounded-lg object-cover border border-[#EFE6E4] shrink-0"
                        />
                        <div className="max-w-xs">
                          <div className="font-semibold text-[#650F18] font-sinhala-serif truncate">
                            {prog.title}
                          </div>
                          {prog.isFeatured && (
                            <span className="text-[10px] text-[#9C1C24] font-semibold">
                              ★ ප්‍රමුඛ වැඩසටහනක්
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#2B2526] font-medium">
                      {prog.category}
                    </td>

                    <td className="py-3 px-4 text-[#2B2526]">
                      <div>{prog.date}</div>
                      <div className="text-[11px] text-stone-400">{prog.startTime}</div>
                    </td>

                    <td className="py-3 px-4 text-stone-600 truncate max-w-[150px]">
                      {prog.venue}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        prog.status === 'upcoming' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : prog.status === 'completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {prog.status === 'upcoming' ? 'ඉදිරියට' : prog.status === 'completed' ? 'අවසන් වූ' : 'අවලංගුයි'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(prog)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          prog.publicationStatus === 'published'
                            ? 'bg-[#FDF4F5] text-[#650F18] border border-[#EFCED1] hover:bg-[#EFCED1]'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title="ප්‍රකාශන තත්ත්වය වෙනස් කරන්න"
                      >
                        {prog.publicationStatus === 'published' ? 'ප්‍රකාශිතයි' : 'කෙටුම්පතක්'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(prog)}
                          className="p-1.5 text-stone-500 hover:text-[#9C1C24] hover:bg-[#FDF4F5] rounded-lg transition-colors"
                          title="සංස්කරණය කරන්න"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProgramToDelete(prog)}
                          className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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

      {/* Program Create/Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D7E5EF]">
            <div className="p-6 border-b border-[#D7E5EF] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#16466D] font-sinhala-serif">
                {editingProgram ? 'වැඩසටහන සංස්කරණය කරන්න' : 'නව වැඩසටහනක් එක් කරන්න'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-semibold text-[#16466D]">
                  වැඩසටහන් මාතෘකාව (Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="උදා: සදහම් සිසිල - උතුම් සද්ධර්ම දේශනාව"
                  className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] focus:bg-white text-[#263746]"
                />
                {errors.title && <p className="text-[11px] text-red-600">{errors.title}</p>}
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">කාණ්ඩය (Category)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProgramCategory)}
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#16466D] font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">තත්ත්වය (Status)</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProgramStatus)}
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#16466D] font-medium"
                  >
                    <option value="upcoming">ඉදිරියට (Upcoming)</option>
                    <option value="completed">අවසන් වූ (Completed)</option>
                    <option value="cancelled">අවලංගු කරන ලද (Cancelled)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">
                    දිනය (Date) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                  />
                  {errors.date && <p className="text-[11px] text-red-600">{errors.date}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">
                    වේලාව (Time) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="උදා: ප.ව. 07:00"
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                  />
                  {errors.startTime && <p className="text-[11px] text-red-600">{errors.startTime}</p>}
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-1">
                <label className="font-semibold text-[#16466D]">
                  ස්ථානය හෝ මැදිරිය (Venue) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="උදා: මෙත් රූපවාහිනී ප්‍රධාන මැදිරිය / අනුරාධපුරය"
                  className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                />
                {errors.venue && <p className="text-[11px] text-red-600">{errors.venue}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-semibold text-[#16466D]">
                  සම්පූර්ණ විස්තරය (Description) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="වැඩසටහන පිළිබඳ සවිස්තරාත්මක සටහන..."
                  className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                />
                {errors.description && <p className="text-[11px] text-red-600">{errors.description}</p>}
              </div>

              {/* Cover Image Upload / Selection */}
              <div className="space-y-2">
                <label className="font-semibold text-[#16466D] flex items-center justify-between">
                  <span>මුල් ඡායාරූපය (Cover Image)</span>
                  <span className="text-stone-400 text-[10px]">JPEG, PNG, WebP</span>
                </label>
                <div className="flex items-center gap-4">
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt="Preview"
                      className="w-16 h-12 rounded-xl object-cover border border-[#D7E5EF] shrink-0"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-[#F3F8FC] hover:bg-[#D9EEFF] text-[#16466D] border border-[#D7E5EF] rounded-xl cursor-pointer transition-colors font-semibold">
                    <Upload className="w-3.5 h-3.5 text-[#2878B8]" />
                    <span>ඡායාරූපයක් උඩුගත කරන්න</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.coverImage && <p className="text-[11px] text-red-600">{errors.coverImage}</p>}
              </div>

              {/* YouTube Link */}
              <div className="space-y-1">
                <label className="font-semibold text-[#16466D]">
                  විකල්ප YouTube සබැඳිය (Optional Video URL)
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] font-mono text-[#263746]"
                />
              </div>

              {/* Featured & Publication Status */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#D7E5EF]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#2878B8] rounded border-[#D7E5EF]"
                  />
                  <span className="font-semibold text-[#16466D]">මුල් පිටුවේ විශේෂාංගයක් ලෙස පෙන්වන්න (Featured)</span>
                </label>

                <div className="flex items-center gap-3">
                  <span className="text-[#263746] font-medium">ප්‍රකාශන තත්ත්වය:</span>
                  <select
                    value={publicationStatus}
                    onChange={(e) => setPublicationStatus(e.target.value as PublicationStatus)}
                    className="px-3 py-1.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl font-semibold text-[#16466D]"
                  >
                    <option value="published">ප්‍රකාශයට පත් කරන්න (Published)</option>
                    <option value="draft">කෙටුම්පතක් ලෙස සුරකින්න (Draft)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#D7E5EF] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2878B8] hover:bg-[#1E6096] text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProgram ? 'වෙනස්කම් සුරකින්න' : 'වැඩසටහන එක් කරන්න'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {programToDelete && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D7E5EF] space-y-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-base font-bold text-[#16466D] font-sinhala-serif">
                මෙම වැඩසටහන මකා දැමීමට සහතිකද?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                "<strong>{programToDelete.title}</strong>" වැඩසටහන පද්ධතියෙන් ස්ථිරවම ඉවත් කරනු ලැබේ.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setProgramToDelete(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium"
              >
                නැත, අවලංගු කරන්න
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold"
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
