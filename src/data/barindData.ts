import { UpazilaData } from '../types';

// CropWise by Arekta Team — real-data edition.
// POWER climatology VERIFIED via NASA POWER API Oct 2026 (2001–2020 baseline).
// Snapshot: ./nasa_power_climatology_2001_2020.json
// Soil/BBS/BRRI values from official publications — see DATA_SOURCES below.

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1XIOOySTnpVKfHSDPh8dO1Q6fJwr0szcJQFo_X48rNNslVS_yujlEvEh1jjyRSeZXsFODooaXk6L2R2aE93Pl4vTNJelRRhfY3QyixVrY0bjHU9MHjJm_T9Pzmk0qdH7zRPeTWJlBusQM_tv-cP7dix3XwsdcIkyQeV53sMJAXxpN-uEpsjKsh1a0FThFvp5cN_BWi3p-HhMpetrtGTv0ftrjM6qCQnQiCy_oR-zwnjjMrTkQms-u8g0A';

export const MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1jQkMjkYbgyEb1vDI34k7del-4nXqO1vjGzqg8K3_HZjWeMKQI4fq0hscsb84rJdXWnhSSoXd-jhRzS3NlZGXJLGQ9nwb_4nwdlVt_fqDcSzP0WFEdVmJE5OLDuXzwqcQRl0koo7ZfvbLEvj-lG7JtW68jr-1XQwKzmSy99dcIzuIEg-AGbkNu8fOMs3fv8iYNdfCvfSqln7Fu2KxfixlQhyFM07lMn6VkMeHDd8fxoNNp28ALm55';

export const MUSTARD_FIELD_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-ZW_xzjq7g3mkduUvR-b8b0Whdl2NP2yRuD5WgR9LK8_9GDQXK6sYmr5Ga6xJ1fFC02q3k57qA-jsMmCc9woQU4lM7O3Pv47cUju-AABSrPjwjedq4HGa31a6pCL9diQnFg-BVmSgNmnyiXg7PRWD0eqTCkuGxWMQID8UbevS5RRvnMZjjWWtYRoali3N_2CcOu7RVIV7n0D30n9hRlWjSq-2V0yQtolh4NmDbvGNNNjnxJxM5nO';

export const CRACKED_PADDY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA2O4ZhWV5FDkjRb97iVTuueV3QzUYNOKL4jE44EB6nrwB5HHL47vf6Sy8TbQXbHDdWMBSCXdWaPeToEhq9gomQVr4JEZJ-fX9pTXZRr51ok6rsmvD5r_QRR3_LIVZfngOktJ3HefQEIT8JSMEFupOLH530LLpcugYE-fjy7IZ12bXdQNKkWgfCbF6mELTTbsOAMDHZUQF9tjIWIeAdz69fthYGLLAEcP-M3K7K3Mv6tW21QgJMhiOV';

/**
 * Upazila telemetry.
 * - powerTemp: NASA POWER T2M May climatology (peak Boro heat), 2001–2020 baseline.
 * - powerDeficit: dry-season (Jan–Apr mean PRECTOTCORR) vs annual mean, % below annual. Real derived.
 * - gpmDeficit: pre-monsoon (Mar–May mean) vs monsoon (Jun–Sep mean), % below monsoon. Real derived.
 *   GPM IMERG granule to replace proxy in Video 2; pattern identical (dry pre-monsoon).
 * - smapMoisture / ndvi: dry-season typical low for Barind clay/fallow (SMAP L-band + Landsat NDVI).
 *   Live SMAP L3 + HLS tile pending Earthdata auth — see NASA_CONFIG. Values are literature-typical, flagged.
 * - groundwaterDrop / bmdaHoursCap: BMDA reported (Dialogue Earth May 2026, BMDA engineer).
 */
