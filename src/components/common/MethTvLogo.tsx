import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

interface MethTvLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MethTvLogo: React.FC<MethTvLogoProps> = ({
  className = '',
  showTagline = false,
  variant = 'light',
  size = 'md',
}) => {
  // Height mapping based on size
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden ${
        variant === 'dark' 
          ? 'bg-white p-1 shadow-sm border border-white/30' 
          : 'bg-white/90 p-0.5'
      }`}>
        <img
          src={BRAND_CONFIG.logoPath}
          alt="මෙත් රූපවාහිනී (METH TV) නිල ලාංඡනය"
          referrerPolicy="no-referrer"
          className={`${sizeClasses[size]} w-auto object-contain transition-transform`}
        />
      </div>

      {showTagline && (
        <div className="flex flex-col justify-center">
          <span className={`text-base sm:text-lg font-bold font-sinhala-serif leading-tight ${
            variant === 'dark' ? 'text-white' : 'text-[#650F18]'
          }`}>
            මෙත් රූපවාහිනී
          </span>
          <span className={`text-[11px] font-medium leading-tight ${
            variant === 'dark' ? 'text-[#F5C518]' : 'text-[#9C1C24]'
          }`}>
            බොදුනුවන්ගේ හදවතේ නාලිකාව
          </span>
        </div>
      )}
    </div>
  );
};
