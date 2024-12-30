import { TurnStateInterface } from "@/interfaces";

export const turnState: TurnStateInterface = {
  participants: [],
  characters: [],
  currentTurn: 1,
  actionQueue: [],
  currentCharacterIndex: 0,
};
