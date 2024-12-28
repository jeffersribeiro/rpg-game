import { Turn } from "@/models";
import { turnScreen } from "./turn.screen";

import { playerState, enemiesState } from "@/states";

export async function turnScreenContainer(): Promise<void> {
  if (!playerState.player) process.exit(0);

  const turnCharacters = [playerState.player, ...enemiesState];

  const turnManager = new Turn(turnCharacters);

  turnManager.generateTurnOrder();

  return turnScreen(turnManager);
}
