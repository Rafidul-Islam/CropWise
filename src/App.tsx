import { useEffect, useState } from 'react';
import { AppTab, FarmerProfile, FieldStep, ViewMode } from './types';
import { UPAZILAS } from './data/barindData';
import { Lang, loadLang, saveLang } from './i18n';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LanguageGate } from './components/LanguageGate';
import { FieldTrackerStep1 } from './components/FieldTrackerStep1';
import { FieldTrackerStep2 } from './components/FieldTrackerStep2';
import { CropComparisonScreen } from './components/CropComparisonScreen';
import { AiSahayakScreen } from './components/AiSahayakScreen';
import { MyFarmScreen } from './components/MyFarmScreen';
import { NasaProofScreen } from './components/NasaProofScreen';
import { AcreageModal } from './components/AcreageModal';
import { ExportModal } from './components/ExportModal';

const DEFAULT_FARMER: FarmerProfile = {
  name: '',
  phone: '',
  waterSource: 'deep-tubewell',
  irrigationHours: 400,
  sowingMonth: 'November',
};

function loadFarmer(): FarmerProfile {
  try {
    const raw = localStorage.getItem('cropwise-farmer');
    if (raw) return { ...DEFAULT_FARMER, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_FARMER;
}

export default function App() {
  // Language — null = first load, show gate
  const [lang, setLang] = useState<Lang | null>(() => loadLang());

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<AppTab>('field-tracker');
  const [fieldStep, setFieldStep] = useState<FieldStep>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('farmer');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Field & Agricultural Calibration State
  const [selectedUpazila, setSelectedUpazila] = useState(UPAZILAS[0]);
  const [acre, setAcre] = useState<number>(1.0);
  const [waterPriority, setWaterPriority] = useState<number>(90);
  const [soilPriority, setSoilPriority] = useState<number>(75);
  const [costPriority, setCostPriority] = useState<number>(85);
  const [currentPh, setCurrentPh] = useState<number>(5.8);

  // Farmer's own data (My Farm page, persisted)
  const [farmer, setFarmer] = useState<FarmerProfile>(loadFarmer);

  // Keep <html lang> in sync for screen readers + fonts
  useEffect(() => {
    if (lang) document.documentElement.lang = lang;
  }, [lang]);

  // Modal States
  const [isAcreModalOpen, setIsAcreModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Upazila change handler
  const handleSelectUpazila = (upazila: typeof selectedUpazila) => {
    setSelectedUpazila(upazila);
    setCurrentPh(upazila.defaultPh);
  };

  // pH Cycle toggle handler — cycles through realistic Barind range
  const handleChangePh = () => {
    const steps = [5.5, 5.6, 5.7, 5.8, 6.0, 6.2];
    setCurrentPh((prev) => {
      const i = steps.findIndex((v) => Math.abs(v - prev) < 0.05);
      return steps[(i + 1 + steps.length) % steps.length] ?? 5.8;
    });
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'farmer' ? 'expert' : 'farmer'));
  };

  const handleToggleOnline = () => {
    setIsOnline((prev) => !prev);
  };

  const handlePickLang = (l: Lang) => {
    saveLang(l);
    setLang(l);
  };

  const handleToggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === 'bn' ? 'en' : 'bn';
      saveLang(next);
      return next;
    });
  };

  // Language gate on first load
  if (lang === null) {
    return <LanguageGate onPick={handlePickLang} />;
  }

  return (
    <div className="bg-[#f6faff] min-h-screen flex flex-col font-body-md text-[#0c1d28] selection:bg-[#006a69] selection:text-white">
      {/* Top Fixed App Bar */}
      <Header
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        onOpenFarm={() => setActiveTab('my-farm')}
        isOnline={isOnline}
        onToggleOnline={handleToggleOnline}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Viewport — roomy for farmers: longer scroll, bigger gaps */}
      <main className="flex flex-col relative w-full pt-28 pb-32 px-4 bg-[#f6faff] flex-1">
        {/* Step Indicator when inside Field Tracker */}
        {activeTab === 'field-tracker' && (
          <div className="w-full max-w-md mx-auto mb-4 flex items-center justify-center gap-1.5 bg-[#eaf5ff] p-2 rounded-full border border-[#d8ebfa]">
            <button
              onClick={() => setFieldStep(1)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                fieldStep === 1
                  ? 'bg-[#006a69] text-white shadow-xs'
                  : 'text-[#43474d] hover:text-[#00172d]'
              }`}
            >
              <span>{lang === 'bn' ? '১. জমি ও উপগ্রহ' : '1. Field & satellite'}</span>
            </button>
            <button
              onClick={() => setFieldStep(2)}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                fieldStep === 2
                  ? 'bg-[#006a69] text-white shadow-xs'
                  : 'text-[#43474d] hover:text-[#00172d]'
              }`}
            >
              <span>{lang === 'bn' ? '২. মাটি ও লক্ষ্য' : '2. Soil & goals'}</span>
            </button>
          </div>
        )}

        {/* Tab 1: Field Tracker (Step 1 and Step 2) */}
        {activeTab === 'field-tracker' && fieldStep === 1 && (
          <FieldTrackerStep1
            lang={lang}
            selectedUpazila={selectedUpazila}
            onSelectUpazila={handleSelectUpazila}
            acre={acre}
            onOpenAcreModal={() => setIsAcreModalOpen(true)}
            onGoToNext={() => setFieldStep(2)}
            viewMode={viewMode}
          />
        )}

        {activeTab === 'field-tracker' && fieldStep === 2 && (
          <FieldTrackerStep2
            lang={lang}
            selectedUpazila={selectedUpazila}
            waterPriority={waterPriority}
            setWaterPriority={setWaterPriority}
            soilPriority={soilPriority}
            setSoilPriority={setSoilPriority}
            costPriority={costPriority}
            setCostPriority={setCostPriority}
            currentPh={currentPh}
            onChangePh={handleChangePh}
            onGoToCompare={() => setActiveTab('crop-comparison')}
            onGoBackToStep1={() => setFieldStep(1)}
            viewMode={viewMode}
          />
        )}

        {/* Tab 2: Crop Comparison */}
        {activeTab === 'crop-comparison' && (
          <CropComparisonScreen
            lang={lang}
            selectedUpazila={selectedUpazila}
            acre={acre}
            farmerName={farmer.name}
            onGoToNasaProof={() => setActiveTab('ai-sahayak')}
            viewMode={viewMode}
          />
        )}

        {/* Tab 3: AI Sahayak (voice + text) — main feature */}
        {activeTab === 'ai-sahayak' && (
          <AiSahayakScreen
            lang={lang}
            selectedUpazila={selectedUpazila}
            acre={acre}
            waterPriority={waterPriority}
            soilPriority={soilPriority}
            costPriority={costPriority}
            isOnline={isOnline}
            onGoToNasaProof={() => setActiveTab('nasa-proof')}
          />
        )}

        {/* Tab 4: My Farm — farmer's own data */}
        {activeTab === 'my-farm' && (
          <MyFarmScreen
            lang={lang}
            farmer={farmer}
            setFarmer={setFarmer}
            selectedUpazila={selectedUpazila}
            onSelectUpazila={handleSelectUpazila}
            acre={acre}
            setAcre={setAcre}
            currentPh={currentPh}
            setPh={setCurrentPh}
          />
        )}

        {/* Tab 5: NASA Proof */}
        {activeTab === 'nasa-proof' && (
          <NasaProofScreen
            lang={lang}
            selectedUpazila={selectedUpazila}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onRecalculate={() => {
              setActiveTab('field-tracker');
              setFieldStep(1);
            }}
            viewMode={viewMode}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} lang={lang} />

      {/* Modals */}
      <AcreageModal
        isOpen={isAcreModalOpen}
        onClose={() => setIsAcreModalOpen(false)}
        currentAcre={acre}
        onSelectAcre={setAcre}
        lang={lang}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedUpazila={selectedUpazila}
        acre={acre}
        waterPriority={waterPriority}
        costPriority={costPriority}
        soilPriority={soilPriority}
        farmerName={farmer.name}
        lang={lang}
      />
    </div>
  );
}
