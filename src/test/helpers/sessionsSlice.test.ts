import { describe, it, expect } from "vitest";
import { sessions } from "..//mocks/sessions";
import sessionsReducer, { bookSession, cancelSession } from "../../store/redux-session/sessionsSlice";
import type { Session } from "../../store/redux-session/SessionsType";

describe("sessionsSlice", () => {
  const mockSession: Session = sessions[0];

  it("should add a session when booking", () => {
    const initialState = { upcomingSessions: [] };

    const action = bookSession({
      session: mockSession,
      userName: "am23",
      userEmail: "am23@gmail.com",
    });

    const state = sessionsReducer(initialState, action);

    expect(state.upcomingSessions.length).toBe(1);
    expect(state.upcomingSessions[0].userName).toBe("am23");
  });

  it("should not add duplicate sessions", () => {
    const initialState = {
      upcomingSessions: [
        { ...mockSession, userName: "am23", userEmail: "am23@gmail.com" },
      ],
    };

    const action = bookSession({
      session: mockSession,
      userName: "Jane",
      userEmail: "jane@test.com",
    });

    const state = sessionsReducer(initialState, action);

    expect(state.upcomingSessions.length).toBe(1);
  });

  it("should cancel a session", () => {
    const initialState = {
      upcomingSessions: [
        { ...mockSession, userName: "am23", userEmail: "am23@gmail.com" },
      ],
    };

    const action = cancelSession(mockSession.id);

    const state = sessionsReducer(initialState, action);

    expect(state.upcomingSessions.length).toBe(0);
  });
});