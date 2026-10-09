// LanguageGate — full-screen picker shown once on first load.
// Two big farmer-friendly buttons. Persists to localStorage.
import React from 'react';
import { Logo } from './Logo';
import { Lang, STR } from '../i18n';

interface LanguageGateProps {
  onPick: (l: Lang) => void;
}

export const LanguageGate: React.FC<LanguageGateProps> = ({ onPick }) => (
  <div className="min-h-screen bg-[#f6faff] flex flex-col items-center justify-center px-6 py-10">
    <div className="w-full max-w-sm mx-auto space-y-6 text-center">
      <div className="flex justify-center">
        <Logo size={72} />
      </div>
      <div className="space-y-1">
        <h1 className="font-bold text-[#00172d] text-2xl leading-tight">
          {STR.bn.gateTitle}
        </h1>
        <p className="text-[#006a69] font-medium text-base">{STR.bn.gateSub}</p>
        <p className="text-[#43474d] text-sm pt-1">{STR.bn.gateHint}</p>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onPick('bn')}
          className="w-full min-h-[64px] bg-[#006a69] text-white rounded-2xl shadow-md active:scale-[0.98] transition-all px-4 py-3"
        >
          <span className="block font-bold text-xl">বাংলা</span>
          <span className="block text-sm text-[#98f2f0]">Bangla — কৃষকের ভাষায়</span>
        </button>
        <button
          onClick={() => onPick('en')}
          className="w-full min-h-[64px] bg-white text-[#00172d] border-2 border-[#006a69] rounded-2xl shadow-xs active:scale-[0.98] transition-all px-4 py-3"
        >
          <span className="block font-bold text-xl">English</span>
          <span className="block text-sm text-[#43474d]">English — for judges & experts</span>
        </button>
      </div>
      <p className="text-xs text-[#73777e]">CropWise by Arekta Team • NASA Space Apps 2026</p>
    </div>
  </div>
);
