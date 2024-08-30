import { getConfig } from "./getConfig";

export const getLanguagesToBeGenerated = () => {
  const config = getConfig();
  return config.languages.filter((language) => language.code !== "en");
};
