import { Item } from "@/models";

export class ManaPoisonItem extends Item {
  constructor() {
    super("Mana Poison", 100, 0, 10, 3);
  }
}
