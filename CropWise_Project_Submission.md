# CropWise — NASA Space Apps Challenge 2026 Project Submission
**Challenge:** Field Shift: Adapting Farms with NASA Data
**Team:** Arekta Team (Rafid — Developer · Nowar — SQA Analyst · Mehedi — Project Manager · Ruman — Team Lead · Mim — UI/UX · Mahadi — Data Analyst)
**Local Event:** Bangladesh (TBD city — confirm with Local Lead)

> Fill the bracketed links before submitting. Then copy each section into its matching field on spaceappschallenge.org and click **Submit** (an unsubmitted page is not judged).

---

## 1. High-Level Summary
*(NASA field: High-Level Summary — include 240s video link + GitHub link here)*

**CropWise (Barind Water-Saver)** is a Bangla-first decision-support tool that tells a Barind smallholder when dry-season Boro rice will lose money — and shows water-smart rotation alternatives with proof.

Smallholders in Bangladesh's Barind Tract (Rajshahi, Naogaon, Chapainawabganj) farm on groundwater that is running out: water tables have fallen 10–15 metres in a decade, 16,000 deep tubewells are capped at 980 pump-hours and shared one year in three, and Boro rice — covering 83% of northwestern farmland and 91% of irrigation water at ~1,605 litres per kilo — is becoming unviable. Farmers have no simple, trusted way to test alternatives.

CropWise combines **NASA Earth observations** (POWER heat/rain, GPM rainfall, SMAP soil moisture, ECOSTRESS + Landsat plant stress/greenness) with **SRDI soil data**, **BARI/BRRI crop traits**, and the farmer's own priorities (save water / save soil / save cost sliders) to compare rotations side by side. Demo case — 1 acre in Tanore: keep Boro with AWD (≈20% water saved) vs shift fallow to **mustard + mungbean** (2 waterings instead of 28, ≈75% pumped water and Tk14,300 saved per acre, plus natural nitrogen fixation). Every recommendation carries a plain-language NASA data trace: which dataset said what, and why.

🎥 240-second video: [YOUTUBE_240S_URL]
💻 GitHub (public, open source): [GITHUB_URL]

---

## 2. Project Demo
*(NASA field: Project Demo — 30-second video)*

🎥 30-second video: [YOUTUBE_30S_URL]
Shows: select Tanore field → move priority sliders → compare Boro vs mustard-mung (litres, cost, soil) → NASA proof trace → saved farmer card. English subtitles burned in.

---

## 3. Final Project
*(NASA field: Final Project — full documentation)*

* Full documentation + journey + poster: [GITHUB_URL] (README + /docs)
* UI prototype + screens: [FIGMA_URL]
* Offline report export is built into the app (prints/shares the recommendation summary).

---

## 4. Project Details

