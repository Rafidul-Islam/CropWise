import React from 'react';
import { Logo } from './Logo';
import { Lang } from '../i18n';

interface HeaderProps {
  onOpenFarm: () => void;
  isOnline: boolean;
  onToggleOnline: () => void;
  lang: Lang;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenFarm,
  isOnline,
  onToggleOnline,
  lang,
  onToggleLang,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f6faff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      {/* Top Banner Ribbon */}
      <div className="bg-[#0b2c4a] text-white px-margin py-1 flex items-center justify-between text-[11px] sm:text-xs">
        <span className="font-label-sm font-semibold tracking-wider uppercase opacity-90 truncate mr-2">
          CROPWISE • NASA SPACE APPS 2026
        </span>
        <button
          onClick={onToggleOnline}
          className="flex items-center gap-1.5 flex-shrink-0 hover:opacity-90 active:scale-95 transition-transform"
          title="Click to toggle simulated 2G Offline cache"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isOnline ? 'bg-[#98f2f0] animate-pulse' : 'bg-[#ffba3b]'
            }`}
          />
          <span className="font-label-sm font-bold text-[#98f2f0]">
            {isOnline
              ? lang === 'bn'
                ? '২জি অফলাইন প্রস্তুত'
                : '2G OFFLINE READY'
              : lang === 'bn'
                ? 'অফলাইন সংরক্ষিত'
                : 'OFFLINE CACHED'}
          </span>
        </button>
      </div>

      {/* Main Header Bar */}
      <div className="h-20 px-margin flex items-center justify-between gap-2 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Logo size={40} />
          <div className="flex flex-col min-w-0 flex-1">
            <h1 className="font-headline-sm font-bold text-[#00172d] truncate leading-tight text-lg">
              CropWise
            </h1>
            <span className="text-[#006a69] font-medium leading-none truncate text-xs">
              by Arekta Team
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Language toggle */}
          <button
            onClick={onToggleLang}
            className="h-9 px-2.5 rounded-full bg-[#0b2c4a] text-white flex items-center gap-1 active:scale-95 shadow-xs"
            title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            <span className="font-bold text-xs">{lang === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* My Farm Button */}
          <button
            onClick={onOpenFarm}
            className="w-9 h-9 rounded-full bg-[#00172d] text-white flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform shadow-sm hover:bg-[#0b2c4a]"
            title={lang === 'bn' ? 'আমার খামার' : 'My Farm'}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
