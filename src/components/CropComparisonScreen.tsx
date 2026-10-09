import React from 'react';
import { UpazilaData, ViewMode } from '../types';
import {
  CRACKED_PADDY_IMG,
  economicsForAcre,
  formatCurrencyBn,
  formatCurrencyEn,
  formatVolumeBn,
  formatVolumeEn,
  MUSTARD_FIELD_IMG,
  toBengaliNumber,
} from '../data/barindData';
import { FarmerMini } from './FarmerCard';
import { Lang } from '../i18n';

interface CropComparisonScreenProps {
  lang: Lang;
  selectedUpazila: UpazilaData;
  acre: number;
  farmerName: string;
  onGoToNasaProof: () => void;
  viewMode: ViewMode;
}

export const CropComparisonScreen: React.FC<CropComparisonScreenProps> = ({
  lang,
  selectedUpazila,
  acre,
  farmerName,
  onGoToNasaProof,
  viewMode,
}) => {
  const bn = lang === 'bn';
  const FC = bn ? formatCurrencyBn : formatCurrencyEn;
  const FV = bn ? formatVolumeBn : formatVolumeEn;
  const BN = (n: number | string) => (bn ? toBengaliNumber(n) : String(n));
  // Unified economics — single source of truth (see barindData ECONOMICS)
  const { boroCost, mustardCost, savings, boroWater, mustardWater, waterSaved } =
    economicsForAcre(acre);
  const boroWaterLiters = boroWater;
  const mustardWaterLiters = mustardWater;
  const waterSavedLiters = waterSaved;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Tab Subheader */}
      <div className="flex items-center justify-between">
        <span className="font-headline-md font-bold text-[#00172d] tracking-tight text-xl">
          {bn ? 'ফসল তুলনা' : 'Crop Comparison'}
        </span>
        <span className="font-label-sm text-[#43474d] bg-[#eaf5ff] px-2.5 py-0.5 rounded-full uppercase font-semibold text-[11px]">
          GRACE-FO • SMAP
        </span>
      </div>

      {/* Title & Context Pill */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0b2c4a] text-white font-headline-sm font-bold text-xs">
              {bn ? '৩' : '3'}
            </span>
            <h2 className="font-headline-md font-bold text-[#00172d] text-lg">
              {bn ? 'ফসলের রোটেশন তুলনা' : 'Crop rotation comparison'}
            </h2>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#98f2f0] text-[#002020] font-label-sm font-bold uppercase tracking-wider text-[11px]">
            {bn ? `${selectedUpazila.nameBn} ${BN(acre)} একর` : `${selectedUpazila.nameEn} ${acre.toFixed(1)} acre`}
          </span>
        </div>
        <p className="font-bilingual-subhead text-[#43474d] text-xs">
          {bn ? 'বোরো ধান বনাম পানি-সাশ্রয়ী বিকল্প' : 'Boro vs water-saving options'}
        </p>
      </div>

      {/* Farmer mini card — appears once profile is saved */}
      <FarmerMini lang={lang} farmerName={farmerName} upazila={selectedUpazila} acre={acre} />

      {/* Interactive Quick Ratio Spotlight Banner */}
      <div className="bg-[#0b2c4a] text-white rounded-xl p-4 shadow-md flex items-center justify-between relative overflow-hidden border border-[#d8ebfa]">
        <div className="flex flex-col z-10 space-y-0.5">
          <span className="font-label-sm text-[#98f2f0] uppercase tracking-wider font-bold text-[10px]">
            {bn ? 'কৃষকের সম্ভাব্য সাশ্রয়' : 'YOUR POTENTIAL SAVINGS'}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="font-display-lg-mobile font-extrabold tracking-tight text-2xl sm:text-3xl">
              {FC(savings)}
            </span>
            <span className="font-label-md text-[#98f2f0] font-bold text-xs">
              {bn ? `খরচ সাশ্রয় / ${BN(acre)} একর` : `saved / ${acre} acre`}
            </span>
          </div>
          <p className="font-label-sm text-[#7894b7] text-[11px]">
            {bn ? `${FV(waterSavedLiters)} পানি বাঁচে (৭৫% কম সেচ)` : `${FV(waterSavedLiters)} water saved (75% less pumping)`}
          </p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 z-10">
          <span
            className="material-symbols-outlined text-[32px] text-[#98f2f0]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
        </div>
        <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-[#006a69]/30 pointer-events-none"></div>
      </div>

      {/* STACKED ROTATION CARDS */}
      <div className="flex flex-col space-y-4">
        {/* CARD B: RECOMMENDED WINNER (Placed on Top for Priority Decisioning) */}
        <div className="bg-white rounded-xl p-4 shadow-md space-y-3 relative overflow-hidden transition-transform active:scale-[0.99] border border-[#d8ebfa]">
          <div className="bg-[#006a69] text-white -mx-4 -mt-4 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-sm font-bold tracking-wide text-xs">
                {bn ? 'সুপারিশকৃত সেরা বিকল্প' : 'RECOMMENDED WINNER'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white text-[#006a69] font-label-sm font-bold text-[10px]">
              {bn ? 'কম ঝুঁকি' : 'LOW RISK'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2 pt-1">
            <div className="flex flex-col">
              <span className="font-headline-sm font-bold text-[#00172d] text-base">
                {bn ? 'বিকল্প খ: সরিষা + মুগডাল + আমন' : 'Option B: Mustard + Mungbean + Aman'}
              </span>
              <span className="font-label-md text-[#43474d] font-medium text-xs">
                {bn ? 'তিন ফসলের লাভজনক চক্র' : 'Profitable 3-crop cycle'}
              </span>
            </div>
            <img
              alt="Mustard and pulse rotation field in Barind"
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#dff0ff] border border-[#d8ebfa]"
              src={MUSTARD_FIELD_IMG}
            />
          </div>

          {/* Metrics Matrix */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#eaf5ff] rounded-lg p-2.5 flex flex-col justify-between border border-[#d8ebfa]">
              <div className="flex items-center space-x-1 text-[#006a69]">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
                <span className="font-label-sm font-bold uppercase text-[10px]">
                  {bn ? 'সেচ ও পানি' : 'Water'}
                </span>
              </div>
              <div className="mt-1">
                <p className="font-headline-sm font-bold text-[#00172d] leading-snug text-sm">
                  {bn ? 'মাত্র ২ বার সেচ' : 'Only 2 waterings'}
                </p>
                <p className="font-label-sm text-[#006a69] font-bold text-[11px]">
                  {bn ? `৭৫% পানি সাশ্রয় (${FV(mustardWaterLiters)})` : `75% water saved (${FV(mustardWaterLiters)})`}
                </p>
              </div>
            </div>

            <div className="bg-[#eaf5ff] rounded-lg p-2.5 flex flex-col justify-between border border-[#d8ebfa]">
              <div className="flex items-center space-x-1 text-[#006a69]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
                <span className="font-label-sm font-bold uppercase text-[10px]">
                  {bn ? 'সেচ খরচ' : 'Pump cost'}
                </span>
              </div>
              <div className="mt-1">
                <p className="font-headline-sm font-bold text-[#00172d] leading-snug text-sm">
                  {FC(mustardCost)}
                </p>
                <p className="font-label-sm text-[#006a69] font-bold text-[11px]">
                  {bn ? `সাশ্রয় ${FC(savings)}!` : `Save ${FC(savings)}!`}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#98f2f0]/30 rounded-lg px-3 py-2 flex items-center space-x-2 text-[#00504f] border border-[#98f2f0]/40">
            <span
              className="material-symbols-outlined text-[20px] text-[#006a69] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology_alt
            </span>
            <span className="font-label-md font-semibold leading-tight text-xs">
              {bn ? 'মাটিতে প্রাকৃতিক নাইট্রোজেন যোগ হয় + তেল ফসল বিক্রি' : 'Adds natural nitrogen to soil + sellable oil crop'}
            </span>
          </div>
        </div>

        {/* CARD A: BASELINE TRADITIONAL */}
        <div className="bg-[#eaf5ff] rounded-xl p-4 shadow-xs space-y-3 border border-[#d8ebfa]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">warning</span>
              <span className="font-label-sm font-bold text-[#43474d] uppercase text-xs">
                {bn ? 'প্রচলিত চাষ' : 'Traditional practice'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-label-sm font-bold text-[10px]">
              {bn ? 'উচ্চ ঝুঁকি' : 'HIGH RISK'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-headline-sm font-bold text-[#00172d] text-base">
                {bn ? 'বিকল্প ক: প্রচলিত বোরো ধান' : 'Option A: Usual Boro rice'}
              </span>
              <span className="font-label-md text-[#43474d] font-medium text-xs">
                {bn ? 'ভেজা-শুকনা (AWD) সেচসহ' : 'With AWD wetting & drying'}
              </span>
            </div>
            <img
              alt="Cracked clay soil paddy field under groundwater stress"
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-[#d8ebfa] border border-[#d8ebfa]"
              src={CRACKED_PADDY_IMG}
            />
          </div>

          {/* Baseline Numbers */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2.5 border border-[#d8ebfa]">
              <div className="flex items-center space-x-1 text-[#43474d]">
                <span className="material-symbols-outlined text-[18px]">opacity</span>
                <span className="font-label-sm font-bold uppercase text-[10px]">
                  {bn ? 'পাম্প সেচ' : 'Pumping'}
                </span>
              </div>
              <p className="font-headline-sm font-bold text-[#ba1a1a] mt-1 text-sm">{bn ? '২৮ বার সেচ' : '28 waterings'}</p>
              <p className="font-label-sm text-[#43474d] text-[11px]">
                {bn ? `${FV(boroWaterLiters)} / একর` : `${FV(boroWaterLiters)} / acre`}
              </p>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-[#d8ebfa]">
              <div className="flex items-center space-x-1 text-[#43474d]">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                <span className="font-label-sm font-bold uppercase text-[10px]">
                  {bn ? 'পাম্প খরচ' : 'Pump cost'}
                </span>
              </div>
              <p className="font-headline-sm font-bold text-[#0c1d28] mt-1 text-sm">
                {FC(boroCost)}
              </p>
              <p className="font-label-sm text-[#ba1a1a] font-semibold text-[11px]">
                {bn ? 'ভর্তুকিহীন চরম ব্যয়' : 'Extreme cost, no subsidy'}
              </p>
            </div>
          </div>

          <div className="bg-[#ffdad6]/40 rounded-lg px-3 py-2 flex items-center space-x-2 text-[#93000a] border border-[#ffdad6]">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] flex-shrink-0">
              arrow_downward
            </span>
            <span className="font-label-md font-medium leading-tight text-xs">
              {bn ? 'গভীর নলকূপে অতিরিক্ত চাপ' : 'Severe strain on deep tubewells'}
            </span>
          </div>
        </div>
      </div>

      {/* HEAD-TO-HEAD SUMMARY MATRIX TABLE */}
      <div className="bg-white rounded-xl shadow-xs p-4 space-y-3 border border-[#d8ebfa]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#00172d]">table_chart</span>
            <span className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
              {bn ? 'তুলনামূলক খতিয়ান' : 'Side-by-side summary'}
            </span>
          </div>
          <span className="font-label-sm text-[#43474d] text-xs">
            {bn ? `${BN(acre)} একর জমি ভিত্তি` : `Basis: ${acre} acre`}
          </span>
        </div>

        <div className="overflow-hidden rounded-lg bg-[#eaf5ff] border border-[#d8ebfa]">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#00172d] text-white px-3 py-2.5 font-label-sm font-bold text-xs">
            <div className="col-span-4">{bn ? 'সূচক' : 'Metric'}</div>
            <div className="col-span-4 text-center">{bn ? 'বিকল্প ক (বোরো)' : 'A (Boro)'}</div>
            <div className="col-span-4 text-right text-[#98f2f0]">{bn ? 'বিকল্প খ (সরিষা+)' : 'B (Mustard+)'}</div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-[#d3e5f4] font-label-md text-xs">
            {/* Row 1: Irrigations */}
            <div className="grid grid-cols-12 px-3 py-2.5 items-center bg-white">
              <div className="col-span-4 font-semibold text-[#00172d]">{bn ? 'মোট সেচ' : 'Waterings'}</div>
              <div className="col-span-4 text-center text-[#ba1a1a] font-bold">{bn ? '২৮ বার' : '28'}</div>
              <div className="col-span-4 text-right text-[#006a69] font-extrabold flex items-center justify-end space-x-1">
                <span className="material-symbols-outlined text-[16px] text-[#006a69]">check</span>
                <span>{bn ? '২ বার' : '2'}</span>
              </div>
            </div>

            {/* Row 2: Water Volume */}
            <div className="grid grid-cols-12 px-3 py-2.5 items-center bg-[#eaf5ff]">
              <div className="col-span-4 font-semibold text-[#00172d]">{bn ? 'পানির ব্যবহার' : 'Water use'}</div>
              <div className="col-span-4 text-center text-[#43474d]">
                {FV(boroWaterLiters)}
              </div>
              <div className="col-span-4 text-right text-[#006a69] font-extrabold">
                {FV(mustardWaterLiters)}{' '}
                <span className="block font-label-sm text-[#006a69] font-bold">{bn ? '(-৭৫%)' : '(-75%)'}</span>
              </div>
            </div>

            {/* Row 3: Pumping Cost */}
            <div className="grid grid-cols-12 px-3 py-2.5 items-center bg-white">
              <div className="col-span-4 font-semibold text-[#00172d]">{bn ? 'সেচ খরচ' : 'Pump cost'}</div>
              <div className="col-span-4 text-center text-[#ba1a1a] font-medium">
                {FC(boroCost)}
              </div>
              <div className="col-span-4 text-right text-[#006a69] font-extrabold">
                {FC(mustardCost)}{' '}
                <span className="block font-label-sm text-[#006a69] font-bold">
                  {bn ? `সাশ্রয় ${FC(savings)}` : `Save ${FC(savings)}`}
                </span>
              </div>
            </div>

            {/* Row 4: Soil Fertility */}
            <div className="grid grid-cols-12 px-3 py-2.5 items-center bg-[#eaf5ff]">
              <div className="col-span-4 font-semibold text-[#00172d]">{bn ? 'মাটির প্রভাব' : 'Soil effect'}</div>
              <div className="col-span-4 text-center text-[#43474d] font-medium">
                {bn ? 'ক্ষয়িষ্ণু' : 'Degrading'}
              </div>
              <div className="col-span-4 text-right text-[#006a69] font-bold">
                {bn ? '+N নাইট্রোজেন বৃদ্ধি' : '+N nitrogen boost'}
              </div>
            </div>

            {/* Row 5: Climate Risk */}
            <div className="grid grid-cols-12 px-3 py-2.5 items-center bg-white">
              <div className="col-span-4 font-semibold text-[#00172d]">{bn ? 'জলবায়ু ঝুঁকি' : 'Climate risk'}</div>
              <div className="col-span-4 text-center">
                <span className="inline-block px-1.5 py-0.5 rounded text-[#ba1a1a] bg-[#ffdad6]/60 font-label-sm font-bold text-[10px]">
                  {bn ? 'চরম' : 'High'}
                </span>
              </div>
              <div className="col-span-4 text-right">
                <span className="inline-block px-1.5 py-0.5 rounded text-[#006a69] bg-[#98f2f0]/50 font-label-sm font-extrabold text-[10px]">
                  {bn ? 'নিরাপদ' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ASTRONOMICAL / SATELLITE VALIDATION TEASER */}
      <div className="bg-[#d8ebfa] rounded-xl p-3 flex items-center space-x-3 border border-[#d8ebfa]">
        <div className="w-10 h-10 rounded-full bg-[#0b2c4a] text-white flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">satellite_alt</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-sm text-[#00172d] font-bold uppercase tracking-wider text-[11px]">
            {bn ? 'নাসা উপাত্ত' : 'NASA DATA'}
          </p>
          <p className="font-label-sm text-[#43474d] truncate text-xs">
            {bn ? 'বরেন্দ্র মাটির পানির স্তর হ্রাসের স্যাটেলাইট প্রমাণ' : 'Satellite proof of Barind water-table fall'}
          </p>
        </div>
      </div>

      {/* BOTTOM CTA ACTION LINKING TO SCREEN 04 */}
      <div className="pt-2">
        <button
          onClick={onGoToNasaProof}
          className="w-full min-h-[52px] bg-[#006a69] text-white rounded-lg font-headline-sm font-bold flex items-center justify-center space-x-2 shadow-md hover:bg-[#00504f] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00172d] text-base"
          id="cta-view-nasa"
        >
          <span>{bn ? 'নাসা ডেটা প্রমাণ দেখুন' : 'See NASA proof'}</span>
          <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
