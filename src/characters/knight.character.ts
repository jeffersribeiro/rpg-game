import { Character } from "@/models";

import { HeathPoisonItem } from "@/items";
import { SwordAttackSkill, ShieldBarrierSkill } from "@/skills";

export class knightCharacter extends Character {
  constructor() {
    super(
      "Allain",
      "knight",
      400,
      100,
      [new SwordAttackSkill(), new ShieldBarrierSkill()],
      [new HeathPoisonItem()],
    );
  }
}
