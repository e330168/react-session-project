import { createContext } from 'react';
import type { SessionContextValue } from './SessionsType';

export const SessionsContext = createContext<SessionContextValue | null>(null);
