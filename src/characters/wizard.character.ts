import { Character } from "@/models";

import { HeathPoisonItem, ManaPoisonItem } from "@/items";
import { FireBallSkill, IceBallSkill } from "@/skills";

export class WizardCharacter extends Character {
  constructor() {
    super(
      "Rolo",
      "wizard",
      400,
      100,
      [new FireBallSkill(), new IceBallSkill()],
      [new HeathPoisonItem(), new ManaPoisonItem()],
    );
  }
}
