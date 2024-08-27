#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { KeyValueObject } from "./types";
import {
  askChatGpt,
  getFixedWordPrompt,
  languagesToGenerate,
  splitObjectIntoBatches,
} from "./utils";
import { getConfig } from "./utils/getConfig";

const generatePrompt = (language: string, batch: KeyValueObject) => {
  return `
I'm working on internationalizing my application. 
I will send you a json object with the translations from English to ${language}.
Keep the object keys identical, some object values are empty string, please fill just them.
respond using an unique JSON object without any comments or any other descriptions.

${getFixedWordPrompt(language)}

this is the JSON object with the translations:
${JSON.stringify(batch, null, 2)}
`;
};

const translate = async () => {
  const config = getConfig();
  const data = readFileSync(`${config.translationPath}/en.json`, "utf8");
  const en = JSON.parse(data);
  languagesToGenerate.forEach(async (language) => {
    // TODO: add back current translations
    // const languageTranslations = translations[language.code] || {}
    const languageTranslations = {} as KeyValueObject;
    // fill with missing en translations
    const missingTranslations = Object.keys(en).reduce((acc, key) => {
      if (!languageTranslations[key]) {
        acc[key] = "";
      }
      return acc;
    }, {} as KeyValueObject);

    if (Object.keys(missingTranslations).length === 0) {
      console.log(
        `Skipping: All translations for ${language.name} are already completed`
      );
      return;
    }

    console.log(`Generating translations for ${language.name}`);
    const batches = splitObjectIntoBatches(missingTranslations);
    const translatedBatches: KeyValueObject = languageTranslations;
    const promises = batches.map(async (batch, index) => {
      console.log(
        `Generating translations for batch ${index + 1} for language "${
          language.name
        }"`
      );
      return askChatGpt(generatePrompt(language.name, batch));
    });
    const results = await Promise.all(promises);
    results.forEach((result) => {
      Object.assign(translatedBatches, result);
    });
    writeFileSync(
      `${config.translationPath}/${language.code}.json`,
      JSON.stringify(translatedBatches, null, 2)
    );

    console.log(`Translations for ${language.name} generated`);
  });
};

translate();
