import { KeyValueObject } from "../types";

/**
 * Removes keys from target language translations that are not present in the main language translations
 * @param mainLanguageTranslations - The translations from the main language file
 * @param targetLanguageTranslations - The translations from the target language file
 * @returns The target language translations with orphaned keys removed
 */
export const removeOrphanedKeys = (
  mainLanguageTranslations: KeyValueObject,
  targetLanguageTranslations: KeyValueObject
): KeyValueObject => {
  const mainLanguageKeys = Object.keys(mainLanguageTranslations);
  const filteredTranslations: KeyValueObject = {};

  // Only keep keys that exist in the main language
  mainLanguageKeys.forEach((key) => {
    if (targetLanguageTranslations.hasOwnProperty(key)) {
      filteredTranslations[key] = targetLanguageTranslations[key];
    }
  });

  return filteredTranslations;
};
