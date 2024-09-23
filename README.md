# Translo-Cli

Translo-Cli is an open-source library designed to help you translate your i18n files using OpenAI's ChatGPT. This tool reads your main language translation file and generates translations for other specified languages.

## Features

- Automatically translates i18n files using OpenAI's ChatGPT.
- Supports multiple languages.
- Allows for fixed words that should not be translated.
- Sorts translation files alphabetically.

## Installation

```bash
yarn add translo-cli
```

## Usage

Before running the command, you need to set the correct translation path in the `translo.config.json` file.
To run the translation process, use the following command:

```bash
OPENAI_API_KEY="your openai key here" translo-cli
```

This command will read the main language translation file, generate translations for the specified languages, and save the translated files in the specified path.

## Configuration

The library uses a configuration file named `translo.config.json`. If this file is not found, it will use the default configuration. The configuration includes the following properties:

- `translationPath`: The path to the folder containing the translation files.
- `languages`: An array of languages to generate translations for.
- `fixedWords`: An object containing words that should not be translated.
- `mainLanguage`: The main language of the application from which the translations are derived.
- `sortMainLanguageFileAlphabetically`: Whether to sort the main language file alphabetically.
- `sortTargetLanguageFilesAlphabetically`: Whether to sort the target language files alphabetically.

Example configuration:

```json
{
  "translationPath": "./languages",
  "languages": [
    { "name": "English", "code": "en" },
    { "name": "German", "code": "de" },
    { "name": "Italian", "code": "it" },
    { "name": "French", "code": "fr" },
    { "name": "Spanish", "code": "es" },
    { "name": "Chinese", "code": "zh" },
    { "name": "Japanese", "code": "ja" }
  ],
  "fixedWords": {},
  "mainLanguage": "en",
  "sortMainLanguageFileAlphabetically": true,
  "sortTargetLanguageFilesAlphabetically": true
}
```

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
git clone https://github.com/AcutusLabs/translo-cli.git
cd translo-cli
bun watch # to compile the project
npm link # to create a global link to the project
```

then you can use the library in your project

Feel free to explore the code and understand how the library works. Happy translating!
