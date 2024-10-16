import { BoxDetails } from "./boxDetails";
import { Seed } from "./seed";
import moment from 'moment'

export class BoxItem {
  id: string;
  seeds: Seed[];
  seedsAverageInchHeight: number;
  germinationDay: string;
  dateSinceGermination: string;

  constructor(boxDetails: BoxDetails) {
    this.id = boxDetails.id.value;
    this.seeds = boxDetails.seeds;
    this.seedsAverageInchHeight = boxDetails.growthInfo.seedsAverageInchHeight;

    const momentGerminationDay = moment(boxDetails.growthInfo.germinationDay);
    const now = moment(new Date());
    this.germinationDay = momentGerminationDay.format("Do MMMM YYYY");
    this.dateSinceGermination = moment.duration(now.diff(momentGerminationDay)).asDays().toFixed(0);
  }
}