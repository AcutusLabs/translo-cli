import { OpenAIHelper } from "./OpenAiUtils";
import { getConfig } from "./getConfig";

/**
 * Sends a chat-based prompt to the OpenAI API and retrieves the response.
 * @param prompt The prompt to send to the OpenAI API.
 * @returns The response from the OpenAI API.
 */
export const askChatGpt = async (prompt: string) => {
  const config = getConfig();
  const openaiHelper = new OpenAIHelper({
    apiKey: process.env.OPENAI_API_KEY as string,
    dangerouslyAllowBrowser: true,
  });
  const { data } = await openaiHelper.askChatGPT({
    prompt,
    model: config.model,
  });
  return data;
};
