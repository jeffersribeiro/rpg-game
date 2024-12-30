import { Character } from "@/models";
import { print, getInput } from "@/utils";
import { PlayerStateInterface } from "@/interfaces";
import { turnScreenContainer } from "@/screens/turn";
import { printCharacterSelectionListComponent } from "@/screens/components";

export async function characterSelectionScreen(
  playerState: PlayerStateInterface,
  charactersState: Character[],
): Promise<void> {
  print("=== Escolha seu personagem ===");

  printCharacterSelectionListComponent(charactersState);

  const choice = await getInput("Digite o número do personagem desejado: ");
  const selectedIndex = parseInt(choice) - 1;

  if (selectedIndex >= 0 && selectedIndex < charactersState.length) {
    charactersState[selectedIndex].setPlayer();
    playerState.player = charactersState[selectedIndex];
    print(
      `Você escolheu: ${playerState.player.getName()} (${playerState.player.getCharClass()})`,
    );
    await turnScreenContainer();
  } else {
    print("Opção inválida. Tente novamente.");
    await characterSelectionScreen(playerState, charactersState);
  }
}
