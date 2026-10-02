import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack?: () => void;
  label?: string;
  className?: string;
  isLightBg?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onBack,
  label = 'Back',
  className = '',
  isLightBg = false,
}) => {
  if (!onBack) return null;

  return (
    <div className={`mb-6 flex items-center ${className}`}>
      <button
        onClick={onBack}
        type="button"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer hover:-translate-x-1 active:translate-x-0 ${
          isLightBg
            ? 'bg-[#111111] text-[#C8A96A] hover:bg-[#181818] hover:text-white border border-[#C8A96A]/40'
            : 'bg-[#181818] text-[#C8A96A] hover:bg-[#222222] hover:text-white border border-[#C8A96A]/40'
        }`}
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="w-4 h-4 text-[#C8A96A]" />
        <span>← {label}</span>
      </button>
    </div>
  );
};
