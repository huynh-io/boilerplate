import { describe, it, expect } from "vitest";
import {
  snakeToCamel,
  camelToSnake,
  camelizeKeys,
  decamelizeKeys,
} from "./case-converter";

describe("snakeToCamel", () => {
  it("converts snake_case to camelCase", () => {
    expect(snakeToCamel("access_token")).toBe("accessToken");
  });

  it("converts multi-segment snake_case", () => {
    expect(snakeToCamel("deep_nested_key")).toBe("deepNestedKey");
  });

  it("returns single words unchanged", () => {
    expect(snakeToCamel("id")).toBe("id");
  });

  it("returns empty string unchanged", () => {
    expect(snakeToCamel("")).toBe("");
  });

  it("is idempotent on already camelCase strings", () => {
    expect(snakeToCamel("accessToken")).toBe("accessToken");
  });
});

describe("camelToSnake", () => {
  it("converts camelCase to snake_case", () => {
    expect(camelToSnake("accessToken")).toBe("access_token");
  });

  it("converts multi-word camelCase", () => {
    expect(camelToSnake("deepNestedKey")).toBe("deep_nested_key");
  });

  it("returns single words unchanged", () => {
    expect(camelToSnake("id")).toBe("id");
  });

  it("returns empty string unchanged", () => {
    expect(camelToSnake("")).toBe("");
  });

  it("is idempotent on already snake_case strings", () => {
    expect(camelToSnake("access_token")).toBe("access_token");
  });
});

describe("camelizeKeys", () => {
  it("converts top-level object keys", () => {
    expect(camelizeKeys({ access_token: "abc", user_id: 1 })).toEqual({
      accessToken: "abc",
      userId: 1,
    });
  });

  it("converts nested object keys", () => {
    expect(
      camelizeKeys({ user_data: { first_name: "John", last_name: "Doe" } })
    ).toEqual({ userData: { firstName: "John", lastName: "Doe" } });
  });

  it("converts keys inside arrays", () => {
    expect(
      camelizeKeys([{ item_name: "a" }, { item_name: "b" }])
    ).toEqual([{ itemName: "a" }, { itemName: "b" }]);
  });

  it("converts keys in nested arrays", () => {
    expect(
      camelizeKeys({ catalog_items: [{ item_id: 1 }, { item_id: 2 }] })
    ).toEqual({ catalogItems: [{ itemId: 1 }, { itemId: 2 }] });
  });

  it("passes through null", () => {
    expect(camelizeKeys(null)).toBeNull();
  });

  it("passes through undefined", () => {
    expect(camelizeKeys(undefined)).toBeUndefined();
  });

  it("passes through primitives", () => {
    expect(camelizeKeys("hello")).toBe("hello");
    expect(camelizeKeys(42)).toBe(42);
    expect(camelizeKeys(true)).toBe(true);
  });

  it("passes through Date objects without transforming", () => {
    const date = new Date("2026-01-01");
    expect(camelizeKeys(date)).toBe(date);
  });
});

describe("decamelizeKeys", () => {
  it("converts top-level object keys", () => {
    expect(decamelizeKeys({ accessToken: "abc", userId: 1 })).toEqual({
      access_token: "abc",
      user_id: 1,
    });
  });

  it("converts nested object keys", () => {
    expect(
      decamelizeKeys({ userData: { firstName: "John", lastName: "Doe" } })
    ).toEqual({ user_data: { first_name: "John", last_name: "Doe" } });
  });

  it("converts keys inside arrays", () => {
    expect(
      decamelizeKeys([{ itemName: "a" }, { itemName: "b" }])
    ).toEqual([{ item_name: "a" }, { item_name: "b" }]);
  });

  it("passes through null", () => {
    expect(decamelizeKeys(null)).toBeNull();
  });

  it("passes through primitives", () => {
    expect(decamelizeKeys("hello")).toBe("hello");
    expect(decamelizeKeys(42)).toBe(42);
  });
});
