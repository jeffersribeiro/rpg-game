import {
  knightCharacter,
  OrkCharacter,
  WizardCharacter,
  WolfCharacter,
} from "@/characters";
import { Character } from "@/models";

export const charactersState: Character[] = [
  new knightCharacter(),
  new WizardCharacter(),
];

export const enemiesState: Character[] = [
  new OrkCharacter(),
  new WolfCharacter(),
  new WizardCharacter(),
];
