export class Character {
  private name: string = "";
  private charClass: string = "";
  private health: number = 0;
  private mana: number = 0;
  private skills: [] = [];
  private items: [] = [];
  private actions = [];

  constructor(
    name: string,
    charClass: string,
    health: number,
    mana: number,
    skills: [],
    items: []
  ) {
    this.name = name;
    this.charClass = charClass;
    this.health = health;
    this.mana = mana;
    this.skills = skills;
    this.items = items;
    this.actions = [...this.skills, ...this.items];
  }

  public makeAction(actionId: number) {
    return this.actions[actionId];
  }
}
