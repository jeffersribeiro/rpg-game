import { DeadCharacterException, GenericErrorException } from "@/expections";
import { Character } from "@/models";

export class CharacterIAScript {
  private character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  public executeAction(targets: Character[]): string {
    if (this.character.getCurrentHealth() <= 0) {
      throw new DeadCharacterException(
        `${this.character.getName()} está fora de combate e não pode agir.`,
      );
    }

    // Seleciona um alvo aleatório
    const target = this.selectRandomTarget(targets);

    if (!target) {
      throw new GenericErrorException("Nenhum alvo disponível.");
    }

    // Executa uma ação básica, como atacar
    const skill = this.character.getSkills()[0]; // Exemplo: usar a primeira habilidade
    if (skill) {
      target.takeDamage(skill.getAttack());
      return `${this.character.getName()} usa ${skill.getName()} em ${target.getName()}!`;
    } else {
      return `${this.character.getName()} não tem habilidades para usar.`;
    }
  }

  private selectRandomTarget(targets: Character[]): Character | null {
    const aliveTargets = targets.filter((t) => t.getCurrentHealth() > 0);
    if (aliveTargets.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * aliveTargets.length);
    return aliveTargets[randomIndex];
  }
}