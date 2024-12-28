export class Item {
  private name: string;
  private health_points_restore: number;
  private mana_points_restore: number;
  private cost: number;
  private quantity: number;

  constructor(
    name: string,
    health_points_restore: number,
    mana_points_restore: number,
    cost: number,
    quantity: number,
  ) {
    this.name = name;
    this.health_points_restore = health_points_restore;
    this.mana_points_restore = mana_points_restore;
    this.cost = cost;
    this.quantity = quantity;
  }

  public getName(): string {
    return this.name;
  }

  public getHealthPointsRestore(): number {
    return this.health_points_restore;
  }

  public getManaPointsRestore(): number {
    return this.mana_points_restore;
  }

  public getCost(): number {
    return this.cost;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
