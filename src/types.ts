export type AppTab = 'field-tracker' | 'crop-comparison' | 'ai-sahayak' | 'my-farm' | 'nasa-proof';

export type FieldStep = 1 | 2;

export type ViewMode = 'farmer' | 'expert';

export type Lang = 'bn' | 'en';

export interface FarmerProfile {
  name: string;
  phone: string;
  waterSource: 'deep-tubewell' | 'shallow-tubewell' | 'pond' | 'canal' | 'rain-only';
  irrigationHours: number;
  sowingMonth: string;
}

export interface ChatMsg {
  id: string;
  role: 'user' | 'ai';
  textBn: string;
  textEn?: string;
  evidence?: string;
}

export interface UpazilaData {
  id: string;
  nameBn: string;
  nameEn: string;
  districtBn: string;
  districtEn: string;
  lat: number;
  lng: number;
  soilClass: string;
  soilTypeBn: string;
  soilTypeEn: string;
  defaultPh: number;
  powerTemp: number;
  powerDeficit: number;
  gpmDeficit: number;
  smapMoisture: number;
  ndvi: number;
  groundwaterDrop: string;
  bmdaHoursCap: number;
}
