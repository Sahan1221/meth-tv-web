import React, { useState } from 'react';
import { Info, X, ShieldCheck } from 'lucide-react';

interface PrototypeBadgeProps {
  onNavigateToAdmin?: () => void;
}

export const PrototypeBadge: React.FC<PrototypeBadgeProps> = ({ onNavigateToAdmin }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside aria-label="පද්ධති දැනුම්දීම" className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-stone-200 font-medium">මූලාකෘති මාදිලිය (Prototype Mode):</span>
          <span className="hidden sm:inline text-stone-400">
            ප්‍රකාශිත සියලු වැඩසටහන්, ඡායාරූප සහ සැකසුම් තත්‍ය කාලීනව මෙහෙයවනු ලබයි.
          </span>
          <span className="inline text-amber-400 font-medium ml-1">
            PEO TV Channel 111
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onNavigateToAdmin && (
            <button
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>පරිපාලක පිවිසුම (/admin)</span>
            </button>
          )}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="දැනුම්දීම වසන්න"
            className="text-stone-400 hover:text-stone-200 p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
