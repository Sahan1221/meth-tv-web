import React from 'react';
import { Tv, Sparkles, Heart, Globe, Radio, CheckCircle2, HeartHandshake } from 'lucide-react';
import { MethTvLogo } from '../components/common/MethTvLogo';
import { BRAND_CONFIG } from '../config/brand';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero / Brand Statement with Official Logo */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="p-3 rounded-2xl bg-white border border-[#EFE6E4] shadow-xs inline-block">
          <MethTvLogo size="lg" />
        </div>
        <div className="text-xs font-bold uppercase text-[#9C1C24] tracking-wider font-sans">
          මෙත් රූපවාහිනී සන්නාම අනන්‍යතාව
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#650F18] font-sinhala-serif">
          මෙත් රූපවාහිනී — METH TV
        </h1>
        <p className="text-lg sm:text-xl text-[#9C1C24] font-serif italic">
          "{BRAND_CONFIG.tagline}"
        </p>
        <p className="text-sm sm:text-base text-[#2B2526] leading-relaxed font-sans pt-2">
          ශ්‍රී ලංකාවේ ප්‍රමුඛතම බෞද්ධ රූපවාහිනී මාධ්‍ය ජාලයක් වන මෙත් රූපවාහිනිය (METH TV), පිරිසිදු ත්‍රිපිටක බුද්ධ ධර්මය මුල් කරගනිමින් මුළු මහත් බෞද්ධ ජනතාවගේ ආධ්‍යාත්මික සුවය උදෙසා කැපවී ක්‍රියා කරයි.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-[#EFE6E4] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF4F5] text-[#9C1C24] flex items-center justify-center">
            <Radio className="w-6 h-6 text-[#9C1C24]" />
          </div>
          <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
            අපගේ දැක්ම (Vision)
          </h2>
          <p className="text-sm text-[#2B2526] leading-relaxed">
            පිරිසිදු ථේරවාදී සම්බුද්ධ ධර්මය ලොව පුරා පතුරුවා හරිමින්, සත්වයන්ගේ සසර දුක් නිවාලීමටත්, ධර්මාවබෝධය තුළින් ගුණගරුක හා ශාන්ත සමාජයක් බිහිකිරීමටත් නායකත්වය දීම.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#EFE6E4] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF4F5] text-[#9C1C24] flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#9C1C24]" />
          </div>
          <h2 className="text-xl font-bold text-[#650F18] font-sinhala-serif">
            අපගේ මෙහෙවර (Mission)
          </h2>
          <p className="text-sm text-[#2B2526] leading-relaxed">
            නවීන රූපවාහිනී සහ ඩිජිටල් තාක්ෂණය උපයෝගී කරගනිමින්, උසස් ගුණාත්මකභාවයෙන් යුතු ධර්ම දේශනා, සතිමත් භාවනා වැඩසටහන්, සම්බුද්ධ පූජා සහ ආගමික පුණ්‍යකර්ම විකාශයන් නොකඩවා සමාජගත කිරීම.
          </p>
        </div>
      </div>

      {/* Broadcasting Channels Info */}
      <div className="bg-gradient-to-br from-[#FFF5F6] via-[#FAF7F5] to-white rounded-3xl p-8 sm:p-12 border border-[#EFCED1] space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
            විකාශන ජාලය සහ තාක්ෂණික සේවා
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            ශ්‍රී ලංකාව තුළ සහ ලොව පුරා විකාශය වන අයුරු
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#9C1C24] font-bold text-sm">
              <Tv className="w-5 h-5 text-[#9C1C24]" />
              <span>SLT PEO TV</span>
            </div>
            <div className="text-2xl font-bold text-[#650F18] font-mono">
              Channel 111
            </div>
            <p className="text-xs text-[#2B2526] leading-relaxed">
              ශ්‍රී ලංකා ටෙලිකොම් PEO TV ජාලය ඔස්සේ මුළු දිවයින පුරා අධි-විභේදන (HD) තාක්ෂණයෙන් යුතුව සජීවීව නැරඹිය හැක.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#9C1C24] font-bold text-sm">
              <Radio className="w-5 h-5 text-[#9C1C24]" />
              <span>YouTube Official Channels</span>
            </div>
            <div className="text-sm font-bold text-[#650F18]">
              නාලිකා 3ක් ඔස්සේ
            </div>
            <p className="text-xs text-[#2B2526] leading-relaxed">
              METH TV නිල නාලිකාව, පූජ්‍ය ගලිගමුවේ ඥාණදීප හිමි නාලිකාව සහ සදහම් වැඩසටහන් නාලිකාව ඔස්සේ අන්තර්ජාල ප්‍රේක්ෂකයන්ට.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EFE6E4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#9C1C24] font-bold text-sm">
              <Globe className="w-5 h-5 text-[#9C1C24]" />
              <span>නිල ඩිජිටල් වෙබ් අඩවිය</span>
            </div>
            <div className="text-sm font-bold text-[#650F18] font-mono">
              methtv.lk
            </div>
            <p className="text-xs text-[#2B2526] leading-relaxed">
              සජීවී විකාශය, වැඩසටහන් කාලසටහන, අවසන් වූ පුණ්‍යකර්ම ඡායාරූප ගැලරි සහ නවතම නිවේදන එක්තැන් වූ නිල ඩිජිටල් ද්වාරය.
            </p>
          </div>
        </div>
      </div>

      {/* Organization History Section */}
      <div className="bg-white rounded-3xl p-8 border border-[#EFE6E4] shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-[#650F18] font-sinhala-serif">
          නාලිකාවේ ඉතිහාසය සහ සංවිධානාත්මක පසුබිම
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-[#2B2526] leading-relaxed">
          <p>
            පූජනීය මහා සංඝරත්නයේ අවවාද අනුශාසනා පරිදි ආරම්භ කරන ලද මෙත් රූපවාහිනිය (METH TV), බෞද්ධ සන්නිවේදන ක්ෂේත්‍රය තුළ ප්‍රේක්ෂක විශ්වාසය දිනාගත් ගෞරවනීය ආයතනයකි.
          </p>
          <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#EFE6E4] text-xs text-[#2B2526] space-y-1">
            <div className="font-bold text-[#650F18]">
              සංවිධානාත්මක ලේඛනාගාර සටහන (Institutional Archive Note):
            </div>
            <p>
              ආයතනයේ නිල ලියාපදිංචි අංක, වාර්ෂික මූල්‍ය හෝ පාලක මණ්ඩල සාමාජික තොරතුරු නිල වශයෙන් සත්‍යාපනය කර නිකුත් කෙරෙන තුරු සංස්කරණාත්මකව තබා ඇත. පරිපාලක පුවරුව හරහා අවශ්‍ය අවස්ථාවලදී මෙම තොරතුරු යාවත්කාලීන කළ හැක.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#EFE6E4] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#2B2526]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>පැය 24 පුරා සම්ප්‍රේෂණය වන ධර්ම වැඩසටහන්</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>දිවයිනේ ඓතිහාසික සිද්ධස්ථාන සජීවීව ආවරණය</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>පොහෝ දින පූර්ණ දින ආගමික වැඩසටහන්</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>සමාජ සත්කාරක, පරිත්‍යාග සහ පුණ්‍යාධාර ව්‍යාපෘති</span>
          </div>
        </div>
      </div>
    </div>
  );
};
