import { useReducer, type ReactNode } from "react";
import type { Session, SessionState } from "./SessionsType";
import { SessionsContext } from "./SessionsContext";

type BookSessionAction= {
  type: 'BOOK_SESSION';
  session: Session;
};

type CancelSessionAction= {
   type: 'CANCEL_SESSION';
   sessionId: string;
};

type SessionsAction = BookSessionAction | CancelSessionAction;

function sessionsReducer(state: SessionState, action: SessionsAction) {
    if (action.type === 'BOOK_SESSION') {
        const exists = state.upcomingSessions.some(
            (session) => session.id === action.session.id
        )
        if (exists) {
            return state;
        }

        return {
        upcomingSessions: state.upcomingSessions.concat(action.session)
        }
    }

    if(action.type === 'CANCEL_SESSION'){
        return{
            upcomingSessions: state.upcomingSessions.filter(
            (session)=> session.id !== action.sessionId
            )
        }
    }

  return state;
}

export default function SessionsContextProvider({children}: {children: ReactNode}) {
    const [sessionsState, dispatch] = useReducer(sessionsReducer, {
        upcomingSessions: [],
    });

    function bookSession(session: Session){
        dispatch({ type: 'BOOK_SESSION', session });
    }

    function cancelSession(sessionId: string){
        dispatch({ type: 'CANCEL_SESSION', sessionId });
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