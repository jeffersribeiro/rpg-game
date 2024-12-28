import { CharacterIAScript } from "@/scripts";
import { Character } from "./character.model";

export class Turn {
  private characters: Character[];
  private currentTurn = 1;
  private actionQueue: Character[] = [];
  private currentCharacterIndex = 0;

  constructor(characters: Character[]) {
    this.characters = [...characters];
  }

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
    const randomPlayerOrder = this.shuffleCharacters(this.characters);
    this.actionQueue = randomPlayerOrder;
    return randomPlayerOrder;
  }

  public getCurrentTurn(): number {
    return this.currentTurn;
  }

  public goToNextTurn(): void {
    if (this.characters.length) {
      this.currentTurn++;
    }
  }

  public goToNextCharacterAction(): void {
    if (this.actionQueue.length) {
      this.actionQueue = this.actionQueue.slice(this.actionQueue.length, 1);
    }
  }

  public getCharactersActionsOrder(): Character[] {
    return this.actionQueue;
  }

  public getCurrentCharacterActionTurn(): Character {
    return this.actionQueue[0];
  }

  public getCharacters(): Character[] {
    return this.characters;
  }

  public verifyIfCharacterIsDeadAndRemoveFromTurn(): void {
    const character = this.characters.find((c) => c.getCurrentHealth() <= 0);
    if (character) {
      const playerIndex = this.characters.indexOf(character);

      this.characters.splice(playerIndex, 1);
    }
  }

  public processTurn(): string {
    const currentCharacter = this.getCurrentCharacterActionTurn();

    if (currentCharacter.isPlayer()) {
      return `É a vez de ${currentCharacter.getName()} (Jogador).`;
      // Aqui você chamaria a lógica de entrada do jogador.
    } else {
      const ia = new CharacterIAScript(currentCharacter);
      ia.executeAction(this.characters.filter((c) => c !== currentCharacter));

      return `É a vez de ${currentCharacter.getName()} (IA).`;
    }

    this.goToNextCharacterAction();
  }
}
