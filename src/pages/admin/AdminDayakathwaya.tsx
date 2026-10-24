import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit, 
  Trash2, 
  X, 
  Plus, 
  Layers, 
  Copy, 
  Check, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  History,
  Send
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';
import { 
  DayakathwayaRequest, 
  SponsorshipRequestStatus, 
  PaymentStatus, 
  DayakathwayaOpportunity, 
  DayakathwayaCategory,
  OpportunityAvailability
} from '../../types';

export const AdminDayakathwaya: React.FC = () => {
  const { 
    dayakathwayaRequests, 
    dayakathwayaOpportunities, 
    dayakathwayaCategories, 
    refreshData 
  } = useContent();

  const [activeTab, setActiveTab] = useState<'requests' | 'opportunities' | 'categories'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Request Detail / Status Update Modal
  const [selectedRequest, setSelectedRequest] = useState<DayakathwayaRequest | null>(null);
  const [editStatus, setEditStatus] = useState<SponsorshipRequestStatus>('නව ඉල්ලීම');
  const [statusNote, setStatusNote] = useState('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('නොගෙවූ');
  const [editAgreedAmount, setEditAgreedAmount] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Opportunity Modal
  const [showOppModal, setShowOppModal] = useState(false);
  const [editingOppId, setEditingOppId] = useState<string | null>(null);
  const [oppTitle, setOppTitle] = useState('');
  const [oppDesc, setOppDesc] = useState('');
  const [oppCategory, setOppCategory] = useState(dayakathwayaCategories[0]?.id || '');
  const [oppDate, setOppDate] = useState('');
  const [oppVenue, setOppVenue] = useState('මෙත් මැදිරිය');
  const [oppAmount, setOppAmount] = useState('');
  const [oppAvailability, setOppAvailability] = useState<OpportunityAvailability>('available');

  // Category Modal
  const [showCatModal, setShowCatModal] = useState(false);
  const [catTitle, setCatTitle] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Stats
  const totalRequests = dayakathwayaRequests.length;
  const newRequests = dayakathwayaRequests.filter(r => r.requestStatus === 'නව ඉල්ලීම').length;
  const approvedRequests = dayakathwayaRequests.filter(r => r.requestStatus === 'අනුමත කර ඇත' || r.requestStatus === 'තහවුරු කර ඇත').length;
  const completedRequests = dayakathwayaRequests.filter(r => r.requestStatus === 'සම්පූර්ණ කර ඇත').length;

  // Filtered requests
  const filteredRequests = dayakathwayaRequests.filter(req => {
    const matchesSearch = 
      req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.telephone.includes(searchQuery) ||
      (req.opportunityTitle && req.opportunityTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      req.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.requestStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || req.categoryId === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenRequestModal = (req: DayakathwayaRequest) => {
    setSelectedRequest(req);
    setEditStatus(req.requestStatus);
    setStatusNote('');
    setEditPaymentStatus(req.paymentStatus);
    setEditAgreedAmount(req.agreedAmount ? req.agreedAmount.toString() : (req.proposedAmount ? req.proposedAmount.toString() : ''));
    setAdminNotes(req.adminNotes || '');
  };

  const handleSaveRequestUpdate = () => {
    if (!selectedRequest) return;
    const agreedAmtNum = editAgreedAmount ? parseInt(editAgreedAmount.replace(/[^0-9]/g, ''), 10) : undefined;

    contentRepo.updateDayakathwayaRequest(
      selectedRequest.id,
      {
        requestStatus: editStatus,
        paymentStatus: editPaymentStatus,
        agreedAmount: agreedAmtNum,
        adminNotes: adminNotes.trim() || undefined,
      },
      statusNote.trim() || undefined
    );

    refreshData();
    setSelectedRequest(null);
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm('මෙම දායකත්ව ඉල්ලුම්පත මකා දැමීමට ඔබට විශ්වාසද?')) {
      contentRepo.deleteDayakathwayaRequest(id);
      refreshData();
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  const handleSaveOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppTitle.trim()) return;

    const amtNum = oppAmount ? parseInt(oppAmount.replace(/[^0-9]/g, ''), 10) : undefined;
    const catObj = dayakathwayaCategories.find(c => c.id === oppCategory);

    if (editingOppId) {
      contentRepo.updateDayakathwayaOpportunity(editingOppId, {
        title: oppTitle.trim(),
        description: oppDesc.trim(),
        categoryId: oppCategory,
        categoryTitle: catObj?.title || '',
        eventDate: oppDate || undefined,
        venue: oppVenue.trim(),
        suggestedAmount: amtNum,
        availability: oppAvailability,
      });
    } else {
      contentRepo.createDayakathwayaOpportunity({
        title: oppTitle.trim(),
        description: oppDesc.trim(),
        categoryId: oppCategory,
        categoryTitle: catObj?.title || '',
        eventDate: oppDate || undefined,
        venue: oppVenue.trim(),
        suggestedAmount: amtNum,
        availability: oppAvailability,
        contributionMode: 'නියමිත මුදල',
        publicationStatus: 'published',
      });
    }

    refreshData();
    setShowOppModal(false);
    setEditingOppId(null);
    setOppTitle('');
    setOppDesc('');
    setOppDate('');
    setOppAmount('');
  };

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Title & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDF4F5] text-[#650F18] border border-[#EFCED1] rounded-lg text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#9C1C24]" />
            <span>දායකත්ව කළමනාකරණය (Dayakathwaya System)</span>
          </div>
          <h1 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
            වැඩසටහන් දායකත්ව පාලක පුවරුව
          </h1>
          <p className="text-xs text-[#2B2526]/80 mt-0.5">
            ධර්ම දේශනා, පොහෝ දින හා විශේෂ වැඩසටහන් දායකත්ව ඉල්ලීම් සහ පුණ්‍ය අවස්ථා
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'requests'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5]'
            }`}
          >
            දායකත්ව ඉල්ලීම් ({dayakathwayaRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'opportunities'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5]'
            }`}
          >
            පුණ්‍ය අවස්ථා ({dayakathwayaOpportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5]'
            }`}
          >
            කාණ්ඩ ({dayakathwayaCategories.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">මුළු ඉල්ලුම්පත්</div>
          <div className="text-2xl font-bold text-[#650F18] font-mono">{totalRequests}</div>
          <div className="text-[11px] text-stone-400">දායකත්ව ඉල්ලීම් එකතුව</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">නව ඉල්ලීම්</div>
          <div className="text-2xl font-bold text-amber-600 font-mono">{newRequests}</div>
          <div className="text-[11px] text-stone-400">සමාලෝචනය කළ යුතු</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">අනුමත / තහවුරු කළ</div>
          <div className="text-2xl font-bold text-[#9C1C24] font-mono">{approvedRequests}</div>
          <div className="text-[11px] text-stone-400">විකාශනයට සූදානම්</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">සම්පූර්ණ වූ දායකත්ව</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{completedRequests}</div>
          <div className="text-[11px] text-stone-400">විකාශය වූ වැඩසටහන්</div>
        </div>
      </div>

      {/* TAB 1: REQUESTS LIST */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs p-5 sm:p-6 space-y-5">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="යොමු අංකය, දායක නම, දුරකථනය හෝ වැඩසටහන..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium focus:outline-none focus:ring-2 focus:ring-[#9C1C24]"
              >
                <option value="all">සියලු තත්ත්වයන්</option>
                <option value="නව ඉල්ලීම">නව ඉල්ලීම්</option>
                <option value="සමාලෝචනය වෙමින් පවතී">සමාලෝචනයේ පවතින</option>
                <option value="අනුමත කර ඇත">අනුමත කළ</option>
                <option value="තහවුරු කර ඇත">තහවුරු කළ</option>
                <option value="සම්පූර්ණ කර ඇත">සම්පූර්ණ කළ</option>
                <option value="අවලංගු කර ඇත">අවලංගු කළ</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium focus:outline-none focus:ring-2 focus:ring-[#9C1C24]"
              >
                <option value="all">සියලු කාණ්ඩ</option>
                {dayakathwayaCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#EFE6E4]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F5] border-b border-[#EFE6E4] text-[#650F18] font-bold">
                <tr>
                  <th className="py-3 px-4">යොමු අංකය</th>
                  <th className="py-3 px-4">දායක නම & දුරකථනය</th>
                  <th className="py-3 px-4">කාණ්ඩය & වැඩසටහන</th>
                  <th className="py-3 px-4">දිනය</th>
                  <th className="py-3 px-4">දායක මුදල</th>
                  <th className="py-3 px-4">තත්ත්වය</th>
                  <th className="py-3 px-4 text-right">ක්‍රියාමාර්ග</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE6E4]">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => {
                    const statusColors = {
                      'නව ඉල්ලීම': 'bg-amber-50 text-amber-800 border-amber-200',
                      'සමාලෝචනය වෙමින් පවතී': 'bg-[#FDF4F5] text-[#9C1C24] border-[#EFCED1]',
                      'වැඩිදුර තොරතුරු අවශ්‍යයි': 'bg-purple-50 text-purple-800 border-purple-200',
                      'අනුමත කර ඇත': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                      'තහවුරු කර ඇත': 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
                      'සම්පූර්ණ කර ඇත': 'bg-green-100 text-green-900 border-green-300 font-bold',
                      'අවලංගු කර ඇත': 'bg-rose-50 text-rose-800 border-rose-200',
                    };

                    return (
                      <tr key={req.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#650F18] whitespace-nowrap">
                          {req.referenceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-900">{req.applicantName}</div>
                          <div className="text-[11px] text-stone-500">{req.telephone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#650F18]">{req.categoryTitle}</div>
                          <div className="text-[11px] text-stone-500 truncate max-w-[200px]">
                            {req.opportunityTitle || 'විශේෂ වැඩසටහනක්'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                          {req.preferredDate || 'නොදන්වා ඇත'}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#9C1C24] font-bold">
                          {req.agreedAmount 
                            ? `රු. ${req.agreedAmount.toLocaleString()}` 
                            : (req.proposedAmount ? `රු. ${req.proposedAmount.toLocaleString()}` : 'සාකච්ඡා වෙමින්')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${statusColors[req.requestStatus] || ''}`}>
                            {req.requestStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenRequestModal(req)}
                              className="px-2.5 py-1.5 bg-[#FDF4F5] hover:bg-[#EFCED1] text-[#650F18] font-semibold rounded-lg transition-colors text-[11px] border border-[#EFCED1]"
                            >
                              විස්තර & තත්ත්වය
                            </button>
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                              title="මකා දමන්න"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-500">
                      දායකත්ව ඉල්ලීම් කිසිවක් හමු නොවීය.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: OPPORTUNITIES MANAGEMENT */}
      {activeTab === 'opportunities' && (
        <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                පුණ්‍ය අවස්ථා හා වැඩසටහන් පෙළගැස්ම
              </h2>
              <p className="text-xs text-stone-500">
                දායකයන්ට වෙබ් අඩවියෙන් තෝරාගත හැකි සජීවී ධර්ම දේශනා සහ පින්කම්
              </p>
            </div>
            <button
              onClick={() => {
                setEditingOppId(null);
                setOppTitle('');
                setOppDesc('');
                setOppDate('');
                setOppAmount('');
                setShowOppModal(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>නව අවස්ථාවක් එක් කරන්න</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dayakathwayaOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-2xl border border-[#EFE6E4] bg-[#FAF7F5] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#EFE6E4] text-[10px] font-semibold text-[#650F18]">
                      {opp.categoryTitle || 'කාණ්ඩය'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      opp.availability === 'available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opp.availability === 'reserved'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {opp.availability === 'available' ? 'ලබාගත හැක' : opp.availability === 'reserved' ? 'වෙන්කර ඇත' : 'අවසන්'}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#650F18] font-sinhala-serif text-sm">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-[#2B2526] line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="space-y-1 text-xs text-stone-500 pt-1">
                    {opp.eventDate && <div>දිනය: <strong className="text-stone-800">{opp.eventDate}</strong></div>}
                    {opp.suggestedAmount && (
                      <div className="text-[#9C1C24] font-bold">
                        යෝජිත මුදල: රු. {opp.suggestedAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setEditingOppId(opp.id);
                      setOppTitle(opp.title);
                      setOppDesc(opp.description);
                      setOppCategory(opp.categoryId);
                      setOppDate(opp.eventDate || '');
                      setOppVenue(opp.venue || 'මෙත් මැදිරිය');
                      setOppAmount(opp.suggestedAmount ? opp.suggestedAmount.toString() : '');
                      setOppAvailability(opp.availability);
                      setShowOppModal(true);
                    }}
                    className="text-[#9C1C24] hover:underline font-semibold"
                  >
                    සංස්කරණය
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('මෙම අවස්ථාව මකා දැමීමට ඔබට විශ්වාසද?')) {
                        contentRepo.deleteDayakathwayaOpportunity(opp.id);
                        refreshData();
                      }
                    }}
                    className="text-stone-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs p-5 sm:p-6 space-y-6">
          <div className="border-b border-[#EFE6E4] pb-4">
            <h2 className="text-base font-bold text-[#650F18] font-sinhala-serif">
              දායකත්ව කාණ්ඩ
            </h2>
            <p className="text-xs text-stone-500">
              දායකත්ව පියවර 1 හි දැක්වෙන ප්‍රධාන වැඩසටහන් කාණ්ඩ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dayakathwayaCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border border-[#EFE6E4] bg-[#FAF7F5] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-[#650F18]">{cat.title}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-2">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REQUEST DETAIL & AUDIT MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#EFE6E4] shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#650F18] font-sinhala-serif">
                  දායකත්ව ඉල්ලුම්පත සහ තත්ත්ව පාලනය
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs font-bold text-[#9C1C24]">
                    {selectedRequest.referenceNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedRequest.referenceNumber)}
                    className="p-1 text-stone-400 hover:text-[#9C1C24]"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Applicant Details */}
            <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#EFE6E4] space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-stone-500">දායක නම:</div>
                  <div className="font-bold text-stone-900 mt-0.5">{selectedRequest.applicantName}</div>
                </div>
                <div>
                  <div className="text-stone-500">දුරකථන අංකය:</div>
                  <div className="font-bold text-[#9C1C24] mt-0.5 flex items-center gap-2">
                    <span>{selectedRequest.telephone}</span>
                    <a
                      href={`tel:${selectedRequest.telephone.replace(/\s+/g, '')}`}
                      className="px-2 py-0.5 bg-[#FDF4F5] text-[#650F18] border border-[#EFCED1] rounded text-[10px] hover:bg-[#EFCED1]"
                    >
                      ඇමතුමක්
                    </a>
                  </div>
                </div>
                {selectedRequest.email && (
                  <div>
                    <div className="text-stone-500">විද්‍යුත් තැපෑල:</div>
                    <div className="font-semibold text-stone-900 mt-0.5">{selectedRequest.email}</div>
                  </div>
                )}
                <div>
                  <div className="text-stone-500">කැමති සම්බන්ධතා ක්‍රමය:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{selectedRequest.preferredContactMethod}</div>
                </div>
                <div>
                  <div className="text-stone-500">වැඩසටහන් කාණ්ඩය:</div>
                  <div className="font-semibold text-[#650F18] mt-0.5">{selectedRequest.categoryTitle}</div>
                </div>
                <div>
                  <div className="text-stone-500">තෝරාගත් අවස්ථාව / දිනය:</div>
                  <div className="font-semibold text-[#650F18] mt-0.5">
                    {selectedRequest.opportunityTitle || 'විශේෂ වැඩසටහනක්'} ({selectedRequest.preferredDate || 'දිනය තීරණය කිරීමට'})
                  </div>
                </div>
                {selectedRequest.message && (
                  <div className="col-span-2">
                    <div className="text-stone-500">පුණ්‍යානුමෝදනාව / පණිවිඩය:</div>
                    <div className="text-stone-800 mt-0.5 italic bg-white p-2.5 rounded-xl border border-[#EFE6E4]">
                      "{selectedRequest.message}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status History Audit Trail */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#650F18]">
                <History className="w-3.5 h-3.5 text-[#9C1C24]" />
                <span>ඉල්ලීමේ ඉතිහාසය (Status History Audit Log)</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5 p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE6E4] text-[11px]">
                {selectedRequest.statusHistory && selectedRequest.statusHistory.length > 0 ? (
                  selectedRequest.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 border-b border-[#EFE6E4]/50 pb-1 last:border-0 last:pb-0">
                      <div>
                        <strong className="text-[#650F18]">{h.status}</strong>
                        {h.note && <span className="text-stone-600 ml-1.5">- {h.note}</span>}
                      </div>
                      <span className="text-stone-400 text-[10px] whitespace-nowrap">
                        {new Date(h.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-stone-400">ඉතිහාස සටහන් නොමැත.</div>
                )}
              </div>
            </div>

            {/* Form to Update Status, Agreed Amount, Payment Status & Admin Notes */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">ඉල්ලීමේ තත්ත්වය (Update Status):</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as SponsorshipRequestStatus)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium"
                  >
                    <option value="නව ඉල්ලීම">නව ඉල්ලීම</option>
                    <option value="සමාලෝචනය වෙමින් පවතී">සමාලෝචනය වෙමින් පවතී</option>
                    <option value="වැඩිදුර තොරතුරු අවශ්‍යයි">වැඩිදුර තොරතුරු අවශ්‍යයි</option>
                    <option value="අනුමත කර ඇත">අනුමත කර ඇත (Approved)</option>
                    <option value="තහවුරු කර ඇත">තහවුරු කර ඇත (Confirmed)</option>
                    <option value="සම්පූර්ණ කර ඇත">සම්පූර්ණ කර ඇත (Broadcast Done)</option>
                    <option value="අවලංගු කර ඇත">අවලංගු කර ඇත</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">ගෙවීම් තත්ත්වය (Payment Status):</label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium"
                  >
                    <option value="නොගෙවූ">නොගෙවූ</option>
                    <option value="සත්‍යාපනය වෙමින් පවතී">සත්‍යාපනය වෙමින් පවතී</option>
                    <option value="ගෙවා ඇත">ගෙවා ඇත (Verified)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">එකඟ වූ දායක මුදල (Agreed Amount - LKR):</label>
                  <input
                    type="text"
                    value={editAgreedAmount}
                    onChange={(e) => setEditAgreedAmount(e.target.value)}
                    placeholder="උදා: 35000"
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">තත්ත්ව වෙනස්වීම් සටහන (Audit Note):</label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="උදා: දුරකථනයෙන් සම්බන්ධ වී දිනය තහවුරු කරන ලදී."
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#650F18]">පරිපාලක අභ්‍යන්තර සටහන් (Internal Notes):</label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="විශේෂ විකාශන උපදෙස්, ආරාධිත හිමිවරුන්ගේ නම් ආදිය..."
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EFE6E4]">
              <button
                type="button"
                onClick={() => handleDeleteRequest(selectedRequest.id)}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold"
              >
                මකා දමන්න
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="button"
                  onClick={handleSaveRequestUpdate}
                  className="px-6 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  වෙනස්කම් සුරකින්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE/EDIT OPPORTUNITY MODAL */}
      {showOppModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-[#EFE6E4] shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
              <h3 className="font-bold text-[#650F18] font-sinhala-serif">
                {editingOppId ? 'පුණ්‍ය අවස්ථාව සංස්කරණය' : 'නව දායකත්ව අවස්ථාවක් නිර්මාණය'}
              </h3>
              <button onClick={() => setShowOppModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOpportunity} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">වැඩසටහනේ නම:</label>
                <input
                  type="text"
                  required
                  value={oppTitle}
                  onChange={(e) => setOppTitle(e.target.value)}
                  placeholder="උදා: සජීවී වෙසක් පොහෝ දින ධර්ම දේශනාව"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">කාණ්ඩය:</label>
                  <select
                    value={oppCategory}
                    onChange={(e) => setOppCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                  >
                    {dayakathwayaCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">ලබාගත හැකි තත්ත්වය:</label>
                  <select
                    value={oppAvailability}
                    onChange={(e) => setOppAvailability(e.target.value as OpportunityAvailability)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                  >
                    <option value="available">ලබාගත හැක (Available)</option>
                    <option value="reserved">වෙන්කර ඇත (Reserved)</option>
                    <option value="completed">අවසන් (Completed)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">දිනය:</label>
                  <input
                    type="date"
                    value={oppDate}
                    onChange={(e) => setOppDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">යෝජිත දායක මුදල (LKR):</label>
                  <input
                    type="number"
                    value={oppAmount}
                    onChange={(e) => setOppAmount(e.target.value)}
                    placeholder="25000"
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">විස්තරය:</label>
                <textarea
                  rows={2}
                  value={oppDesc}
                  onChange={(e) => setOppDesc(e.target.value)}
                  placeholder="වැඩසටහන පිළිබඳ කෙටි හැඳින්වීම..."
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowOppModal(false)}
                  className="px-4 py-2 bg-stone-100 rounded-xl font-medium"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl font-bold shadow-xs"
                >
                  සුරකින්න
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
