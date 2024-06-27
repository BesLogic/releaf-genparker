import { Box } from "../entities/box";

export interface IBoxService {
  test(): string;
  getAll(): Promise<Box[]>;
}

export class BoxService {
  test() : string {
    return "test";
  }

  async getAll(): Promise<string[]> {
    try {
      const response = await fetch(
        'https://api.genparker.releaftrees.life/boxes/', { 
        headers: new Headers({
          'Authorization': 'Basic bXJiYW1ib286bXJiYW1ib28='
        }), 
      }
      );
      const boxes = await response.json();
      console.log(boxes);
      return boxes;
    } catch (error) {
      console.error(error);
    }
  }
}