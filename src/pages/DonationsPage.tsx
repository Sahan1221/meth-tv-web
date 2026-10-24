import React, { useState } from 'react';
import { 
  Heart, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  Copy, 
  Check, 
  Info, 
  Sparkles,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { contentRepo } from '../services/contentRepository';
import { BRAND_CONFIG } from '../config/brand';

interface DonationsPageProps {
  onNavigate?: (route: string) => void;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({ onNavigate }) => {
  const { activeCampaigns, refreshData } = useContent();

  const [selectedPurpose, setSelectedPurpose] = useState<string>('සාමාන්‍ය පරිත්‍යාගයක්');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Form Fields
  const [donorName, setDonorName] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Submission & Review Flow
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedRef, setGeneratedRef] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const defaultPurposes = [
    'සාමාන්‍ය පරිත්‍යාගයක්',
    'ධර්ම දේශනා වැඩසටහන්',
    'ආගමික වැඩසටහන්',
    'විශේෂ පොහෝ දින වැඩසටහන්',
    'මෙත් රූපවාහිනී මාධ්‍ය කටයුතු',
  ];

  const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setIsCustom(true);
    setSelectedAmount(val ? parseInt(val, 10) : 0);
  };

  const handleCampaignSelect = (campId: string, title: string) => {
    setSelectedCampaignId(campId);
    setSelectedPurpose(title);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!donorName.trim()) {
      errs.donorName = 'කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.';
    }
    if (!telephone.trim()) {
      errs.telephone = 'කරුණාකර ඔබගේ දුරකථන අංකය ඇතුළත් කරන්න.';
    }
    const finalAmount = isCustom ? parseInt(customAmount || '0', 10) : selectedAmount;
    if (!finalAmount || finalAmount < 100) {
      errs.amount = 'කරුණාකර වලංගු පරිත්‍යාග මුදලක් තෝරන්න හෝ ඇතුළත් කරන්න (අවම රු. 100).';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('review');
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = () => {
    const finalAmount = isCustom ? parseInt(customAmount || '0', 10) : selectedAmount;
    const campaignObj = activeCampaigns.find(c => c.id === selectedCampaignId);

    const newIntent = contentRepo.createDonationIntent({
      donorName: donorName.trim(),
      telephone: telephone.trim(),
      email: email.trim() || undefined,
      purpose: selectedPurpose,
      campaignId: selectedCampaignId || undefined,
      campaignTitle: campaignObj?.title || undefined,
      intendedAmount: finalAmount,
      message: message.trim() || undefined,
      status: 'නව ඉල්ලීම',
      paymentStatus: 'නොගෙවූ',
    });

    setGeneratedRef(newIntent.referenceNumber);
    refreshData();
    setStep('confirmed');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleCopyRef = () => {
    if (navigator.clipboard && generatedRef) {
      navigator.clipboard.writeText(generatedRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const resetForm = () => {
    setStep('form');
    setDonorName('');
    setTelephone('');
    setEmail('');
    setMessage('');
    setSelectedPurpose('සාමාන්‍ය පරිත්‍යාගයක්');
    setSelectedCampaignId('');
    setSelectedAmount(5000);
    setCustomAmount('');
    setIsCustom(false);
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Philanthropy Suite Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#EFE6E4] rounded-2xl shadow-xs max-w-xl mx-auto">
        <button
          onClick={() => onNavigate?.('/dayakathwaya')}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-[#650F18] hover:bg-[#FAF7F5]"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>01. වැඩසටහන් දායකත්වය</span>
        </button>
        <button
          onClick={() => onNavigate?.('/donations')}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer bg-[#9C1C24] text-white shadow-xs"
        >
          <Heart className="w-4 h-4" />
          <span>02. සදහම් පරිත්‍යාග</span>
        </button>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#FFF5F6] via-[#FAF7F5] to-white rounded-3xl p-8 sm:p-12 border border-[#EFCED1] shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="text-xs font-semibold text-[#9C1C24] font-sans flex items-center gap-1.5">
            <span>සද්ධර්ම ප්‍රචාරය උදෙසා අනුග්‍රහය</span>
            <span aria-hidden="true">·</span>
            <span>Support METH TV</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650F18] font-sinhala-serif leading-tight">
            පරිත්‍යාග සහ සදහම් ආධාර
          </h1>

          <p className="text-sm sm:text-base text-[#2B2526] leading-relaxed font-sans">
            මෙත් රූපවාහිනී (METH TV) නාලිකාව ඔස්සේ පිරිසිදු ථේරවාදී ත්‍රිපිටක සද්ධර්මය දිවයින පුරා සහ ලොව පුරා විසිරී සිටින සුවහසක් සැදැහැවත් ජනතාව වෙත නොකඩවා සම්ප්‍රේෂණය කිරීමේ උතුම් ධර්ම දානමය පිංකමට ඔබගේ සැදැහැවත් අනුග්‍රහය එක් කරන්න.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#650F18] font-medium">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#EFE6E4]">
              <ShieldCheck className="w-4 h-4 text-[#9C1C24]" />
              <span>විනිවිදභාවයෙන් යුතු මූල්‍ය පරිපාලනය</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#EFE6E4]">
              <Phone className="w-4 h-4 text-[#9C1C24]" />
              <span>විමසීම්: 0342 263 646</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Active Campaigns Spotlight */}
      {activeCampaigns.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                විශේෂ සදහම් ව්‍යාපෘති සහ අරමුදල්
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                මෙත් රූපවාහිනිය විසින් දැනට ක්‍රියාත්මක කෙරෙන විශේෂිත අරමුදල්
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCampaigns.map((camp) => {
              const isSelected = selectedCampaignId === camp.id;
              return (
                <div
                  key={camp.id}
                  onClick={() => handleCampaignSelect(camp.id, camp.title)}
                  className={`bg-white rounded-2xl overflow-hidden border p-5 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#9C1C24] ring-2 ring-[#EFCED1] shadow-md bg-[#FDF4F5]'
                      : 'border-[#EFE6E4] hover:border-[#9C1C24] hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    {camp.coverImage && (
                      <div className="relative h-36 rounded-xl overflow-hidden bg-stone-100">
                        <img
                          src={camp.coverImage}
                          alt={camp.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#650F18]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                          {camp.category}
                        </span>
                      </div>
                    )}

                    <h3 className="text-sm font-bold text-[#650F18] font-sinhala-serif leading-snug">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-[#2B2526] leading-relaxed line-clamp-3">
                      {camp.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                    <span className="text-xs font-semibold text-[#9C1C24]">
                      {isSelected ? '✓ තෝරාගෙන ඇත' : 'මෙම අරමුදල තෝරන්න'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#9C1C24]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Donation Intention Form & Confirmation Step */}
      <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-10 shadow-xs">
        {step === 'form' && (
          <form onSubmit={handleProceedToReview} className="space-y-8">
            <div className="border-b border-[#EFE6E4] pb-4">
              <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                පරිත්‍යාගයක් කරන්න (Make a Donation)
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                පහත පියවර අනුගමනය කර ඔබගේ දායකත්ව අභිප්‍රාය සටහන් කරන්න
              </p>
            </div>

            {/* Purpose Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#650F18] uppercase tracking-wider">
                1. දායකත්වයේ අරමුණ (Donation Purpose) <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {defaultPurposes.map((purp) => {
                  const isSelected = selectedPurpose === purp && !selectedCampaignId;
                  return (
                    <button
                      key={purp}
                      type="button"
                      onClick={() => {
                        setSelectedPurpose(purp);
                        setSelectedCampaignId('');
                      }}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FDF4F5] border-[#9C1C24] text-[#650F18] font-semibold ring-1 ring-[#9C1C24]'
                          : 'bg-[#FAF7F5] border-[#EFE6E4] text-[#2B2526] hover:bg-white'
                      }`}
                    >
                      {purp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amount Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#650F18] uppercase tracking-wider">
                2. පරිත්‍යාග මුදල (Donation Amount - LKR) <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {presetAmounts.map((amt) => {
                  const isSelected = !isCustom && selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountClick(amt)}
                      className={`py-3 px-2 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#9C1C24] text-white border-[#9C1C24] font-bold shadow-xs'
                          : 'bg-[#FAF7F5] border-[#EFE6E4] text-[#650F18] hover:bg-white font-medium'
                      }`}
                    >
                      රු. {amt.toLocaleString()}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Field */}
              <div className="pt-2 max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#2B2526]">වෙනත් මුදලක් (LKR):</span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="රු. 50,000"
                    className="flex-1 px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#650F18] font-bold"
                  />
                </div>
                {errors.amount && <p className="text-[11px] text-red-600 mt-1">{errors.amount}</p>}
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold text-[#650F18] uppercase tracking-wider">
                3. ඔබගේ තොරතුරු (Donor Information)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#2B2526]">
                    ඔබගේ නම <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="උදා: කේ. ඒ. පියසේන මහතා"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
                  />
                  {errors.donorName && <p className="text-[11px] text-red-600">{errors.donorName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#2B2526]">
                    දුරකථන අංකය <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="උදා: 071 234 5678"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
                  />
                  {errors.telephone && <p className="text-[11px] text-red-600">{errors.telephone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#2B2526]">
                  විද්‍යුත් තැපෑල (Email) - විකල්පයි
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
                />
                {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#2B2526]">
                  සටහනක් හෝ පුණ්‍යානුමෝදනාව (Message / Dedication) - විකල්පයි
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="දෙමාපියන්ට පින් පිණිස, සෙත් පතා හෝ වෙනත් පණිවිඩයක්..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
                />
              </div>
            </div>

            {/* Financial Safety Notice */}
            <div className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl flex items-start gap-3 text-xs text-[#650F18]">
              <Info className="w-4 h-4 text-[#E87928] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-sm text-[#650F18]">
                  ගෙවීම් තහවුරු කිරීම සහ ක්‍රමවේදය පිළිබඳ දැනුම්දීම:
                </div>
                <p className="text-[#2B2526] leading-relaxed">
                  මෙම පෝරමය මඟින් ඔබගේ පරිත්‍යාග අභිප්‍රාය ආරක්ෂිතව ලියාපදිංචි කෙරේ. මෙත් රූපවාහිනී පරිපාලන අංශය මඟින් ඔබ සම්බන්ධ කරගෙන නිල බැංකු ගිණුම් විස්තර සහ දායකත්ව ලදුපත ලබාදීමෙන් අනතුරුව පමණක් ගනුදෙනුව තහවුරු වේ.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ඉදිරියට යන්න (තොරතුරු සමාලෝචනය)</span>
                <ArrowRight className="w-4 h-4 text-[#F5C518]" />
              </button>
            </div>
          </form>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-[#EFE6E4] pb-4">
              <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                තොරතුරු තහවුරු කරන්න (Review & Confirm)
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                ඔබ ඇතුළත් කළ පරිත්‍යාග තොරතුරු නිවැරදි දැයි පරීක්ෂා කරන්න
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#EFE6E4] space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-stone-500">දායකත්වයේ අරමුණ:</div>
                  <div className="font-bold text-[#650F18] text-sm mt-0.5 font-sinhala-serif">
                    {selectedPurpose}
                  </div>
                </div>

                <div>
                  <div className="text-stone-500">පරිත්‍යාග මුදල:</div>
                  <div className="font-bold text-[#9C1C24] text-base mt-0.5">
                    රු. {(isCustom ? parseInt(customAmount || '0', 10) : selectedAmount).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-stone-500">දායක නම:</div>
                  <div className="font-semibold text-[#2B2526] mt-0.5">
                    {donorName}
                  </div>
                </div>

                <div>
                  <div className="text-stone-500">දුරකථන අංකය:</div>
                  <div className="font-semibold text-[#2B2526] mt-0.5">
                    {telephone}
                  </div>
                </div>

                {email && (
                  <div>
                    <div className="text-stone-500">විද්‍යුත් තැපෑල:</div>
                    <div className="font-semibold text-[#2B2526] mt-0.5">
                      {email}
                    </div>
                  </div>
                )}

                {message && (
                  <div className="sm:col-span-2">
                    <div className="text-stone-500">සටහන:</div>
                    <div className="text-[#2B2526] mt-0.5 italic">
                      "{message}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EFE6E4]">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                ← සංස්කරණයට ආපසු
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F5C518]" />
                <span>පරිත්‍යාග අභිප්‍රාය තහවුරු කරන්න</span>
              </button>
            </div>
          </div>
        )}

        {/* Confirmed Step */}
        {step === 'confirmed' && (
          <div className="text-center py-8 px-4 space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#FDF4F5] text-[#9C1C24] mx-auto flex items-center justify-center border-2 border-[#EFCED1]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
                ඔබගේ පරිත්‍යාග අභිප්‍රාය සාර්ථකව ලියාපදිංචි විය!
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                මෙත් රූපවාහිනී ශාසනික මාධ්‍ය මෙහෙවර සමඟ එක්වීම පිළිබඳව අපගේ ශ්‍රද්ධාපූර්වක පුණ්‍යානුමෝදනාව පිරිනමමු.
              </p>
            </div>

            {/* Reference Number Badge */}
            <div className="p-4 bg-[#FAF7F5] border border-[#EFE6E4] rounded-2xl space-y-2">
              <div className="text-xs text-stone-500">
                ඔබගේ පරිත්‍යාග යොමු අංකය (Reference Number):
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-base sm:text-lg font-bold text-[#650F18] tracking-wider">
                  {generatedRef}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1.5 text-stone-500 hover:text-[#9C1C24] rounded-lg transition-colors cursor-pointer"
                  title="යොමු අංකය පිටපත් කරන්න"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 text-left space-y-1">
              <div className="font-semibold text-amber-900">මීළඟ පියවර:</div>
              <p className="leading-relaxed">
                මෙත් රූපවාහිනී කාර්යාලයෙන් ඔබගේ දුරකථන අංකයට ({telephone}) අමතා නිල තොරතුරු ලබාදෙනු ඇත. ඕනෑම විමසීමක් සඳහා ඔබගේ යොමු අංකය (<strong>{generatedRef}</strong>) සමඟ <strong>0342 263 646</strong> අමතන්න.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                තවත් පරිත්‍යාගයක් කරන්න
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  මුල් පිටුවට ආපසු යන්න
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
