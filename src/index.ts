#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { KeyValueObject } from "./types";
import {
  askChatGpt,
  generatePrompt,
  getConfig,
  getLanguagesToBeGenerated,
  splitObjectIntoBatches,
} from "./utils";
import { getExistingTranslationsFromLanguage } from "./utils/getExistingTranslationsFromLanguage";

const translate = async () => {
  const config = getConfig();
  const data = readFileSync(`${config.translationPath}/en.json`, "utf8");
  const en = JSON.parse(data);

  const languagesToGenerate = getLanguagesToBeGenerated();
  languagesToGenerate.forEach(async (language) => {
    let languageTranslations = getExistingTranslationsFromLanguage(language);

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
    const promises = batches.map(async (languageBatch, index) => {
      console.log(
        `Generating translations for batch ${index + 1} for language "${
          language.name
        }"`
      );
      const englishBatch = Object.keys(languageBatch).reduce((acc, key) => {
        acc[key] = en[key];
        return acc;
      }, {} as KeyValueObject);

      return askChatGpt(
        generatePrompt({
          language: language.name,
          languageBatch,
          englishBatch,
        })
      );
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
