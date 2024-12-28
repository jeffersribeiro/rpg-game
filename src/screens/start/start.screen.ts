import { print } from "@/utils/output.util";
import { getInput } from "@/utils/input.util";

import { selectCharacterScreenContainer } from "@/screens/select-character";

export async function startScreen(): Promise<void> {
  print("=== Bem-vindo ao RPG de Turno ===");
  print("1. Iniciar Jogo");
  print("2. Sair");

  const choice = await getInput("Escolha uma opção: ");

  if (choice === "1") {
    print("Iniciando o jogo...");
    await selectCharacterScreenContainer();
  } else if (choice === "2") {
    print("Saindo do jogo. Até mais!");
    process.exit(0);
  } else {
    print("Opção inválida. Tente novamente.");
    await startScreen();
  }
}
