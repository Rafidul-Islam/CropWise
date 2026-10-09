import React, { useState } from 'react';
import { UpazilaData, ViewMode } from '../types';
import { MAP_IMAGE_URL, toBengaliNumber, UPAZILAS } from '../data/barindData';
import { Lang } from '../i18n';

interface FieldTrackerStep1Props {
  lang: Lang;
  selectedUpazila: UpazilaData;
  onSelectUpazila: (upazila: UpazilaData) => void;
  acre: number;
  onOpenAcreModal: () => void;
  onGoToNext: () => void;
  viewMode: ViewMode;
}

export const FieldTrackerStep1: React.FC<FieldTrackerStep1Props> = ({
  lang,
  selectedUpazila,
  onSelectUpazila,
  acre,
  onOpenAcreModal,
  onGoToNext,
  viewMode,
}) => {
  const bn = lang === 'bn';
  const [pulseLocation, setPulseLocation] = useState(false);

  const handleUpazilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = UPAZILAS.find((u) => u.id === e.target.value);
    if (found) {
      setPulseLocation(true);
      onSelectUpazila(found);
      setTimeout(() => setPulseLocation(false), 300);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Title Subheader & Sensor Link */}
      <div className="flex items-center justify-between">
        <span className="font-headline-md font-bold text-[#00172d] tracking-tight text-xl">
          {bn ? 'ফিল্ড ট্র্যাকার' : 'Field Tracker'}
        </span>
        <span className="font-label-sm text-[#43474d] bg-[#eaf5ff] px-2.5 py-0.5 rounded-full uppercase font-semibold">
          GRACE-FO • SMAP
        </span>
      </div>

      {/* Status Ribbon & Mode Flag */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#006a69] animate-pulse"></span>
          <span className="font-label-sm text-[#006a69] font-bold tracking-wider uppercase text-[11px]">
            {bn ? 'স্যাট-লিংক: সক্রিয়' : 'SAT-LINK: ACTIVE'}
          </span>
        </div>
        <span className="font-label-sm bg-[#d8ebfa] text-[#00172d] px-2.5 py-0.5 rounded-full font-bold shadow-xs text-[11px]">
          {bn ? 'নমুনা ডেটা • ডেমো ২০২৬' : 'SAMPLE DATA • DEMO 2026'}
        </span>
      </div>

      {/* Page Header Cluster: Step 1 — roomy */}
      <div className="bg-[#eaf5ff] p-5 rounded-2xl shadow-xs border border-[#d8ebfa]">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="material-symbols-outlined text-[#006a69] text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            satellite_alt
          </span>
          <h2 className="font-headline-sm font-bold text-[#00172d] text-base">
            {bn ? '১. আপনার জমি ও নাসা ডেটা' : '1. Your field & NASA data'}
          </h2>
        </div>
        <p className="font-bilingual-subhead text-[#43474d] text-xs">
          {bn ? 'জমি বাছুন, উপগ্রহের পানি-তথ্য দেখুন' : 'Pick a field, see satellite water data'}
        </p>
      </div>

      {/* Section 1: Interactive Location & Region Context */}
      <div
        className={`bg-white rounded-xl shadow-xs overflow-hidden flex flex-col border border-[#d8ebfa] transition-opacity duration-200 ${
          pulseLocation ? 'opacity-75 scale-[0.99]' : 'opacity-100'
        }`}
      >
        {/* Map Canvas Integration with High Contrast Overlay */}
        <div className="relative w-full h-40 bg-[#dff0ff] overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00172d]/85 via-[#00172d]/35 to-transparent"></div>

          {/* Coordinate Tag Overlay */}
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-[#d8ebfa]">
            <span className="material-symbols-outlined text-[#006a69] text-[16px]">pin_drop</span>
            <span className="font-label-sm text-[#00172d] font-bold text-[11px]">
              {bn ? 'বরেন্দ্র অঞ্চল' : 'BARIND TRACT'} • {selectedUpazila.lat.toFixed(2)}° N, {selectedUpazila.lng.toFixed(2)}° E
            </span>
          </div>

          {/* Quick Acreage Pill Float */}
          <button
            onClick={onOpenAcreModal}
            className="absolute bottom-2.5 right-2.5 bg-white text-[#00172d] px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 active:scale-95 transition-transform border border-[#d8ebfa] hover:bg-[#f6faff]"
            id="editAcreBtn"
            title="Change Field Acreage"
          >
            <span className="material-symbols-outlined text-[#006a69] text-[16px]">straighten</span>
            <span className="font-label-sm font-bold text-xs" id="areaDisplay">
              {bn ? `${toBengaliNumber(acre)} একর` : `${acre} acre`}
            </span>
            <span className="material-symbols-outlined text-[#73777e] text-[14px]">edit</span>
          </button>
        </div>

        {/* Region Select Controls */}
        <div className="p-3.5 space-y-3">
          <div className="flex flex-col gap-1">
            <label
              className="font-label-sm text-[#43474d] flex items-center justify-between text-xs"
              htmlFor="upazilaSelect"
            >
              <span>{bn ? 'উপজেলা নির্বাচন' : 'Select upazila'}</span>
              <span className="text-[#006a69] font-bold text-[11px]">
                {bn ? `${selectedUpazila.districtBn} বিভাগ` : `${selectedUpazila.districtEn} DIVISION`}
              </span>
            </label>
            <div className="relative flex items-center">
              <select
                id="upazilaSelect"
                value={selectedUpazila.id}
                onChange={handleUpazilaChange}
                className="w-full h-12 pl-3.5 pr-10 rounded-lg bg-[#eaf5ff] text-[#00172d] font-headline-sm font-bold appearance-none shadow-xs border border-[#d8ebfa] focus:outline-none focus:ring-2 focus:ring-[#006a69] text-sm"
              >
                {UPAZILAS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {bn ? `${u.nameBn}, ${u.districtBn}` : `${u.nameEn}, ${u.districtEn}`}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 text-[#00172d] pointer-events-none text-[22px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Soil Context Ribbon */}
          <div className="flex items-center justify-between bg-[#d8ebfa]/60 px-3 py-2 rounded-lg border border-[#d8ebfa]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a69] text-[18px]">terrain</span>
              <span className="font-label-sm text-[#00172d] font-bold text-xs">
                {bn ? selectedUpazila.soilTypeBn : selectedUpazila.soilTypeEn}
              </span>
            </div>
            <span className="font-label-sm text-[#43474d] text-[11px]">
              {bn ? 'বার্ক কৃষি অঞ্চল-২৫' : selectedUpazila.soilClass}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Live NASA Earth Observation Grid (1-col on small, roomy) */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
            {bn ? 'নাসা উপগ্রহ নিরীক্ষণ' : 'NASA live telemetry'}
          </h3>
          <span className="font-label-sm text-[#006a69] font-bold text-[11px]">
            {bn ? 'সর্বশেষ কক্ষপথ' : 'LATEST ORBIT PASS'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. NASA POWER: Rainfall Trend & Sparkline */}
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#d8ebfa] flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm bg-[#dff0ff] text-[#00172d] px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">
                  NASA POWER
                </span>
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                  thermostat
                </span>
              </div>
              <span className="font-label-sm text-[#43474d] block font-medium text-xs leading-tight">
                {bn ? 'বৃষ্টি ও তাপমাত্রার ধারা' : 'Rain & temperature trend'}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm font-bold text-[#00172d] text-base">
                  {bn ? toBengaliNumber(selectedUpazila.powerTemp) : selectedUpazila.powerTemp}°C
                </span>
                <span className="font-label-sm text-[#ba1a1a] font-bold text-xs">
                  {bn ? `${toBengaliNumber(Math.abs(selectedUpazila.powerDeficit))}% ঘাটতি` : `${Math.abs(selectedUpazila.powerDeficit)}% deficit`}
                </span>
              </div>
            </div>

            {/* Inline SVG Sparkline */}
            <div className="w-full pt-1">
              <svg className="w-full h-10 overflow-visible" fill="none" viewBox="0 0 140 38">
                <path
                  d="M 0,8 Q 30,12 55,10 T 95,22 T 140,32"
                  stroke="#ba1a1a"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                <path
                  d="M 0,8 Q 30,12 55,10 T 95,22 T 140,32 L 140,38 L 0,38 Z"
                  fill="#ffdad6"
                  opacity="0.45"
                />
                <circle cx="140" cy="32" fill="#ba1a1a" r="3.5" />
              </svg>
              <div className="flex justify-between font-label-sm text-[10px] text-[#73777e] mt-0.5">
                <span>{bn ? '২০১৯' : '2019'}</span>
                <span>{bn ? '২০২৪ (এখন)' : '2024 (now)'}</span>
              </div>
            </div>
          </div>

          {/* 2. NASA GPM (IMERG): Monsoon Deficit */}
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#d8ebfa] flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm bg-[#dff0ff] text-[#00172d] px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">
                  NASA GPM
                </span>
                <span className="material-symbols-outlined text-[#c28700] text-[18px]">
                  water_drop
                </span>
              </div>
              <span className="font-label-sm text-[#43474d] block font-medium text-xs leading-tight">
                {bn ? 'বৃষ্টিপাতের ঘাটতি' : 'Rainfall deficit (monsoon)'}
              </span>
              <div className="mt-1">
                <span className="font-headline-lg font-bold text-[#00172d] text-2xl leading-none">
                  {bn ? toBengaliNumber(Math.abs(selectedUpazila.gpmDeficit)) : Math.abs(selectedUpazila.gpmDeficit)}%
                </span>
              </div>
            </div>

            <div className="bg-[#ffdead]/40 p-2 rounded-lg flex items-center gap-1.5 border border-[#ffdead]">
              <span className="material-symbols-outlined text-[#c28700] text-[18px]">warning</span>
              <span className="font-label-sm text-[#211400] font-bold leading-tight text-[11px]">
                {bn ? 'স্বাভাবিকের নিচে' : 'Below normal'}
              </span>
            </div>
          </div>

          {/* 3. NASA SMAP: Soil Moisture Dry Gauge */}
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#d8ebfa] flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm bg-[#dff0ff] text-[#00172d] px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">
                  NASA SMAP
                </span>
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">grain</span>
              </div>
              <span className="font-label-sm text-[#43474d] block font-medium text-xs leading-tight">
                {bn ? 'মাটির আর্দ্রতা' : 'Soil moisture'}
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-headline-sm font-bold text-[#00172d] text-base">
                  {selectedUpazila.smapMoisture}
                </span>
                <span className="font-label-sm text-[#43474d] font-medium text-xs">m³/m³</span>
              </div>
            </div>

            <div>
              <div className="w-full bg-[#d3e5f4] rounded-full h-2.5 mb-1.5 overflow-hidden">
                <div
                  className="bg-[#ba1a1a] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((selectedUpazila.smapMoisture / 0.5) * 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[#ba1a1a] font-bold bg-[#ffdad6]/70 px-1.5 py-0.5 rounded text-[10px]">
                  {bn ? 'শুষ্ক' : 'DRY'}
                </span>
                <span className="font-label-sm text-[10px] text-[#73777e]">{bn ? 'লক্ষ্য: ০.৩৫+' : 'Target: 0.35+'}</span>
              </div>
            </div>
          </div>

          {/* 4. Landsat 8/9 NDVI: Crop Vigour */}
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#d8ebfa] flex flex-col justify-between h-44">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm bg-[#dff0ff] text-[#00172d] px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">
                  LANDSAT 8/9
                </span>
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">eco</span>
              </div>
              <span className="font-label-sm text-[#43474d] block font-medium text-xs leading-tight">
                {bn ? 'সবুজায়ন স্তর' : 'Greenness level (NDVI)'}
              </span>
              <div className="mt-1">
                <span className="font-headline-sm font-bold text-[#00172d] text-base">
                  {bn ? toBengaliNumber(selectedUpazila.ndvi) : selectedUpazila.ndvi}
                </span>
              </div>
            </div>

            <div className="bg-[#d8ebfa]/60 p-2 rounded-lg flex items-center justify-between border border-[#d8ebfa]">
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#ffba3b]"></span>
                <span className="font-label-sm font-bold text-[#00172d] text-[11px]">
                  {bn ? 'দুর্বল' : 'Weak'}
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-[#43474d] font-medium">
                {bn ? 'গাছপালা' : 'Vegetation'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Telemetry Insight (Shows if EXP mode is active) */}
      {viewMode === 'expert' && (
        <div className="bg-[#0b2c4a] text-white p-3.5 rounded-xl space-y-2 border border-[#98f2f0]/30 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-[#98f2f0] font-bold">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">analytics</span>
              {bn ? 'বিজ্ঞানভিত্তিক টেলিমেট্রি' : 'EXP SCIENTIFIC BAND TELEMETRY'}
            </span>
            <span className="font-mono text-[10px]">L2B_HYD_PROD</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>{bn ? '• মাটির তাপমাত্রা: ৩১১.৪ K' : '• Soil skin temp: 311.4 K (MODIS)'}</div>
            <div>{bn ? '• বাষ্পীভবন ভগ্নাংশ: ০.২৮' : '• Evap. fraction: 0.28 (ECOSTRESS)'}</div>
            <div>{bn ? '• বরেন্দ্র কঠিন স্তর গভীরতা: ৩২ সেমি' : '• Barind hardpan depth: 32 cm'}</div>
            <div>{bn ? '• ভূগর্ভস্থ চাপ সূচক: শ্রেণি ৪ সংকটজনক' : '• Aquifer stress index: Class 4 Critical'}</div>
          </div>
        </div>
      )}

      {/* Critical Hydrological Alert Callout */}
      <div className="bg-[#ffdad6]/85 p-3.5 rounded-xl shadow-xs border border-[#ba1a1a]/20 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-[#ba1a1a] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span
            className="material-symbols-outlined text-white text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            crisis_alert
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-[#93000a] font-bold leading-tight text-sm">
            {bn ? 'ভূগর্ভস্থ পানির গভীর সংকট' : 'Deep groundwater crisis'}
          </span>
          <p className="font-body-md text-[#93000a] text-xs leading-snug mt-1 font-medium">
            {bn
              ? `বোরো ধান চাষে বরেন্দ্র অঞ্চলে প্রতি মৌসুমে ${selectedUpazila.groundwaterDrop} পানির স্তর নেমে যাচ্ছে।`
              : `Groundwater table dropping 10-15 metres every Boro season in Barind.`}
          </p>
        </div>
      </div>

      {/* Primary Sticky Bottom Action Button */}
      <div className="pt-2">
        <button
          onClick={onGoToNext}
          className="w-full min-h-[52px] bg-[#006a69] text-white hover:bg-[#00706f] active:scale-[0.99] transition-all rounded-xl shadow-md flex items-center justify-between px-4 py-3"
          id="continueBtn"
        >
          <div className="flex flex-col text-left">
            <span className="font-headline-sm text-white font-bold leading-none text-base">
              {bn ? 'পরবর্তী: ফসল তুলনা ও বিকল্প' : 'Next: crop comparison'}
            </span>
            <span className="font-label-sm text-[#98f2f0] opacity-90 leading-tight mt-1 text-xs">
              {bn ? 'অগ্রাধিকার ঠিক করে সুপারিশ দেখুন' : 'Set priorities, see recommendations'}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-[20px]">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};
