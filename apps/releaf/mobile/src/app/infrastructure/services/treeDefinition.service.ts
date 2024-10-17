import { TreeDefinition } from "../entities/treeDefinition";

export class TreeDefinitionService {
  async getAll(): Promise<TreeDefinition[]> {
    let trees: TreeDefinition[] = [];
    try {
      const response = await fetch(
        'https://api.genparker.releaftrees.life/trees?page=1&size=1000', {
        headers: new Headers({
          'Authorization': 'Basic bXJiYW1ib286bXJiYW1ib28='
        }),
      }
      );
      trees = await response.json();
    } catch (error) {
      console.error(error);
    }
    return trees;
  }
}