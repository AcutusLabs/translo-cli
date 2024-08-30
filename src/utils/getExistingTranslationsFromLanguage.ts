import { readFileSync } from "fs";
import { KeyValueObject, Language } from "../types";
import { getConfig } from "./getConfig";

/**
 * Get existing translations from a language file
 * @param language The language to get the translations from
 * @returns The existing translations from the language file
 */
export const getExistingTranslationsFromLanguage = (language: Language) => {
  const config = getConfig();
  let languageTranslations: KeyValueObject = {};
  try {
    const data = readFileSync(
      `${config.translationPath}/${language.code}.json`,
      "utf8"
    );
    languageTranslations = JSON.parse(data);
  } catch (e) {
    console.warn(
      `WARNING: Translation file for ${language.name} not found. Generating new file.`
    );
  }
  return languageTranslations;
};