export const UPAZILAS: UpazilaData[] = [
  {
    id: 'tanore',
    nameBn: 'তানোর',
    nameEn: 'Tanore',
    districtBn: 'রাজশাহী',
    districtEn: 'Rajshahi',
    lat: 24.6,
    lng: 88.58,
    soilClass: 'BARC AEZ-25 • Grey terrace',
    soilTypeBn: 'লাল কাদা মাটি (Hard Red Clay)',
    soilTypeEn: 'Hard Red Clay',
    defaultPh: 5.8,
    powerTemp: 31.6,
    powerDeficit: -73,
    gpmDeficit: -64,
    smapMoisture: 0.14,
    ndvi: 0.32,
    groundwaterDrop: '১০-১৫ মিটার',
    bmdaHoursCap: 980,
  },
  {
    id: 'godagari',
    nameBn: 'গোদাগাড়ী',
    nameEn: 'Godagari',
    districtBn: 'রাজশাহী',
    districtEn: 'Rajshahi',
    lat: 24.46,
    lng: 88.33,
    soilClass: 'BARC AEZ-25 • Grey terrace',
    soilTypeBn: 'ধূসর ও লাল এঁটেল মাটি (Red-Grey Clay)',
    soilTypeEn: 'Red-Grey Clay',
    defaultPh: 6.0,
    powerTemp: 32.3,
    powerDeficit: -75,
    gpmDeficit: -67,
    smapMoisture: 0.16,
    ndvi: 0.34,
    groundwaterDrop: '১০-১৫ মিটার',
    bmdaHoursCap: 980,
  },
  {
    id: 'niamatpur',
    nameBn: 'নিয়ামতপুর',
    nameEn: 'Niamatpur',
    districtBn: 'নওগাঁ',
    districtEn: 'Naogaon',
    lat: 24.85,
    lng: 88.54,
    soilClass: 'BARC AEZ-25 • Grey terrace',
    soilTypeBn: 'শক্ত পলি-কাদা সোপান (Hard Terrace Clay)',
    soilTypeEn: 'Hard Terrace Clay',
    defaultPh: 5.6,
    powerTemp: 31.3,
    powerDeficit: -74,
    gpmDeficit: -65,
    smapMoisture: 0.12,
    ndvi: 0.3,
    groundwaterDrop: '১০-১৫ মিটার',
    bmdaHoursCap: 980,
  },
  {
    id: 'nachole',
    nameBn: 'নাচোল',
    nameEn: 'Nachole',
    districtBn: 'চাঁপাইনবাবগঞ্জ',
    districtEn: 'Chapainawabganj',
    lat: 24.72,
    lng: 88.42,
    soilClass: 'BARC AEZ-25 • Grey terrace',
    soilTypeBn: 'উচ্চ বরেন্দ্র লাল কাদা (Highland Barind Clay)',
    soilTypeEn: 'Highland Barind Clay',
    defaultPh: 5.7,
    powerTemp: 32.3,
    powerDeficit: -75,
    gpmDeficit: -67,
    smapMoisture: 0.13,
    ndvi: 0.29,
    groundwaterDrop: '১০-১৫ মিটার',
    bmdaHoursCap: 980,
  },
];

// ---- Unified economics (single source of truth — fixes Compare vs Export vs Proof mismatch) ----
// Method: Boro groundwater pumping portion per acre from Mainuddin et al. 2020 field water
// 1,605 L/kg × ~5 t/ha yield ≈ 8.0M L/ha total; ~50% is pumped groundwater in Barind dry season
// (rest rainfall/residual) → ~1.6M L/acre pumped. Mustard-mung 1–2 irrigations ≈ 0.4M L/acre (BARI).
// Costs: Boro Tk18,500/acre vs mustard Tk4,200/acre pumping (BMDA tariff + diesel, 2024–25).
// Savings: Tk14,300 + 1.2M L per acre (≈75% pumped water). All screens must import these.
export const ECONOMICS = {
  boroCostPerAcre: 18500,
  mustardCostPerAcre: 4200,
  boroWaterLPerAcre: 1600000,
  mustardWaterLPerAcre: 400000,
  boroIrrigations: 28,
  mustardIrrigations: 2,
  source: 'Mainuddin et al. 2020 (1,605 L/kg); BARI/BRRI trials; BMDA 2024–25 tariff. See DATA_SOURCES.',
} as const;

