import { describe, it, expect, vi } from "vitest";
import { getFixedWordPrompt } from "./getFixedWordPrompt";
import { getConfig } from "./getConfig";
import { Config } from "../types";

vi.mock("./getConfig");

describe("getFixedWordPrompt", () => {
  it("should return an empty string when no fixed words are defined for the language", () => {
    vi.mocked(getConfig).mockReturnValue({ fixedWords: {} } as Config);

    const result = getFixedWordPrompt("en");

    expect(result).toBe("");
  });

  it("should return a formatted prompt when fixed words are defined for the language", () => {
    const mockConfig = {
      fixedWords: {
        en: {
          hello: "Hi",
          goodbye: "Bye",
        },
      },
    };
    vi.mocked(getConfig).mockReturnValue(mockConfig as unknown as Config);

    const result = getFixedWordPrompt("en");

    expect(result).toBe(
      "when translating the following words, please use the following translations (case insensitive):\n" +
        JSON.stringify(mockConfig.fixedWords.en, null, 2)
    );
  });

  it("should return an empty string for a language with no fixed words", () => {
    const mockConfig = {
      fixedWords: {
        en: {
          hello: "Hi",
        },
      },
    };
    vi.mocked(getConfig).mockReturnValue(mockConfig as unknown as Config);

    const result = getFixedWordPrompt("fr");

    expect(result).toBe("");
  });
});
