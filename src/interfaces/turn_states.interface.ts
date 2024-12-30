import { Character } from "@/models";

export interface TurnStateInterface {
  characters: Character[];
  currentTurn: number;
  actionQueue: Character[];
  currentCharacterIndex: number;
}