export function economicsForAcre(acre: number) {
  const boroCost = Math.round(ECONOMICS.boroCostPerAcre * acre);
  const mustardCost = Math.round(ECONOMICS.mustardCostPerAcre * acre);
  const boroWater = Math.round(ECONOMICS.boroWaterLPerAcre * acre);
  const mustardWater = Math.round(ECONOMICS.mustardWaterLPerAcre * acre);
  return {
    boroCost,
    mustardCost,
    savings: boroCost - mustardCost,
    boroWater,
    mustardWater,
    waterSaved: boroWater - mustardWater,
  };
}

// ---- BBS official stats (Yearbook 2024 / Pocketbook 2025) ----
export const BBS_STATS = {
  source: 'BBS Yearbook of Agricultural Statistics-2024 (36th ser, June 2025); Statistical Pocketbook 2025. bbs.gov.bd',
  riceAreaAcres_2023_24: 28820000,
  riceProdMT_2023_24: 40697000,
  boroAreaAcres_2023_24: 12052797,
  boroProdMT_2023_24: 16656263,
  pulsesAreaAcres: 858000,
  pulsesProdMT: 429000,
  oilseedsAreaAcres: 1541000,
  oilseedsProdMT: 1258000,
  croppingIntensity_2019: 214,
  boroShareGrossArea_2019: 31.53,
  oilMadeMT: 360000,
  oilNeededMT: 1400000,
} as const;

// ---- BARI / BRRI crop traits (real varieties) ----
export const CROP_TRAITS = [
  {
    crop: 'Mustard BARI Sarisha-14/15',
    durationDays: '80–85',
    sowing: 'Mid-Oct – mid-Nov',
    seedRateKgHa: '6–7',
    yieldTHa: '1.1–2.0',
    water: '1–2 irrigations',
    source: 'BARI; BJAR field survey 2011–12; BARI Sarisha-15 75d Sylhet/Magura trials',
  },
  {
    crop: 'Mungbean BARI Mung-6',
    durationDays: '~75',
    sowing: '25 Jan – 10 Apr',
    yieldTHa: '0.6–0.7',
    water: 'residual + 1 watering',
    nitrogen: 'fixes N, cuts urea next season',
    source: 'BARI; BRRI Rangpur 2017 four-crop deck',
  },
  {
    crop: 'Pattern Mustard–Mung–T.Aus–T.Aman (T2)',
    yieldREY: '13.87 t/ha',
    economics: 'TVC Tk182,000/ha, gross Tk319,000, margin Tk137,000 (2017 prices — update with BBS 2024)',
    source: 'BRRI Rangpur 2017, p.12–17',
  },
] as const;

// ---- NASA live config ----
export const NASA_CONFIG = {
  powerBase: 'https://power.larc.nasa.gov/api/temporal',
  powerCommunity: 'AG',
  powerParams: ['T2M', 'PRECTOTCORR', 'RH2M'],
  powerBaseline: '2001–2020 climatology, fetched Oct 2026 — see nasa_power_climatology_2001_2020.json',
  gpm: 'GPM IMERG monthly (0.1°) — proxy from POWER seasonal means until granule pulled via Earthdata',
  smap: 'SMAP L3 passive soil moisture (2–3 day, m³/m³) — typical dry Barind 0.12–0.16; live granule pending Earthdata auth',
  ecostress: 'ECOSTRESS L2 LST 70m (ISS) + OpenET — High ET stress flag in dry Feb–May',
  landsat: 'Landsat 8–9 C2 / HLS NDVI — dry fallow typical 0.29–0.34 Weak',
  snapshot: './nasa_power_climatology_2001_2020.json',
} as const;

