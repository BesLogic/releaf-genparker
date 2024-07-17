
export interface Vitals {
  temperature: Vital;
  soilMoisturePercent: Vital;
  luminosityPercent: Vital;
}

export interface Vital {
  value: number;
  lastUpdate: Date;
  batteryLevel: number;
  batteryLastUpdate: Date;
}