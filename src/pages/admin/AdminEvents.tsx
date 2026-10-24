import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Upload, 
  X, 
  Check, 
  AlertTriangle, 
  ExternalLink, 
  ArrowUp, 
  ArrowDown,
  Layers
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';
import { DhammaEvent, EventPhoto, PublicationStatus } from '../../types';

interface AdminEventsProps {
  onViewPublicEvent?: (eventId: string) => void;
}

export const AdminEvents: React.FC<AdminEventsProps> = ({ onViewPublicEvent }) => {
  const { events, refreshData } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPub, setFilterPub] = useState('all');

  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DhammaEvent | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [publicationStatus, setPublicationStatus] = useState<PublicationStatus>('published');
  const [photosList, setPhotosList] = useState<Array<{ id?: string; imageUrl: string; caption: string; altText: string; displayOrder: number }>>([]);

  // Delete Confirmations
  const [eventToDelete, setEventToDelete] = useState<DhammaEvent | null>(null);

  // Validation & Toasts
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setEventDate(new Date().toISOString().split('T')[0]);
    setVenue('මෙත් සෙවන බෞද්ධ මධ්‍යස්ථානය');
    setCoverImage('/src/assets/images/event_kathina_ceremony_1791621311155.jpg');
    setPublicationStatus('published');
    setPhotosList([]);
    setErrors({});
    setIsEventModalOpen(true);
  };

  const handleOpenEdit = (event: DhammaEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.eventDate);
    setVenue(event.venue);
    setCoverImage(event.coverImage);
    setPublicationStatus(event.publicationStatus);
    setPhotosList(
      (event.photos || []).map((p) => ({
        id: p.id,
        imageUrl: p.imageUrl,
        caption: p.caption || '',
        altText: p.altText || '',
        displayOrder: p.displayOrder,
      }))
    );
    setErrors({});
    setIsEventModalOpen(true);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultiPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentLen = photosList.length;
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotosList((prev) => [
            ...prev,
            {
              imageUrl: reader.result as string,
              caption: '',
              altText: title || 'METH TV Event Photograph',
              displayOrder: currentLen + index + 1,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCaptionChange = (index: number, val: string) => {
    setPhotosList((prev) => {
      const updated = [...prev];
      updated[index].caption = val;
      return updated;
    });
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photosList.length) return;

    setPhotosList((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    });
  };

  const handleRemovePhoto = (index: number) => {
    setPhotosList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'පුණ්‍යකර්ම මාතෘකාව අනිවාර්යයි.';
    if (!description.trim()) errs.description = 'විස්තරය අනිවාර්යයි.';
    if (!eventDate) errs.eventDate = 'දිනය අනිවාර්යයි.';
    if (!venue.trim()) errs.venue = 'ස්ථානය අනිවාර්යයි.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalCover = coverImage || photosList[0]?.imageUrl || '/src/assets/images/event_kathina_ceremony_1791621311155.jpg';

    if (editingEvent) {
      const updatedPhotos = photosList.map((p, idx) => ({
        id: p.id || `photo-${Date.now()}-${idx}`,
        eventId: editingEvent.id,
        imageUrl: p.imageUrl,
        caption: p.caption,
        altText: p.altText || title,
        displayOrder: idx + 1,
        uploadedAt: new Date().toISOString(),
      }));

      contentRepo.updateEvent(editingEvent.id, {
        title,
        description,
        eventDate,
        venue,
        coverImage: finalCover,
        publicationStatus,
        photos: updatedPhotos,
      });

      setSuccessToast('පුණ්‍යකර්ම ගැලරිය සාර්ථකව යාවත්කාලීන කරන ලදී.');
    } else {
      contentRepo.createEvent(
        {
          title,
          description,
          eventDate,
          venue,
          coverImage: finalCover,
          publicationStatus,
        },
        photosList.map((p, idx) => ({
          imageUrl: p.imageUrl,
          caption: p.caption,
          altText: p.altText || title,
          displayOrder: idx + 1,
        }))
      );
      setSuccessToast('නව පුණ්‍යකර්ම ගැලරිය සාර්ථකව නිර්මාණය කරන ලදී.');
    }

    refreshData();
    setIsEventModalOpen(false);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDeleteEvent = () => {
    if (!eventToDelete) return;
    contentRepo.deleteEvent(eventToDelete.id);
    refreshData();
    setEventToDelete(null);
    setSuccessToast('පුණ්‍යකර්ම ගැලරිය සාර්ථකව මකා දමන ලදී.');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleTogglePublication = (ev: DhammaEvent) => {
    contentRepo.toggleEventPublication(ev.id);
    refreshData();
  };

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPub = filterPub === 'all' || ev.publicationStatus === filterPub;
    return matchesSearch && matchesPub;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#650F18] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <Check className="w-4 h-4 text-[#F5C518]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#650F18] font-sinhala-serif">
            පුණ්‍යකර්ම හා ඡායාරූප ගැලරි කළමනාකරණය
          </h1>
          <p className="text-xs text-[#2B2526] mt-1">
            අවසන් වූ ආගමික උත්සව, කඨින පිංකම් සහ පෝය දින වැඩසටහන්හි ඡායාරූප ගැලරි මෙහෙයවීම
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold shadow-xs transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>නව ගැලරියක් එක් කරන්න</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="පුණ්‍යකර්ම නම හෝ ස්ථානය සොයන්න..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526]"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={filterPub}
            onChange={(e) => setFilterPub(e.target.value)}
            className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#650F18] font-medium"
          >
            <option value="all">සියලු ප්‍රකාශන තත්ත්ව</option>
            <option value="published">ප්‍රකාශිතයි (Published)</option>
            <option value="draft">කෙටුම්පතක් (Draft)</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F5] border-b border-[#EFE6E4] text-[#650F18] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">පුණ්‍යකර්මය හා ගැලරිය</th>
                <th className="py-3.5 px-4">දිනය</th>
                <th className="py-3.5 px-4">ස්ථානය</th>
                <th className="py-3.5 px-4">ඡායාරූප ගණන</th>
                <th className="py-3.5 px-4">ප්‍රකාශනය</th>
                <th className="py-3.5 px-4 text-right">ක්‍රියාමාර්ග</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6E4]">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    පුණ්‍යකර්ම කිසිවක් හමු නොවීය.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ev.coverImage || '/src/assets/images/event_kathina_ceremony_1791621311155.jpg'}
                          alt={ev.title}
                          className="w-12 h-9 rounded-lg object-cover border border-[#EFE6E4] shrink-0"
                        />
                        <div className="max-w-xs">
                          <div className="font-semibold text-[#650F18] font-sinhala-serif truncate">
                            {ev.title}
                          </div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">
                            {ev.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#2B2526]">
                      {ev.eventDate}
                    </td>

                    <td className="py-3 px-4 text-stone-600 truncate max-w-[150px]">
                      {ev.venue}
                    </td>

                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FDF4F5] border border-[#EFCED1] text-[#650F18] font-bold text-[11px]">
                        <ImageIcon className="w-3.5 h-3.5 text-[#9C1C24]" />
                        <span>{ev.photos?.length || 0} ඡායාරූප</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublication(ev)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                          ev.publicationStatus === 'published'
                            ? 'bg-[#FDF4F5] text-[#650F18] border border-[#EFCED1] hover:bg-[#EFCED1]'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title="ප්‍රකාශන තත්ත්වය වෙනස් කරන්න"
                      >
                        {ev.publicationStatus === 'published' ? 'ප්‍රකාශිතයි' : 'කෙටුම්පතක්'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onViewPublicEvent && (
                          <button
                            onClick={() => onViewPublicEvent(ev.id)}
                            className="p-1.5 text-stone-500 hover:text-[#9C1C24] hover:bg-[#FDF4F5] rounded-lg transition-colors"
                            title="ප්‍රසිද්ධ ගැලරිය නරඹන්න"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          className="p-1.5 text-stone-500 hover:text-[#9C1C24] hover:bg-[#FDF4F5] rounded-lg transition-colors"
                          title="සංස්කරණය සහ ඡායාරූප එකතු කරන්න"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEventToDelete(ev)}
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

      {/* Event & Multi-Photo Management Modal */}
      {isEventModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#D7E5EF]">
            <div className="p-6 border-b border-[#D7E5EF] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-[#16466D] font-sinhala-serif">
                  {editingEvent ? 'පුණ්‍යකර්ම ගැලරිය සංස්කරණය' : 'නව පුණ්‍යකර්ම ගැලරියක් නිර්මාණය කිරීම'}
                </h2>
                <p className="text-xs text-stone-500">
                  තොරතුරු ඇතුළත් කර ඡායාරූප සමූහයක් එකවර උඩුගත කරන්න
                </p>
              </div>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-6 text-xs">
              {/* Event Details Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#16466D] font-sinhala-serif border-b border-[#D7E5EF] pb-2">
                  1. පුණ්‍යකර්මයේ මූලික තොරතුරු
                </h3>

                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">
                    පුණ්‍යකර්ම මාතෘකාව (Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="උදා: වාර්ෂික කඨින මහා පිංකම හෝ පොහෝ දින සීල සමාදානය"
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                  />
                  {errors.title && <p className="text-[11px] text-red-600">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#16466D]">
                      දිනය (Date) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                    />
                    {errors.eventDate && <p className="text-[11px] text-red-600">{errors.eventDate}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-[#16466D]">
                      ස්ථානය (Venue) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="උදා: මෙත් සෙවන බෞද්ධ මධ්‍යස්ථානය, කළුතර"
                      className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                    />
                    {errors.venue && <p className="text-[11px] text-red-600">{errors.venue}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#16466D]">
                    විස්තරය (Description) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="පුණ්‍යකර්මයේ වැදගත්කම සහ පැවැති අයුරු විස්තර කරන්න..."
                    className="w-full px-3.5 py-2.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2878B8] text-[#263746]"
                  />
                  {errors.description && <p className="text-[11px] text-red-600">{errors.description}</p>}
                </div>

                {/* Cover Photo */}
                <div className="space-y-2">
                  <label className="font-semibold text-[#16466D]">
                    ප්‍රධාන ආවරණ ඡායාරූපය (Cover Photo)
                  </label>
                  <div className="flex items-center gap-4">
                    {coverImage && (
                      <img
                        src={coverImage}
                        alt="Cover Preview"
                        className="w-20 h-14 rounded-xl object-cover border border-[#D7E5EF] shrink-0"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-[#F3F8FC] hover:bg-[#D9EEFF] text-[#16466D] border border-[#D7E5EF] rounded-xl cursor-pointer transition-colors font-semibold">
                      <Upload className="w-3.5 h-3.5 text-[#2878B8]" />
                      <span>ආවරණ ඡායාරූපයක් තෝරන්න</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Multi-Photo Upload Section */}
              <div className="space-y-4 pt-4 border-t border-[#D7E5EF]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D7E5EF] pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#16466D] font-sinhala-serif flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#2878B8]" />
                      <span>2. ගැලරියේ ඡායාරූප කළමනාකරණය ({photosList.length})</span>
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      ඡායාරූප කිහිපයක් එකවර තෝරා උඩුගත කරන්න. පිලිවෙල වෙනස් කිරීමට ඊතල භාවිතා කරන්න.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 px-4 py-2 bg-[#2878B8] hover:bg-[#1E6096] text-white rounded-xl cursor-pointer transition-colors shrink-0 font-bold shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-[#D9EEFF]" />
                    <span>ඡායාරූප උඩුගත කරන්න (Multi-Upload)</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultiPhotosUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Uploaded Photos Grid with Reordering & Captions */}
                {photosList.length === 0 ? (
                  <div className="p-8 text-center bg-[#F3F8FC] rounded-2xl border border-dashed border-[#D7E5EF] space-y-2">
                    <ImageIcon className="w-8 h-8 text-stone-400 mx-auto" />
                    <div className="font-semibold text-[#16466D]">තවමත් ඡායාරූප උඩුගත කර නොමැත</div>
                    <div className="text-[11px] text-stone-500">
                      ඉහත "ඡායාරූප උඩුගත කරන්න" බොත්තම ඔබා ඡායාරූප කිහිපයක් එකවර තෝරන්න.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {photosList.map((photo, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2.5 bg-[#F3F8FC] rounded-xl border border-[#D7E5EF]"
                      >
                        <div className="text-[11px] font-mono text-stone-400 w-5 text-center">
                          {index + 1}
                        </div>

                        <img
                          src={photo.imageUrl}
                          alt="Thumbnail"
                          className="w-14 h-11 rounded-lg object-cover border border-[#D7E5EF] shrink-0"
                        />

                        {/* Caption input */}
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) => handleCaptionChange(index, e.target.value)}
                            placeholder="මෙම ඡායාරූපය සඳහා සිරස්තලය / විස්තරය (Caption)..."
                            className="w-full px-2.5 py-1.5 bg-white border border-[#D7E5EF] rounded-lg text-xs text-[#263746] focus:outline-none focus:ring-1 focus:ring-[#2878B8]"
                          />
                        </div>

                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMovePhoto(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-stone-500 hover:text-[#16466D] disabled:opacity-30"
                            title="ඉහළට ගෙන යන්න"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePhoto(index, 'down')}
                            disabled={index === photosList.length - 1}
                            className="p-1 text-stone-500 hover:text-[#16466D] disabled:opacity-30"
                            title="පහළට ගෙන යන්න"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="p-1 text-rose-500 hover:text-rose-700"
                            title="ඉවත් කරන්න"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Publication Status & Action Buttons */}
              <div className="pt-4 border-t border-[#D7E5EF] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#263746]">ප්‍රකාශන තත්ත්වය:</span>
                  <select
                    value={publicationStatus}
                    onChange={(e) => setPublicationStatus(e.target.value as PublicationStatus)}
                    className="px-3 py-1.5 bg-[#F3F8FC] border border-[#D7E5EF] rounded-xl text-[#16466D] font-semibold"
                  >
                    <option value="published">ප්‍රකාශයට පත් කරන්න (Published)</option>
                    <option value="draft">කෙටුම්පතක් ලෙස සුරකින්න (Draft)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEventModalOpen(false)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium"
                  >
                    අවලංගු කරන්න
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2878B8] hover:bg-[#1E6096] text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingEvent ? 'වෙනස්කම් සුරකින්න' : 'ගැලරිය සුරකින්න'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
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
                මෙම පුණ්‍යකර්ම ගැලරිය මකා දැමීමට සහතිකද?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                "<strong>{eventToDelete.title}</strong>" සහ එහි ඇතුළත් සියලුම ඡායාරූප පද්ධතියෙන් ස්ථිරවම ඉවත් කෙරේ.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setEventToDelete(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium"
              >
                නැත, අවලංගු කරන්න
              </button>
              <button
                onClick={handleDeleteEvent}
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
