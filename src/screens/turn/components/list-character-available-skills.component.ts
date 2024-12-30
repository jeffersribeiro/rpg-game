import { Skill } from "@/models";
import { print } from "@/utils";

export function printListCharacterSkills(skills: Skill[]): void {
  skills.map((skill, index) =>
    print(
      `\n\t${index + 1}. Nome: ${skill.getName()}, ATK: ${skill.getAttack()}, Custo: ${skill.getCost()}`,
    ),
  );
}
