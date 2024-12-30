import { Character } from "@/models";
import { print } from "@/utils";

export function printListOfCharacterActionComponent(
  characters: Character[],
): void {
  const printEqualSymbol = (): void => print("=".repeat(50));
  const printLineSymbol = (): void => print("-".repeat(50));

  printEqualSymbol();
  print("  Lista de Personagens");
  printEqualSymbol();

  print(
    `| ${"Nome".padEnd(15)} | ${"Vida".padEnd(6)} | ${"Mana".padEnd(6)} | ${"Jogador?".padEnd(10)} |`,
  );
  printLineSymbol();

  characters.forEach((character) => {
    const name = character.getName().padEnd(15);
    const health = character.getPercengeHealth().toString().padEnd(5);
    const mana = character.getpercentageMana().toString().padEnd(5);
    const isPlayer = (character.isPlayer() ? "Sim" : "Não").padEnd(10);
    print(`| ${name} | ${health}% | ${mana}% | ${isPlayer} |`);
  });

  printEqualSymbol();
}
