import { GrowthInfo } from "./growthInfo";
import { Seed } from "./seed";
import { StringValue } from "./stringValue";
import { Vitals } from "./vital";

export interface BoxDetails {
    id: StringValue;
    treeDefinitionId: StringValue;
    growthInfo: GrowthInfo;
    seeds: Seed[];
    vitals: Vitals;
}