### Block 1 — Why, what, how (incl. every dataset)
**Why:** Barind groundwater is collapsing under Boro irrigation (see data below), yet advisories tell farmers *what* to plant without *trade-off proof* for their field.
**What:** A mobile-first web app with 5 tabs — Field Tracker (2 steps: field+satellites, soil+priorities), Crop Comparison, AI Sahayak (Bangla voice + text chat), My Farm (farmer's own data + BMDA-style profile card), NASA Proof (5-phase decision trace).
**How:** Rule engine maps NASA seasonal deficits + soil class + crop water needs + priority weights to 2 ranked rotations with litres/Tk/soil/risk math. Farmer mode is Bangla, 3 taps, 2G/offline-cached; expert detail sits behind the same screens for judges.
**Datasets used:** NASA POWER AG climatology 2001–2020 + daily 2019–24 (T2M, PRECTOTCORR, RH2M per upazila — fetched Oct 2026, cached JSON); GPM IMERG pattern (pre-monsoon deficit proxy from POWER seasonal means; direct granule pending Earthdata auth — labeled as such); SMAP L-band + Landsat NDVI dry-season typical lows (placeholders pending live granules — labeled); SRDI Fertility Atlas 2020 (pH 5.5–6.0, OM 0.8–1.2%, N very-low); BBS Yearbook 2024 (areas/production, intensity 214%); BMDA operational caps via Dialogue Earth May 2026; BARI Sarisha-14/15 + Mung-6 + BRRI Rangpur 2017 pattern economics.

### Block 2 — Community involvement, features, benefits
Built for 0.5–1 acre Barind farmers and the extension workers who advise them; demo persona validated against BMDA field reporting (Niamatpur AWD pilot, 1,000 farmers). Highlighted features: priority sliders (same field, different best crop), Bangla voice Q&A with evidence chips, farmer profile card with quota tracking, one-tap offline report. Benefits: ≈1.2M litres groundwater + Tk14,300 pumping cost saved per acre per season on the mustard-mung path; nitrogen-fixing break crop rebuilds organic matter from 0.9%; mustard sells into a national edible-oil deficit (0.36M vs 1.4M tons needed).

### Block 3 — Tools, languages, frameworks (credit given generously)
React 19 + TypeScript + Vite + Tailwind CSS 4 + lucide-react icons + Motion (UI); Python (PIL + NumPy) for banner/video cards, Playwright + headless Chrome for screenshots, ffmpeg (OpenH264) for rough-cut assembly; Google AI Studio + Stitch for UI scaffolding (see AI section); Web Speech API (bn-BD) for voice in/out; data via NASA POWER open API, Earthdata portal, BBS/SRDI/BRRI publications. Fonts: Hind Siliguri + Noto Sans Bengali (Google Fonts); icons: Material Symbols.

---

## 5. Links (must be open — tested in a private window)
* GitHub repo (code + docs + video assets): [GITHUB_URL]
* 240s video (YouTube, Public/Unlisted): [YOUTUBE_240S_URL]
* 30s video (YouTube/Vimeo): [YOUTUBE_30S_URL]
* Figma prototype: [FIGMA_URL]
* Team banner: in repo at `video_assets/ArektaTeam_Banner_1920x1080.jpg`

---

## 6. Use of AI
* **Google Stitch (AI Studio):** generated the first UI draft from a detailed metaprompt (screens, Bangla-first system, component sheet). Reason: speed to a recordable concept for the prescreening video. Data it worked on: our written product spec + sample Tanore values (no real farmer PII — demo profile "Rafiqul Islam" is fictional).
* **Gemini (AI Studio, server-side capable):** planned live wiring for the AI Sahayak chat in Video 2 (currently static verified answers + keyword routing; no user data leaves the device today). Prompts will constrain answers to grounded rotation math with dataset citations.
* **No AI-generated video, images, or audio** in submissions; banner photos are real team members; video voiceover is a human teammate; code edits and all numbers were human-verified against the sources below.

---

## 7. NASA Data Sources Used (what + how)
| Dataset | What we used it for | How |
|---|---|---|
| NASA POWER (AG, T2M/PRECTOTCORR/RH2M) | Heat + rainfall climatology & 2019–24 trend per upazila (e.g. Tanore May 31.57°C, dry-season −73%) | Open API point queries per lat/lng, cached JSON in repo |
| GPM IMERG (pattern) | Pre-monsoon rainfall deficit flag (−64 to −67%) | Seasonal-mean proxy from POWER until direct granule pull (disclosed in app) |
| SMAP (L-band) | Topsoil moisture gauge (0.12–0.16 m³/m³ DRY) | Dry-season typical values; live L3 granule pending Earthdata auth (disclosed) |
| ECOSTRESS + Landsat 8–9 NDVI | Canopy stress + greenness (NDVI 0.29–0.34 Weak) | Thermal/NDVI typicals; HLS tile pending (disclosed) |
| SRDI + BBS + BMDA + BARI/BRRI | Soil, areas/yields, pump caps, variety traits | Official publications, catalogued in repo `docs/DATA_SOURCES.md` |

---

## 8. References
1. BBS Yearbook of Agricultural Statistics-2024 (36th ser.), Statistical Pocketbook 2025, Agriculture Census 2019 — bbs.gov.bd
2. SRDI Soil Fertility Atlas / Digital Soil Mapping 2020; Fertilizer Recommendation Guide-2018 — srdi.gov.bd
3. Banglapedia, Seven Soil Tracts; FAO/UNDP SRDI reconnaissance surveys
4. BMDA via Dialogue Earth, 11 May 2026; WARPO/IWM 2025 (via Daily Star); RU experts, Feb 2025
5. Mainuddin et al. 2020, Agric. Water Mgmt. (Boro field water ~1,606 L/kg; 83% NW area; 91% water)
6. IRRI/ADB Barind AWD pilot 2024–25, Niamatpur (1,000 farmers) — AWD −20% water, −30% GHG
7. Springer Discover Agriculture 2025 (AWD −37% water, +65% productivity)
8. BAU dry direct-seeded Boro (~−50% water)
9. BMD Changing Climate 1980–2023 (ERA5); World Bank 1976–2019 (+0.5°C; west +0.6–0.9°C; Jun–Aug −60mm)
10. PLOS Climate 1980–2014; PLOS One 1949–2013 (rainfall decline; Boro −20% by 2050)
11. CSIRO Barind water use 2018; BADC Minor Irrigation 2020–21; USDA GAIN 2018
12. NASA Earthdata — power.larc.nasa.gov; GPM, SMAP, ECOSTRESS, Landsat/HLS, OpenET; data.nasa.gov, api.nasa.gov
13. NASA Space Apps Bangladesh Participants Guide 2026 + Field Shift challenge summary
