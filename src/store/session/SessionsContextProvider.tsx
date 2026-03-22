import { useReducer, type ReactNode } from "react";
import type { Session, SessionState, BookedSession } from "./SessionsType";
import { SessionsContext } from "./SessionsContext";

type BookSessionAction = {
  type: "BOOK_SESSION";
  session: Session;
  userName: string;
  userEmail: string;
};

type CancelSessionAction = {
  type: "CANCEL_SESSION";
  sessionId: string;
};

type SessionsAction = BookSessionAction | CancelSessionAction;


function sessionsReducer(state: SessionState, action: SessionsAction): SessionState {
  if (action.type === "BOOK_SESSION") {
    const exists = state.upcomingSessions.some(
      (session) => session.id === action.session.id
    );

    if (exists) return state;

    const bookedSession: BookedSession = {
      ...action.session,
      userName: action.userName,
      userEmail: action.userEmail,
    };

        return {
        upcomingSessions: state.upcomingSessions.concat(bookedSession),
        };
    }

    if (action.type === "CANCEL_SESSION") {
        return {
        upcomingSessions: state.upcomingSessions.filter(
            (session) => session.id !== action.sessionId
        ),
    };
  }

  return state;
}

export default function SessionsContextProvider({children}: {children: ReactNode}) {
  const [sessionsState, dispatch] = useReducer(sessionsReducer, {
    upcomingSessions: [] as BookedSession[],
  });

  function bookSession(
    session: Session,
    userName: string,
    userEmail: string
  ) {
        dispatch({
        type: "BOOK_SESSION",
        session,
        userName,
        userEmail,
        });
    }

    function cancelSession(sessionId: string) {
        dispatch({
        type: "CANCEL_SESSION",
        sessionId,
        });
    }

    const ctxValue = {
        upcomingSessions: sessionsState.upcomingSessions,
        bookSession,
        cancelSession,
    };

  return (
    <SessionsContext.Provider value={ctxValue}>
      {children}
    </SessionsContext.Provider>
  );
}