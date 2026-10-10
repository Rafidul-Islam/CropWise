// FarmerCard — BMDA-style smart card, fully data-driven.
// Card number auto-generated, stable per (name + upazila).
// Full variant for My Farm page; Mini variant for Compare header.
import React from 'react';
import { FarmerProfile, UpazilaData } from '../types';
import { toBengaliNumber } from '../data/barindData';
import { Lang } from '../i18n';

export const UPAZILA_CODE: Record<string, string> = {
  tanore: 'TNR',
  godagari: 'GDG',
  niamatpur: 'NMP',
  nachole: 'NCH',
};

export const TUBEWELL_BLOCK: Record<string, string> = {
  tanore: 'তানোর-০৪',
  godagari: 'গোদাগাড়ী-০২',
  niamatpur: 'নিয়ামতপুর-০৭',
  nachole: 'নাচোল-০৫',
};

const SOWING_BN: Record<string, string> = {
  October: 'অক্টোবর',
  November: 'নভেম্বর',
  December: 'ডিসেম্বর',
  January: 'জানুয়ারি',
};

/** Deterministic 5-digit ID from name + upazila — stable across reloads. */
export function farmerCardNo(name: string, upazilaId: string): string {
  const code = UPAZILA_CODE[upazilaId] ?? 'BRD';
  const seed = `${name.trim().toLowerCase()}|${upazilaId}`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) % 100000;
  }
  const digits = String(10000 + (h % 90000));
  return `BMDA-${code}-${digits}`;
}

interface FarmerCardProps {
  lang: Lang;
  farmer: FarmerProfile;
  upazila: UpazilaData;
  acre: number;
  ph: number;
  saved: boolean;
}

export const FarmerCard: React.FC<FarmerCardProps> = ({
  lang,
  farmer,
  upazila,
  acre,
  ph,
  saved,
}) => {
  const bn = lang === 'bn';
  const name = farmer.name.trim() === '' ? (bn ? 'নামহীন কৃষক' : 'Unnamed farmer') : farmer.name.trim();
  const cardNo = farmerCardNo(farmer.name === '' ? 'farmer' : farmer.name, upazila.id);
  const bigha = (acre * 3.025).toFixed(1);
  const used = Math.min(farmer.irrigationHours, upazila.bmdaHoursCap);
  const pct = Math.round((used / upazila.bmdaHoursCap) * 100);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0b2c4a] via-[#00172d] to-[#006a69] text-white p-5 shadow-md space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
            BMDA SMART CARD
          </span>
          <span className="text-[10px] text-[#98f2f0]">CropWise</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            saved ? 'bg-[#98f2f0] text-[#002020]' : 'bg-white/20 text-white'
          }`}
        >
          {saved ? (bn ? '✓ সংরক্ষিত' : '✓ SAVED') : bn ? 'খসড়া' : 'DRAFT'}
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-xs text-white/70">{bn ? 'কৃষকের নাম' : 'Farmer name'}</div>
        <div className="text-lg font-bold tracking-wide">{name}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <div>
          <span className="text-white/60 block text-[10px]">{bn ? 'কার্ড নম্বর:' : 'Card no:'}</span>
          <span className="font-mono font-bold text-[#98f2f0]">{cardNo}</span>
        </div>
        <div>
          <span className="text-white/60 block text-[10px]">{bn ? 'নিবন্ধিত জমি:' : 'Land:'}</span>
          <span className="font-bold">
            {bn ? `${toBengaliNumber(acre)} একর` : `${acre} acre`} ({bn ? `${toBengaliNumber(bigha)} বিঘা` : `${bigha} bigha`})
          </span>
        </div>
      </div>

      {/* Quota bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/80">
            {bn ? 'নলকূপ ব্লক:' : 'Block:'} {TUBEWELL_BLOCK[upazila.id] ?? upazila.nameBn}
          </span>
          <span className="font-bold text-[#98f2f0]">
            {bn
              ? `${toBengaliNumber(upazila.bmdaHoursCap - used)}ঘণ্টা বাকি`
              : `${upazila.bmdaHoursCap - used}h left`}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#98f2f0] h-full rounded-full transition-all"
            style={{ width: `${Math.max(0, 100 - pct)}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
        <span className="bg-white/15 px-2 py-1 rounded-full">
          pH {bn ? toBengaliNumber(ph.toFixed(1)) : ph.toFixed(1)} • {bn ? upazila.nameBn : upazila.nameEn}
        </span>
        <span className="bg-white/15 px-2 py-1 rounded-full">
          {bn ? 'বপন: ' : 'Sow: '}{bn ? (SOWING_BN[farmer.sowingMonth] ?? farmer.sowingMonth) : farmer.sowingMonth}
        </span>
      </div>
    </div>
  );
};

interface FarmerMiniProps {
  lang: Lang;
  farmerName: string;
  upazila: UpazilaData;
  acre: number;
}

/** One-row strip for Compare header — shows once farmer has a name. */
export const FarmerMini: React.FC<FarmerMiniProps> = ({ lang, farmerName, upazila, acre }) => {
  const bn = lang === 'bn';
  if (farmerName.trim() === '') return null;
  const initial = farmerName.trim().charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-2.5 bg-white rounded-2xl border border-[#d8ebfa] px-3.5 py-2.5">
      <span className="w-9 h-9 rounded-full bg-[#006a69] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
        {initial}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="font-bold text-[#00172d] text-sm truncate">{farmerName.trim()}</span>
        <span className="text-[11px] text-[#43474d] font-mono">
          {farmerCardNo(farmerName, upazila.id)} • {bn ? `${toBengaliNumber(acre)} একর` : `${acre} acre`}
        </span>
      </div>
      <span className="ml-auto text-[10px] font-bold text-[#006a69] bg-[#98f2f0]/30 px-2 py-1 rounded-full flex-shrink-0">
        {bn ? '✓ কার্ড' : '✓ Card'}
      </span>
    </div>
  );
};
