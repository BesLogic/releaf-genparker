import { BoxDetails } from "./boxDetails";
import { Seed } from "./seed";
import moment from 'moment'
import { TreeDefinition } from "./treeDefinition";
import { Vitals } from "./vital";

export class BoxItem {
  id: string;
  treeDefinitionId: string;
  seeds: Seed[];
  seedsAverageInchHeight: number;
  germinationDay: string;
  dateSinceGermination: string;
  treeName: string;
  vitals: Vitals;

  constructor(boxDetails: BoxDetails) {
    this.id = boxDetails.id.value;
    this.seeds = boxDetails.seeds;
    this.seedsAverageInchHeight = boxDetails.growthInfo.seedsAverageInchHeight;
    this.treeDefinitionId = boxDetails.treeDefinitionId.value;
    this.vitals = boxDetails.vitals;

    const momentGerminationDay = moment(boxDetails.growthInfo.germinationDay);
    const now = moment(new Date());
    this.germinationDay = momentGerminationDay.format("Do MMMM YYYY");
    this.dateSinceGermination = moment.duration(now.diff(momentGerminationDay)).asDays().toFixed(0);
  }

  setTreeName(treeDefinitions: TreeDefinition[]) {
    const treeDefinition = treeDefinitions.find(treeDefinition => treeDefinition.id.value === this.treeDefinitionId);
    if (!treeDefinition) return;
    this.treeName = treeDefinition.name;
  }
}