import { StringValue } from "./stringValue";

export interface TreeDefinition {
  name: string;
  id: StringValue;
  instructions: TreeDefinitionInstruction[];
  estimatedGerminationDurationDays: number;
}

export interface TreeDefinitionInstruction {
  title: string;
  publishDate: string;
  author: TreeDefinitionAuthor;
  steps: TreeDefinitionSteps[];
}

export interface TreeDefinitionAuthor {
  userName: string;
  displayName: string;
}

export interface TreeDefinitionSteps {
  text: string;
  imageUrl: string;
  imageAlt: string;
}