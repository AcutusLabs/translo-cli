import { describe, it, expect, vi } from "vitest";
import { askChatGpt } from "./askChatGpt";
import { OpenAIHelper } from "./OpenAiUtils";

vi.mock("./OpenAiUtils");

describe("askChatGpt", () => {
  it("should send a prompt to OpenAI and return the response", async () => {
    const mockResponse = { data: "Mocked response from ChatGPT" };
    const mockAskChatGPT = vi.fn().mockResolvedValue(mockResponse);

    vi.mocked(OpenAIHelper).mockImplementation(
      () =>
        ({
          askChatGPT: mockAskChatGPT,
        } as any)
    );

    const prompt = "Test prompt";
    const result = await askChatGpt(prompt);

    expect(OpenAIHelper).toHaveBeenCalledWith({
      apiKey: undefined,
      dangerouslyAllowBrowser: true,
    });
    expect(mockAskChatGPT).toHaveBeenCalledWith({ prompt });
    expect(result).toBe(mockResponse.data);
  });
});
