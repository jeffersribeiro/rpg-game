import { registersState, turnState } from "@/states";
import { GenericErrorException } from "@/expections";

import { Character } from "./character.model";

export class TurnManager {
  constructor() {}

  // Embaralha os personagens para definir a ordem inicial do turno.
  private shuffleCharacters(characters: Character[]): Character[] {
    const shuffled = [...characters]; // Evita modificar a lista original.
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public generateTurnOrder(): Character[] {
    const randomPlayerOrder = [...turnState.characters];
    turnState.participants = [...randomPlayerOrder];
    turnState.characters = [...randomPlayerOrder];
    turnState.actionQueue = [...randomPlayerOrder];
    return randomPlayerOrder;
  }

  public getCurrentTurn(): number {
    return turnState.currentTurn;
  }

  public goToNextTurn(): void {
    this.verifyIfCharacterIsDeadAndRemoveFromTurn();

    if (turnState.characters.length) {
      turnState.actionQueue = [...turnState.characters];
      turnState.currentTurn++;
    }
  }

  public goToNextCharacterAction(): void {
    if (turnState.actionQueue.length) {
      turnState.actionQueue.shift();
    }
  }

  public getCharactersActionsOrder(): Character[] {
    return turnState.actionQueue;
  }

  public getCurrentCharacterActionTurn(): Character {
    return turnState.actionQueue[0];
  }

  public getCharacters(): Character[] {
    return turnState.characters;
  }

  public getPlayer(): Character | undefined {
    return turnState.characters.find((c) => c.isPlayer());
  }

  public verifyIfCharacterIsDeadAndRemoveFromTurn(): void {
    const character = turnState.characters.find(
      (c) => c.getCurrentHealth() <= 0,
    );
    if (character) {
      const playerIndex = turnState.characters.indexOf(character);

      turnState.characters.splice(playerIndex, 1);
    }
  }

  public processTurn(): void {
    const currentCharacter = this.getCurrentCharacterActionTurn();

    if (currentCharacter.isPlayer()) {
      registersState.push(
        `É a vez de ${currentCharacter.getName()} (Jogador).`,
      );

      throw new GenericErrorException(
        "Ação do jogador requerida. Delegue para a interface de controle.",
      );
    } else {
      registersState.push(`É a vez de ${currentCharacter.getName()} (IA).`);
    }

    registersState.push(`Fim da acão do jodador ${currentCharacter.getName()}`);
    this.goToNextCharacterAction();
  }
}
