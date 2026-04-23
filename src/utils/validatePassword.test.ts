import { describe, expect, test } from "vitest";
import { validatePassword } from "@/utils/validatePassword";

describe("validatePassword", () => {
  test("should return error when password is too short", () => {
    const result = validatePassword("abc");
    expect(result).not.toBeNull();
  });

  test("should return error when password does not have numbers", () => {
    const result = validatePassword("abcefghi!");
    expect(result).not.toBeNull();
  });

  test("should return error when password does not have uppercase", () => {
    const result = validatePassword("abcefg123456!");
    expect(result).not.toBeNull();
  });

  test("should return error when password does not have special characters", () => {
    const result = validatePassword("abcefg123456");
    expect(result).not.toBeNull();
  });

  test("should return null when password is valid", () => {
    const result = validatePassword("Abcde12345!");
    expect(result).toBeNull();
  });
});
