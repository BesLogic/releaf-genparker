import { Box } from "../entities/box";

export class BoxService {
  test() : string {
    return "test";
  }

  async getAll(): Promise<Box[]> {
    try {
      const response = await fetch(
        'http://api.genparker.releaftrees.life/boxes/',
      );
      const json = await response.json();
      return json.boxes;
    } catch (error) {
      console.error(error);
    }
  }
}