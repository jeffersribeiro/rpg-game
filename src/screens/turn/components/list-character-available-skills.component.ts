import { Item, Skill } from "@/models";
import { print } from "@/utils";

export function printListCharacterSkills(skills: Skill[]): void {
  skills.map((skill, index) =>
    print(
      `\n\t${index + 1}. Nome: ${skill.getName()}, ATK: ${skill.getAttack()}, Custo: ${skill.getCost()}`,
    ),
  );
}

export function printListCharacterItems(items: Item[]): void {
  items.map((item, index) =>
    print(
      `\n\t${index + 1}. Nome: ${item.getName()}, HP: ${item.getHealthPointsRestore()}, MP: ${item.getManaPointsRestore()}, QTD: ${item.getQuantity()}`,
    ),
  );
}
