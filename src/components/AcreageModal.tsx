import React from 'react';
import { toBengaliNumber } from '../data/barindData';
import { Lang } from '../i18n';

interface AcreageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAcre: number;
  onSelectAcre: (acre: number) => void;
  lang: Lang;
}

const PRESET_ACRES = [0.5, 1.0, 1.5, 2.0, 3.0];

export const AcreageModal: React.FC<AcreageModalProps> = ({
  isOpen,
  onClose,
  currentAcre,
  onSelectAcre,
  lang,
}) => {
  if (!isOpen) return null;
  const bn = lang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4 border border-[#d8ebfa]">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8ebfa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a69] text-[22px]">straighten</span>
            <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
              {bn ? 'জমির আয়তন নির্ধারণ' : 'Set field size'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf5ff] text-[#43474d] flex items-center justify-center hover:bg-[#d8ebfa]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-label-sm text-[#43474d]">
          {bn
            ? 'আপনার নির্বাচিত জমির পরিমাণ অনুযায়ী সেচ খরচ ও পানির হিসাব স্বয়ংক্রিয়ভাবে আপডেট হবে:'
            : 'Water and cost math updates automatically to your field size:'}
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {PRESET_ACRES.map((acre) => {
            const isSelected = currentAcre === acre;
            const bigha = (acre * 3.025).toFixed(1);
            return (
              <button
                key={acre}
                onClick={() => {
                  onSelectAcre(acre);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#006a69] bg-[#98f2f0]/20 ring-2 ring-[#006a69]'
                    : 'border-[#c3c6ce] hover:border-[#006a69] bg-[#f6faff]'
                }`}
              >
                <div className="font-headline-sm font-bold text-[#00172d] text-base">
                  {bn ? `${toBengaliNumber(acre)} একর` : `${acre} acre`}
                </div>
                <div className="text-xs text-[#006a69] font-medium mt-0.5">
                  ≈ {toBengaliNumber(bigha)} {bn ? 'বিঘা' : 'bigha'}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-[#eaf5ff] p-3 rounded-xl flex items-center justify-between text-xs text-[#0b2c4a]">
          <span className="font-medium">{bn ? 'বরেন্দ্র স্ট্যান্ডার্ড অনুপাত:' : 'Barind standard:'}</span>
          <span className="font-bold">{bn ? '১ একর = ৩.০২৫ বিঘা' : '1 acre = 3.025 bigha'}</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#006a69] text-white rounded-xl font-bold font-headline-sm hover:bg-[#00504f] transition-colors"
        >
          {bn ? 'নিশ্চিত করুন' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};
