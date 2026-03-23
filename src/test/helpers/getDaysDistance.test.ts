import { describe, it, expect } from "vitest";
import { getDaysDistance } from "../../helpers/date";

describe("getDaysDistance", () => {

  it("should return positive for future date", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const result = getDaysDistance(futureDate);
    expect(result).toBeGreaterThan(0);
  });

  it("should return 0 for the actual date", () => {
    const today = new Date();
    const result = getDaysDistance(today);
    expect(result).toBe(0);
  });

  it("should return negative for past date", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 7);
    const result = getDaysDistance(pastDate);
    expect(result).toBeLessThan(0);
  });

});