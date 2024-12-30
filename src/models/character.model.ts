import { InvalidItemException } from "@/expections";
import { Item } from "./item.model";
import { Skill } from "./skill.model";

export class Character {
  private name: string;
  private charClass: string;

  private maxHealth: number;
  private health: number;

  private maxMana: number;
  private mana: number;

  private skills: Skill[];
  private items: Item[];
  private actions: (Skill | Item)[];

  private isPlayerControlled: boolean = false; // Por padrão, NPC.

  constructor(
    name: string,
    charClass: string,
    health: number,
    mana: number,
    skills: Skill[],
    items: Item[],
    isPlayerControlled: boolean = false,
  ) {
    this.name = name;
    this.charClass = charClass;
    this.health = health;
    this.mana = mana;

    this.maxHealth = health;
    this.maxMana = mana;

    this.skills = skills;
    this.items = items;
    this.actions = [...this.skills, ...this.items];
    this.isPlayerControlled = isPlayerControlled;
  }

  public getName(): string {
    return this.name;
  }

  public getCharClass(): string {
    return this.charClass;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getMaxMana(): number {
    return this.maxMana;
  }

  public getCurrentHealth(): number {
    return this.health;
  }

  public getCurrentMana(): number {
    return this.mana;
  }

  public getPercengeHealth(): number {
    return parseInt(((this.health / this.maxHealth) * 100).toFixed(0));
  }

  public getpercentageMana(): number {
    return (this.mana / this.maxMana) * 100;
  }

  public setHealth(): number {
    return this.health;
  }

  public setMana(mana: number): number {
    return (this.mana = mana);
  }

  public getSkills(): Skill[] {
    return this.skills;
  }

  public getItems(): Item[] {
    return this.items;
  }

  public isPlayer(): boolean {
    return this.isPlayerControlled;
  }

  public setPlayer(): void {
    this.isPlayerControlled = true;
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
  }

  public useItem(itemIndex: number): string {
    if (itemIndex < 0 || itemIndex >= this.items.length) {
      throw new InvalidItemException();
    }

    const item = this.items[itemIndex];

    // Aplica os efeitos do item
    this.health = Math.min(
      this.health + item.getHealthPointsRestore(),
      this.getMaxHealth(),
    );
    this.mana = Math.min(
      this.mana + item.getManaPointsRestore(),
      this.getMaxMana(),
    );

    // Remove o item do inventário após uso
    this.items.splice(itemIndex, 1);

    return `${this.name} usou ${item.getName()}.`;
  }
}
