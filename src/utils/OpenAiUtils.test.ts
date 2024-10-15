import { describe, it, expect, vi, beforeEach } from "vitest";
import { OpenAIHelper, OpenAIHelperParams } from "./OpenAiUtils";
import OpenAI from "openai";

vi.mock("openai");

describe("OpenAIHelper", () => {
  const mockApiKey = "test-api-key";

  it("should throw an error if apiKey is not provided", () => {
    expect(() => new OpenAIHelper({} as any)).toThrow("apiKey is required");
  });

  it("should create an instance of OpenAI with the provided apiKey", () => {
    new OpenAIHelper({ apiKey: mockApiKey });
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: mockApiKey });
  });

  describe("askChatGPT", () => {
    let openAIHelper: OpenAIHelper;
    let mockOpenAI: any;

    beforeEach(() => {
      mockOpenAI = {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: "{}",
                  },
                },
              ],
            }),
          },
        },
      } as any;
      vi.mocked(OpenAI).mockReturnValue(mockOpenAI);
      openAIHelper = new OpenAIHelper({ apiKey: mockApiKey });
    });

    it("should call OpenAI chat completions with correct parameters", async () => {
      const params: OpenAIHelperParams = {
        prompt: "Test prompt",
        maxTokens: 100,
        model: "gpt-4",
      };

      await openAIHelper.askChatGPT(params);

      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
        model: "gpt-4",
        max_tokens: 100,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Test prompt",
              },
            ],
          },
        ],
      });
    });

    it("should use default model if not provided", async () => {
      const params: OpenAIHelperParams = {
        prompt: "Test prompt",
      };

      await openAIHelper.askChatGPT(params);

      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "gpt-4o",
        })
      );
    });

    it("should include images in the message if provided", async () => {
      const params: OpenAIHelperParams = {
        prompt: "Test prompt",
        images: ["image1.jpg", "image2.jpg"],
      };

      await openAIHelper.askChatGPT(params);

      expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Test prompt",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: "image1.jpg",
                  },
                },
                {
                  type: "image_url",
                  image_url: {
                    url: "image2.jpg",
                  },
                },
              ],
            },
          ],
        })
      );
    });

    it("should return the response from OpenAI", async () => {
      const mockResponse = {
        choices: [{ message: { content: '{ "test": "Test response" }' } }],
      };
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse as any);

      const params: OpenAIHelperParams = {
        prompt: "Test prompt",
      };

      const result = await openAIHelper.askChatGPT(params);

      expect(result).toEqual({
        ...mockResponse,
        data: { test: "Test response" },
      });
    });
  });
});
