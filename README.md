# Translo-Cli

Translo-Cli is an open-source library designed to help you translate your i18n files using OpenAI's ChatGPT. This tool reads your main language translation file and generates translations for other specified languages.

## Features

- Automatically translates i18n files using OpenAI's ChatGPT.
- Supports multiple languages.
- Allows for fixed words that should not be translated.
- Sorts translation files alphabetically.

## Usage

Before running the command, you need to set the correct translation path in the `translo.config.json` file.
To run the translation process you have two options:

OPTION 1:

```bash
OPENAI_API_KEY="your openai key here" npx translo-cli@latest
```

OPTION 2:

install dotenv

```bash
npm install -g dotenv
```

add an .env file with your key

```bash
OPENAI_API_KEY="your openai key here"
```

and run

```bash
dotenv -e .env npx translo-cli@latest
```

This command will read the main language translation file, generate translations for the specified languages, and save the translated files in the specified path.

## Configuration

The library uses a configuration file named `translo.config.json`, in the root of the project. If this file is not found, it will use the default configuration. The configuration includes the following properties:

- `translationPath`: The path to the folder containing the translation files.
- `languages`: An array of languages to generate translations for.
- `fixedWords`: An object containing words that should use specific translations instead of being translated by AI. You can specify fixed words per language using the language code as the key, or use `"all"` to apply fixed words to all languages.
- `mainLanguage`: The main language of the application from which the translations are derived.
- `sortMainLanguageFileAlphabetically`: Whether to sort the main language file alphabetically.
- `sortTargetLanguageFilesAlphabetically`: Whether to sort the target language files alphabetically.
- `batchSize`: The number of keys to process in each request to the OpenAI API.
- `deleteOrphanedKeys`: Whether to delete keys in all languages that are not present in the main language file.
- `model`: The OpenAI model to use for translations.

Default configuration:

```json
{
  // The path to the folder containing the translation files.
  "translationPath": "./languages",
  // languages to generate, it must include english
  "languages": [
    {
      "name": "English",
      "code": "en"
    },
    {
      "name": "German",
      "code": "de"
    },
    {
      "name": "Italian",
      "code": "it"
    },
    {
      "name": "French",
      "code": "fr"
    },
    {
      "name": "Spanish",
      "code": "es"
    },
    {
      "name": "Chinese",
      "code": "zh"
    },
    {
      "name": "Japanese",
      "code": "ja"
    }
  ],
  // fixed words that should not be translated.
  // example:
  // {
  //    "all": {
  //      "Google": "Google", // company name
  //      "Google Maps": "Google Maps" // product name
  //    },
  //    "it": { // just for italian translations
  //      "Good morning": "Ciao", // instead of buongiorno
  //    }
  // }
  "fixedWords": {},
  // the main language of the application from which the translations are derived
  "mainLanguage": "en",
  // sort main language file alphabetically
  "sortMainLanguageFileAlphabetically": true,
  // sort target language files alphabetically
  "sortTargetLanguageFilesAlphabetically": true,
  // openai has a limit per request, so we need to split the object into batches
  // if the request is too large, the request will fail, if it fails, you can try to decrease the batch size
  "batchSize": 15,
  // delete keys in all languages that are not present in the main language file
  "deleteOrphanedKeys": true,
  // the OpenAI model to use for translations
  "model": "gpt-4.1"
}
```

### Fixed Words

The `fixedWords` configuration allows you to specify words that should use predetermined translations instead of being translated by AI. This is useful for:

- Brand names that should remain consistent across all languages
- Technical terms with specific translations
- Company-specific terminology

You can configure fixed words in two ways:

1. **Global fixed words (`"all"`)**: Apply to all target languages
2. **Language-specific fixed words**: Apply only to specific languages (using language codes)

In the example above:

- `"brand"` and `"company"` will use the same fixed translations ("MyBrand" and "MyCompany") in all languages
- `"hello"` will be translated as "hola" specifically in Spanish and "bonjour" specifically in French
- If the same word is defined both globally and for a specific language, the global translation takes precedence

## Example

Here is an example of how to use the library in your project:

1. Create a `translo.config.json` file in the root of your project with the desired configuration.
2. Place your main language translation file (e.g., `en.json`) in the specified `translationPath`.
3. Run the translation command.

## Contributing

We welcome contributions to improve this library. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Davide Carpini

Giacomo Materozzi

## Local Installation

To install the library, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/AcutusLabs/translo-cli.git # clone the repository
cd translo-cli
npx bun watch # to compile the project
npm link # to create a global link to the project
```

then you can install the local library in your project with

```bash
npm link translo-cli
```

Feel free to explore the code and understand how the library works. Happy translating!
