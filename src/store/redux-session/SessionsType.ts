import type { ImageKey } from "../../pages/Sessions";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  image: ImageKey;
  duration: number;
  price?: number;
};

export type BookedSession = Session & {
  userName: string;
  userEmail: string;
};

export type SessionState = {
  upcomingSessions: BookedSession[];
};