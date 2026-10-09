// CropWise language kit — Bangla-first, English second.
// Full-app i18n lands in Video 2; Video 1 covers nav + gate + farm form.
// All other screens stay bilingual by design.

export type Lang = 'bn' | 'en';

export const LANG_KEY = 'cropwise-lang';

export function loadLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === 'bn' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

export function saveLang(l: Lang) {
  try {
    localStorage.setItem(LANG_KEY, l);
  } catch {
    // private mode — ignore
  }
}

export const STR = {
  bn: {
    navField: 'জমি',
    navFieldEn: 'Field',
    navCompare: 'তুলনা',
    navCompareEn: 'Compare',
    navAi: 'সহায়ক',
    navAiEn: 'AI',
    navFarm: 'খামার',
    navFarmEn: 'Farm',
    navProof: 'প্রমাণ',
    navProofEn: 'NASA',
    gateTitle: 'ক্রপওয়াইজে স্বাগতম',
    gateSub: 'Welcome to CropWise by Arekta Team',
    gateHint: 'ভাষা বেছে নিন • Choose your language',
    farmTitle: 'আমার খামার',
    farmSub: 'My farm data — আপনার তথ্য দিন',
  },
  en: {
    navField: 'Field',
    navFieldEn: 'জমি',
    navCompare: 'Compare',
    navCompareEn: 'তুলনা',
    navAi: 'AI Help',
    navAiEn: 'সহায়ক',
    navFarm: 'My Farm',
    navFarmEn: 'খামার',
    navProof: 'Proof',
    navProofEn: 'প্রমাণ',
    gateTitle: 'Welcome to CropWise',
    gateSub: 'আরেকটা টিমের ক্রপওয়াইজে স্বাগতম',
    gateHint: 'Choose your language • ভাষা বেছে নিন',
    farmTitle: 'My Farm',
    farmSub: 'আমার খামার — tell us about your farm',
  },
} as const;
