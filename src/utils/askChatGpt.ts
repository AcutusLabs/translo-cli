import { OpenAIHelper } from "./OpenAiUtils";

/**
 * Sends a chat-based prompt to the OpenAI API and retrieves the response.
 * @param prompt The prompt to send to the OpenAI API.
 * @returns The response from the OpenAI API.
 */
export const askChatGpt = async (prompt: string) => {
  const openaiHelper = new OpenAIHelper({
    apiKey: process.env.OPENAI_API_KEY as string,
    dangerouslyAllowBrowser: true,
  });
  const { data } = await openaiHelper.askChatGPT({
    prompt,
  });
  return data;
};
