import { Character } from "@/models";

import { HumanMealRecoveryItem } from "@/items";
import { ClubAttack } from "@/skills";

export class OrkCharacter extends Character {
  constructor() {
    super(
      "Ork",
      "CorruptedCreature",
      400,
      100,
      [new ClubAttack()],
      [new HumanMealRecoveryItem()],
    );
  }
}
