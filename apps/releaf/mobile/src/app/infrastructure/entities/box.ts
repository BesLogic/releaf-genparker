import { Seed } from "./seed";
import { SensorData } from "./sensor-data";


export class Box {
  id: string;
  ownerId: string;
  treeDefinitionId: string;
  pairingKey: string;
  germinationDay: Date;
  seeds: Seed[];
  seedsAverageInchHeight: number;
  temperature: SensorData;
  soilMoisturePercent: SensorData;
  luminosityPercent: SensorData;
}