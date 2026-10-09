// MyFarmScreen — farmer's own data entry page.
// Name, phone, field, soil, water source, irrigation, sowing plan.
// Saved to localStorage, feeds Field Tracker + Compare + AI chat.
import React, { useState } from 'react';
import { FarmerProfile, UpazilaData } from '../types';
import { UPAZILAS, toBengaliNumber } from '../data/barindData';
import { FarmerCard } from './FarmerCard';
import { Lang } from '../i18n';

interface MyFarmScreenProps {
  lang: Lang;
  farmer: FarmerProfile;
  setFarmer: (f: FarmerProfile) => void;
  selectedUpazila: UpazilaData;
  onSelectUpazila: (u: UpazilaData) => void;
  acre: number;
  setAcre: (a: number) => void;
  currentPh: number;
  setPh: (p: number) => void;
}

const WATER_SOURCES: { id: FarmerProfile['waterSource']; bn: string; en: string }[] = [
  { id: 'deep-tubewell', bn: 'গভীর নলকূপ', en: 'Deep tubewell (BMDA)' },
  { id: 'shallow-tubewell', bn: 'অগভীর নলকূপ', en: 'Shallow tubewell' },
  { id: 'pond', bn: 'পুকুর', en: 'Pond' },
  { id: 'canal', bn: 'খাল / নদী', en: 'Canal / river' },
  { id: 'rain-only', bn: 'শুধু বৃষ্টি', en: 'Rain only' },
];

const SOWING_MONTHS = [
  { en: 'October', bn: 'অক্টোবর' },
  { en: 'November', bn: 'নভেম্বর' },
  { en: 'December', bn: 'ডিসেম্বর' },
  { en: 'January', bn: 'জানুয়ারি' },
];

