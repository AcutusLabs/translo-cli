import { getConfig } from "./getConfig";

/**
 * Get a prompt that tells the AI to use specific translations for certain words.
 * This function merges both language-specific fixed words and global fixed words (from "all").
 * Global fixed words (from "all") take precedence over language-specific ones when the same key exists.
 *
 * @param language The language code to generate the prompt for
 * @returns The prompt string containing fixed word translations, or empty string if no fixed words
 */
export const getFixedWordPrompt = (languageCode: string) => {
  const config = getConfig();
  const fixedWordsForLanguage = {
    ...(config.fixedWords[languageCode] || {}),
    ...(config.fixedWords["all"] || {}),
  };

  console.log("fixedWordsForLanguage", languageCode, fixedWordsForLanguage);

  return Object.keys(fixedWordsForLanguage).length > 0
    ? `when translating the following words, please use always the following translations:
${JSON.stringify(fixedWordsForLanguage, null, 2)}`
    : "";
};