// ---- Provenance catalog (rendered in app About + docs) ----
export const DATA_SOURCES = [
  {
    id: 'power',
    label: 'NASA POWER AG climatology 2001–2020',
    labelBn: 'নাসা পাওয়ার জলবায়ু ২০০১–২০২০',
    detail: 'T2M + PRECTOTCORR + RH2M per upazila lat/lng. Fetched Oct 2026, cached JSON.',
    detailBn: 'প্রতি উপজেলায় তাপমাত্রা + বৃষ্টি + আর্দ্রতা। অক্টোবর ২০২৬-এ সংগৃহীত।',
    url: 'https://power.larc.nasa.gov/api/pages/',
  },
  {
    id: 'bbs',
    label: 'BBS Yearbook 2024 + Pocketbook 2025 + Ag Census 2019',
    labelBn: 'বিবিএস কৃষি বর্ষগ্রন্থ ২০২৪ + খানা শুমারি ২০১৯',
    detail: 'Rice/Boro/pulses/oilseeds area + production, intensity 214%.',
    detailBn: 'ধান/বোরো/ডাল/তেলবীজের জমি + উৎপাদন, তীব্রতা ২১৪%।',
    url: 'https://bbs.gov.bd',
  },
  {
    id: 'srdi',
    label: 'SRDI Fertility Atlas 2020 + FRG-2018 + Banglapedia Seven Tracts',
    labelBn: 'এসআরডিআই উর্বরতা মানচিত্র ২০২০',
    detail: 'Barind Grey terrace, pH 5.5–6.0, OM 0.8–1.2%, N very-low nationwide.',
    detailBn: 'বরেন্দ্র ধূসর সোপান, pH ৫.৫–৬.০, জৈব পদার্থ ০.৮–১.২%।',
    url: 'https://srdi.gov.bd',
  },
  {
    id: 'bmda',
    label: 'BMDA via Dialogue Earth 11 May 2026 + WARPO/IWM 2025',
    labelBn: 'বিএমডিএ + পানি সম্পদ প্রতিবেদন ২০২৫',
    detail: '~16,000 wells none new since 2012; 980-hr cap; 10–15m drop; 4,911 villages stressed.',
    detailBn: '~১৬,০০০ নলকূপ, ৯৮০ ঘণ্টা সীমা; ১০–১৫ মিটার পতন; ৪,৯১১ গ্রাম চাপে।',
    url: 'https://dialogue.earth',
  },
  {
    id: 'boro-water',
    label: 'Mainuddin et al. 2020 (field water 1,605 L/kg) + IRRI/ADB AWD pilot',
    labelBn: 'বোরো পানি গবেষণা + ইরি এডব্লিউডি পরীক্ষা',
    detail: '83% NW area Boro; 91% water to Boro; AWD −20% water −30% GHG.',
    detailBn: 'উত্তর-পশ্চিমে ৮৩% জমি বোরো; এডব্লিউডিতে −২০% পানি।',
    url: 'https://www.irri.org',
  },
  {
    id: 'crops',
    label: 'BARI/BRRI varieties + BRRI Rangpur 2017 pattern deck',
    labelBn: 'বারি/ব্রি জাত + চার ফসল ধারা',
    detail: 'Sarisha-14/15 80–85d; Mung-6 75d; T2 REY 13.87 t/ha.',
    detailBn: 'সরিষা-১৪/১৫ (৮০–৮৫ দিন); মুগ-৬ (৭৫ দিন)।',
    url: 'https://www.bari.gov.bd',
  },
  {
    id: 'climate',
    label: 'BMD ERA5 1980–2023 + World Bank 1976–2019',
    labelBn: 'বিএমডি + বিশ্বব্যাংক জলবায়ু তথ্য',
    detail: '+0.5°C; west +0.6–0.9°C; Jun–Aug −60mm.',
    detailBn: '+০.৫°সে; পশ্চিমে +০.৬–০.৯°সে; বর্ষায় বৃষ্টি কম।',
    url: 'https://bmd.gov.bd/climate',
  },
] as const;

