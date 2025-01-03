import "dotenv/config";

import { startScreenContainer } from "./screens";

import { moduleAliasConfig } from "./configs";

async function main(): Promise<void> {
  moduleAliasConfig();
  console.clear();

  await startScreenContainer();
}

main();
