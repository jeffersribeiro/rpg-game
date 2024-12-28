import { Turn } from "@/models";
import { print } from "@/utils/output.util";
import { printListOfCharacterActionComponent } from "./components";

export async function turnScreen(turn: Turn): Promise<void> {
  print("=== Inicio dos Turnos ===");

  print(`Turno ${turn.getCurrentTurn()}`);

  print(`Ordem de ação dos personagens:`);
  printListOfCharacterActionComponent(turn.getCharactersActionsOrder());
}
