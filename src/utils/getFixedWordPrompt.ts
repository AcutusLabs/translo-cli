import { fixedWords } from "../constants";

/**
 * Get a prompt that tells the user to use specific translations for certain words
 * @param language The language to generate the prompt for
 * @returns The prompt to use for the language
 */
export const getFixedWordPrompt = (language: string) => {
  const fixedWordsForLanguage = fixedWords[language] || {};

  return Object.keys(fixedWordsForLanguage).length > 0
    ? `when translating the following words, please use the following translations (case insensitive):
${JSON.stringify(fixedWordsForLanguage, null, 2)}`
    : "";
};
