import { KeyValueObject } from "../types";
import { getFixedWordPrompt } from "./getFixedWordPrompt";

/**
 * Generate a prompt for the user to fill in translations for a batch of words
 * @param language The language to generate the prompt for
 * @param batch The batch of words to generate the prompt for
 * @returns The prompt to use for the batch
 */
export const generatePrompt = (language: string, batch: KeyValueObject) => {
  return `
I'm working on internationalizing my application. 
I will send you a json object with the translations from English to ${language}.
Keep the object keys identical, some object values are empty string, please fill just them.
respond using an unique JSON object without any comments or any other descriptions.

${getFixedWordPrompt(language)}

this is the JSON object with the translations:
${JSON.stringify(batch, null, 2)}
`;
};
