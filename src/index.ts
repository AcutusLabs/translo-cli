#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { KeyValueObject } from "./types";
import {
  askChatGpt,
  generatePrompt,
  getConfig,
  splitObjectIntoBatches,
} from "./utils";
import { getExistingTranslationsFromLanguage } from "./utils/getExistingTranslationsFromLanguage";

/**
 * Main function to translate the translations from the main language to the other languages
 */
const translate = async () => {
  const {
    mainLanguage,
    translationPath,
    languages,
    sortMainLanguageFileAlphabetically,
    sortTargetLanguageFilesAlphabetically,
  } = getConfig();

  // read the main language translations
  const data = readFileSync(`${translationPath}/${mainLanguage}.json`, "utf8");
  let mainLanguageTranslations = JSON.parse(data);

  // sort the main language translations alphabetically
  if (sortMainLanguageFileAlphabetically) {
    mainLanguageTranslations = Object.keys(mainLanguageTranslations)
      .sort()
      .reduce((acc, key) => {
        acc[key] = mainLanguageTranslations[key];
        return acc;
      }, {} as KeyValueObject);
    writeFileSync(
      `${translationPath}/${mainLanguage}.json`,
      JSON.stringify(mainLanguageTranslations, null, 2)
    );
  }

  // get the languages to generate from the main language
  const languagesToGenerate = languages.filter(
    (language) => language.code !== mainLanguage
  );

  // generate translations for each language
  languagesToGenerate.forEach(async (language) => {
    // read the existing translations for the language from the file
    const languageTranslations = getExistingTranslationsFromLanguage(language);

    // get the missing translations from the main language
    const missingTranslations = Object.keys(mainLanguageTranslations).reduce(
      (acc, key) => {
        if (!languageTranslations[key]) {
          acc[key] = "";
        }
        return acc;
      },
      {} as KeyValueObject
    );

    // if all translations are already completed, skip the language
    if (Object.keys(missingTranslations).length === 0) {
      console.log(
        `Skipping: All translations for ${language.name} are already completed`
      );
      return;
    }

    console.log(`Generating translations for ${language.name}`);
    // split the missing translations into batches to avoid exceeding the OpenAI API limit
    const batches = splitObjectIntoBatches(missingTranslations);

    // create a new object to store the translated batches with the existing translations
    let newLanguageTranslations: KeyValueObject = languageTranslations;
    const promises = batches.map(async (languageBatch, index) => {
      console.log(
        `Generating translations for batch ${index + 1} for language "${
          language.name
        }"`
      );
      // get the batch to translate from the main language
      const mainLanguageBatch = Object.keys(languageBatch).reduce(
        (acc, key) => {
          acc[key] = mainLanguageTranslations[key];
          return acc;
        },
        {} as KeyValueObject
      );

      // generate the prompt to translate the batch and ask ChatGPT
      return askChatGpt(
        generatePrompt({
          mainLanguageBatch,
          mainLanguage,
          targetLanguage: language.name,
          targetLanguageBatch: languageBatch,
        })
      );
    });

    // wait for all the promises to resolve
    const results = await Promise.all(promises);

    // merge the results into the newLanguageTranslations object
    results.forEach((result) => {
      Object.assign(newLanguageTranslations, result);
    });

    // sort the newLanguageTranslations object alphabetically
    if (sortTargetLanguageFilesAlphabetically) {
      newLanguageTranslations = Object.keys(newLanguageTranslations)
        .sort()
        .reduce((acc, key) => {
          acc[key] = newLanguageTranslations[key];
          return acc;
        }, {} as KeyValueObject);
    }

    // write the newLanguageTranslations object to the file
    writeFileSync(
      `${translationPath}/${language.code}.json`,
      JSON.stringify(newLanguageTranslations, null, 2)
    );

    console.log(`Translations for ${language.name} completed`);
  });
};

translate();
