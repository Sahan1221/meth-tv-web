import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShieldCheck, 
  Info, 
  Layers,
  HeartHandshake,
  Heart
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { contentRepo } from '../services/contentRepository';
import { DayakathwayaOpportunity } from '../types';

interface DayakathwayaPageProps {
  onNavigate?: (route: string) => void;
}

export const DayakathwayaPage: React.FC<DayakathwayaPageProps> = ({ onNavigate }) => {
  const { 
    activeDayakathwayaCategories, 
    availableOpportunities, 
    refreshData 
  } = useContent();

  // Workflow Step State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // Step 2: Selected Opportunity
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string>('');
  const [customProgramDescription, setCustomProgramDescription] = useState<string>('');

  // Step 3: Sponsor Form Details
  const [fullName, setFullName] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [proposedAmount, setProposedAmount] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'දුරකථන ඇමතුම්' | 'WhatsApp' | 'විද්‍යුත් තැපෑල'>('දුරකථන ඇමතුම්');
  const [consent, setConsent] = useState<boolean>(true);

  // Submission result
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedRef, setGeneratedRef] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Derived category & opportunity
  const selectedCategory = activeDayakathwayaCategories.find(c => c.id === selectedCategoryId);
  const matchingOpportunities = availableOpportunities.filter(o => o.categoryId === selectedCategoryId);
  const selectedOpportunity = availableOpportunities.find(o => o.id === selectedOpportunityId);

  // Step validation
  const handleProceedFromStep1 = () => {
    if (!selectedCategoryId) {
      setErrors({ category: 'කරුණාකර දායකත්ව කාණ්ඩයක් තෝරන්න.' });
      return;
    }
    setErrors({});
    setCurrentStep(2);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleProceedFromStep2 = () => {
    if (selectedCategory?.title === 'වෙනත් විශේෂ වැඩසටහනක්' && !customProgramDescription.trim()) {
      setErrors({ opportunity: 'කරුණාකර ඔබ බලාපොරොත්තු වන වැඩසටහනේ විස්තරය සටහන් කරන්න.' });
      return;
    }
    setErrors({});
    setCurrentStep(3);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleProceedFromStep3 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.';
    if (!telephone.trim()) errs.telephone = 'කරුණාකර ඔබගේ දුරකථන අංකය ඇතුළත් කරන්න.';
    else if (telephone.trim().length < 9) errs.telephone = 'වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න.';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ලබාදෙන්න.';
    }
    if (!consent) {
      errs.consent = 'ඉදිරියට යාම සඳහා එකඟතාව තහවුරු කළ යුතුය.';
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setCurrentStep(4);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = () => {
    const amtNum = proposedAmount ? parseInt(proposedAmount.replace(/[^0-9]/g, ''), 10) : undefined;

    const newRequest = contentRepo.createDayakathwayaRequest({
      applicantName: fullName.trim(),
      telephone: telephone.trim(),
      email: email.trim() || undefined,
      categoryId: selectedCategory?.id || 'cat-custom',
      categoryTitle: selectedCategory?.title || 'වෙනත්',
      opportunityId: selectedOpportunity?.id || undefined,
      opportunityTitle: selectedOpportunity?.title || customProgramDescription.trim() || undefined,
      proposedAmount: amtNum || selectedOpportunity?.suggestedAmount || undefined,
      preferredDate: preferredDate || selectedOpportunity?.eventDate || undefined,
      message: message.trim() || undefined,
      preferredContactMethod,
      consent,
      requestStatus: 'නව ඉල්ලීම',
      paymentStatus: 'නොගෙවූ',
    });

    setGeneratedRef(newRequest.referenceNumber);
    refreshData();
    setCurrentStep(5);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleCopyRef = () => {
    if (navigator.clipboard && generatedRef) {
      navigator.clipboard.writeText(generatedRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const resetAll = () => {
    setCurrentStep(1);
    setSelectedCategoryId('');
    setSelectedOpportunityId('');
    setCustomProgramDescription('');
    setFullName('');
    setTelephone('');
    setEmail('');
    setProposedAmount('');
    setPreferredDate('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Philanthropy Suite Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#EFE6E4] rounded-2xl shadow-xs max-w-xl mx-auto">
        <button
          onClick={() => onNavigate?.('/dayakathwaya')}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer bg-[#9C1C24] text-white shadow-xs"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>01. වැඩසටහන් දායකත්වය</span>
        </button>
        <button
          onClick={() => onNavigate?.('/donations')}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-[#650F18] hover:bg-[#FAF7F5]"
        >
          <Heart className="w-4 h-4" />
          <span>02. සදහම් පරිත්‍යාග</span>
        </button>
      </div>

      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-[#FFF5F6] via-[#FAF7F5] to-white rounded-3xl p-8 sm:p-12 border border-[#EFCED1] shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="text-xs font-semibold text-[#9C1C24] font-sans flex items-center gap-1.5">
            <span>සදහම් වැඩසටහන් දායකත්වය</span>
            <span aria-hidden="true">·</span>
            <span>Dayakathwaya Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650F18] font-sinhala-serif leading-tight">
            දායකත්වයක් භාර ගැනීම
          </h1>

          <p className="text-sm sm:text-base text-[#2B2526] leading-relaxed font-sans">
            මෙත් රූපවාහිනියේ විකාශය වන ධර්ම දේශනාවක්, පොහෝ දින සජීවී වැඩසටහනක්, ආගමික උත්සවයක් හෝ සුවිශේෂී ශාසනික මෙහෙවරක් සඳහා ප්‍රධාන දායකත්වය භාරගෙන කුසල් සම්භාරයක් රැස්කර ගන්න.
          </p>

          {/* Stepper Indicator */}
          <div className="pt-4 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs font-medium scrollbar-none">
            {[
              { num: 1, label: 'කාණ්ඩය තේරීම' },
              { num: 2, label: 'වැඩසටහන තේරීම' },
              { num: 3, label: 'දායක තොරතුරු' },
              { num: 4, label: 'තහවුරු කිරීම' },
              { num: 5, label: 'සම්පූර්ණයි' },
            ].map((st) => (
              <div 
                key={st.num}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg border transition-all ${
                  currentStep === st.num
                    ? 'bg-[#9C1C24] text-white border-[#9C1C24] shadow-xs font-semibold'
                    : currentStep > st.num
                    ? 'bg-[#FDF4F5] text-[#9C1C24] border-[#EFCED1]'
                    : 'bg-white/60 text-stone-500 border-[#EFE6E4]'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-white/20">
                  {st.num}
                </span>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Step 1: Select Sponsorship Category */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-10 shadow-xs space-y-6 animate-fadeIn">
          <div className="border-b border-[#EFE6E4] pb-4">
            <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
              පියවර 1: දායකත්වය භාරගැනීමට කැමති වැඩසටහන් කාණ්ඩය තෝරන්න
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              ඔබගේ අභිමතය පරිදි පහත සඳහන් බෞද්ධ වැඩසටහන් කාණ්ඩයකින් එකක් තෝරාගන්න
            </p>
          </div>

          {errors.category && (
            <p className="text-xs text-red-600 font-medium">{errors.category}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeDayakathwayaCategories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#9C1C24] ring-2 ring-[#EFCED1] bg-[#FDF4F5] shadow-xs'
                      : 'border-[#EFE6E4] bg-[#FAF7F5] hover:border-[#9C1C24] hover:bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    {cat.imageUrl && (
                      <div className="h-28 rounded-xl overflow-hidden bg-stone-100">
                        <img
                          src={cat.imageUrl}
                          alt={cat.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-[#650F18] font-sinhala-serif leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#2B2526] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EFE6E4] flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isSelected ? 'text-[#9C1C24]' : 'text-stone-500'}`}>
                      {isSelected ? '✓ තෝරා ඇත' : 'තෝරන්න'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9C1C24]" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleProceedFromStep1}
              className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>මීළඟ පියවරට (වැඩසටහන තෝරන්න)</span>
              <ArrowRight className="w-4 h-4 text-[#F5C518]" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Step 2: Choose Available Opportunity or Specific Program */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-10 shadow-xs space-y-6 animate-fadeIn">
          <div className="border-b border-[#EFE6E4] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                පියවර 2: විශේෂිත වැඩසටහනක් හෝ පුණ්‍ය අවස්ථාවක් තෝරන්න
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                තෝරාගත් කාණ්ඩය: <strong className="text-[#650F18]">{selectedCategory?.title}</strong>
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-[#9C1C24] hover:underline self-start sm:self-auto cursor-pointer"
            >
              ← වෙනත් කාණ්ඩයක් තෝරන්න
            </button>
          </div>

          {errors.opportunity && (
            <p className="text-xs text-red-600 font-medium">{errors.opportunity}</p>
          )}

          {/* List of Published & Available Opportunities in this Category */}
          {matchingOpportunities.length > 0 ? (
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#650F18] uppercase tracking-wider">
                දැනට පවතින සජීවී දායකත්ව අවස්ථා ({matchingOpportunities.length})
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingOpportunities.map((opp) => {
                  const isSelected = selectedOpportunityId === opp.id;
                  return (
                    <div
                      key={opp.id}
                      onClick={() => {
                        setSelectedOpportunityId(opp.id);
                        if (opp.suggestedAmount) {
                          setProposedAmount(opp.suggestedAmount.toString());
                        }
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#9C1C24] ring-2 ring-[#EFCED1] bg-[#FDF4F5] shadow-xs'
                          : 'border-[#EFE6E4] bg-[#FAF7F5] hover:border-[#9C1C24]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                            ලබාගත හැක (Available)
                          </span>
                          {opp.suggestedAmount && (
                            <span className="font-bold text-[#9C1C24]">
                              රු. {opp.suggestedAmount.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-[#650F18] font-sinhala-serif">
                          {opp.title}
                        </h3>

                        <p className="text-xs text-[#2B2526] leading-relaxed line-clamp-3">
                          {opp.description}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-500">
                          {opp.eventDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              <span>{opp.eventDate}</span>
                            </span>
                          )}
                          {opp.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" />
                              <span>{opp.venue}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl text-xs text-[#650F18] space-y-2">
              <div className="font-bold text-sm">
                මෙම කාණ්ඩය සඳහා කලින් නියම කළ විශේෂිත වැඩසටහන් ලැයිස්තුවක් නොමැත.
              </div>
              <p className="leading-relaxed">
                කෙසේ වෙතත්, ඔබ කැමති දිනයක් හෝ වැඩසටහන් අභිලාෂයක් පහතින් සටහන් කර ඉල්ලීම ඉදිරිපත් කළ හැක. පරිපාලනය විසින් ඒ පිළිබඳව ඔබව දැනුවත් කරනු ඇත.
              </p>
            </div>
          )}

          {/* Custom explanation / or if "වෙනත් විශේෂ වැඩසටහනක්" */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#650F18]">
              ඔබ කැමති විශේෂ වැඩසටහන හෝ අභිප්‍රාය (විස්තර සටහන් කරන්න):
            </label>
            <textarea
              rows={3}
              value={customProgramDescription}
              onChange={(e) => setCustomProgramDescription(e.target.value)}
              placeholder="උදා: මියගිය මව්පියන්ට පින් පිණිස විශේෂ සන්ධ්‍යා දේශනාවක් හෝ පෞද්ගලික සංවත්සර පිංකමක්..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EFE6E4]">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium cursor-pointer"
            >
              ← පෙර පියවරට
            </button>
            <button
              onClick={handleProceedFromStep2}
              className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>මීළඟ පියවරට (තොරතුරු ඇතුළත් කිරීම)</span>
              <ArrowRight className="w-4 h-4 text-[#F5C518]" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Step 3: Enter Sponsor Details */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-10 shadow-xs space-y-6 animate-fadeIn">
          <div className="border-b border-[#EFE6E4] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
                පියවර 3: දායක මහත්ම/මහත්මියගේ තොරතුරු
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                වැඩසටහන් දායකත්වය සම්බන්ධීකරණය කරගැනීම සඳහා පහත තොරතුරු සම්පූර්ණ කරන්න
              </p>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-[#9C1C24] hover:underline cursor-pointer"
            >
              ← වැඩසටහන් තේරීමට ආපසු
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-semibold text-[#650F18]">
                සම්පූර්ණ නම <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="උදා: එච්. එම්. සෝමරත්න මහතා"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
              {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
            </div>

            {/* Telephone */}
            <div className="space-y-1">
              <label className="font-semibold text-[#650F18]">
                දුරකථන අංකය <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="උදා: 077 123 4567"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
              {errors.telephone && <p className="text-[11px] text-red-600">{errors.telephone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-semibold text-[#650F18]">
                විද්‍යුත් තැපෑල (Email) - විකල්පයි
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="somaratne@example.com"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
              {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
            </div>

            {/* Preferred Date */}
            <div className="space-y-1">
              <label className="font-semibold text-[#650F18]">
                කැමති දිනය හෝ කාලසීමාව (Preferred Date)
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
            </div>

            {/* Proposed Contribution Amount */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-[#650F18]">
                බලාපොරොත්තු වන දායකත්ව මුදල (Proposed Amount - LKR)
              </label>
              <input
                type="text"
                value={proposedAmount}
                onChange={(e) => setProposedAmount(e.target.value)}
                placeholder="උදා: රු. 25,000 හෝ කැමැත්ත පරිදි"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
              <p className="text-[11px] text-stone-500">
                නියමිත ගාස්තුවක් නොමැති අවස්ථාවලදී පරිපාලනය සමඟ සාකච්ඡා කර තීරණය කළ හැක.
              </p>
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-[#650F18]">
                සම්බන්ධ කරගත යුතු ප්‍රියතම ක්‍රමය:
              </label>
              <div className="flex flex-wrap gap-4 pt-1">
                {(['දුරකථන ඇමතුම්', 'WhatsApp', 'විද්‍යුත් තැපෑල'] as const).map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      checked={preferredContactMethod === m}
                      onChange={() => setPreferredContactMethod(m)}
                      className="text-[#9C1C24]"
                    />
                    <span className="text-stone-800">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dedication Message */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-[#650F18]">
                පුණ්‍යානුමෝදනාව හෝ විශේෂ පණිවිඩය (Message / Dedication)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="මියගිය ඥාතීන්ගේ නම්, සෙත් පැතීමට බලාපොරොත්තු වන පවුලේ සාමාජිකයන්ගේ නම් මෙහි සටහන් කරන්න..."
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] text-[#2B2526]"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="sm:col-span-2 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 text-[#9C1C24] rounded border-[#EFE6E4] mt-0.5"
                />
                <span className="text-stone-600 leading-relaxed">
                  මෙම තොරතුරු මෙත් රූපවාහිනී පරිපාලනය විසින් දායකත්ව සම්බන්ධීකරණය සඳහා පමණක් භාවිතා කිරීමට මාගේ එකඟතාව පිරිනමමි.
                </span>
              </label>
              {errors.consent && <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EFE6E4]">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium cursor-pointer"
            >
              ← පෙර පියවරට
            </button>
            <button
              onClick={handleProceedFromStep3}
              className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>මීළඟ පියවරට (සමාලෝචනය)</span>
              <ArrowRight className="w-4 h-4 text-[#F5C518]" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Step 4: Review and Submit */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-[#EFE6E4] p-6 sm:p-10 shadow-xs space-y-6 animate-fadeIn">
          <div className="border-b border-[#EFE6E4] pb-4">
            <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
              පියවර 4: දායකත්ව ඉල්ලුම්පත සමාලෝචනය හා තහවුරු කිරීම
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              ඉල්ලුම්පත ඉදිරිපත් කිරීමට පෙර ඔබ ඇතුළත් කළ තොරතුරු පරීක්ෂා කරන්න
            </p>
          </div>

          <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#EFE6E4] space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-stone-500">වැඩසටහන් කාණ්ඩය:</div>
                <div className="font-bold text-[#650F18] text-sm mt-0.5 font-sinhala-serif">
                  {selectedCategory?.title}
                </div>
              </div>

              <div>
                <div className="text-stone-500">තෝරාගත් අවස්ථාව / විස්තරය:</div>
                <div className="font-bold text-[#9C1C24] text-sm mt-0.5 font-sinhala-serif">
                  {selectedOpportunity?.title || customProgramDescription || 'විශේෂ වැඩසටහනක්'}
                </div>
              </div>

              <div>
                <div className="text-stone-500">දායක නම:</div>
                <div className="font-semibold text-[#2B2526] mt-0.5">{fullName}</div>
              </div>

              <div>
                <div className="text-stone-500">දුරකථන අංකය:</div>
                <div className="font-semibold text-[#2B2526] mt-0.5">{telephone}</div>
              </div>

              {email && (
                <div>
                  <div className="text-stone-500">විද්‍යුත් තැපෑල:</div>
                  <div className="font-semibold text-[#2B2526] mt-0.5">{email}</div>
                </div>
              )}

              {preferredDate && (
                <div>
                  <div className="text-stone-500">බලාපොරොත්තු වන දිනය:</div>
                  <div className="font-semibold text-[#2B2526] mt-0.5">{preferredDate}</div>
                </div>
              )}

              <div>
                <div className="text-stone-500">යෝජිත දායක මුදල:</div>
                <div className="font-semibold text-[#650F18] mt-0.5">
                  {proposedAmount ? `රු. ${proposedAmount}` : 'සාකච්ඡා කර තීරණය කිරීමට'}
                </div>
              </div>

              <div>
                <div className="text-stone-500">සම්බන්ධ කරගත යුතු ක්‍රමය:</div>
                <div className="font-semibold text-[#2B2526] mt-0.5">{preferredContactMethod}</div>
              </div>

              {message && (
                <div className="sm:col-span-2">
                  <div className="text-stone-500">පුණ්‍යානුමෝදනාව / පණිවිඩය:</div>
                  <div className="text-[#2B2526] mt-0.5 italic">"{message}"</div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl flex items-start gap-3 text-xs text-[#650F18]">
            <Info className="w-4 h-4 text-[#E87928] shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[#2B2526]">
              <strong>සැලකිය යුතුයි:</strong> මෙය දායකත්ව ඉල්ලුම්පතක් පමණි. මෙත් රූපවාහිනී පාලක මණ්ඩලය විසින් ඉල්ලීම සමාලෝචනය කර අනුමත කිරීමෙන් අනතුරුව පමණක් නිල දායකත්වය තහවුරු කරනු ලැබේ.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EFE6E4]">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium cursor-pointer"
            >
              ← සංස්කරණයට ආපසු
            </button>
            <button
              onClick={handleFinalSubmit}
              className="px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-sm font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F5C518]" />
              <span>දායකත්ව ඉල්ලුම්පත ඉදිරිපත් කරන්න</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Step 5: Confirmation with Reference Number */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-[#EFE6E4] p-8 sm:p-12 shadow-xs text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#FDF4F5] text-[#9C1C24] mx-auto flex items-center justify-center border-2 border-[#EFCED1]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
              ඔබගේ දායකත්ව ඉල්ලුම්පත සාර්ථකව ලැබිණි!
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              මෙත් රූපවාහිනී පාලක මණ්ඩලය විසින් ඔබගේ ඉල්ලීම කඩිනමින් සමාලෝචනය කරනු ඇත.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-4 bg-[#FAF7F5] border border-[#EFE6E4] rounded-2xl space-y-2">
            <div className="text-xs text-stone-500">
              ඔබගේ දායකත්ව යොමු අංකය (Reference Number):
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

          <div className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl text-xs text-[#650F18] text-left space-y-1">
            <div className="font-semibold text-[#650F18]">ඉදිරි පියවර:</div>
            <p className="leading-relaxed text-[#2B2526]">
              මෙත් රූපවාහිනී කාර්යාලය විසින් ඔබගේ දුරකථන අංකයට ({telephone}) අමතා විකාශන දිනය සහ වැඩසටහන් පිළිවෙළ තහවුරු කරනු ලැබේ. හදිසි කරුණු සඳහා යොමු අංකය (<strong>{generatedRef}</strong>) සමඟ <strong>0342 263 646</strong> අමතන්න.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={resetAll}
              className="px-5 py-2.5 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              තවත් දායකත්වයක් ලියාපදිංචි කරන්න
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/')}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2B2526] rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                මුල් පිටුවට ආපසු
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
