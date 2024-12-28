import { Item } from "@/models";

export class HeathPoisonItem extends Item {
  constructor() {
    super("Health Poison", 100, 0, 10, 3);
  }
}
