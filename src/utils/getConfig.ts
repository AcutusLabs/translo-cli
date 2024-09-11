import { readFileSync } from "fs";
import { Config, Language } from "../types";
import { validateLanguages } from "./validateLanguages";
import { validateFixedWords } from "./validateFixedWords";

export const languages: Language[] = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "German",
    code: "de",
  },
  {
    name: "Italian",
    code: "it",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Chinese",
    code: "zh",
  },
  {
    name: "Japanese",
    code: "ja",
  },
];

const DEFAULT_CONFIG: Config = {
  // The path to the folder containing the translation files.
  translationPath: "./languages",
  // languages to generate, it must include english
  languages,
  // fixed words that should not be translated
  fixedWords: {},
};

// Cache the config object to avoid reading the file multiple times
let configCache: Config;

/**
 * Retrieves the configuration object.
 *
 * @returns The configuration object containing the translation path and other properties.
 */
export const getConfig = (): Config => {
  if (configCache) {
    return configCache;
  }

  let configFile: string;
  try {
    configFile = readFileSync(`translo.config.json`, "utf8");
  } catch (e) {
    console.warn("WARNING: Config file not found.");
    console.warn("Using default config.");

    return DEFAULT_CONFIG;
  }

  let config: Config;

  try {
    config = {
      ...DEFAULT_CONFIG,
      ...JSON.parse(configFile),
    };
  } catch (e) {
    console.warn("Error reading config file:", e);
    console.warn("Using default config.");
    return DEFAULT_CONFIG;
  }

  validateLanguages(config.languages);
  validateFixedWords(config.fixedWords);

  configCache = config;

  return config;
};