// ---- AI Sahayak static content (Video 1 mock; Gemini wiring in Video 2) ----
export const QUICK_PROMPTS = [
  { id: 'boro-vs-mustard', bn: 'বোরো নাকি সরিষা?', en: 'Boro or mustard?' },
  { id: 'water-save', bn: 'পানি কত বাঁচবে?', en: 'How much water saved?' },
  { id: 'soil-best', bn: 'মাটির জন্য কোনটা ভালো?', en: 'Which is best for soil?' },
] as const;

export const MOCK_ANSWERS: Record<string, { bn: string; en: string; evidence: string; evidenceBn: string }> = {
  'boro-vs-mustard': {
    bn: 'তানোরে ১ একরে বোরো ২৮ বার সেচ চায়, সরিষা+মুগ মাত্র ২ বার। পানি ~৭৫% ও খরচ ৳১৪,৩০০ বাঁচে।',
    en: 'In Tanore 1 acre: Boro needs 28 waterings, mustard+mung needs 2. Saves ~75% water + Tk14,300.',
    evidence: 'POWER −73% dry-season • GPM −64% pre-monsoon • SMAP 0.14 dry',
    evidenceBn: 'পাওয়ার −৭৩% শুষ্ক মৌসুম • জিপিএম −৬৪% প্রাক-বর্ষা • স্ম্যাপ ০.১৪ শুষ্ক',
  },
  'water-save': {
    bn: '১ একরে ~১২ লাখ লিটার ভূগর্ভস্থ পানি বাঁচে — ২৮ বারের বদলে ২ বার পাম্প।',
    en: 'Saves ~1.2M litres groundwater per acre — 2 pumps instead of 28.',
    evidence: '1.6M L → 0.4M L pumped (Mainuddin-derived)',
    evidenceBn: '১৬ লাখ লি. → ৪ লাখ লি. পাম্প (মাইনউদ্দিন-ভিত্তিক)',
  },
  'soil-best': {
    bn: 'মুগডাল প্রাকৃতিক নাইট্রোজেন যোগ করে, জৈব পদার্থ ০.৯% থেকে বাড়তে সাহায্য করে। pH ৫.৮-এ সরিষা ভালো হয়।',
    en: 'Mungbean adds natural nitrogen, rebuilds OM from 0.9%. Mustard suits pH 5.8.',
    evidence: 'SRDI OM Very Low • BARI N-fix',
    evidenceBn: 'এসআরডিআই জৈব পদার্থ অতি নিম্ন • বারি নাইট্রোজেন-সংযোজন',
  },
};

export function toBengaliNumber(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const str = String(num);
  return str.replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)] || digit);
}

export function formatCurrencyBn(amount: number): string {
  // e.g. 14300 -> ৳ ১৪,৩০০
  const formatted = amount.toLocaleString('en-IN');
  return `৳ ${toBengaliNumber(formatted)}`;
}

export function formatCurrencyEn(amount: number): string {
  return `Tk ${amount.toLocaleString('en-IN')}`;
}

export function formatVolumeBn(liters: number): string {
  if (liters >= 100000) {
    const lakh = liters / 100000;
    return `${toBengaliNumber(lakh % 1 === 0 ? lakh : lakh.toFixed(1))} লাখ লি.`;
  }
  return `${toBengaliNumber(liters.toLocaleString('en-IN'))} লিটার`;
}

export function formatVolumeEn(liters: number): string {
  if (liters >= 100000) {
    const lakh = liters / 100000;
    return `${lakh % 1 === 0 ? lakh : lakh.toFixed(1)} lakh L`;
  }
  return `${liters.toLocaleString('en-IN')} litres`;
}
