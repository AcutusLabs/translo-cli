import { describe, it, expect, vi } from "vitest";
import { splitObjectIntoBatches } from "./splitObjectIntoBatches";
import { getConfig } from "./getConfig";
import { Config, KeyValueObject } from "../types";

vi.mock("./getConfig");

describe("splitObjectIntoBatches", () => {
  it("should split an object into batches of the specified size", () => {
    const mockConfig = { batchSize: 2 };
    vi.mocked(getConfig).mockReturnValue(mockConfig as Config);

    const inputObject: KeyValueObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
      key4: "value4",
      key5: "value5",
    };

    const result = splitObjectIntoBatches(inputObject);

    expect(result).toEqual([
      { key1: "value1", key2: "value2" },
      { key3: "value3", key4: "value4" },
      { key5: "value5" },
    ]);
  });

  it("should return an array with a single object if input is smaller than batch size", () => {
    const mockConfig = { batchSize: 5 };
    vi.mocked(getConfig).mockReturnValue(mockConfig as Config);

    const inputObject: KeyValueObject = {
      key1: "value1",
      key2: "value2",
    };

    const result = splitObjectIntoBatches(inputObject);

    expect(result).toEqual([{ key1: "value1", key2: "value2" }]);
  });

  it("should return an empty array if input object is empty", () => {
    const mockConfig = { batchSize: 3 };
    vi.mocked(getConfig).mockReturnValue(mockConfig as Config);

    const inputObject: KeyValueObject = {};

    const result = splitObjectIntoBatches(inputObject);

    expect(result).toEqual([]);
  });

  it("should handle batch size of 1", () => {
    const mockConfig = { batchSize: 1 };
    vi.mocked(getConfig).mockReturnValue(mockConfig as Config);

    const inputObject: KeyValueObject = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    const result = splitObjectIntoBatches(inputObject);

    expect(result).toEqual([
      { key1: "value1" },
      { key2: "value2" },
      { key3: "value3" },
    ]);
  });
});
