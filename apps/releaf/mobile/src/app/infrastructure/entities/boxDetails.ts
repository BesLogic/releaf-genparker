import { GrowthInfo } from "./growthInfo";
import { Seed } from "./seed";
import { Vitals } from "./vital";

export interface BoxDetails {
    id: string;
    growthInfo: GrowthInfo;
    seeds: Seed[];
    vitals: Vitals;
}