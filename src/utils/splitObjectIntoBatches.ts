import { KeyValueObject } from "../types";

// we need to split the object into batches because the OpenAI API has a limit per request
const BATCH_SIZE = 15;

/**
 * Splits an object into batches of a specific size.
 * @param data The object to split into batches
 * @returns An array of objects, each containing a batch of the original object
 */
export const splitObjectIntoBatches = (
  data: KeyValueObject
): KeyValueObject[] => {
  const entries = Object.entries(data);
  const batches: KeyValueObject[] = [];

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batchEntries = entries.slice(i, i + BATCH_SIZE);
    const batchObject: KeyValueObject = Object.fromEntries(batchEntries);
    batches.push(batchObject);
  }

  return batches;
};
