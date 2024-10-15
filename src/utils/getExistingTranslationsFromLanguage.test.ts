import { describe, it, expect, vi, beforeEach } from "vitest";
import { getExistingTranslationsFromLanguage } from "./getExistingTranslationsFromLanguage";
import { readFileSync } from "fs";
import { getConfig } from "./getConfig";
import { Config } from "../types";

vi.mock("fs");
vi.mock("./getConfig");

describe("getExistingTranslationsFromLanguage", () => {
  const mockLanguage = { name: "English", code: "en" };
  const mockConfig = { translationPath: "./languages" };

  beforeEach(() => {
    vi.mocked(getConfig).mockReturnValue(mockConfig as Config);
  });

  it("should return existing translations when file exists", () => {
    const mockTranslations = { hello: "Hello", world: "World" };
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockTranslations));

    const result = getExistingTranslationsFromLanguage(mockLanguage);

    expect(result).toEqual(mockTranslations);
    expect(readFileSync).toHaveBeenCalledWith(
      `${mockConfig.translationPath}/${mockLanguage.code}.json`,
      "utf8"
    );
  });

  it("should return empty object and log warning when file doesn't exist", () => {
    vi.mocked(readFileSync).mockImplementation(() => {
      throw new Error("File not found");
    });
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = getExistingTranslationsFromLanguage(mockLanguage);

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      `WARNING: Translation file for ${mockLanguage.name} not found. Generating new file.`
    );
  });
});
