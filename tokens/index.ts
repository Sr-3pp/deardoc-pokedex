import fs from "fs";
import { join } from "pathe";

const baseDir = join(process.cwd());
const tokensDir = join(baseDir, "tokens", "src");
const outputDir = join(baseDir, "assets", "scss");

const tokenFiles = fs.readdirSync(tokensDir);

let TOKENS: any = {};

const toCamelCase = (str: string) => {
  return str
    .replace(/-([a-z])/g, (match) => match.toUpperCase())
    .replace(/-/g, "");
};

const processTokens = (tokens: Record<string, string>) => {
  const flatTokens: Record<string, string | number> = {};
  const getKeyValue: any = (value: any, key: string = "") => {
    if (typeof value === "string" || typeof value === "number") {
      flatTokens[key] = value;
    } else {
      return Object.entries(value).forEach(([_key, val]) => {
        getKeyValue(val, `${key ? key + "-" : ""}${_key}`);
      });
    }
  };
  getKeyValue(tokens);
  return flatTokens;
};

const toScss = (tokens: Record<string, string>) => {
  return Object.entries(tokens)
    .map(([key, value]) => `$${toCamelCase(key)}: ${value};`)
    .join("\n");
};

const toJs = (tokens: Record<string, string>) => {
  return Object.entries(tokens)
    .map(([key, value]) => `export const ${toCamelCase(key)}="${value}";`)
    .join("\n");
};

tokenFiles.forEach((file) => {
  const tokens = JSON.parse(fs.readFileSync(join(tokensDir, file), "utf8"));
  const flatTokens = processTokens(tokens);
  TOKENS = { ...TOKENS, ...flatTokens };
});

const scss = toScss(TOKENS);
fs.writeFileSync(join(outputDir, "tokens.scss"), scss);

const js = toJs(TOKENS);
fs.writeFileSync(join(outputDir, "..", "js", "tokens.js"), js);
