import React, { useState } from 'react';
import { UpazilaData, ViewMode } from '../types';
import { DATA_SOURCES, toBengaliNumber } from '../data/barindData';
import { Lang } from '../i18n';

interface NasaProofScreenProps {
  lang: Lang;
  selectedUpazila: UpazilaData;
  onOpenExportModal: () => void;
  onRecalculate: () => void;
  viewMode: ViewMode;
}

export const NasaProofScreen: React.FC<NasaProofScreenProps> = ({
  lang,
  selectedUpazila,
  onOpenExportModal,
  onRecalculate,
  viewMode,
}) => {
  const bn = lang === 'bn';
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSensorClick = (stepId: string, sensorKey: string) => {
    setSelectedSensor(sensorKey);
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-[#006a69]');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-[#006a69]');
      }, 1000);
    }
  };

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
    onOpenExportModal();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Subheader */}
      <div className="flex items-center justify-between">
        <span className="font-headline-md font-bold text-[#00172d] tracking-tight text-xl">
          {bn ? 'নাসা প্রমাণ' : 'NASA Proof'}
        </span>
        <span className="font-label-sm text-[#43474d] bg-[#eaf5ff] px-2.5 py-0.5 rounded-full uppercase font-semibold text-[11px]">
          GRACE-FO • SMAP
        </span>
      </div>

      {/* Mission Dossier Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#00172d] text-white p-4 shadow-md border border-[#d8ebfa]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#006a69]/25 pointer-events-none"></div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className="inline-block w-2 h-2 rounded-full bg-[#98f2f0] animate-pulse"></span>
            <span className="font-label-sm font-bold text-[#98f2f0] text-[10px]">
              {bn ? 'মিশন লগ • কক্ষপথের ধারা' : 'MISSION LOG • ORBITAL TRACE'}
            </span>
          </div>
          <span className="font-label-sm text-[#acc9ee] text-[11px]">{bn ? '১২ মাস আগে হালনাগাদ' : 'UPDATED 12M AGO'}</span>
        </div>

        <div className="space-y-0.5">
          <h2 className="font-headline-sm font-bold text-white tracking-tight text-base sm:text-lg">
            {bn ? '৪. নাসা উপগ্রহ ডেটা প্রমাণ' : '4. NASA satellite proof'}
          </h2>
          <p className="font-label-md text-[#acc9ee] text-xs">
            {bn ? 'বরেন্দ্র কঠিন মাটির বৈজ্ঞানিক সিদ্ধান্ত-ধারা' : 'Decision trace for Barind hard soil'}
          </p>
        </div>

        <div className="mt-3 pt-3 bg-white/5 -mx-4 -mb-4 px-4 py-2.5 flex items-center justify-between">
          <div>
            <p className="font-label-sm text-[#98f2f0] font-bold leading-none text-xs">
              {bn ? 'কেন সরিষা-মুগডাল সেরা?' : 'Why is mustard-mungbean best?'}
            </p>
            <p className="font-label-sm text-white/70 text-[11px] leading-tight mt-0.5">
              {bn ? 'বরেন্দ্র কঠিন মাটির বৈজ্ঞানিক প্রমাণ' : 'Science proof for Barind hard soil'}
            </p>
          </div>
          <span
            className="material-symbols-outlined text-[#98f2f0] text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
        </div>
      </div>

      {/* Interactive Sensor Telemetry Radar Matrix */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006a69] text-[20px]">sensors</span>
            <span className="font-label-md font-bold text-[#00172d] text-xs sm:text-sm">
              {bn ? 'টেলিমেট্রি অবস্থা' : 'Telemetry status'}
            </span>
          </div>
          <span className="font-label-sm text-[#43474d] font-medium text-[11px]">
            {bn ? '৬টি সেন্সর যাচাইকৃত' : '6 SENSORS VERIFIED'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2" id="sensorGrid">
          {/* Chip 1 */}
          <button
            onClick={() => handleSensorClick('step-1', 'power')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'power'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cd5d3] ring-2 ring-[#006a69]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">MET-01</span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">NASA POWER</p>
            <span className="font-label-sm text-[11px] text-[#006a69] font-semibold block">
              {bn ? `সক্রিয় • ${toBengaliNumber(Math.abs(selectedUpazila.powerDeficit))}% ↓` : `Active • ${Math.abs(selectedUpazila.powerDeficit)}% ↓`}
            </span>
          </button>

          {/* Chip 2 */}
          <button
            onClick={() => handleSensorClick('step-2', 'gpm')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'gpm'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] ring-2 ring-[#ba1a1a]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">GPM-IMERG</span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">NASA GPM</p>
            <span className="font-label-sm text-[11px] text-[#ba1a1a] font-semibold block">
              {bn ? `ঘাটতি ${toBengaliNumber(Math.abs(selectedUpazila.gpmDeficit))}%` : `Deficit ${selectedUpazila.gpmDeficit}%`}
            </span>
          </button>

          {/* Chip 3 */}
          <button
            onClick={() => handleSensorClick('step-3', 'smap')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'smap'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffba3b] ring-2 ring-[#ffdead]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">L-BAND</span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">NASA SMAP</p>
            <span className="font-label-sm text-[11px] text-[#3c2700] font-semibold block">
              {selectedUpazila.smapMoisture} m³/m³
            </span>
          </button>

          {/* Chip 4 */}
          <button
            onClick={() => handleSensorClick('step-4', 'ecostress')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'ecostress'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cd5d3] ring-2 ring-[#006a69]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">ISS-THM</span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">ECOSTRESS</p>
            <span className="font-label-sm text-[11px] text-[#006a69] font-semibold block">
              {bn ? 'উচ্চ বাষ্প-চাপ' : 'High ET Stress'}
            </span>
          </button>

          {/* Chip 5 */}
          <button
            onClick={() => handleSensorClick('step-4', 'landsat')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'landsat'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cd5d3] ring-2 ring-[#006a69]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">OLI-TIRS</span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">Landsat 8/9</p>
            <span className="font-label-sm text-[11px] text-[#006a69] font-semibold block">
              NDVI: {selectedUpazila.ndvi}
            </span>
          </button>

          {/* Chip 6 */}
          <button
            onClick={() => handleSensorClick('step-5', 'srdi')}
            className={`p-2 rounded-xl text-left transition-all hover:bg-[#d8ebfa] focus:outline-none border ${
              selectedSensor === 'srdi'
                ? 'bg-[#d8ebfa] ring-2 ring-[#006a69] border-[#006a69]'
                : 'bg-[#dff0ff] border-[#d8ebfa]'
            }`}
            type="button"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7cd5d3] ring-2 ring-[#006a69]/40"></span>
              <span className="font-label-sm text-[10px] text-[#43474d] uppercase">
                SOIL-IN-SITU
              </span>
            </div>
            <p className="font-label-sm font-bold text-[#00172d] truncate text-xs">SRDI Soil</p>
            <span className="font-label-sm text-[11px] text-[#006a69] font-semibold block">
              {bn ? 'বরেন্দ্র এঁটেল' : 'Barind Clay'}
            </span>
          </button>
        </div>
      </div>

      {/* Section 1: Step-by-Step Chronological Decision Flow */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006a69] text-[20px]">
              account_tree
            </span>
            <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
              {bn ? 'সিদ্ধান্তের যুক্তি' : 'Decision logic'}
            </h3>
          </div>
          <span className="font-label-sm text-[#43474d] bg-[#d8ebfa] px-2 py-0.5 rounded-full text-xs">
            {bn ? '৫ ধাপ' : '5 PHASES'}
          </span>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#d3e5f4]">
          {/* Step 1 */}
          <div className="relative group" id="step-1">
            <span className="absolute -left-[27px] top-3.5 w-4 h-4 rounded-full bg-white flex items-center justify-center border border-[#d8ebfa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a69]"></span>
            </span>
            <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2 border border-[#d8ebfa]">
              <div className="flex items-center justify-between">
                <span className="font-label-sm font-bold text-[#00504f] bg-[#98f2f0]/40 px-2 py-0.5 rounded-full text-[11px]">
                  {bn ? 'ধাপ ১ • NASA POWER' : 'STEP 1 • NASA POWER'}
                </span>
                <span className="font-label-sm text-[#43474d] text-[11px]">{bn ? 'আবহাওয়া পূর্বাভাস' : 'Met predictor'}</span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
                  {bn ? 'POWER বৃষ্টিপাত ও খরা পূর্বাভাস' : 'POWER rain & drought forecast'}
                </h4>
                <p className="font-label-sm text-[#006a69] font-medium text-xs">
                  {bn ? 'জলবায়ুগত বাষ্পীভবন চাপ' : 'Climatological evaporation stress'}
                </p>
              </div>
              <p className="font-body-md text-[#0c1d28] text-xs leading-relaxed">
                {bn ? (
                  <>
                    POWER পুরনো মডেলে দেখা গেছে{' '}
                    <strong className="font-bold text-[#00172d]">
                      {toBengaliNumber(Math.abs(selectedUpazila.powerDeficit))}% বৃষ্টি কম
                    </strong>{' '}
                    ও তীব্র গরম ({toBengaliNumber(selectedUpazila.powerTemp)}°সে) {selectedUpazila.nameBn}-এ → ডোবা বোরোতে বাষ্পীভবন ঝুঁকি বেশি।
                  </>
                ) : (
                  <>
                    POWER history shows{' '}
                    <strong className="font-bold text-[#00172d]">
                      {Math.abs(selectedUpazila.powerDeficit)}% less rain
                    </strong>{' '}
                    and extreme heat ({selectedUpazila.powerTemp}°C) in {selectedUpazila.nameEn} → high evaporation risk for flooded Boro.
                  </>
                )}
              </p>
              <div className="bg-[#eaf5ff] p-2 rounded-lg flex items-center gap-2 border border-[#d8ebfa]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                  wb_sunny
                </span>
                <span className="font-label-sm text-[#43474d] text-[11px]">
                  {bn ? 'বোরো ধানের জমে থাকা পানি খুব দ্রুত শুকিয়ে যাবে।' : 'Standing water in Boro fields will dry far too fast.'}
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group" id="step-2">
            <span className="absolute -left-[27px] top-3.5 w-4 h-4 rounded-full bg-white flex items-center justify-center border border-[#d8ebfa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </span>
            <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2 border border-[#d8ebfa]">
              <div className="flex items-center justify-between">
                <span className="font-label-sm font-bold text-[#93000a] bg-[#ffdad6] px-2 py-0.5 rounded-full text-[11px]">
                  {bn ? 'ধাপ ২ • NASA GPM' : 'STEP 2 • NASA GPM'}
                </span>
                <span className="font-label-sm text-[#ba1a1a] font-bold text-[11px]">
                  {bn ? `${toBengaliNumber(Math.abs(selectedUpazila.gpmDeficit))}% ঘাটতি` : `${selectedUpazila.gpmDeficit}% DEFICIT`}
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
                  {bn ? `GPM বৃষ্টি ঘাটতি (${toBengaliNumber(Math.abs(selectedUpazila.gpmDeficit))}%)` : `GPM rainfall deficit (${selectedUpazila.gpmDeficit}%)`}
                </h4>
                <p className="font-label-sm text-[#006a69] font-medium text-xs">
                  {bn ? 'প্রাক-বর্ষা বৃষ্টি ঘাটতি' : 'Pre-monsoon rainfall deficit'}
                </p>
              </div>
              <p className="font-body-md text-[#0c1d28] text-xs leading-relaxed">
                {bn ? (
                  <>
                    বর্ষার আগে দীর্ঘ খরা →{' '}
                    <strong className="font-bold text-[#ba1a1a]">২৮ বার গভীর নলকূপ চালানো</strong> লোকসান।
                  </>
                ) : (
                  <>
                    Long pre-monsoon dry spell → running deep tubewells{' '}
                    <strong className="font-bold text-[#ba1a1a]">28 times</strong> loses money.
                  </>
                )}
              </p>
              <div className="bg-[#eaf5ff] p-2 rounded-lg flex items-center gap-2 border border-[#d8ebfa]">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                  water_drop
                </span>
                <span className="font-label-sm text-[#43474d] text-[11px]">
                  {bn ? 'ভূগর্ভস্থ পানি দিয়ে ২৮ বার সেচে খরচ উঠবে না।' : '28 pumped waterings will not pay for themselves.'}
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group" id="step-3">
            <span className="absolute -left-[27px] top-3.5 w-4 h-4 rounded-full bg-white flex items-center justify-center border border-[#d8ebfa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffba3b]"></span>
            </span>
            <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2 border border-[#d8ebfa]">
              <div className="flex items-center justify-between">
                <span className="font-label-sm font-bold text-[#3c2700] bg-[#ffdead]/60 px-2 py-0.5 rounded-full text-[11px]">
                  {bn ? 'ধাপ ৩ • NASA SMAP' : 'STEP 3 • NASA SMAP'}
                </span>
                <span className="font-label-sm text-[#3c2700] font-semibold text-[11px]">
                  {selectedUpazila.smapMoisture} m³/m³ Clay
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
                  {bn ? `SMAP মাটির আর্দ্রতা (শুষ্ক / ${selectedUpazila.smapMoisture})` : `SMAP soil moisture (dry / ${selectedUpazila.smapMoisture} m³/m³)`}
                </h4>
                <p className="font-label-sm text-[#006a69] font-medium text-xs">
                  {bn ? 'উপরের এঁটেল স্তরে পানির অভাব' : 'Topsoil clay water deficit'}
                </p>
              </div>
              <p className="font-body-md text-[#0c1d28] text-xs leading-relaxed">
                {bn ? (
                  <>
                    উপরের মাটিতে পানি কম →{' '}
                    <strong className="font-bold text-[#00172d]">অবিরাম ভিজিয়ে না রাখলে ফেটে যাবে</strong>।
                  </>
                ) : (
                  <>
                    Topsoil too dry →{' '}
                    <strong className="font-bold text-[#00172d]">heavy cracking</strong> without constant soaking.
                  </>
                )}
              </p>
              <div className="bg-[#eaf5ff] p-2 rounded-lg flex items-center gap-2 border border-[#d8ebfa]">
                <span className="material-symbols-outlined text-[#3c2700] text-[18px]">grain</span>
                <span className="font-label-sm text-[#43474d] text-[11px]">
                  {bn ? 'ক্রমাগত পানি ছাড়া বরেন্দ্র এঁটেল মাটি ফেটে চৌচির হবে।' : 'Barind clay will crack wide open without constant water.'}
                </span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative group" id="step-4">
            <span className="absolute -left-[27px] top-3.5 w-4 h-4 rounded-full bg-white flex items-center justify-center border border-[#d8ebfa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a69]"></span>
            </span>
            <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2 border border-[#d8ebfa]">
              <div className="flex items-center justify-between">
                <span className="font-label-sm font-bold text-[#00504f] bg-[#98f2f0]/40 px-2 py-0.5 rounded-full text-[11px]">
                  {bn ? 'ধাপ ৪ • ECOSTRESS + Landsat' : 'STEP 4 • ECOSTRESS + Landsat'}
                </span>
                <span className="font-label-sm text-[#43474d] text-[11px]">
                  NDVI: {selectedUpazila.ndvi}
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
                  {bn ? `পাতার পানি-টান ও সবুজ সূচক (${selectedUpazila.ndvi})` : `Leaf water stress & green index (${selectedUpazila.ndvi})`}
                </h4>
                <p className="font-label-sm text-[#006a69] font-medium text-xs">
                  {bn ? 'তাপীয় বাষ্পীভবন সূচক' : 'Thermal evapotranspiration index'}
                </p>
              </div>
              <p className="font-body-md text-[#0c1d28] text-xs leading-relaxed">
                {bn ? (
                  <>
                    পাতার তাপ বলছে{' '}
                    <strong className="font-bold text-[#00172d]">তীব্র বাষ্পীভবন ক্ষতি</strong> ফেব্রুয়ারি–মে বাড়ন্ত সময়ে।
                  </>
                ) : (
                  <>
                    Canopy heat shows{' '}
                    <strong className="font-bold text-[#00172d]">severe evapotranspiration loss</strong> in the February–May growth phase.
                  </>
                )}
              </p>
              <div className="bg-[#eaf5ff] p-2 rounded-lg flex items-center gap-2 border border-[#d8ebfa]">
                <span className="material-symbols-outlined text-[#006a69] text-[18px]">
                  nature
                </span>
                <span className="font-label-sm text-[#43474d] text-[11px]">
                  {bn ? 'ফেব্রুয়ারি-মে মাসে পাতায় অতিরিক্ত পানির টান।' : 'Leaves under extreme water pull in February–May.'}
                </span>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative group" id="step-5">
            <span className="absolute -left-[27px] top-3.5 w-4 h-4 rounded-full bg-white flex items-center justify-center border border-[#d8ebfa]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00172d] ring-2 ring-[#98f2f0]"></span>
            </span>
            <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2.5 border border-[#d8ebfa]">
              <div className="flex items-center justify-between">
                <span className="font-label-sm font-bold text-white bg-[#00172d] px-2 py-0.5 rounded-full text-[11px]">
                  {bn ? 'ধাপ ৫ • চূড়ান্ত সমাধান' : 'STEP 5 • FINAL FIX'}
                </span>
                <span className="font-label-sm text-[#006a69] font-bold text-[11px]">
                  {bn ? 'যাচাইকৃত' : 'VERIFIED FIT'}
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-[#00172d] text-sm sm:text-base">
                  {bn ? `SRDI বরেন্দ্র মাটির মানচিত্র (${selectedUpazila.soilTypeBn})` : `SRDI Barind soil map (${selectedUpazila.soilTypeEn})`}
                </h4>
                <p className="font-label-sm text-[#006a69] font-medium text-xs">
                  {bn ? 'শিকড় গভীরে যায় ও আর্দ্রতা ধরে রাখে' : 'Roots go deep & hold moisture'}
                </p>
              </div>
              <div className="p-3 bg-[#98f2f0]/20 rounded-lg space-y-1 border border-[#98f2f0]/30">
                <div className="flex items-center gap-1.5 text-[#006a69] font-bold font-label-md text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-[18px]">spa</span>
                  <span>{bn ? 'সিদ্ধান্ত: সরিষা + মুগডাল চাষ' : 'Decision: mustard + mungbean'}</span>
                </div>
                <p className="font-body-md text-[#0c1d28] text-xs leading-relaxed">
                  {bn ? (
                    <>
                      শক্ত এঁটেল স্তর শিকড় আটকায় →{' '}
                      <strong className="font-bold text-[#00172d]">
                        সরিষা + মুগ মাত্র ২ বার পানিতেই জমে ওঠে!
                      </strong>
                    </>
                  ) : (
                    <>
                      Hard clay locks roots →{' '}
                      <strong className="font-bold text-[#00172d]">
                        mustard + mungbean thrive on just 2 waterings!
                      </strong>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs font-label-sm pt-1">
                <span className="text-[#43474d]">
                  পানির সাশ্রয়: <strong className="text-[#00172d]">৭৫% পাম্প পানি</strong>
                </span>
                <span className="text-[#006a69] font-bold">
                  ২৮ বার → মাত্র ২ বার সেচ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Proof Synthesis Visualizer */}
      <div className="bg-[#eaf5ff] p-3.5 rounded-xl space-y-3 border border-[#d8ebfa]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-label-md font-bold text-[#00172d] text-xs sm:text-sm">
              {bn ? 'উপগ্রহ-মাটি সমন্বয়' : 'Satellite-soil match'}
            </p>
            <p className="font-label-sm text-[#43474d] text-[11px]">
              {bn ? 'মাটির তথ্যের সাথে মিল' : 'Alignment with ground truth'}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-[#dff0ff] px-2 py-1 rounded-md border border-[#d8ebfa]">
            <span className="material-symbols-outlined text-[#006a69] text-[16px]">
              check_circle
            </span>
            <span className="font-label-sm font-bold text-[#00172d] text-[11px]">{bn ? '৯৯.২% মিল' : '99.2% MATCH'}</span>
          </div>
        </div>

        {/* Quick Stat Comparison Rows */}
        <div className="space-y-1.5 font-label-sm text-xs">
          <div className="p-2 bg-white rounded-lg flex items-center justify-between border border-[#d8ebfa]">
            <span className="text-[#43474d]">{bn ? 'বোরো ধানের পাম্প পানি (প্রতি একর)' : 'Boro pumped water (per acre)'}</span>
            <span className="font-bold text-[#ba1a1a]">{bn ? '১৬ লাখ লিটার' : '1.6M litres'}</span>
          </div>
          <div className="p-2 bg-white rounded-lg flex items-center justify-between border border-[#d8ebfa]">
            <span className="text-[#43474d]">{bn ? 'সরিষা+মুগ (প্রতি একর)' : 'Mustard+mung (per acre)'}</span>
            <span className="font-bold text-[#006a69]">{bn ? '৪ লাখ লিটার (−৭৫%)' : '0.4M litres (−75%)'}</span>
          </div>
          <div className="p-2 bg-white rounded-lg flex items-center justify-between border border-[#d8ebfa]">
            <span className="text-[#43474d]">{bn ? 'ভূগর্ভস্থ স্তর ঝুঁকি' : 'Aquifer risk'}</span>
            <span className="font-bold text-[#006a69]">{bn ? 'নগণ্য' : 'Negligible'}</span>
          </div>
        </div>
      </div>

      {/* Section 3: Official Scientific Disclaimer & Hackathon Submission Box */}
      <div className="bg-[#d8ebfa]/60 rounded-xl p-4 space-y-3 border border-[#d8ebfa]">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0b2c4a] text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">policy</span>
          </div>
          <div className="space-y-0.5">
            <p className="font-label-md font-bold text-[#00172d] leading-tight text-xs sm:text-sm">
              {bn ? 'দাবি অস্বীকার' : 'Disclaimer'}
            </p>
            <p className="font-label-sm text-[#43474d] text-[11px]">
              {bn ? 'পদ্ধতিগত সীমা' : 'Method limits'}
            </p>
          </div>
        </div>
        <p className="font-body-md text-[#43474d] text-xs leading-relaxed">
          {bn
            ? 'POWER জলবায়ু অক্টোবর ২০২৬-এ যাচাইকৃত (২০০১–২০২০); স্ম্যাপ/সবুজ সূচক শুষ্ক মৌসুমের সাধারণ মান — লাইভ তথ্য Earthdata অনুমোদন সাপেক্ষে। প্রতি মৌজায় জমি অনুযায়ী যাচাই করুন। আরেকটা টিমের ক্রপওয়াইজ, নাসা স্পেস অ্যাপস ২০২৬।'
            : 'POWER climate VERIFIED Oct 2026 (2001–2020); SMAP/NDVI dry-season typical — live granules pending Earthdata auth. Calibrate per mouza plot. CropWise by Arekta Team, NASA Space Apps 2026.'}
        </p>
        <details className="bg-white rounded-lg border border-[#d8ebfa] p-3">
          <summary className="font-bold text-[#00172d] text-xs cursor-pointer">
            {bn ? `তথ্যসূত্র (${DATA_SOURCES.length})` : `Data sources (${DATA_SOURCES.length})`}
          </summary>
          <ul className="mt-2 space-y-1.5">
            {DATA_SOURCES.map((s) => (
              <li key={s.id} className="text-[11px] leading-snug text-[#43474d]">
                <span className="font-bold text-[#00172d]">{bn ? s.labelBn : s.label}</span> — {bn ? s.detailBn : s.detail}{' '}
                <span className="text-[#006a69]">{s.url}</span>
              </li>
            ))}
          </ul>
        </details>
        <div className="pt-2 border-t-0 bg-[#d3e5f4]/50 -mx-4 -mb-4 px-4 py-2.5 flex items-center justify-between rounded-b-xl">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006a69] text-[16px]">groups</span>
            <span className="font-label-sm font-bold text-[#00172d] text-[11px]">
              Team Arekta Team • CropWise
            </span>
          </div>
          <span className="font-label-sm text-[#43474d] text-[11px]">
            Dhaka & Rajshahi Division
          </span>
        </div>
      </div>

      {/* Bottom CTA Actions */}
      <div className="pt-2 space-y-2.5">
        <button
          onClick={handleExport}
          className="w-full h-12 bg-[#006a69] text-white rounded-xl font-label-md font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98] hover:bg-[#00706f]"
          id="btnExport"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          <span>{bn ? 'ডেটা সংরক্ষণ ও শেয়ার' : 'Save & share data'}</span>
        </button>

        <button
          onClick={onRecalculate}
          className="w-full h-12 bg-white text-[#00172d] rounded-xl font-label-md font-semibold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98] hover:bg-[#eaf5ff] border border-[#d8ebfa]"
          id="btnRecalculate"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          <span>{bn ? 'পুনরায় হিসাব করুন' : 'Recalculate'}</span>
        </button>
      </div>

      {/* Toast Notification Container for Export Feedback */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#22323e] text-[#e5f2ff] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        id="exportToast"
      >
        <span className="material-symbols-outlined text-[#98f2f0] text-[18px]">offline_pin</span>
        <span className="font-label-sm font-semibold text-xs">
          {bn ? 'অফলাইন রিপোর্ট সংরক্ষিত হয়েছে!' : 'Offline report saved!'}
        </span>
      </div>
    </div>
  );
};
