import { Character } from "@/models";

export interface TurnManagerStateInterface {
  participants: Character[];
  characters: Character[];
  currentTurn: number;
  actionQueue: Character[];
  currentCharacterIndex: number;
}
