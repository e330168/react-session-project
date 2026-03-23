import { describe, it, expect } from "vitest";
import { sessions } from "../../test/mocks/sessions";
import { searchSessions } from "../../helpers/search";

describe("searchSessions with real-like sessions",() => {

  it("finds sessions with 'React' in the title", () => {
    const result = searchSessions(sessions, "React");
    expect(result).toHaveLength(3);
    expect(result.map(s => s.id)).toEqual(["sess01", "sess02", "sess03"]);
  });

  it("finds sessions with 'Debugging' in the title", () => {
    const result = searchSessions(sessions, "Debugging");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sess02");
  });

  it("returns all sessions for empty query", () => {
    const result = searchSessions(sessions, "");
    expect(result).toHaveLength(3);
  });

  it("returns all sessions for whitespace query", () => {
    const result = searchSessions(sessions, "   ");
    expect(result).toHaveLength(3);
  });

  it("returns empty if nothing matches", () => {
    const result = searchSessions(sessions, "Angular");
    expect(result).toHaveLength(0);
  });
});