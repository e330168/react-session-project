import type { Session } from "../store/redux-session/SessionsType";

export function searchSessions(sessions: Session[], query: string) {
  if(!query.trim()){
    return sessions;
  }

  return sessions.filter((session) =>
    session.title.toLowerCase().includes(query.toLowerCase())
  );
}