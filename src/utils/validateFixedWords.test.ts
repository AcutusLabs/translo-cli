import { describe, it, expect } from "vitest";
import { validateFixedWords } from "./validateFixedWords";

describe("validateFixedWords", () => {
  it("should not throw an error for valid fixedWords", () => {
    const validFixedWords = {
      en: {
        hello: "Hello",
        world: "World",
      },
      fr: {
        bonjour: "Bonjour",
        monde: "Monde",
      },
    };

    expect(() => validateFixedWords(validFixedWords)).not.toThrow();
  });

  it("should not throw an error for undefined fixedWords", () => {
    expect(() => validateFixedWords(undefined)).not.toThrow();
  });

  it("should throw an error if fixedWords is not an object", () => {
    expect(() => validateFixedWords("not an object")).toThrow(
      "The fixedWords property must be an object."
    );
  });

  it("should throw an error if language code value is not an object", () => {
    const invalidFixedWords = {
      en: "not an object",
    };

    expect(() => validateFixedWords(invalidFixedWords)).toThrow(
      "The fixedWords property must be an object."
    );
  });

  it("should throw an error if a fixed word is not a string", () => {
    const invalidFixedWords = {
      en: {
        hello: 123,
      },
    };

    expect(() => validateFixedWords(invalidFixedWords)).toThrow(
      "Each fixed word must be a string."
    );
  });
});
