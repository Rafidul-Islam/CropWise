# CropWise — Real Data Sources (no synthetic)

CropWise by Arekta Team, NASA Space Apps 2026 Bangladesh.
All UI numbers trace to sources below. POWER climatology VERIFIED Oct 2026.

## 1. NASA (live, free)

| Item | Source | Access | Lives in code |
|---|---|---|---|
| POWER T2M / PRECTOTCORR / RH2M climatology 2001–2020 per upazila | NASA POWER AG API `power.larc.nasa.gov/api/temporal/climatology/point` | Fetched Oct 2026, cached | `src/data/nasa_power_climatology_2001_2020.json`, `src/data/barindData.ts` UPAZILAS + `NASA_CONFIG` |
| Tanore 24.60N 88.58E: T2M ANN 25.67°C (May 31.57), PRECTOT ANN 3.82 mm/d; dry-season Jan–Apr −73% vs annual; pre-monsoon Mar–May −64% vs monsoon | Same API | Same snapshot | `powerTemp`, `powerDeficit`, `gpmDeficit` (derived, method in code comments) |
| Godagari 24.46N 88.33E: ANN 25.88°C (May 32.33), PRECTOT 3.48; −75% / −67% | Same | Same | Same fields |
| Niamatpur 24.85N 88.54E: ANN 25.42°C (May 31.28), PRECTOT 3.99; −74% / −65% | Same | Same | Same fields |
| Nachole 24.72N 88.42E: same 0.5° grid as Godagari | Same | Same | Same fields |
| GPM IMERG, SMAP L3, ECOSTRESS L2, Landsat 8–9 / HLS NDVI | `earthdata.nasa.gov`, `data.nasa.gov` | SMAP/NDVI dry-season typical low in UI (0.12–0.16 m³/m³; NDVI 0.29–0.34 Weak); live granules pending Earthdata auth → Video 2 | `NASA_CONFIG`, `NasaProofScreen.tsx` chips + trace |

## 2. Bangladesh official (static)

| Item | Source | Lives in code |
|---|---|---|
| Rice 28.82M ac / 40.70M MT; Boro 12.05M ac / 16.66M MT; pulses 858k/429k; oilseeds 1.54M/1.26M; intensity 214%; oil 0.36M vs 1.4M needed | BBS Yearbook 2024 (36th ser Jun 2025), Pocketbook 2025, Ag Census 2019 — `bbs.gov.bd` | `BBS_STATS` |
| Barind Grey/Red-brown terrace; pH 5.5–6.0; OM 0.8–1.2%; N very-low nationwide; 74.2% nutrient / 78.9% OM depleted | SRDI Fertility Atlas 2020 + FRG-2018 + Banglapedia Seven Tracts — `srdi.gov.bd` | `defaultPh`, soil cards, `DATA_SOURCES` |
| ~16,000 deep wells none new since 2012; 980-hr cap mid-Feb–mid-May; 10–15 m drop; 4,911 villages stressed; Padma decline | BMDA via Dialogue Earth 11 May 2026; WARPO/IWM 2025; RU Feb 2025 | `groundwaterDrop`, `bmdaHoursCap`, Step2 warning |
| +0.5°C 1976–2019; west +0.6–0.9°C; Jun–Aug −60mm | BMD ERA5 1980–2023; World Bank — `bmd.gov.bd/climate` | Proof trace context |

## 3. Crops + water (unified economics)

| Item | Source | Lives in code |
|---|---|---|
| Boro field water 1,605 L/kg; 83% NW area; 91% water to Boro | Mainuddin et al. 2020 | `ECONOMICS` comment + Proof |
| AWD −20% water −30% GHG; 4–5 irrigations saved; $30M/50% | IRRI/ADB Niamatpur 1,000-farmer pilot 2024–25 | Compare card A |
| Sarisha-14/15 80–85d, sow mid-Oct–mid-Nov, 6–7 kg/ha, 1.1–2.0 t/ha; Mung-6 ~75d | BARI; BJAR 2011–12; Sylhet/Magura trials | `CROP_TRAITS` |
| Pattern T2 REY 13.87 t/ha; TVC 182k/ha gross 319k margin 137k (2017 prices) | BRRI Rangpur 2017 deck p.12–17 | `CROP_TRAITS` |
| Unified per-acre: Tk18,500 vs 4,200 (save 14,300); 1.6M vs 0.4M L (save 1.2M, 75%); 28→2 waterings | Derived — see `ECONOMICS` | `economicsForAcre()` used by Compare + Export + Proof (single truth) |

## 4. AI Sahayak (Video 1 static → Video 2 live)

- Static: `QUICK_PROMPTS` + `MOCK_ANSWERS` in `barindData.ts`, rendered by `AiSahayakScreen.tsx`.
- Voice in: Web Speech API `bn-BD`; voice out: `speechSynthesis` bn-BD; offline fallback via `isOnline` (cached answers).
- Video 2: server proxy to Gemini (`GEMINI_API_KEY` never in client or git) with context `{upazila, acre, priorities, pH}` + `ECONOMICS` grounding. See `.env.example`.
