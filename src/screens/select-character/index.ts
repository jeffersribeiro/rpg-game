import { charactersState, playerState } from "@/states";
import { characterSelectionScreen } from "./select-character.screen";

export async function selectCharacterScreenContainer(): Promise<void> {
  return await characterSelectionScreen(playerState, charactersState);
}
