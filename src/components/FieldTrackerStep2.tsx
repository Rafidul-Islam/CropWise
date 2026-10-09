import React from 'react';
import { UpazilaData, ViewMode } from '../types';
import { toBengaliNumber } from '../data/barindData';
import { Lang } from '../i18n';

interface FieldTrackerStep2Props {
  lang: Lang;
  selectedUpazila: UpazilaData;
  waterPriority: number;
  setWaterPriority: (val: number) => void;
  soilPriority: number;
  setSoilPriority: (val: number) => void;
  costPriority: number;
  setCostPriority: (val: number) => void;
  currentPh: number;
  onChangePh: () => void;
  onGoToCompare: () => void;
  onGoBackToStep1: () => void;
  viewMode: ViewMode;
}

export const FieldTrackerStep2: React.FC<FieldTrackerStep2Props> = ({
  lang,
  selectedUpazila,
  waterPriority,
  setWaterPriority,
  soilPriority,
  setSoilPriority,
  costPriority,
  setCostPriority,
  currentPh,
  onChangePh,
  onGoToCompare,
  onGoBackToStep1,
  viewMode,
}) => {
  const bn = lang === 'bn';
  // Compute dynamic recommendation hint based on sliders
  let hintBengali = 'একই জমি, বিভিন্ন অগ্রাধিকার অনুযায়ী সেরা ফসল পরিবর্তন হবে।';
  let hintEnglish = `Same field — best crop changes with your priorities.`;

  if (waterPriority >= 80 && costPriority >= 70) {
    hintBengali =
      'উচ্চ পানি ও জ্বালানি সাশ্রয়: সরিষা-মুগডাল-রোপা আমন রোটেশন সর্বাধিক লাভজনক ও নিরাপদ।';
    hintEnglish = `High water (${waterPriority}%) & cost (${costPriority}%) priority: mustard-mungbean-Aman rotation beats Boro.`;
  } else if (soilPriority >= 80) {
    hintBengali =
      'মাটির স্বাস্থ্য প্রাধান্য: সবুজ সার (ধৈঞ্চা) ও ডালজাতীয় ফসল চক্রে অন্তর্ভুক্ত করে জৈব সার পুনরুদ্ধার।';
    hintEnglish = `High soil priority (${soilPriority}%): add sesbania green manure + pulses to rebuild organic matter.`;
  } else if (waterPriority < 50 && costPriority < 50) {
    hintBengali =
      'ভারসাম্যপূর্ণ কৌশল: নিয়ন্ত্রিত সেচ ও এডব্লিউডি (AWD) প্রযুক্তিসহ বিকল্প গম-ভুট্টা পরিকল্পনা।';
    hintEnglish = `Balanced priorities: wheat/maize options with AWD water control.`;
  }
  const hint = bn ? hintBengali : hintEnglish;

  const getPhStatus = (ph: number) => {
    if (bn) {
      if (ph < 6.0) return 'স্বল্প অম্লীয়';
      if (ph <= 7.0) return 'নিরপেক্ষ স্বাভাবিক';
      return 'স্বল্প ক্ষারীয়';
    }
    if (ph < 6.0) return 'Slightly acidic';
    if (ph <= 7.0) return 'Neutral';
    return 'Slightly alkaline';
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Top Navigation Step Selector */}
      <div className="flex items-center justify-between">
        <button
          onClick={onGoBackToStep1}
          className="flex items-center gap-1 text-xs font-bold text-[#006a69] hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{bn ? 'ধাপ ১: জমি নির্বাচন' : 'Step 1: field select'}</span>
        </button>
        <span className="font-label-sm text-[#43474d] bg-[#eaf5ff] px-2.5 py-0.5 rounded-full uppercase font-semibold text-[11px]">
          GRACE-FO • SMAP
        </span>
      </div>

      {/* Screen Page Header Context */}
      <div className="bg-[#eaf5ff] rounded-xl p-4 shadow-xs border border-[#d8ebfa]">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-[#006a69] text-white font-label-sm px-2 py-0.5 rounded-full font-bold text-[10px]">
            {bn ? 'ধাপ ২' : 'STEP 2'}
          </span>
          <span className="text-[#43474d] font-label-sm tracking-wide text-[11px]">
            {bn ? 'মাটি ও লক্ষ্য' : 'SOIL & GOALS'}
          </span>
        </div>
        <h2 className="font-headline-md font-bold text-[#00172d] leading-tight text-lg">
          {bn ? '২. মাটির স্বাস্থ্য ও লক্ষ্য নির্ধারণ' : '2. Soil health & priorities'}
        </h2>
        <p className="font-bilingual-subhead text-[#006a69] font-medium text-xs mt-0.5">
          {bn ? 'স্লাইডার নাড়িয়ে সুপারিশ বদলান' : 'Move sliders to change recommendations'}
        </p>
      </div>

      {/* Section 1: SRDI Soil Intelligence Card */}
      <section className="bg-white rounded-xl p-4 shadow-xs border border-[#d8ebfa] space-y-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1.5 bg-[#d8ebfa] text-[#00172d] font-label-sm px-2.5 py-1 rounded-full font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#006a69] animate-pulse"></span>
              {bn ? 'SRDI মৃত্তিকা মানচিত্র' : 'SRDI soil map'}
            </span>
            <h3 className="font-headline-sm font-bold text-[#00172d] mt-1 text-base">
              {bn ? 'বারিন্দ্র ধূসর সোপান মৃত্তিকা' : 'Barind grey terrace soil'}
            </h3>
            <p className="font-label-sm text-[#43474d] text-xs">
              {bn ? 'আমন-পতিত-বোরো অঞ্চল' : 'Aman-fallow-Boro belt'}
            </p>
          </div>
          <button
            onClick={() => {
              // Quick re-sync simulation
              const btn = document.getElementById('srdi-sync-btn');
              if (btn) btn.classList.add('rotate-180');
              setTimeout(() => btn?.classList.remove('rotate-180'), 400);
            }}
            className="flex-shrink-0 bg-[#dff0ff] text-[#0c1d28] p-2 rounded-lg flex items-center justify-center transition-transform active:scale-90"
            id="srdi-sync-btn"
            title="Re-sync SRDI GPS Data"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006a69]">sync</span>
          </button>
        </div>

        {/* Soil Metric Bento Rows */}
        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {/* pH Metric Card with interactive micro-adjustment */}
          <div className="bg-[#eaf5ff] rounded-xl p-3.5 flex items-center justify-between border border-[#d8ebfa]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">science</span>
                <span className="font-label-sm text-[#43474d] uppercase font-bold text-[11px]">
                  {bn ? 'মাটির অম্লত্ব' : 'Soil pH'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-stat-metric text-[#00172d] font-bold text-2xl">
                  pH {bn ? toBengaliNumber(currentPh.toFixed(1)) : currentPh.toFixed(1)}
                </span>
              </div>
              <div className="inline-flex items-center gap-1 bg-[#d8ebfa] text-[#00172d] px-2 py-0.5 rounded-full text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffba3b]"></span>
                <span className="font-label-sm font-semibold">{getPhStatus(currentPh)}</span>
              </div>
            </div>

            <button
              onClick={onChangePh}
              className="bg-[#dff0ff] text-[#00172d] px-3 py-2 rounded-lg flex flex-col items-center justify-center font-label-sm active:scale-95 transition-transform shadow-xs border border-[#d8ebfa] hover:bg-[#d8ebfa]"
              id="adjust-ph-trigger"
              title="Click to cycle soil pH"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006a69]">tune</span>
              <span className="font-bold text-xs">{bn ? 'সংশোধন' : 'Adjust'}</span>
            </button>
          </div>

          {/* Soil Properties: Dual Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Organic Matter */}
            <div className="bg-[#eaf5ff] rounded-xl p-3 space-y-1 border border-[#d8ebfa]">
              <span className="font-label-sm text-[#43474d] uppercase font-semibold block text-[10px]">
                {bn ? 'জৈব পদার্থ' : 'Organic matter'}
              </span>
              <div className="font-headline-sm font-bold text-[#ba1a1a] text-lg">{bn ? '০.৯%' : '0.9%'}</div>
              <p className="font-label-sm text-[#0c1d28] font-medium leading-snug text-[11px]">
                {bn ? 'অতি নিম্ন মাত্রা' : 'Very low'}
              </p>
            </div>

            {/* Permeability */}
            <div className="bg-[#eaf5ff] rounded-xl p-3 space-y-1 border border-[#d8ebfa]">
              <span className="font-label-sm text-[#43474d] uppercase font-semibold block text-[10px]">
                {bn ? 'পানি শোষণ' : 'Water absorption'}
              </span>
              <div className="font-headline-sm font-bold text-[#00172d] text-lg">{bn ? 'কম শোষণ' : 'Low absorption'}</div>
              <p className="font-label-sm text-[#0c1d28] font-medium leading-snug text-[11px]">
                {bn ? 'পলি-কাদা শক্ত স্তর' : 'Heavy clay hardpan'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Priority Calibration Sliders */}
      <section className="bg-white rounded-xl p-4 shadow-xs border border-[#d8ebfa] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
              {bn ? 'লক্ষ্য ও অগ্রাধিকার নির্ধারণ' : 'Set goals & priorities'}
            </h3>
            <p className="font-label-sm text-[#43474d] text-xs">
              {bn ? 'স্লাইডার টেনে সুপারিশ বদলান' : 'Slide to customize recommendations'}
            </p>
          </div>
          <span className="material-symbols-outlined text-[#006a69] text-[24px]">instant_mix</span>
        </div>

        {/* Sliders Container */}
        <div className="space-y-4">
          {/* Slider 1: Save Water */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">
                  water_drop
                </span>
                <span className="font-body-md font-bold text-[#00172d] text-sm">
                  {bn ? 'পানি সাশ্রয়' : 'Save water'}
                </span>
              </div>
              <span className="bg-[#98f2f0] text-[#00706f] font-label-sm px-2 py-0.5 rounded-full font-bold text-xs">
                {bn ? `${toBengaliNumber(waterPriority)}%` : `${waterPriority}%`}
              </span>
            </div>
            <div className="relative flex items-center h-8">
              <input
                className="w-full h-2.5 bg-[#d8ebfa] rounded-full appearance-none cursor-pointer accent-[#006a69]"
                max="100"
                min="20"
                step="5"
                type="range"
                value={waterPriority}
                onChange={(e) => setWaterPriority(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="flex justify-between font-label-sm text-[11px] text-[#43474d]">
              <span>{bn ? 'কম' : 'Low'}</span>
              <span className="font-bold text-[#006a69]">{bn ? 'ভূগর্ভস্থ পানি সুরক্ষা' : 'Protect groundwater'}</span>
              <span>{bn ? 'বেশি' : 'Max'}</span>
            </div>
          </div>

          {/* Slider 2: Soil Health & Nitrogen */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">eco</span>
                <span className="font-body-md font-bold text-[#00172d] text-sm">
                  {bn ? 'মাটির স্বাস্থ্য রক্ষা' : 'Protect soil health'}
                </span>
              </div>
              <span className="bg-[#d8ebfa] text-[#00172d] font-label-sm px-2 py-0.5 rounded-full font-bold text-xs">
                {bn ? `${toBengaliNumber(soilPriority)}%` : `${soilPriority}%`}
              </span>
            </div>
            <div className="relative flex items-center h-8">
              <input
                className="w-full h-2.5 bg-[#d8ebfa] rounded-full appearance-none cursor-pointer accent-[#0b2c4a]"
                max="100"
                min="10"
                step="5"
                type="range"
                value={soilPriority}
                onChange={(e) => setSoilPriority(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="flex justify-between font-label-sm text-[11px] text-[#43474d]">
              <span>{bn ? 'সাধারণ' : 'Standard'}</span>
              <span className="font-bold text-[#00172d]">{bn ? 'ডাল ও জৈব সার বৃদ্ধি' : 'More pulses & compost'}</span>
              <span>{bn ? 'বেশি' : 'Max'}</span>
            </div>
          </div>

          {/* Slider 3: Minimize Pumping Cost */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#c28700] text-[18px]">
                  payments
                </span>
                <span className="font-body-md font-bold text-[#00172d] text-sm">
                  {bn ? 'খরচ কমানো' : 'Cut costs'}
                </span>
              </div>
              <span className="bg-[#ffdead] text-[#281900] font-label-sm px-2 py-0.5 rounded-full font-bold text-xs">
                {bn ? `${toBengaliNumber(costPriority)}%` : `${costPriority}%`}
              </span>
            </div>
            <div className="relative flex items-center h-8">
              <input
                className="w-full h-2.5 bg-[#d8ebfa] rounded-full appearance-none cursor-pointer accent-[#c28700]"
                max="100"
                min="15"
                step="5"
                type="range"
                value={costPriority}
                onChange={(e) => setCostPriority(parseInt(e.target.value, 10))}
              />
            </div>
            <div className="flex justify-between font-label-sm text-[11px] text-[#43474d]">
              <span>{bn ? 'বর্তমান ব্যয়' : 'Current cost'}</span>
              <span className="font-bold text-[#c28700]">{bn ? 'টাকা ও জ্বালানি সাশ্রয়' : 'Save money & fuel'}</span>
              <span>{bn ? 'শূন্য সেচ' : 'Zero pump'}</span>
            </div>
          </div>
        </div>

        {/* Live Dynamic Recommendation Hint */}
        <div className="bg-[#dff0ff] rounded-xl p-3.5 flex items-start gap-3 transition-colors border border-[#d8ebfa]">
          <div className="bg-[#d3e5f4] rounded-full p-1.5 flex-shrink-0 text-[#c28700]">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
          </div>
          <div className="space-y-1">
            <p className="font-bilingual-subhead text-[#00172d] font-bold leading-snug text-xs sm:text-sm">
              {hint}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Deep Aquifer Tubewell Warning Notice */}
      <section className="bg-[#eaf5ff] rounded-xl p-4 shadow-xs border border-[#d8ebfa] flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[24px]">water_damage</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-label-sm font-bold text-[#ba1a1a] uppercase text-[10px]">
              {bn ? 'বিএমডিএ জরুরি সীমা সতর্কবার্তা' : 'BMDA LIMIT WARNING'}
            </span>
          </div>
          <h4 className="font-headline-sm font-bold text-[#00172d] leading-tight text-sm">
            {bn
              ? `বরেন্দ্র গভীর নলকূপ সীমা: ${toBengaliNumber(selectedUpazila.bmdaHoursCap)} ঘণ্টা বরাদ্দ / মৌসুমে ১ বার`
              : `Barind deep tubewell limit: ${selectedUpazila.bmdaHoursCap} hrs allotted / once a season`}
          </h4>
          <p className="font-label-sm text-[#43474d] leading-relaxed text-xs">
            {bn
              ? `বিএমডিএ-র ${toBengaliNumber(16000)} গভীর নলকূপে কড়া সীমা। উচ্চ-চাপ অঞ্চলে ৩ বছরে ১ বার তোলার নিয়ম।`
              : `BMDA's 16,000 deep tubewells strictly capped. 1-in-3 years extraction rule in high-stress zones.`}
          </p>
        </div>
      </section>

      {/* Section 4: Visual Soil Depth & Moisture Snapshot */}
      <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#d8ebfa] space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-label-sm font-bold text-[#00172d] uppercase text-[11px]">
            {bn ? 'মাটির স্তর ও আর্দ্রতা (০-৪০ সেমি)' : 'Soil layers & moisture (0-40 cm)'}
          </span>
          <span className="font-label-sm text-[#006a69] font-bold text-[11px]">
            SMAP
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-16 items-end bg-[#eaf5ff] p-2.5 rounded-lg border border-[#d8ebfa]">
          <div className="flex flex-col items-center gap-1 w-full">
            <div
              className="w-full bg-[#006a69] rounded-xs h-9 transition-all"
              title="0-10cm: 28% Moisture"
            />
            <span className="text-[10px] font-bold text-[#43474d]">{bn ? '০-১০ সেমি' : '0-10 cm'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-full">
            <div
              className="w-full bg-[#7cd5d3] rounded-xs h-7 transition-all"
              title="10-20cm: 21% Moisture"
            />
            <span className="text-[10px] font-bold text-[#43474d]">{bn ? '১০-২০ সেমি' : '10-20 cm'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-full">
            <div
              className="w-full bg-[#d3e5f4] rounded-xs h-5 transition-all"
              title="20-30cm: 15% Moisture"
            />
            <span className="text-[10px] font-bold text-[#43474d]">{bn ? '২০-৩০ সেমি' : '20-30 cm'}</span>
          </div>
          <div className="flex flex-col items-center gap-1 w-full">
            <div
              className="w-full bg-[#ffdad6] rounded-xs h-3.5 transition-all"
              title="30-40cm: 11% Dry Hardpan"
            />
            <span className="text-[10px] font-bold text-[#ba1a1a]">{bn ? '৪০ সেমি (কঠিন)' : '40 cm (hard)'}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Action */}
      <div className="pt-2">
        <button
          onClick={onGoToCompare}
          className="w-full min-h-[52px] bg-[#006a69] text-white rounded-xl font-headline-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#00504f] active:scale-[0.98] transition-all px-4 text-center text-base"
          id="cta-compare"
        >
          <span>{bn ? 'রোটেশন তুলনা করুন' : 'Compare rotations'}</span>
          <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
        <p className="text-center font-label-sm text-[#43474d] mt-2 text-xs">
          {bn ? 'স্মার্ট ইঞ্জিন ৩টি বিকল্প ফসল রোটেশন প্রস্তুত করেছে' : 'Smart engine prepared 3 rotation plans'}
        </p>
      </div>
    </div>
  );
};
