/**
 * Validates the fixedWords property.
 *
 * @param fixedWords The fixedWords property to validate.
 * @throws An error if the fixedWords property is invalid.
 *
 * @example
 * {
 *   it: {
 *     round: "round",
 *     screenshot: "screenshot",
 *   },
 * }
 */
export const validateFixedWords = (fixedWords: any) => {
  if (!fixedWords) {
    return;
  }

  if (typeof fixedWords !== "object") {
    throw new Error("The fixedWords property must be an object.");
  }

  Object.keys(fixedWords).forEach((languageCode) => {
    const words = fixedWords[languageCode];

    if (!words || typeof words !== "object") {
      throw new Error("The fixedWords property must be an object.");
    }

    Object.keys(words).forEach((key) => {
      if (typeof words[key] !== "string") {
        throw new Error("Each fixed word must be a string.");
      }
    });
  });
};
