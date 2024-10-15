import { describe, it, expect, vi } from "vitest";
import { generatePrompt } from "./generatePrompt";
import { getFixedWordPrompt } from "./getFixedWordPrompt";

vi.mock("./getFixedWordPrompt");

describe("generatePrompt", () => {
  it("should generate a correct prompt for translation", () => {
    const mockFixedWordPrompt = "Mock fixed word prompt";
    vi.mocked(getFixedWordPrompt).mockReturnValue(mockFixedWordPrompt);

    const targetLanguage = "Spanish";
    const mainLanguage = "English";
    const mainLanguageBatch = {
      hello: "Hello",
      world: "World",
    };
    const targetLanguageBatch = {
      hello: "",
      world: "",
    };

    const result = generatePrompt({
      targetLanguage,
      targetLanguageBatch,
      mainLanguage,
      mainLanguageBatch,
    });

    expect(result).toContain(
      `I'm working on internationalizing my application.`
    );
    expect(result).toContain(
      `I've created a json with ${mainLanguage} translations and I need your help to translate it to ${targetLanguage}.`
    );
    expect(result).toContain(JSON.stringify(mainLanguageBatch, null, 2));
    expect(result).toContain(JSON.stringify(targetLanguageBatch, null, 2));
    expect(result).toContain(
      "Keep the object keys identical, some object values are empty string, please fill just them."
    );
    expect(result).toContain(
      "respond using an unique JSON object without any comments or any other descriptions."
    );
    expect(result).toContain(mockFixedWordPrompt);

    expect(getFixedWordPrompt).toHaveBeenCalledWith(targetLanguage);
  });
});