export const MyFarmScreen: React.FC<MyFarmScreenProps> = ({
  lang,
  farmer,
  setFarmer,
  selectedUpazila,
  onSelectUpazila,
  acre,
  setAcre,
  currentPh,
  setPh,
}) => {
  const [saved, setSaved] = useState(() => farmer.name.trim() !== '');
  const [editing, setEditing] = useState(() => farmer.name.trim() === '');
  const bn = lang === 'bn';
  const remaining = Math.max(0, selectedUpazila.bmdaHoursCap - farmer.irrigationHours);
  const nameOk = farmer.name.trim() !== '';

  const set = (patch: Partial<FarmerProfile>) => {
    setFarmer({ ...farmer, ...patch });
    setSaved(false); // any edit returns card to draft until re-saved
  };

  const handleSave = () => {
    if (!nameOk) return;
    try {
      localStorage.setItem('cropwise-farmer', JSON.stringify({ ...farmer }));
    } catch {
      // private mode — ignore
    }
    setSaved(true); // card stays SAVED until next edit
    setEditing(false); // hide the form — show confirmation + card only
  };

  const handleUpdate = () => {
    setEditing(true);
    setSaved(false);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Title */}
      <div className="bg-[#eaf5ff] p-5 rounded-2xl border border-[#d8ebfa] space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006a69] text-[24px]">person</span>
          <h2 className="font-bold text-[#00172d] text-xl leading-tight">
            {bn ? 'আমার খামার' : 'My Farm'}
          </h2>
        </div>
        <p className="text-[#43474d] text-sm">
          {bn ? 'আপনার তথ্য দিন, হিসাব নির্ভুল হবে' : 'Tell us about your farm for accurate advice'}
        </p>
        {farmer.name !== '' && (
          <p className="text-[#006a69] font-bold text-sm pt-1">
            {bn ? `🌾 ${farmer.name} • ${selectedUpazila.nameBn} • ${toBengaliNumber(acre)} একর` : `🌾 ${farmer.name} • ${selectedUpazila.nameEn} • ${acre} acre`}
          </p>
        )}
      </div>

      {/* Farmer profile card — live draft until saved */}
      <FarmerCard
        lang={lang}
        farmer={farmer}
        upazila={selectedUpazila}
        acre={acre}
        ph={currentPh}
        saved={saved && nameOk}
      />

      {/* Saved confirmation — form stays hidden until Update */}
      {!editing && nameOk && (
        <div className="bg-[#98f2f0]/25 border border-[#006a69]/30 rounded-2xl p-5 text-center space-y-3">
          <p className="font-bold text-[#00504f] text-lg">
            {bn ? '✓ তথ্য সংরক্ষিত হয়েছে' : '✓ Data saved'}
          </p>
          <p className="text-sm text-[#43474d]">
            {bn
              ? 'তুলনা ও এআই সহায়ক এই তথ্য ব্যবহার করবে'
              : 'Compare + AI Sahayak will use this data'}
          </p>
          <button
            onClick={handleUpdate}
            className="w-full min-h-[52px] bg-white border-2 border-[#006a69] text-[#006a69] rounded-2xl font-bold text-base active:scale-[0.98] transition-all"
          >
            {bn ? '✎ প্রোফাইল আপডেট করুন' : '✎ Update profile'}
          </button>
        </div>
      )}

      {editing && (
      <>
      {/* 1. Farmer identity */}
      <section className="bg-white rounded-2xl p-5 border border-[#d8ebfa] space-y-4">
        <h3 className="font-bold text-[#00172d] text-base">
          {bn ? '১. কৃষকের পরিচয়' : '1. Farmer identity'}
        </h3>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#43474d]" htmlFor="fname">
            {bn ? 'নাম' : 'Name'}
          </label>
          <input
            id="fname"
            value={farmer.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder={bn ? 'যেমন: রফিকুল ইসলাম' : 'e.g. Rafiqul Islam'}
            className="w-full min-h-[52px] px-4 rounded-xl bg-[#f6faff] border border-[#d8ebfa] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#006a69]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#43474d]" htmlFor="fphone">
            {bn ? 'মোবাইল (ঐচ্ছিক)' : 'Phone (optional)'}
          </label>
          <input
            id="fphone"
            type="tel"
            value={farmer.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="01XXXXXXXXX"
            className="w-full min-h-[52px] px-4 rounded-xl bg-[#f6faff] border border-[#d8ebfa] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#006a69]"
          />
        </div>
      </section>

      {/* 2. Field location + size */}
      <section className="bg-white rounded-2xl p-5 border border-[#d8ebfa] space-y-4">
        <h3 className="font-bold text-[#00172d] text-base">
          {bn ? '২. জমির অবস্থান ও আয়তন' : '2. Field location & size'}
        </h3>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#43474d]" htmlFor="farmUpazila">
            {bn ? 'উপজেলা' : 'Upazila'}
          </label>
          <select
            id="farmUpazila"
            value={selectedUpazila.id}
            onChange={(e) => {
              const found = UPAZILAS.find((u) => u.id === e.target.value);
              if (found) onSelectUpazila(found);
            }}
            className="w-full min-h-[52px] px-3.5 rounded-xl bg-[#eaf5ff] text-[#00172d] font-bold border border-[#d8ebfa] focus:outline-none focus:ring-2 focus:ring-[#006a69] text-[15px]"
          >
            {UPAZILAS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nameBn}, {u.districtBn} ({u.nameEn})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#43474d]">
            {bn ? 'জমির পরিমাণ' : 'Field size'}
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {[0.5, 1.0, 1.5, 2.0, 3.0, 5.0].map((a) => (
              <button
                key={a}
                onClick={() => setAcre(a)}
                className={`min-h-[52px] rounded-xl border text-sm font-bold transition-all ${
                  acre === a
                    ? 'border-[#006a69] bg-[#98f2f0]/20 ring-2 ring-[#006a69] text-[#00172d]'
                    : 'border-[#d8ebfa] bg-[#f6faff] text-[#43474d]'
                }`}
              >
                {bn ? toBengaliNumber(a) : a} {bn ? 'একর' : 'acre'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Soil */}
      <section className="bg-white rounded-2xl p-5 border border-[#d8ebfa] space-y-4">
        <h3 className="font-bold text-[#00172d] text-base">
          {bn ? '৩. মাটি' : '3. Soil'}
        </h3>
        <p className="text-xs text-[#43474d] bg-[#eaf5ff] rounded-xl px-3 py-2.5">
          {bn ? `${selectedUpazila.soilTypeBn} • বার্ক কৃষি অঞ্চল-২৫` : `${selectedUpazila.soilTypeEn} • ${selectedUpazila.soilClass}`}
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#00172d]">
              {bn ? 'মাটির pH (জানা থাকলে)' : 'Soil pH (if known)'}
            </span>
            <span className="bg-[#d8ebfa] px-2.5 py-1 rounded-full text-sm font-bold text-[#00172d]">
              pH {bn ? toBengaliNumber(currentPh.toFixed(1)) : currentPh.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="5.0"
            max="7.0"
            step="0.1"
            value={currentPh}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="w-full h-3 accent-[#006a69]"
          />
          <div className="flex justify-between text-[11px] text-[#43474d]">
            <span>{bn ? '৫.০ অম্লীয়' : '5.0 acidic'}</span>
            <span>{bn ? '৭.০ ক্ষারীয়' : '7.0 alkaline'}</span>
          </div>
        </div>
      </section>

      {/* 4. Water */}
      <section className="bg-white rounded-2xl p-5 border border-[#d8ebfa] space-y-4">
        <h3 className="font-bold text-[#00172d] text-base">
          {bn ? '৪. পানির উৎস' : '4. Water source'}
        </h3>
        <div className="flex flex-col gap-2.5">
          {WATER_SOURCES.map((w) => (
            <button
              key={w.id}
              onClick={() => set({ waterSource: w.id })}
              className={`w-full min-h-[52px] rounded-xl border px-4 py-3 text-left transition-all ${
                farmer.waterSource === w.id
                  ? 'border-[#006a69] bg-[#98f2f0]/20 ring-2 ring-[#006a69]'
                  : 'border-[#d8ebfa] bg-[#f6faff]'
              }`}
            >
              <span className="block font-bold text-[#00172d] text-[15px]">{bn ? w.bn : w.en}</span>
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#00172d]">
              {bn ? 'এ মৌসুমে পাম্প ঘণ্টা (পরিকল্পনা)' : 'Pump hours planned'}
            </span>
            <span className="bg-[#ffdead] px-2.5 py-1 rounded-full text-sm font-bold text-[#3c2700]">
              {bn
                ? `${toBengaliNumber(farmer.irrigationHours)}ঘণ্টা / ${toBengaliNumber(selectedUpazila.bmdaHoursCap)}ঘণ্টা`
                : `${farmer.irrigationHours}h / ${selectedUpazila.bmdaHoursCap}h`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={selectedUpazila.bmdaHoursCap}
            step="20"
            value={farmer.irrigationHours}
            onChange={(e) => set({ irrigationHours: parseInt(e.target.value, 10) })}
            className="w-full h-3 accent-[#c28700]"
          />
          <p className="text-xs text-[#006a69] font-semibold">
            {bn ? `বাকি কোটা: ${toBengaliNumber(remaining)} ঘণ্টা` : `Quota left: ${remaining} hrs`}
          </p>
        </div>
      </section>

      {/* 5. Sowing plan */}
      <section className="bg-white rounded-2xl p-5 border border-[#d8ebfa] space-y-4">
        <h3 className="font-bold text-[#00172d] text-base">
          {bn ? '৫. বপন পরিকল্পনা' : '5. Sowing plan'}
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {SOWING_MONTHS.map((m) => (
            <button
              key={m.en}
              onClick={() => set({ sowingMonth: m.en })}
              className={`min-h-[52px] rounded-xl border text-sm font-bold transition-all ${
                farmer.sowingMonth === m.en
                  ? 'border-[#006a69] bg-[#98f2f0]/20 ring-2 ring-[#006a69] text-[#00172d]'
                  : 'border-[#d8ebfa] bg-[#f6faff] text-[#43474d]'
              }`}
            >
              {bn ? m.bn : m.en}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#43474d] bg-[#eaf5ff] rounded-xl px-3 py-2.5">
          {bn
            ? 'সরিষা: অক্টোবর মাঝ–নভেম্বর মাঝ (BARI)। মুগ: ২৫ জানু–১০ এপ্রিল।'
            : 'Mustard: mid-Oct–mid-Nov (BARI). Mung: 25 Jan–10 Apr.'}
        </p>
      </section>

      {/* Save */}
      <div className="space-y-2 pb-2">
        <button
          onClick={handleSave}
          disabled={!nameOk}
          className={`w-full min-h-[56px] rounded-2xl font-bold text-lg shadow-md active:scale-[0.98] transition-all ${
            nameOk ? 'bg-[#006a69] text-white' : 'bg-[#d8ebfa] text-[#73777e]'
          }`}
        >
          {bn ? 'সংরক্ষণ করুন (Save)' : 'Save'}
        </button>
        <p className="text-center text-xs text-[#43474d]">
          {!nameOk
            ? bn
              ? '⚠️ আগে ১ নম্বরে নাম লিখুন, তারপর সংরক্ষণ করুন'
              : '⚠️ Enter your name in step 1 first, then save'
            : bn
              ? 'তুলনা ও এআই সহায়ক এই তথ্য ব্যবহার করবে'
              : 'Compare + AI Sahayak will use this data'}
        </p>
      </div>
      </>
      )}
    </div>
  );
};
