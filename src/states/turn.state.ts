import { TurnManagerStateInterface } from "@/interfaces";

export const turnState: TurnManagerStateInterface = {
  participants: [],
  characters: [],
  currentTurn: 1,
  actionQueue: [],
  currentCharacterIndex: 0,
};
