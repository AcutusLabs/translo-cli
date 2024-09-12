import { KeyValueObject } from "../types";
import { getFixedWordPrompt } from "./getFixedWordPrompt";

/**
 * Generate a prompt for the user to fill in translations for a batch of words
 * in a specific language.
 * @param targetLanguage The language to translate the words to.
 * @param targetLanguageBatch The batch of words to translate.
 * @param mainLanguageBatch The batch of main language words to translate.
 * @returns The generated prompt.
 */
export const generatePrompt = ({
  targetLanguage,
  targetLanguageBatch,
  mainLanguage,
  mainLanguageBatch,
}: {
  targetLanguage: string;
  targetLanguageBatch: KeyValueObject;
  mainLanguage: string;
  mainLanguageBatch: KeyValueObject;
}) => {
  return `
I'm working on internationalizing my application.
I've created a json with ${mainLanguage} translations and I need your help to translate it to ${targetLanguage}.
This is the json with ${mainLanguage} translations.

${JSON.stringify(mainLanguageBatch, null, 2)}

this is the json with ${targetLanguage} translations, that you need to fill and send back to me.
${JSON.stringify(targetLanguageBatch, null, 2)}

Keep the object keys identical, some object values are empty string, please fill just them.
respond using an unique JSON object without any comments or any other descriptions.

${getFixedWordPrompt(targetLanguage)}
`;
};
