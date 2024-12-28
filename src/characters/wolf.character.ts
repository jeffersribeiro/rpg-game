import { Character } from "@/models";

import { MealRecoveryItem } from "@/items";
import { FangAttack } from "@/skills";

export class WolfCharacter extends Character {
  constructor() {
    super(
      "Wolf",
      "Animal",
      400,
      100,
      [new FangAttack()],
      [new MealRecoveryItem()],
    );
  }
}
