import React, { useState } from 'react';
import { 
  Heart, 
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
  Download,
  Copy,
  Check,
  Calendar,
  Phone,
  Mail,
  User,
  ArrowUpDown
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { contentRepo } from '../../services/contentRepository';
import { DonationIntent, DonationStatus, PaymentStatus, DonationCampaign } from '../../types';

export const AdminDonations: React.FC = () => {
  const { donations, campaigns, refreshData } = useContent();

  const [activeTab, setActiveTab] = useState<'intents' | 'campaigns'>('intents');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // Modal for Viewing / Updating Donation Intent
  const [selectedIntent, setSelectedIntent] = useState<DonationIntent | null>(null);
  const [editStatus, setEditStatus] = useState<DonationStatus>('නව ඉල්ලීම');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('නොගෙවූ');
  const [adminNotes, setAdminNotes] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Modal for Creating New Campaign
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campTitle, setCampTitle] = useState('');
  const [campCategory, setCampCategory] = useState('ධර්ම ප්‍රචාරක අරමුදල');
  const [campDescription, setCampDescription] = useState('');
  const [campTarget, setCampTarget] = useState('');
  const [campStatus, setCampStatus] = useState<'active' | 'completed' | 'draft'>('active');

  // Stats calculation
  const totalIntents = donations.length;
  const totalAmount = donations.reduce((acc, curr) => acc + (curr.intendedAmount || 0), 0);
  const newIntents = donations.filter(d => d.status === 'නව ඉල්ලීම').length;
  const verifiedPayments = donations.filter(d => d.paymentStatus === 'ගෙවා ඇත').length;

  const filteredIntents = donations.filter((item) => {
    const matchesSearch =
      item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.telephone.includes(searchQuery) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || item.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleOpenDetailModal = (intent: DonationIntent) => {
    setSelectedIntent(intent);
    setEditStatus(intent.status);
    setEditPaymentStatus(intent.paymentStatus);
    setAdminNotes(intent.adminNotes || '');
    setCopiedRef(false);
  };

  const handleSaveIntentUpdate = () => {
    if (!selectedIntent) return;
    contentRepo.updateDonation(selectedIntent.id, {
      status: editStatus,
      paymentStatus: editPaymentStatus,
      adminNotes: adminNotes.trim() || undefined,
    });
    refreshData();
    setSelectedIntent(null);
  };

  const handleDeleteIntent = (id: string) => {
    if (confirm('මෙම පරිත්‍යාග වාර්තාව මකා දැමීමට ඔබට විශ්වාසද?')) {
      contentRepo.deleteDonation(id);
      refreshData();
      if (selectedIntent?.id === id) setSelectedIntent(null);
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle.trim()) return;

    contentRepo.createCampaign({
      title: campTitle.trim(),
      description: campDescription.trim(),
      category: campCategory,
      targetAmount: campTarget ? parseInt(campTarget, 10) : undefined,
      status: campStatus,
    });

    refreshData();
    setShowCampaignModal(false);
    setCampTitle('');
    setCampDescription('');
    setCampTarget('');
  };

  const handleToggleCampaignStatus = (camp: DonationCampaign) => {
    const nextStatus = camp.status === 'active' ? 'completed' : 'active';
    contentRepo.updateCampaign(camp.id, { status: nextStatus });
    refreshData();
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
      {/* Top Title & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDF4F5] text-[#9C1C24] rounded-lg text-xs font-semibold mb-2 border border-[#EFCED1]">
            <Heart className="w-3.5 h-3.5 text-[#E87928]" />
            <span>පරිත්‍යාග සහ සදහම් ආධාර කළමනාකරණය</span>
          </div>
          <h1 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
            පරිත්‍යාග කළමනාකරණ පද්ධතිය
          </h1>
          <p className="text-xs text-[#2B2526] mt-0.5">
            වෙබ් අඩවිය ඔස්සේ ලැබුණු පරිත්‍යාග අභිප්‍රායන්, බැංකු තැන්පතු තහවුරු කිරීම් සහ අරමුදල්
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('intents')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'intents'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5] border border-[#EFE6E4]'
            }`}
          >
            පරිත්‍යාග ඉල්ලීම් ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'campaigns'
                ? 'bg-[#9C1C24] text-white shadow-xs'
                : 'bg-[#FAF7F5] text-[#650F18] hover:bg-[#FDF4F5] border border-[#EFE6E4]'
            }`}
          >
            විශේෂ අරමුදල් ({campaigns.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">මුළු පරිත්‍යාග වාර්තා</div>
          <div className="text-2xl font-bold text-[#650F18] font-mono">{totalIntents}</div>
          <div className="text-[11px] text-stone-400">ලියාපදිංචි අභිප්‍රායන්</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">අපේක්ෂිත මුළු මුදල</div>
          <div className="text-2xl font-bold text-[#9C1C24] font-mono">රු. {totalAmount.toLocaleString()}</div>
          <div className="text-[11px] text-stone-400">පරිත්‍යාගශීලීන් සටහන් කළ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">නව ඉල්ලීම්</div>
          <div className="text-2xl font-bold text-amber-600 font-mono">{newIntents}</div>
          <div className="text-[11px] text-stone-400">තහවුරු කිරීමට ඇති</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-1">
          <div className="text-xs text-stone-500 font-medium">තහවුරු වූ ගෙවීම්</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{verifiedPayments}</div>
          <div className="text-[11px] text-stone-400">බැංකු ලදුපත් සත්‍යාපිත</div>
        </div>
      </div>

      {/* TAB 1: DONATION INTENTS LIST */}
      {activeTab === 'intents' && (
        <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs p-5 sm:p-6 space-y-5">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="යොමු අංකය, දායක නම, දුරකථනය හෝ අරමුණ..."
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
                <option value="තහවුරු කර ඇත">තහවුරු කළ</option>
                <option value="අවලංගු කර ඇත">අවලංගු කළ</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium focus:outline-none focus:ring-2 focus:ring-[#9C1C24]"
              >
                <option value="all">සියලු ගෙවීම් තත්ත්වයන්</option>
                <option value="නොගෙවූ">නොගෙවූ</option>
                <option value="සත්‍යාපනය වෙමින් පවතී">සත්‍යාපනය වෙමින්</option>
                <option value="ගෙවා ඇත">ගෙවා ඇත (Verified)</option>
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
                  <th className="py-3 px-4">අරමුණ / අරමුදල</th>
                  <th className="py-3 px-4">මුදල (LKR)</th>
                  <th className="py-3 px-4">තත්ත්වය</th>
                  <th className="py-3 px-4">ගෙවීම් තත්ත්වය</th>
                  <th className="py-3 px-4 text-right">ක්‍රියාමාර්ග</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE6E4]">
                {filteredIntents.length > 0 ? (
                  filteredIntents.map((intent) => {
                    const statusColors = {
                      'නව ඉල්ලීම': 'bg-amber-50 text-amber-800 border-amber-200',
                      'සමාලෝචනය වෙමින් පවතී': 'bg-blue-50 text-blue-800 border-blue-200',
                      'තහවුරු කර ඇත': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                      'අවලංගු කර ඇත': 'bg-rose-50 text-rose-800 border-rose-200',
                    };

                    const paymentColors = {
                      'නොගෙවූ': 'bg-stone-100 text-stone-600',
                      'සත්‍යාපනය වෙමින් පවතී': 'bg-amber-100 text-amber-800',
                      'ගෙවා ඇත': 'bg-emerald-100 text-emerald-800 font-bold',
                    };

                    return (
                      <tr key={intent.id} className="hover:bg-[#FAF7F5]/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#650F18] whitespace-nowrap">
                          {intent.referenceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-800">{intent.donorName}</div>
                          <div className="text-[11px] text-stone-500">{intent.telephone}</div>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 max-w-[200px] truncate">
                          {intent.campaignTitle ? (
                            <span className="font-semibold text-[#9C1C24]">{intent.campaignTitle}</span>
                          ) : (
                            intent.purpose
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#9C1C24]">
                          රු. {intent.intendedAmount?.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${statusColors[intent.status] || ''}`}>
                            {intent.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${paymentColors[intent.paymentStatus] || ''}`}>
                            {intent.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenDetailModal(intent)}
                              className="px-2.5 py-1.5 bg-[#FDF4F5] hover:bg-[#F5DADC] text-[#9C1C24] font-semibold rounded-lg transition-colors text-[11px] cursor-pointer"
                            >
                              සමාලෝචනය
                            </button>
                            <button
                              onClick={() => handleDeleteIntent(intent.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
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
                      පරිත්‍යාග වාර්තා කිසිවක් හමු නොවීය.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGNS LIST */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-2xl border border-[#EFE6E4] shadow-xs p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#650F18] font-sinhala-serif">
                විශේෂ සදහම් ව්‍යාපෘති හා අරමුදල්
              </h2>
              <p className="text-xs text-stone-500">
                ප්‍රසිද්ධ වෙබ් අඩවියේ පරිත්‍යාග පිටුවේ දිස්වන අරමුදල් ලැයිස්තුව
              </p>
            </div>
            <button
              onClick={() => setShowCampaignModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F5C518]" />
              <span>නව අරමුදලක් එක් කරන්න</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-5 rounded-2xl border border-[#EFE6E4] bg-[#FAF7F5] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-white border border-[#EFE6E4] text-[10px] font-semibold text-[#650F18]">
                      {camp.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      camp.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {camp.status === 'active' ? 'සක්‍රීයයි' : 'අවසන්'}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#650F18] font-sinhala-serif text-sm">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-[#2B2526] line-clamp-3 leading-relaxed">
                    {camp.description}
                  </p>

                  {camp.targetAmount && (
                    <div className="text-xs text-[#9C1C24] font-bold">
                      ඉලක්කගත මුදල: රු. {camp.targetAmount.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleCampaignStatus(camp)}
                    className="text-[#9C1C24] hover:underline font-semibold cursor-pointer"
                  >
                    {camp.status === 'active' ? 'අවසන් ලෙස සලකුණු කරන්න' : 'නැවත සක්‍රීය කරන්න'}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('මෙම අරමුදල මකා දැමීමට ඔබට විශ්වාසද?')) {
                        contentRepo.deleteCampaign(camp.id);
                        refreshData();
                      }
                    }}
                    className="text-stone-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL / UPDATE MODAL */}
      {selectedIntent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-[#EFE6E4] shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#650F18] font-sinhala-serif">
                  පරිත්‍යාග වාර්තාව සමාලෝචනය
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs font-bold text-[#9C1C24]">
                    {selectedIntent.referenceNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedIntent.referenceNumber)}
                    className="p-1 text-stone-400 hover:text-[#9C1C24] cursor-pointer"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedIntent(null)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Donor & Donation Info Details */}
            <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#EFE6E4] space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-stone-500">දායක නම:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{selectedIntent.donorName}</div>
                </div>
                <div>
                  <div className="text-stone-500">දුරකථන අංකය:</div>
                  <div className="font-semibold text-stone-900 mt-0.5">{selectedIntent.telephone}</div>
                </div>
                {selectedIntent.email && (
                  <div>
                    <div className="text-stone-500">විද්‍යුත් තැපෑල:</div>
                    <div className="font-semibold text-stone-900 mt-0.5">{selectedIntent.email}</div>
                  </div>
                )}
                <div>
                  <div className="text-stone-500">පරිත්‍යාග මුදල:</div>
                  <div className="font-bold text-[#9C1C24] text-sm mt-0.5">
                    රු. {selectedIntent.intendedAmount?.toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-stone-500">අරමුණ / අරමුදල:</div>
                  <div className="font-semibold text-[#650F18] mt-0.5">
                    {selectedIntent.campaignTitle ? `${selectedIntent.campaignTitle} (${selectedIntent.purpose})` : selectedIntent.purpose}
                  </div>
                </div>
                {selectedIntent.message && (
                  <div className="col-span-2">
                    <div className="text-stone-500">පුණ්‍යානුමෝදනාව / පණිවිඩය:</div>
                    <div className="text-stone-800 mt-0.5 italic bg-white p-2.5 rounded-xl border border-[#EFE6E4]">
                      "{selectedIntent.message}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editable Status Controls */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#650F18]">ඉල්ලීමේ තත්ත්වය (Request Status):</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as DonationStatus)}
                    className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#650F18] font-medium"
                  >
                    <option value="නව ඉල්ලීම">නව ඉල්ලීම</option>
                    <option value="සමාලෝචනය වෙමින් පවතී">සමාලෝචනය වෙමින් පවතී</option>
                    <option value="තහවුරු කර ඇත">තහවුරු කර ඇත</option>
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
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">පරිපාලක සටහන් (Admin Notes):</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="බැංකු ලදුපත පරීක්ෂා කළ දිනය, ඇමතුම් සටහන්..."
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EFE6E4]">
              <button
                type="button"
                onClick={() => handleDeleteIntent(selectedIntent.id)}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                මකා දමන්න
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIntent(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium cursor-pointer"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="button"
                  onClick={handleSaveIntentUpdate}
                  className="px-6 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  වෙනස්කම් සුරකින්න
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {showCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#EFE6E4] shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EFE6E4] pb-3">
              <h3 className="font-bold text-[#650F18] font-sinhala-serif">නව අරමුදලක් නිර්මාණය</h3>
              <button onClick={() => setShowCampaignModal(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">අරමුදලේ නම:</label>
                <input
                  type="text"
                  required
                  value={campTitle}
                  onChange={(e) => setCampTitle(e.target.value)}
                  placeholder="උදා: සජීවී විකාශන මැදිරි අරමුදල"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">කාණ්ඩය:</label>
                <input
                  type="text"
                  value={campCategory}
                  onChange={(e) => setCampCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">විස්තරය:</label>
                <textarea
                  rows={2}
                  value={campDescription}
                  onChange={(e) => setCampDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#650F18]">ඉලක්කගත මුදල (LKR) - විකල්පයි:</label>
                <input
                  type="number"
                  value={campTarget}
                  onChange={(e) => setCampTarget(e.target.value)}
                  placeholder="1000000"
                  className="w-full px-3 py-2 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl text-[#2B2526]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCampaignModal(false)}
                  className="px-4 py-2 bg-stone-100 rounded-xl font-medium cursor-pointer"
                >
                  අවලංගු කරන්න
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  එක් කරන්න
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
