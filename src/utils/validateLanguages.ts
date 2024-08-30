/**
 * Validates the languages array.
 *
 * @param languages The languages array to validate.
 * @throws An error if the languages array is invalid.
 */
export const validateLanguages = (languages: any) => {
  if (!languages || !Array.isArray(languages)) {
    throw new Error("The languages property must be an array.");
  }

  if (!languages.find((l) => l.code === "en")) {
    throw new Error("The languages array must contain English.");
  }

  languages.forEach((language: any) => {
    if (!language.name) {
      throw new Error("Each language must have a name property.");
    }

    if (!language.code) {
      throw new Error("Each language must have a code property.");
    }
  });
};
