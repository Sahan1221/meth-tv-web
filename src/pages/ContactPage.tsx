import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Send, CheckCircle, Tv, AlertCircle } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../services/youtubeService';
import { BRAND_CONFIG } from '../config/brand';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'කරුණාකර ඔබගේ දුරකථන අංකය ඇතුළත් කරන්න.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'කරුණාකර විමසීමේ මාතෘකාව ඇතුළත් කරන්න.';
    }
    if (!formData.message.trim()) {
      errs.message = 'කරුණාකර ඔබගේ පණිවිඩය සටහන් කරන්න.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#EFE6E4] pb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#650F18] font-sinhala-serif">
          මෙත් රූපවාහිනිය හා සම්බන්ධ වන්න
        </h1>
        <p className="text-sm text-[#2B2526] mt-2 max-w-3xl leading-relaxed">
          වැඩසටහන් පිළිබඳ තොරතුරු විමසීම, පින්කම් සඳහා අනුග්‍රහය දැක්වීම හෝ ඔබගේ අදහස් සහ යෝජනා අප වෙත යොමු කරන්න.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6E4] shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-[#650F18] font-sinhala-serif border-b border-[#EFE6E4] pb-3">
              නිල සම්බන්ධතා තොරතුරු
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FDF4F5] text-[#9C1C24] shrink-0">
                  <Phone className="w-5 h-5 text-[#9C1C24]" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">දුරකථන අංකය</div>
                  <a
                    href={`tel:${BRAND_CONFIG.telephone.replace(/\s+/g, '')}`}
                    className="text-base font-bold text-[#650F18] hover:text-[#9C1C24] transition-colors"
                  >
                    {BRAND_CONFIG.telephone}
                  </a>
                  <div className="text-[11px] text-stone-400 mt-0.5">කාර්යාල වේලාවන් තුළ විමසන්න</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FDF4F5] text-[#9C1C24] shrink-0">
                  <Mail className="w-5 h-5 text-[#9C1C24]" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">විද්‍යුත් තැපෑල (Email)</div>
                  <a
                    href={`mailto:${BRAND_CONFIG.email}`}
                    className="text-sm sm:text-base font-semibold text-[#650F18] hover:text-[#9C1C24] transition-colors break-all"
                  >
                    {BRAND_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FDF4F5] text-[#9C1C24] shrink-0">
                  <Tv className="w-5 h-5 text-[#9C1C24]" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">රූපවාහිනී විකාශනය</div>
                  <div className="text-sm font-bold text-[#650F18]">
                    SLT PEO TV Channel 111
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FDF4F5] text-[#9C1C24] shrink-0">
                  <MapPin className="w-5 h-5 text-[#9C1C24]" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">ලිපිනය</div>
                  <div className="text-xs sm:text-sm text-[#2B2526] leading-relaxed">
                    මෙත් රූපවාහිනී මැදිරිය සහ පරිපාලන කාර්යාලය, ශ්‍රී ලංකාව.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels Card */}
          <div className="bg-[#FFF7ED] rounded-3xl p-6 border border-[#FED7AA] space-y-4">
            <h3 className="text-sm font-bold text-[#650F18] font-sinhala-serif">
              ඩිජිටල් හා සමාජ මාධ්‍ය ජාල
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href={BRAND_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EFE6E4] hover:border-[#9C1C24] text-[#2B2526] hover:text-[#9C1C24] transition-colors shadow-xs"
              >
                <span className="font-medium">නිල ෆේස්බුක් පිටුව (Facebook)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#9C1C24]" />
              </a>

              {OFFICIAL_CHANNELS.map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#EFE6E4] hover:border-[#9C1C24] text-[#2B2526] hover:text-[#9C1C24] transition-colors shadow-xs"
                >
                  <span className="truncate font-medium">{ch.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9C1C24] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE6E4] shadow-xs">
            <h2 className="text-lg font-bold text-[#650F18] font-sinhala-serif border-b border-[#EFE6E4] pb-3 mb-6">
              විමසීම් සහ පණිවිඩ යොමු කිරීම
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold font-sinhala-serif">
                  ඔබගේ පණිවිඩය සාර්ථකව සටහන් කරගන්නා ලදී!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  මෙම මූලාකෘති පද්ධතිය තුළ ඔබගේ පණිවිඩය සත්‍යාපනය විය. හදිසි කරුණු සඳහා <strong>{BRAND_CONFIG.telephone}</strong> හෝ <strong>{BRAND_CONFIG.email}</strong> ඔස්සේ සෘජුවම සම්බන්ධ වන්න.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  තවත් පණිවිඩයක් යවන්න
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#650F18]">
                      ඔබගේ සම්පූර්ණ නම <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="උදා: එස්. පෙරේරා"
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                    />
                    {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#650F18]">
                      දුරකථන අංකය <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="උදා: 071 234 5678"
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                    />
                    {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#650F18]">
                    විද්‍යුත් තැපෑල (Email)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                  />
                  {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#650F18]">
                    විමසීමේ මාතෘකාව <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="උදා: වැඩසටහන් දායකත්වය හෝ විමසීම"
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                  />
                  {errors.subject && <p className="text-[11px] text-red-600">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#650F18]">
                    ඔබගේ පණිවිඩය <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="ඔබට අවශ්‍ය තොරතුරු හෝ පණිවිඩය මෙහි සටහන් කරන්න..."
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9C1C24] focus:bg-white text-[#2B2526] transition-colors"
                  />
                  {errors.message && <p className="text-[11px] text-red-600">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#9C1C24] hover:bg-[#80141D] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#F5C518]" />
                    <span>පණිවිඩය යොමු කරන්න</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
