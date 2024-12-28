export function moduleAliasConfig() {
  if (!process.env.IS_TS_NODE) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("module-alias/register");
  }
}
