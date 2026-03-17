export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: string;
  duration: number;
};

export type SessionState = {
  upcomingSessions: Session[];
};

export type SessionContextValue = SessionState & {
  bookSession: (session: Session) => void;
  cancelSession: (sessionId: string) => void;
};
