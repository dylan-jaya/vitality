import { describe, expect, it } from "vitest";
import { parseInRange } from "./parse";

describe("parseInRange", () => {
  it("parses numbers within range (inclusive)", () => {
    expect(parseInRange("70", 2, 400)).toBe(70);
    expect(parseInRange("70.5", 2, 400)).toBe(70.5);
    expect(parseInRange("2", 2, 400)).toBe(2);
    expect(parseInRange("400", 2, 400)).toBe(400);
  });

  it.each(["", "   ", "abc", "1", "401", "-5", "NaN", "Infinity"])("rejects %j", (raw) => {
    expect(parseInRange(raw, 2, 400)).toBeNull();
  });
});
