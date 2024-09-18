export interface KeyValueObject {
  [key: string]: string;
}

export type FixedWords = {
  [language: string]: {
    [key: string]: string;
  };
};

export type Language = {
  name: string;
  code: string;
};

export type Config = {
  translationPath: string;
  languages: {
    name: string;
    code: string;
  }[];
  fixedWords: FixedWords;
  mainLanguage: string;
  sortMainLanguageFileAlphabetically: boolean;
  sortTargetLanguageFilesAlphabetically: boolean;
};
