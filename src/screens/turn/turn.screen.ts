import { Turn } from "@/models";
import { registersState, turnState } from "@/states";
import { print } from "@/utils/output.util";

import { printListOfCharacterActionComponent } from "./components";
import { CharacterIAScript } from "@/scripts";
import { getInput } from "@/utils";

export async function turnManagement(turnManager: Turn): Promise<void> {
  print(`Turno ${turnManager.getCurrentTurn()}`);

  print(`Ordem de ação dos personagens:`);
  printListOfCharacterActionComponent(turnManager.getCharactersActionsOrder());

  const isPlayerTurn = turnManager.getCurrentCharacterActionTurn().isPlayer();
  const actionQueue = turnManager.getCharactersActionsOrder().length;
  const currentCharacter = turnManager.getCurrentCharacterActionTurn();

  const targets = turnState.characters.filter((c) => c !== currentCharacter);

  try {
    while (actionQueue > 0) {
      if (isPlayerTurn) {
        const skill = currentCharacter.getSkills()[0];
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
        }
      } else {
        const ia = new CharacterIAScript(currentCharacter);
        ia.executeAction(targets);
      }

      print(registersState[registersState.length - 1]);
    }
  } catch (error) {
    console.error((error as Error).message);
    // Aqui, delegue para a interface do usuário o controle sobre o turno do jogador
  }
  turnManager.goToNextCharacterAction();
  turnManagement(turnManager);
}

export async function turnScreen(turnManager: Turn): Promise<void> {
  print("=== Inicio dos Turnos ===");

  const isThereAWinner = turnManager.getCharacters().length;
  const playerAlive = turnManager.getPlayer();

  turnManager.generateTurnOrder();

  while (isThereAWinner > 0) {
    await turnManagement(turnManager);
    turnManager.goToNextTurn();
  }

  print("FIM!!!");
}
