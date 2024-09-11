import { KeyValueObject } from "../types";
import { getFixedWordPrompt } from "./getFixedWordPrompt";

/**
 * Generate a prompt for the user to fill in translations for a batch of words
 * in a specific language.
 * @param language The language to translate the words to.
 * @param languageBatch The batch of words to translate.
 * @param englishBatch The batch of English words to translate.
 * @returns The generated prompt.
 */
export const generatePrompt = ({
  language,
  languageBatch,
  englishBatch,
}: {
  language: string;
  languageBatch: KeyValueObject;
  englishBatch: KeyValueObject;
}) => {
  return `
I'm working on internationalizing my application.
I've created a json with English translations and I need your help to translate it to ${language}.
This is the json with English translations.

${JSON.stringify(englishBatch, null, 2)}

this is the json with ${language} translations, that you need to fill and send back to me.
${JSON.stringify(languageBatch, null, 2)}

Keep the object keys identical, some object values are empty string, please fill just them.
respond using an unique JSON object without any comments or any other descriptions.

${getFixedWordPrompt(language)}
`;
};
