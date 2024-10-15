import { describe, it, expect } from "vitest";
import { validateLanguages } from "./validateLanguages";

describe("validateLanguages", () => {
  it("should not throw an error for valid languages array", () => {
    const validLanguages = [
      { name: "English", code: "en" },
      { name: "French", code: "fr" },
    ];
    expect(() => validateLanguages(validLanguages)).not.toThrow();
  });

  it("should throw an error if languages is not an array", () => {
    expect(() => validateLanguages("not an array")).toThrow(
      "The languages property must be an array."
    );
  });

  it("should throw an error if languages is undefined", () => {
    expect(() => validateLanguages(undefined)).toThrow(
      "The languages property must be an array."
    );
  });

  it("should throw an error if English is not included", () => {
    const languagesWithoutEnglish = [
      { name: "French", code: "fr" },
      { name: "German", code: "de" },
    ];
    expect(() => validateLanguages(languagesWithoutEnglish)).toThrow(
      "The languages array must contain English."
    );
  });

  it("should throw an error if a language is missing a name", () => {
    const languagesWithMissingName = [
      { name: "English", code: "en" },
      { code: "fr" },
    ];
    expect(() => validateLanguages(languagesWithMissingName)).toThrow(
      "Each language must have a name property."
    );
  });

  it("should throw an error if a language is missing a code", () => {
    const languagesWithMissingCode = [
      { name: "English", code: "en" },
      { name: "French" },
    ];
    expect(() => validateLanguages(languagesWithMissingCode)).toThrow(
      "Each language must have a code property."
    );
  });
});
