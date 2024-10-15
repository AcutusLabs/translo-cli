import { describe, it, expect, vi } from "vitest";
import { getConfig, languages } from "./getConfig";
import { readFileSync } from "fs";

vi.mock("fs");

describe("getConfig", () => {
  it("should return default config when config file is not found", () => {
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error("File not found");
    });

    const config = getConfig();

    expect(config).toEqual({
      translationPath: "./languages",
      languages,
      fixedWords: {},
      mainLanguage: "en",
      sortMainLanguageFileAlphabetically: true,
      sortTargetLanguageFilesAlphabetically: true,
      batchSize: 15,
    });
  });

  it("should return merged config when config file is found", () => {
    const mockConfig = JSON.stringify({
      translationPath: "./custom-languages",
      mainLanguage: "fr",
      batchSize: 20,
    });

    vi.mocked(readFileSync).mockReturnValue(mockConfig);

    const config = getConfig();

    expect(config).toEqual({
      translationPath: "./custom-languages",
      languages,
      fixedWords: {},
      mainLanguage: "fr",
      sortMainLanguageFileAlphabetically: true,
      sortTargetLanguageFilesAlphabetically: true,
      batchSize: 20,
    });
  });
});
