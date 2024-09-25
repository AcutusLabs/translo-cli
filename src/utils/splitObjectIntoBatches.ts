import { KeyValueObject } from "../types";
import { getConfig } from "./getConfig";

/**
 * Splits an object into batches of a specific size.
 * @param data The object to split into batches
 * @returns An array of objects, each containing a batch of the original object
 */
export const splitObjectIntoBatches = (
  data: KeyValueObject
): KeyValueObject[] => {
  const { batchSize } = getConfig();
  const entries = Object.entries(data);
  const batches: KeyValueObject[] = [];

  for (let i = 0; i < entries.length; i += batchSize) {
    const batchEntries = entries.slice(i, i + batchSize);
    const batchObject: KeyValueObject = Object.fromEntries(batchEntries);
    batches.push(batchObject);
  }

  return batches;
};
