import { readFileSync } from "fs";

const DEFAULT_CONFIG = {
  // The path to the folder containing the translation files.
  translationPath: "./languages",
};

/**
 * Retrieves the configuration object.
 *
 * @returns The configuration object containing the translation path and other properties.
 */
export const getConfig = () => {
  try {
    // TODO: check what other libraries are doing for config file location/reading
    const data = readFileSync(`translo.config.json`, "utf8");
    try {
      return {
        ...DEFAULT_CONFIG,
        ...JSON.parse(data),
      };
    } catch (e) {
      console.warn("Error reading config file:", e);
      return DEFAULT_CONFIG;
    }
  } catch (e) {
    console.warn("WARNING: Config file not found.");
    return DEFAULT_CONFIG;
  }
};
