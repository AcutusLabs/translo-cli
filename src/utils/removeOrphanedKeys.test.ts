import { describe, it, expect } from "vitest";
import { removeOrphanedKeys } from "./removeOrphanedKeys";
import { KeyValueObject } from "../types";

describe("removeOrphanedKeys", () => {
  it("should remove keys from target that are not in main language", () => {
    const mainLanguageTranslations: KeyValueObject = {
      hello: "Hello",
      goodbye: "Goodbye",
      welcome: "Welcome",
    };

    const targetLanguageTranslations: KeyValueObject = {
      hello: "Hola",
      goodbye: "Adiós",
      welcome: "Bienvenido",
      extraKey: "Extra value",
      anotherOrphan: "Another orphan",
    };

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual({
      hello: "Hola",
      goodbye: "Adiós",
      welcome: "Bienvenido",
    });

    expect(result).not.toHaveProperty("extraKey");
    expect(result).not.toHaveProperty("anotherOrphan");
  });

  it("should return empty object when target has no matching keys", () => {
    const mainLanguageTranslations: KeyValueObject = {
      hello: "Hello",
      goodbye: "Goodbye",
    };

    const targetLanguageTranslations: KeyValueObject = {
      completely: "Completamente",
      different: "Diferente",
      keys: "Llaves",
    };

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual({});
  });

  it("should return all keys when target has only matching keys", () => {
    const mainLanguageTranslations: KeyValueObject = {
      hello: "Hello",
      goodbye: "Goodbye",
      welcome: "Welcome",
    };

    const targetLanguageTranslations: KeyValueObject = {
      hello: "Hola",
      goodbye: "Adiós",
      welcome: "Bienvenido",
    };

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual(targetLanguageTranslations);
  });

  it("should handle empty main language translations", () => {
    const mainLanguageTranslations: KeyValueObject = {};

    const targetLanguageTranslations: KeyValueObject = {
      hello: "Hola",
      goodbye: "Adiós",
    };

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual({});
  });

  it("should handle empty target language translations", () => {
    const mainLanguageTranslations: KeyValueObject = {
      hello: "Hello",
      goodbye: "Goodbye",
    };

    const targetLanguageTranslations: KeyValueObject = {};

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual({});
  });

  it("should handle both empty objects", () => {
    const mainLanguageTranslations: KeyValueObject = {};
    const targetLanguageTranslations: KeyValueObject = {};

    const result = removeOrphanedKeys(
      mainLanguageTranslations,
      targetLanguageTranslations
    );

    expect(result).toEqual({});
  });
});
