import os from "os";
import { exec } from "child_process";

export function playSound(filePath: string): void {
  const platform = os.platform();

  let command;

  switch (platform) {
    case "win32": // Windows
      command = `powershell -c (New-Object Media.SoundPlayer "${filePath}").PlaySync();`;
      break;
    case "linux": // Linux
      command = `aplay ${filePath}`; // Para arquivos WAV, instale o `aplay` se necessário
      break;
    case "darwin": // macOS
      command = `afplay ${filePath}`;
      break;
    default:
      console.error(`Sistema operacional não suportado: ${platform}`);
      return;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Erro ao reproduzir som: ${error.message}`);
    } else {
      console.log("Som reproduzido com sucesso!");
    }
  });
}
