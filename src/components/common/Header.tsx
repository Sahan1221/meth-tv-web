import React, { useState } from 'react';
import { Menu, X, Tv, Shield, ChevronDown, Calendar, Play, Image as ImageIcon, HeartHandshake, Heart, Phone, Info } from 'lucide-react';
import { MethTvLogo } from './MethTvLogo';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isProgramsActive = 
    currentRoute === '/programs' || 
    currentRoute === '/videos' || 
    currentRoute === '/programs/completed' || 
    currentRoute.startsWith('/events/');

  const isGivingActive = 
    currentRoute === '/dayakathwaya' || 
    currentRoute === '/donations';

  const isAboutActive = 
    currentRoute === '/about' || 
    currentRoute === '/contact';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EFE6E4] shadow-[0_2px_12px_rgba(101,15,24,0.03)] transition-colors">
      {/* Sacred Buddhist Flag Color Accent Line inspired by Lotus Crest */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2045A3] via-[#F5C518] via-[#9C1C24] via-white to-[#E87928]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Official Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
            aria-label="මෙත් රූපවාහිනී මුල් පිටුවට යන්න"
          >
            <div className="p-1 rounded-xl bg-white border border-[#EFE6E4] shadow-xs group-hover:border-[#EFCED1] transition-colors">
              <MethTvLogo size="md" />
            </div>
            <div className="hidden xl:block">
              <div className="text-base font-bold tracking-tight text-[#650F18] leading-tight font-sinhala-serif">
                මෙත් රූපවාහිනී
              </div>
              <div className="text-[11px] font-semibold tracking-wider text-[#9C1C24] uppercase font-sans flex items-center gap-1.5">
                <span>PEO TV Channel 111</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E87928]" />
                <span className="text-stone-500 font-normal">බොදු හදවතේ නාලිකාව</span>
              </div>
            </div>
          </button>

          {/* Zone 2: Streamlined 6-Item Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-[#2B2526]">
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('/')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                currentRoute === '/'
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span>මුල් පිටුව</span>
              {currentRoute === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>

            {/* 2. Live TV */}
            <button
              onClick={() => handleNavClick('/live')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer flex items-center gap-1.5 ${
                currentRoute === '/live'
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9C1C24] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9C1C24]" />
              </span>
              <span>සජීවී විකාශය</span>
              {currentRoute === '/live' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>

            {/* 3. Unified Media Hub (Programs, Videos, Galleries) */}
            <button
              onClick={() => handleNavClick('/programs')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                isProgramsActive
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span>වැඩසටහන් සහ මාධ්‍ය</span>
              {isProgramsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>

            {/* 4. Unified Dayakathwaya & Donations */}
            <button
              onClick={() => handleNavClick('/dayakathwaya')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                isGivingActive
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span>දායකත්වය සහ පරිත්‍යාග</span>
              {isGivingActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>

            {/* 5. News */}
            <button
              onClick={() => handleNavClick('/news')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                currentRoute === '/news'
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span>පුවත් සහ නිවේදන</span>
              {currentRoute === '/news' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>

            {/* 6. About & Contact */}
            <button
              onClick={() => handleNavClick('/about')}
              className={`relative py-1 whitespace-nowrap transition-colors focus:outline-none cursor-pointer ${
                isAboutActive
                  ? 'text-[#9C1C24] font-bold'
                  : 'hover:text-[#9C1C24]'
              }`}
            >
              <span>නාලිකාව පිළිබඳව</span>
              {isAboutActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9C1C24] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Actions (Live Stream CTA & Admin link) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('/admin')}
              title="පරිපාලක පද්ධතිය (Admin Portal)"
              className="p-2 text-stone-500 hover:text-[#9C1C24] hover:bg-[#FDF4F5] rounded-xl transition-colors focus:outline-none cursor-pointer border border-transparent hover:border-[#EFCED1]"
            >
              <Shield className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('/live')}
              className="flex items-center gap-2 px-4 py-2 text-xs xl:text-sm font-semibold text-white bg-[#9C1C24] hover:bg-[#80141D] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Tv className="w-4 h-4 text-[#F5C518]" />
              <span>නරඹන්න (Live)</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/live')}
              className="p-2 text-white bg-[#9C1C24] rounded-lg sm:hidden cursor-pointer"
              aria-label="සජීවී විකාශය"
            >
              <Tv className="w-4 h-4 text-[#F5C518]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2B2526] hover:text-[#9C1C24] hover:bg-[#FDF4F5] rounded-lg transition-colors cursor-pointer"
              aria-label="මෙනුව විවෘත කරන්න"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Organized Sub-Sections */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EFE6E4] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                currentRoute === '/'
                  ? 'bg-[#FDF4F5] text-[#9C1C24]'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              මුල් පිටුව
            </button>

            <button
              onClick={() => handleNavClick('/live')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                currentRoute === '/live'
                  ? 'bg-[#FDF4F5] text-[#9C1C24]'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <span>සජීවී විකාශය (Live TV)</span>
              <span className="text-[10px] bg-[#9C1C24] text-white px-2 py-0.5 rounded-md font-bold uppercase">Live</span>
            </button>
          </div>

          {/* Section: Programs & Media */}
          <div className="pt-2 border-t border-[#EFE6E4] space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1">
              වැඩසටහන් සහ මාධ්‍ය
            </div>
            <button
              onClick={() => handleNavClick('/programs')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/programs'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#9C1C24]" />
              <span>වැඩසටහන් කාලසටහන</span>
            </button>
            <button
              onClick={() => handleNavClick('/videos')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/videos'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <Play className="w-4 h-4 text-[#9C1C24]" />
              <span>වීඩියෝ සංරක්ෂිතය (YouTube)</span>
            </button>
            <button
              onClick={() => handleNavClick('/programs/completed')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/programs/completed'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#9C1C24]" />
              <span>පුණ්‍යකර්ම ඡායාරූප ගැලරි</span>
            </button>
          </div>

          {/* Section: Sponsorship & Donations */}
          <div className="pt-2 border-t border-[#EFE6E4] space-y-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1">
              දායකත්වය සහ පරිත්‍යාග
            </div>
            <button
              onClick={() => handleNavClick('/dayakathwaya')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/dayakathwaya'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-[#9C1C24]" />
              <span>වැඩසටහන් දායකත්වයක් භාර ගැනීම</span>
            </button>
            <button
              onClick={() => handleNavClick('/donations')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                currentRoute === '/donations'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              <Heart className="w-4 h-4 text-[#9C1C24]" />
              <span>සාමාන්‍ය සහ ව්‍යාපෘති පරිත්‍යාග</span>
            </button>
          </div>

          {/* Section: News & Network */}
          <div className="pt-2 border-t border-[#EFE6E4] space-y-1">
            <button
              onClick={() => handleNavClick('/news')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                currentRoute === '/news'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              පුවත් සහ නිවේදන
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                currentRoute === '/about'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              නාලිකාව පිළිබඳව (About METH TV)
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                currentRoute === '/contact'
                  ? 'bg-[#FDF4F5] text-[#9C1C24] font-bold'
                  : 'text-[#2B2526] hover:bg-[#FAF7F5]'
              }`}
            >
              සම්බන්ධ වන්න (Contact)
            </button>
          </div>

          {/* Admin link */}
          <div className="pt-3 border-t border-[#EFE6E4]">
            <button
              onClick={() => handleNavClick('/admin')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#650F18] bg-[#FAF7F5] border border-[#EFE6E4] rounded-xl hover:bg-[#FDF4F5]"
            >
              <Shield className="w-4 h-4 text-[#9C1C24]" />
              <span>පරිපාලක පද්ධතියට පිවිසෙන්න</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
