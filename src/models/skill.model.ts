export class Skill {
  private name: string;
  private attack: number;
  private cost: number;

  constructor(name: string, attack: number, cost: number) {
    this.name = name;
    this.attack = attack;
    this.cost = cost;
  }

  public getName(): string {
    return this.name;
  }

  public getAttack(): number {
    return this.attack;
  }

  public getCost(): number {
    return this.cost;
  }
}
