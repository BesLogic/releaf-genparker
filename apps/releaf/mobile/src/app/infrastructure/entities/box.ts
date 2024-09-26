import { GrowthInfo } from "./growthInfo";
import { Seed } from "./seed";

export interface BoxItem {
  id: string;
  seeds: Seed[];
  growthInfo: GrowthInfo;
}