import React from 'react';
import { Phone, Mail, Tv, ExternalLink, Shield, Heart, HeartHandshake, Play, Calendar, Image as ImageIcon } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../../services/youtubeService';
import { MethTvLogo } from './MethTvLogo';
import { BRAND_CONFIG } from '../../config/brand';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#4A0B10] text-[#F5E6E8] border-t border-[#7A131E]">
      {/* Upper subtle accent border in Buddhist flag colors inspired by Lotus crest */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2045A3] via-[#F5C518] via-[#9C1C24] via-white to-[#E87928]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="p-2 rounded-2xl bg-white shadow-md inline-block">
              <MethTvLogo size="md" variant="light" />
            </div>

            <p className="text-[#F1D5D8] text-xs leading-relaxed font-sans pt-1">
              සම්බුද්ධ ශාසනයේ අභිවෘද්ධියත්, ලෝවැසි ජනතාවගේ ආධ්‍යාත්මික සුවයත් උදෙසා පිරිසිදු ත්‍රිපිටක සද්ධර්මය ලොව පුරා බෙදාහරින උතුම් බෞද්ධ රූපවාහිනී මාධ්‍ය මෙහෙවර.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-[#650F18] border border-[#9C1C24] px-3 py-1.5 rounded-xl text-[#F5C518] text-xs font-semibold">
                <Tv className="w-4 h-4 text-[#F5C518]" />
                <span>SLT PEO TV Channel 111</span>
              </div>
            </div>
          </div>

          {/* Col 2: Media & Broadcasting */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/15 pb-2">
              මාධ්‍ය සහ විකාශන
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8C5C8]">
              <li>
                <button
                  onClick={() => onNavigate('/live')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Tv className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>සජීවී විකාශය (Live TV)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/programs')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>වැඩසටහන් කාලසටහන</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/videos')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>යූටියුබ් වීඩියෝ සංරක්ෂිතය</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/programs/completed')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>පුණ්‍යකර්ම ඡායාරූප ගැලරි</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/news')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer"
                >
                  පුවත් සහ නිවේදන
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sponsorship & Official YouTube */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/15 pb-2">
              දායකත්වය සහ නාලිකා
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8C5C8]">
              <li>
                <button
                  onClick={() => onNavigate('/dayakathwaya')}
                  className="flex items-center gap-1.5 text-white font-semibold hover:text-[#F5C518] transition-colors cursor-pointer"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>වැඩසටහන් දායකත්වය (Dayakathwaya)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/donations')}
                  className="flex items-center gap-1.5 text-white font-semibold hover:text-[#F5C518] transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-[#F5C518]" />
                  <span>සදහම් පරිත්‍යාග (Donations)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer"
                >
                  නාලිකාව පිළිබඳව (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#F5C518] hover:underline transition-colors cursor-pointer"
                >
                  සම්බන්ධතා තොරතුරු (Contact)
                </button>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-300">නිල යූටියුබ් නාලිකා:</div>
              {OFFICIAL_CHANNELS.slice(0, 2).map((ch, idx) => (
                <a
                  key={idx}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#E8C5C8] hover:text-[#F5C518] transition-colors truncate"
                >
                  <ExternalLink className="w-3 h-3 text-[#F5C518] shrink-0" />
                  <span className="truncate">{ch.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans border-b border-white/15 pb-2">
              සම්බන්ධ කර ගැනීමට
            </h4>
            <div className="space-y-3 text-xs text-[#E8C5C8]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-300">දුරකථන අංකය:</div>
                  <a href={`tel:${BRAND_CONFIG.telephone.replace(/\s+/g, '')}`} className="text-white hover:text-[#F5C518] font-semibold font-mono">
                    {BRAND_CONFIG.telephone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-300">විද්‍යුත් තැපෑල:</div>
                  <a href={`mailto:${BRAND_CONFIG.email}`} className="text-white hover:text-[#F5C518] font-semibold break-all">
                    {BRAND_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Tv className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <div className="text-stone-300">නිල වෙබ් අඩවිය:</div>
                  <a href={BRAND_CONFIG.website} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F5C518] font-semibold font-mono">
                    methtv.lk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8B4B8]">
          <div>
            © {new Date().getFullYear()} METH TV (මෙත් රූපවාහිනී). සියලු හිමිකම් ඇවිරිණි.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/admin')}
              className="flex items-center gap-1.5 text-[#D8B4B8] hover:text-[#F5C518] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>පරිපාලක පිවිසුම (/admin)</span>
            </button>
            <span className="text-white/20">·</span>
            <span>බොදුනුවන්ගේ හදවතේ නාලිකාව</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
