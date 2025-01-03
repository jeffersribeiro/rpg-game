import { Item, Skill, TurnManager } from "@/models";
import { registersState, turnState } from "@/states";
import { print } from "@/utils/output.util";

import { printListOfCharacterActionComponent } from "./components";
import { CharacterIAScript } from "@/scripts";
import { getInput } from "@/utils";
import {
  printListCharacterItems,
  printListCharacterSkills,
} from "./components/list-character-available-skills.component";

export async function turnScreen(turnManager: TurnManager): Promise<void> {
  print("=== Inicio dos Turnos ===");

  turnManager.generateTurnOrder(); // Define a ordem inicial

  while (turnState.characters.length > 1) {
    print(`=== Início do Turno ${turnManager.getCurrentTurn()} ===`);

    while (turnState.actionQueue.length > 0) {
      const currentCharacter = turnManager.getCurrentCharacterActionTurn();
      const isPlayerTurn = currentCharacter.isPlayer();

      try {
        if (isPlayerTurn) {
          // Ação do jogador

          const selectedActionType = await getInput(
            "Qual Ação deseja realizar: \n1 - Usar Habilidades\n2 - Usar Items\n",
          );

          if (selectedActionType == "1") {
            const availableSkills = currentCharacter.getSkills();

            print(`É a vez de ${currentCharacter.getName()} (Jogador).`);

            printListCharacterSkills(availableSkills);
            const selectedSkillChoice = await getInput(
              "Digite o número da habilidade desejada: ",
            );

            const selectedSkillIndex = parseInt(selectedSkillChoice) - 1;

            let skill: Skill | null = null;

            if (
              selectedSkillIndex >= 0 &&
              selectedSkillIndex < availableSkills.length
            ) {
              skill = availableSkills[selectedSkillIndex];
              print(`Você escolheu: ${skill.getName()} (${skill.getAttack()})`);
            } else {
              print("Opção inválida. Tente novamente.");
              continue; // Reexibe a vez do jogador sem avançar o turno
            }

            const targets = turnState.characters.filter(
              (c) => c !== currentCharacter,
            );

            if (!targets.length) {
              throw new Error("Não há alvos disponíveis para ataque.");
            }

            const choice = await getInput(
              "Digite o número do personagem desejado: ",
            );

            const selectedIndex = parseInt(choice) - 1;

            if (selectedIndex >= 0 && selectedIndex < targets.length) {
              const target = targets[selectedIndex];
              print(
                `Você escolheu: ${target.getName()} (${target.getCharClass()})`,
              );

              if (skill) {
                target.takeDamage(skill.getAttack());
                currentCharacter.setMana(
                  currentCharacter.getCurrentMana() - skill.getCost(),
                );

                registersState.push(
                  `${currentCharacter.getName()} usa ${skill.getName()} em ${target.getName()}!`,
                );
              } else {
                registersState.push(
                  `${currentCharacter.getName()} não tem habilidades para usar.`,
                );
              }
            } else {
              print("Opção inválida. Tente novamente.");
              continue; // Reexibe a vez do jogador sem avançar o turno
            }
          } else if (selectedActionType == "2") {
            const availableItems = currentCharacter.getItems();

            print(`É a vez de ${currentCharacter.getName()} (Jogador).`);

            printListCharacterItems(availableItems);
            const selectedItemChoice = await getInput(
              "Digite o número da habilidade desejada: ",
            );

            const selectedItemIndex = parseInt(selectedItemChoice) - 1;

            let item: Item | null = null;

            if (
              selectedItemIndex >= 0 &&
              selectedItemIndex < availableItems.length
            ) {
              item = availableItems[selectedItemIndex];
              print(`Você escolheu: ${item.getName()}`);

              currentCharacter.useItem(selectedItemIndex);
              print(`${currentCharacter.getName()} usou ${item.getName()}.`);
            } else {
              print("Opção inválida. Tente novamente.");
              continue; // Reexibe a vez do jogador sem avançar o turno
            }
          } else {
            print("Opção inválida. Tente novamente.");
            continue; // Reexibe a vez do jogador sem avançar o turno
          }
        } else {
          // Ação da IA
          print(`É a vez de ${currentCharacter.getName()} (IA).`);
          const ia = new CharacterIAScript(currentCharacter);
          ia.executeAction(
            turnState.characters.filter((c) => c !== currentCharacter),
          );
        }

        print(registersState[registersState.length - 1]);
      } catch (error) {
        print(`Erro durante a ação: ${(error as Error).message}`);
      }

      turnManager.goToNextCharacterAction();
      print(`Ordem de ação dos personagens:`);
      printListOfCharacterActionComponent(turnState.participants);
    }

    print(`=== Fim do Turno ${turnManager.getCurrentTurn()} ===`);
    turnManager.goToNextTurn();
  }

  print("=== FIM DO JOGO ===");
}
