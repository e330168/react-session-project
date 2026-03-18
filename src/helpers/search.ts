import type { Session } from "../store/SessionsType";

export function searchSessions(sessions: Session[], query: string) {
  if(query.length==0 || !query.trim()){
    return sessions;
  }

  return sessions.filter((session) =>
    session.title.toLowerCase().includes(query.toLowerCase())
  );
}