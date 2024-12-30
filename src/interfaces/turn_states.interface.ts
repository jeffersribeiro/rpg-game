import { Character } from "@/models";

export interface TurnStateInterface {
  participants: Character[];
  characters: Character[];
  currentTurn: number;
  actionQueue: Character[];
  currentCharacterIndex: number;
}
