import { Character } from "@/models";
import { Item } from "@/models";
import { Skill } from "@/models";
import { print } from "@/utils/output.util";

export function listCharacterItem(items: Item[]): string[] {
  return items.map(
    (item, index) =>
      `\n\t${index + 1}. Nome: ${item.getName()}, Restauração de Vida: ${item.getHealthPointsRestore()}, Restauração de Mana: ${item.getManaPointsRestore()}, Custo: ${item.getCost()}`,
  );
}

export function listCharacterSkill(skills: Skill[]): string[] {
  return skills.map(
    (skill, index) =>
      `\n\t${index + 1}. Nome: ${skill.getName()}, ATK: ${skill.getAttack()}, Custo: ${skill.getCost()}`,
  );
}

export function listCharacter(char: Character): string {
  return `Nome: ${char.getName()}, Classe: ${char.getCharClass()}, Vida: ${char.getMaxHealth()}\nHabilidades: ${listCharacterSkill(char.getSkills())}\nItems: ${listCharacterItem(char.getItems())}\n`;
}

export function printCharacterSelectionListComponent(
  characters: Character[],
): void {
  characters.forEach((char, index) =>
    print(`${index + 1}. ${listCharacter(char)}`),
  );
}
