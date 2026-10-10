# CropWise — Barind Water-Saver
**NASA Space Apps Challenge 2026 · Field Shift: Adapting Farms with NASA Data · Team Arekta Team**

A Bangla-first decision-support tool that tells Barind smallholders when dry-season Boro rice will lose money — and shows water-smart rotation alternatives with NASA-data proof.

🎥 240s video: [YOUTUBE_240S_URL] · 🎥 30s demo: [YOUTUBE_30S_URL] · 🎨 Prototype: [FIGMA_URL]

## The problem
In Bangladesh's Barind Tract, groundwater has fallen 10–15m in a decade, 16,000 deep tubewells are capped at 980 pump-hours shared one year in three — yet Boro rice covers 83% of northwestern farmland and drinks 91% of irrigation water (~1,605 L/kg). Farmers have no simple, trusted way to test alternatives.

## What it does
Fuse **NASA Earth observations** (POWER heat/rain, GPM rainfall deficit, SMAP soil moisture, ECOSTRESS + Landsat stress/greenness) with **SRDI soil data**, **BARI/BRRI crop traits**, and farmer priorities (save water / soil / cost sliders) → ranked rotations with litres, cost, soil and risk math.

**Demo — 1 acre, Tanore:** keep Boro with AWD (~20% water saved) vs shift fallow to **mustard + mungbean** (2 waterings instead of 28, ≈75% pumped water + Tk14,300 saved per acre, plus natural nitrogen fixation). Every recommendation carries a plain-language NASA data trace. Farmer mode is Bangla, 3 taps, 2G/offline; AI voice chat answers with evidence chips; My Farm page builds a BMDA-style farmer card with quota tracking.

## Screens
Field Tracker (field + satellites → soil + priorities) · Crop Comparison · AI Sahayak (voice + text) · My Farm · NASA Proof (5-phase decision trace). Language gate on first load (বাংলা / English) — Bangla mode is 100% Bangla.

## Data (real, no synthetic)
NASA POWER AG climatology 2001–2020 + daily 2019–24 per upazila (open API, cached in `src/data/nasa_power_climatology_2001_2020.json`); GPM pattern proxy + SMAP/NDVI dry-season typicals (live granules pending Earthdata auth — disclosed in-app); SRDI Fertility Atlas 2020; BBS Yearbook 2024; BMDA caps; BARI/BRRI varieties. Full catalog: [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md).

## AI use
Google Stitch scaffolded the UI from our spec (demo farmer profile is fictional — no real PII); Gemini live chat wiring lands in Video 2 (currently static verified answers). No AI video/audio/images; voiceover is human; all numbers human-verified.

## Run locally
**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. (Optional, Video 2) Set `GEMINI_API_KEY` in `.env.local` — never commit keys
3. Run: `npm run dev` · Build: `npm run build` · Check: `npm run lint`

## Team Arekta Team
Ruman — Team Lead · Mehedi — Project Manager · Rafid — Developer · Mahadi — Data Analyst · Mim — UI/UX · Nowar — SQA Analyst

## Submission docs
Full form text: [`../CropWise_Project_Submission.md`](../CropWise_Project_Submission.md) · Short form: [`../CropWise_Short_Submission.md`](../CropWise_Short_Submission.md)
