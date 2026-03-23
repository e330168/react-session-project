import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { BookedSession, Session } from "./SessionsType";

type SessionState = {
  upcomingSessions: BookedSession[];
};

const initialState: SessionState = {
  upcomingSessions: [],
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {

      bookSession: (
        state,
        action: PayloadAction<{
          session: Session;
          userName: string;
          userEmail: string;
        }>
      ) => {
        const exists = state.upcomingSessions.some(
          (s) => s.id === action.payload.session.id
        );

        if (exists) return;

        state.upcomingSessions.push({
          ...action.payload.session,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        });
      },

      cancelSession: (state, action: PayloadAction<string>) => {
        state.upcomingSessions = state.upcomingSessions.filter(
          (s) => s.id !== action.payload
        );
      },
  },
});

export const { bookSession, cancelSession } = sessionsSlice.actions;

export default sessionsSlice.reducer;
    