export interface DistrictData {
  name: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  activeAlerts: number;
  rainfall: { value: number; unit: string };
  temperature: { value: number; unit: string };
  aqi: number;
  population: string;
}