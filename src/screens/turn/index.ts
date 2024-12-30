import { TurnManager } from "@/models";
import { playerState, enemiesState, turnState } from "@/states";

import { turnScreen } from "./turn.screen";

export async function turnScreenContainer(): Promise<void> {
  if (!playerState.player) process.exit(0);

  turnState.characters = [playerState.player, ...enemiesState];

  const turnManager = new TurnManager();

  return await turnScreen(turnManager);
}
