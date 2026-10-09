import React, { useRef, useState } from 'react';
import { ChatMsg, UpazilaData } from '../types';
import {
  MOCK_ANSWERS,
  QUICK_PROMPTS,
  economicsForAcre,
  formatCurrencyBn,
  formatCurrencyEn,
  formatVolumeBn,
  formatVolumeEn,
  toBengaliNumber,
} from '../data/barindData';
import { Lang } from '../i18n';

interface AiSahayakScreenProps {
  lang: Lang;
  selectedUpazila: UpazilaData;
  acre: number;
  waterPriority: number;
  soilPriority: number;
  costPriority: number;
  isOnline: boolean;
  onGoToNasaProof: () => void;
}

function uid() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export const AiSahayakScreen: React.FC<AiSahayakScreenProps> = ({
  lang,
  selectedUpazila,
  acre,
  waterPriority,
  soilPriority,
  costPriority,
  isOnline,
  onGoToNasaProof,
}) => {
  const bn = lang === 'bn';
  const FC = bn ? formatCurrencyBn : formatCurrencyEn;
  const FV = bn ? formatVolumeBn : formatVolumeEn;
  const { savings, waterSaved } = economicsForAcre(acre);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: uid(),
      role: 'ai',
      textBn: bn
        ? `সালাম! আমি ক্রপওয়াইজ সহায়ক। ${selectedUpazila.nameBn}, ${toBengaliNumber(acre)} একরের জন্য জিজ্ঞেস করুন — বোরো নাকি সরিষা?`
        : `Hello! I am CropWise Sahayak. Ask about ${selectedUpazila.nameEn}, ${acre} acre — Boro or mustard?`,
      evidence: bn
        ? `পাওয়ার ${toBengaliNumber(Math.abs(selectedUpazila.powerDeficit))}% শুষ্ক • জিপিএম ${toBengaliNumber(Math.abs(selectedUpazila.gpmDeficit))}% ঘাটতি • স্ম্যাপ শুষ্ক`
        : `POWER ${Math.abs(selectedUpazila.powerDeficit)}% dry • GPM ${Math.abs(selectedUpazila.gpmDeficit)}% deficit • SMAP dry`,
    },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const recogRef = useRef<any>(null);

  const pushAi = (key: string, questionBn: string) => {
    const mock = MOCK_ANSWERS[key];
    if (!mock) return;
    const offlineTag = !isOnline ? (bn ? ' (২জি মোড — সংরক্ষিত উত্তর)' : ' (2G mode — saved answer)') : '';
    const withContext: ChatMsg = {
      id: uid(),
      role: 'ai',
      textBn: (bn ? mock.bn : mock.en) + offlineTag,
      evidence: bn ? mock.evidenceBn : mock.evidence,
    };
    setMessages((m) => [
      ...m,
      { id: uid(), role: 'user', textBn: questionBn },
      withContext,
    ]);
  };

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;
    setInput('');
    // Static concept engine for Video 1: keyword route to 3 verified answers.
    // Gemini live wiring lands in Video 2 via server proxy (see docs/DATA_SOURCES.md).
    const lower = q.toLowerCase();
    if (lower.includes('পানি') || lower.includes('water') || lower.includes('সাশ্রয়') || lower.includes('save')) {
      pushAi('water-save', q);
    } else if (lower.includes('মাটি') || lower.includes('soil') || lower.includes('nitrogen')) {
      pushAi('soil-best', q);
    } else {
      pushAi('boro-vs-mustard', q);
    }
  };

  const handleMic = () => {
    const SR: any =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      pushAi('boro-vs-mustard', bn ? '🎤 ভয়েস' : '🎤 Voice');
      return;
    }
    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }
    const recog = new SR();
    recogRef.current = recog;
    recog.lang = bn ? 'bn-BD' : 'en-US';
    recog.interimResults = false;
    recog.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript ?? '';
      setListening(false);
      if (text) {
        setInput('');
        const lower = String(text).toLowerCase();
        if (lower.includes('পানি') || lower.includes('water')) pushAi('water-save', String(text));
        else if (lower.includes('মাটি') || lower.includes('soil')) pushAi('soil-best', String(text));
        else pushAi('boro-vs-mustard', String(text));
      }
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    setListening(true);
    recog.start();
  };

  const handleSpeak = (m: ChatMsg) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      if (speakingId === m.id) {
        synth.cancel();
        setSpeakingId(null);
        return;
      }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(m.textBn);
      u.lang = bn ? 'bn-BD' : 'en-US';
      u.onend = () => setSpeakingId(null);
      setSpeakingId(m.id);
      synth.speak(u);
    } catch {
      // TTS unavailable — ignore
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Title — roomy, one task per view */}
      <div className="bg-[#eaf5ff] p-5 rounded-2xl border border-[#d8ebfa] space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006a69] text-[24px]">mic</span>
          <h2 className="font-bold text-[#00172d] text-xl leading-tight">
            {bn ? 'এআই সহায়ক' : 'AI Helper'}
          </h2>
        </div>
        <p className="text-[#43474d] text-sm">
          {bn ? 'মুখে বলুন বা লিখুন' : 'Speak or type your question'}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-[#00172d] border border-[#d8ebfa]">
            {bn ? `${selectedUpazila.nameBn} • ${toBengaliNumber(acre)} একর` : `${selectedUpazila.nameEn} • ${acre} acre`}
          </span>
          <span className="bg-white px-3 py-1.5 rounded-full text-xs text-[#43474d] border border-[#d8ebfa]">
            {bn
              ? `পানি ${toBengaliNumber(waterPriority)}% • মাটি ${toBengaliNumber(soilPriority)}% • খরচ ${toBengaliNumber(costPriority)}%`
              : `Water ${waterPriority}% • Soil ${soilPriority}% • Cost ${costPriority}%`}
          </span>
          {!isOnline && (
            <span className="bg-[#ffdead] px-3 py-1.5 rounded-full text-xs font-bold text-[#3c2700]">
              {bn ? '২জি অফলাইন — সংরক্ষিত উত্তর' : '2G offline — saved answers'}
            </span>
          )}
        </div>
      </div>

      {/* Savings strip — single glance */}
      <div className="bg-[#0b2c4a] text-white p-5 rounded-2xl space-y-1">
        <p className="text-[#98f2f0] text-xs font-bold uppercase tracking-wider">
          {bn ? 'এই জমিতে সম্ভাব্য সাশ্রয়' : 'POSSIBLE SAVINGS ON THIS FIELD'}
        </p>
        <p className="text-2xl font-extrabold">{FC(savings)}</p>
        <p className="text-[#acc9ee] text-sm">
          {bn ? `${FV(waterSaved)} পানি • ২৮ বার → ২ বার সেচ` : `${FV(waterSaved)} water • 28 → 2 waterings`}
        </p>
      </div>

      {/* Quick prompts — tap, no typing needed */}
      <div className="space-y-2">
        <p className="text-[#00172d] font-bold text-sm px-1">
          {bn ? 'এক ট্যাপে জিজ্ঞেস করুন' : 'Tap to ask'}
        </p>
        <div className="flex flex-col gap-2.5">
          {QUICK_PROMPTS.map((q) => (
            <button
              key={q.id}
              onClick={() => pushAi(q.id, bn ? q.bn : q.en)}
              className="w-full min-h-[52px] bg-white border border-[#d8ebfa] rounded-2xl px-4 py-3 text-left hover:bg-[#eaf5ff] active:scale-[0.99] transition-all"
            >
              <span className="block font-bold text-[#00172d] text-base">{bn ? q.bn : q.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat list — airy bubbles */}
      <div className="space-y-3">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] bg-[#006a69] text-white rounded-2xl rounded-br-md px-4 py-3">
                <p className="text-[15px] leading-relaxed font-medium">{m.textBn}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[90%] bg-white border border-[#d8ebfa] rounded-2xl rounded-bl-md px-4 py-4 space-y-2">
                <p className="text-[15px] leading-relaxed text-[#0c1d28]">{m.textBn}</p>
                {m.evidence && (
                  <p className="text-xs text-[#006a69] bg-[#eaf5ff] rounded-lg px-2.5 py-1.5">
                    🛰 {m.evidence}
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleSpeak(m)}
                    className="flex items-center gap-1 text-xs font-bold text-[#006a69] bg-[#eaf5ff] px-3 py-2 rounded-full min-h-[40px]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {speakingId === m.id ? 'stop' : 'volume_up'}
                    </span>
                    {speakingId === m.id ? (bn ? 'থামান' : 'Stop') : bn ? 'শুনুন' : 'Listen'}
                  </button>
                  <button
                    onClick={onGoToNasaProof}
                    className="text-xs font-semibold text-[#43474d] px-3 py-2 rounded-full min-h-[40px]"
                  >
                    {bn ? 'প্রমাণ দেখুন →' : 'See proof →'}
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Input row — big touch targets */}
      <div className="bg-white border border-[#d8ebfa] rounded-2xl p-3 space-y-2.5 sticky bottom-24">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={bn ? 'লিখুন… যেমন: বোরো নাকি সরিষা?' : 'Type… e.g. Boro or mustard?'}
            className="flex-1 min-h-[52px] px-4 rounded-xl bg-[#f6faff] border border-[#d8ebfa] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#006a69]"
          />
          <button
            onClick={handleMic}
            title={bn ? 'বলুন' : 'Speak'}
            className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              listening ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#006a69] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {listening ? 'stop' : 'mic'}
            </span>
          </button>
          <button
            onClick={handleSend}
            className="w-[52px] h-[52px] rounded-xl bg-[#0b2c4a] text-white flex items-center justify-center flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">send</span>
          </button>
        </div>
        <p className="text-[11px] text-[#43474d] leading-snug px-1">
          {listening
            ? bn
              ? '🎤 শুনছি… বাংলায় বলুন'
              : '🎤 Listening… speak now'
            : bn
              ? 'সাহিত্য-ভিত্তিক মডেল — জমি অনুযায়ী যাচাই করুন।'
              : 'Literature-based model — verify for your field.'}
        </p>
      </div>
    </div>
  );
};
