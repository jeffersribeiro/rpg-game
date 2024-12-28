export class InvalidItemException extends Error {
  constructor() {
    super("Item inválido.");
  }
}
