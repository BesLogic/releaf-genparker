import { BoxDetails } from "../entities/boxDetails";

export class BoxService {
  async getAll(): Promise<BoxDetails[]> {
    let boxes: BoxDetails[] = [];
    try {
      const response = await fetch(
        'https://api.genparker.releaftrees.life/boxes/', {
        headers: new Headers({
          'Authorization': 'Basic bXJiYW1ib286bXJiYW1ib28='
        }),
      }
      );
      boxes = await response.json();
    } catch (error) {
      console.error(error);
    }
    return boxes;
  }

  async get(id: string): Promise<BoxDetails> {
    let boxDetails: BoxDetails;
    try {
      const response = await fetch(
        'https://api.genparker.releaftrees.life/boxes/' + id, {
        headers: new Headers({
          'Authorization': 'Basic bXJiYW1ib286bXJiYW1ib28='
        }),
      }
      );
      boxDetails = await response.json();
    } catch (error) {
      console.error(error);
    }
    return boxDetails;
  }
}