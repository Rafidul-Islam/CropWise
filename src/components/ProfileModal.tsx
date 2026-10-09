import React from 'react';
import { UpazilaData } from '../types';
import { toBengaliNumber } from '../data/barindData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUpazila: UpazilaData;
  acre: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  selectedUpazila,
  acre,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4 border border-[#d8ebfa]">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8ebfa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a69] text-[22px]">badge</span>
            <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
              কৃষক পরিচিতি ও বিএমডিএ কার্ড
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf5ff] text-[#43474d] flex items-center justify-center hover:bg-[#d8ebfa]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Smart Card Visual */}
        <div className="rounded-xl bg-gradient-to-br from-[#0b2c4a] via-[#00172d] to-[#006a69] text-white p-4 shadow-md space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
                BMDA SMART CARD
              </span>
              <span className="text-[10px] text-[#98f2f0]">বরেন্দ্র উন্নয়ন কর্তৃপক্ষ</span>
            </div>
            <span className="material-symbols-outlined text-[#98f2f0] text-[20px]">contactless</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-white/70">কৃষকের নাম / Farmer Name</div>
            <div className="text-base font-bold font-headline-sm tracking-wide">
              মোঃ রফিকুল ইসলাম (M. Rafiqul Islam)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div>
              <span className="text-white/60 block text-[10px]">কার্ড নম্বর:</span>
              <span className="font-mono font-bold text-[#98f2f0]">BMDA-TNR-88241</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px]">নিবন্ধিত জমি:</span>
              <span className="font-bold">{toBengaliNumber(acre)} একর ({acre} Acre)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-white/80">নলকূপ ব্লক: তানোর-০৪</span>
            <span className="bg-[#98f2f0] text-[#002020] px-2 py-0.5 rounded font-bold">
              সক্রিয় কোটা: {toBengaliNumber(selectedUpazila.bmdaHoursCap)} ঘণ্টা
            </span>
          </div>
        </div>

        {/* Offline Cache Info */}
        <div className="bg-[#eaf5ff] p-3 rounded-xl space-y-1.5 text-xs text-[#0c1d28]">
          <div className="flex items-center justify-between font-bold text-[#006a69]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#006a69] animate-pulse"></span>
              2G অফলাইন ক্যাশ সক্রিয়
            </span>
            <span>NASA Space Apps 2026</span>
          </div>
          <p className="text-[#43474d] text-[11px] leading-relaxed">
            স্যাটেলাইট ও মাটির মডেলের উপাত্ত ডিভাইসে সংরক্ষিত। নেটওয়ার্ক সংযোগ ছাড়াও সমস্ত গণনা কার্যকর থাকবে।
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#006a69] text-white rounded-xl font-bold font-headline-sm hover:bg-[#00504f] transition-colors"
        >
          বন্ধ করুন (Close)
        </button>
      </div>
    </div>
  );
};
