import React from 'react';
import { AppTab } from '../types';
import { Lang, STR } from '../i18n';

interface BottomNavProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  lang: Lang;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab, lang }) => {
  const t = STR[lang];
  const tabs: { id: AppTab; icon: string; label: string }[] = [
    { id: 'field-tracker', icon: 'location_on', label: `${t.navField}` },
    { id: 'crop-comparison', icon: 'balance', label: `${t.navCompare}` },
    { id: 'ai-sahayak', icon: 'mic', label: `${t.navAi}` },
    { id: 'my-farm', icon: 'person', label: `${t.navFarm}` },
    { id: 'nasa-proof', icon: 'satellite_alt', label: `${t.navProof}` },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f6faff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-[#d8ebfa]/60">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center min-h-20 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-0.5 h-full min-h-[56px] px-0.5 transition-colors group ${
              activeTab === tab.id
                ? 'text-[#006a69] font-bold'
                : 'text-[#43474d] hover:text-[#006a69]'
            }`}
            data-path={tab.id}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[22px] group-hover:scale-105 transition-transform"
              style={{
                fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {tab.icon}
            </span>
            <span className="font-label-md text-[12px] leading-tight text-center">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
