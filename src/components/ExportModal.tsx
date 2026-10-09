import React, { useState } from 'react';
import { UpazilaData } from '../types';
import {
  economicsForAcre,
  formatCurrencyBn,
  formatCurrencyEn,
  formatVolumeBn,
  formatVolumeEn,
  toBengaliNumber,
} from '../data/barindData';
import { farmerCardNo } from './FarmerCard';
import { Lang } from '../i18n';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUpazila: UpazilaData;
  acre: number;
  waterPriority: number;
  costPriority: number;
  soilPriority: number;
  farmerName: string;
  lang: Lang;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  selectedUpazila,
  acre,
  waterPriority,
  costPriority,
  soilPriority,
  farmerName,
  lang,
}) => {
  const [copied, setCopied] = useState(false);
  const bn = lang === 'bn';
  const FC = bn ? formatCurrencyBn : formatCurrencyEn;
  const FV = bn ? formatVolumeBn : formatVolumeEn;

  if (!isOpen) return null;

  const { savings: costSavings, waterSaved: waterSavingsLiters } = economicsForAcre(acre);
  const cardNo = farmerCardNo(farmerName, selectedUpazila.id);
  const fname = farmerName.trim() === '' ? (bn ? '(নামহীন)' : '(unnamed)') : farmerName.trim();

  const reportText = bn
    ? `[ক্রপওয়াইজ • আরেকটা টিম • নাসা স্পেস অ্যাপস ২০২৬]
কৃষক: ${fname} (${cardNo})
উপজেলা: ${selectedUpazila.nameBn}, ${selectedUpazila.districtBn} (${selectedUpazila.lat}°N, ${selectedUpazila.lng}°E)
জমি: ${acre} একর
সেরা রোটেশন: সরিষা + মুগডাল + রোপা আমন
সেচ সাশ্রয়: ৭৫% (${FV(waterSavingsLiters)})
ব্যয় সাশ্রয়: ${FC(costSavings)}
মাটি: pH ${selectedUpazila.defaultPh} (বরেন্দ্র ধূসর সোপান)
উপগ্রহ: পাওয়ার (-${Math.abs(selectedUpazila.powerDeficit)}%), জিপিএম (${selectedUpazila.gpmDeficit}%), স্ম্যাপ (${selectedUpazila.smapMoisture}), ল্যান্ডস্যাট সবুজ ${selectedUpazila.ndvi}
অগ্রাধিকার: পানি ${waterPriority}%, মাটি ${soilPriority}%, খরচ ${costPriority}%`
    : `[CropWise by Arekta Team • NASA Space Apps 2026]
Farmer: ${fname} (${cardNo})
Upazila: ${selectedUpazila.nameEn}, ${selectedUpazila.districtEn} (${selectedUpazila.lat}N, ${selectedUpazila.lng}E)
Land: ${acre} acre
Best rotation: Mustard + Mungbean + T.Aman
Water saved: 75% (${FV(waterSavingsLiters)})
Cost saved: ${FC(costSavings)}
Soil: pH ${selectedUpazila.defaultPh} (Barind grey terrace)
Satellites: POWER (-${Math.abs(selectedUpazila.powerDeficit)}%), GPM (${selectedUpazila.gpmDeficit}%), SMAP (${selectedUpazila.smapMoisture}), Landsat NDVI (${selectedUpazila.ndvi})
Priorities: water ${waterPriority}%, soil ${soilPriority}%, cost ${costPriority}%`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 border border-[#d8ebfa] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8ebfa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a69] text-[22px]">description</span>
            <h3 className="font-headline-sm font-bold text-[#00172d] text-base">
              {bn ? 'অফলাইন রিপোর্ট' : 'Offline report'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaf5ff] text-[#43474d] flex items-center justify-center hover:bg-[#d8ebfa]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Printable/Exportable Card Preview */}
        <div className="bg-[#f6faff] p-4 rounded-xl border border-[#d8ebfa] space-y-3 text-xs text-[#0c1d28]">
          <div className="flex items-center justify-between border-b border-[#d8ebfa] pb-2">
            <div>
              <div className="font-bold font-headline-sm text-[#00172d] text-sm">
                {bn ? 'ক্রপওয়াইজ সারসংক্ষেপ' : 'CropWise summary'}
              </div>
              <div className="text-[10px] text-[#006a69] font-medium">
                {bn ? 'আরেকটা টিম • নাসা স্পেস অ্যাপস ২০২৬' : 'AREKTA TEAM • NASA SPACE APPS 2026'}
              </div>
            </div>
            <span className="bg-[#98f2f0] text-[#002020] px-2 py-0.5 rounded text-[10px] font-bold">
              {bn ? 'যাচাইকৃত' : 'VERIFIED'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[#43474d] block">{bn ? 'কৃষক ও কার্ড:' : 'Farmer & card:'}</span>
              <span className="font-bold text-[#00172d]">
                {fname} • {cardNo}
              </span>
            </div>
            <div>
              <span className="text-[#43474d] block">{bn ? 'উপজেলা ও অবস্থান:' : 'Upazila:'}</span>
              <span className="font-bold text-[#00172d]">
                {bn
                  ? `${selectedUpazila.nameBn}, ${selectedUpazila.districtBn} (${selectedUpazila.lat}°N, ${selectedUpazila.lng}°E)`
                  : `${selectedUpazila.nameEn}, ${selectedUpazila.districtEn} (${selectedUpazila.lat}N, ${selectedUpazila.lng}E)`}
              </span>
            </div>
            <div>
              <span className="text-[#43474d] block">{bn ? 'জমির পরিমাণ:' : 'Field size:'}</span>
              <span className="font-bold text-[#00172d]">
                {bn ? `${toBengaliNumber(acre)} একর` : `${acre} acre`}
              </span>
            </div>
          </div>

          <div className="bg-[#0b2c4a] text-white p-3 rounded-lg space-y-1">
            <div className="text-[10px] text-[#98f2f0] font-bold uppercase">
              {bn ? 'সুপারিশকৃত সেরা বিকল্প' : 'RECOMMENDED WINNER'}
            </div>
            <div className="text-sm font-bold text-white font-headline-sm">
              {bn ? 'বিকল্প খ: সরিষা + মুগডাল + রোপা আমন' : 'Option B: Mustard + Mungbean + T.Aman'}
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
              <span>{bn ? 'ব্যয় সাশ্রয়:' : 'Cost saved:'} <strong className="text-[#98f2f0]">{FC(costSavings)}</strong></span>
              <span>{bn ? 'পানি সাশ্রয়:' : 'Water saved:'} <strong className="text-[#98f2f0]">{FV(waterSavingsLiters)}</strong></span>
            </div>
          </div>

          <div className="space-y-1 pt-1 text-[11px] text-[#43474d]">
            <div>{bn ? '• ২৮ বারের বদলে মাত্র ২ বার সেচ (৭৫% কম পাম্প)' : '• 2 waterings instead of 28 (75% less pumping)'}</div>
            <div>{bn ? '• মাটির জৈব পদার্থ ও প্রাকৃতিক নাইট্রোজেন বৃদ্ধি' : '• Rebuilds organic matter + natural nitrogen'}</div>
            <div>{bn ? '• বিএমডিএ নলকূপ সময়সীমার মধ্যে নিরাপদ' : '• Stays within BMDA tubewell limits'}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 bg-[#eaf5ff] text-[#006a69] hover:bg-[#d8ebfa] rounded-xl font-bold font-headline-sm flex items-center justify-center gap-1.5 transition-colors text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? (bn ? 'কপি হয়েছে!' : 'Copied!') : bn ? 'টেক্সট কপি করুন' : 'Copy text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-3 bg-[#006a69] text-white hover:bg-[#00504f] rounded-xl font-bold font-headline-sm flex items-center justify-center gap-1.5 transition-colors text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{bn ? 'প্রিন্ট / পিডিএফ' : 'Print / PDF'}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-transparent text-[#43474d] rounded-xl font-medium text-xs hover:bg-[#f6faff]"
        >
          {bn ? 'বন্ধ করুন' : 'Close'}
        </button>
      </div>
    </div>
  );
};
