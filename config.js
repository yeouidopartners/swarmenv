const fs = require("node:fs");
const process = require("node:process");

const envs = process.env;

if (envs) {
  const secretFiles = Object.keys(envs).filter((key) => key.endsWith("_FILE"));

  for (const secretFile of secretFiles) {
    const secretFilePath = envs[secretFile];
    const secretValue = fs.readFileSync(secretFilePath, "utf8");
    envs[replaceLastIndexOf(secretFile, "_FILE", "")] = secretValue;
  }
}

function replaceLastIndexOf(input, value, to) {
  return input.substring(0, input.lastIndexOf(value)) + to;
}
