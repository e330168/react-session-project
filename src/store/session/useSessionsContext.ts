import { useContext } from 'react';
import type { SessionContextValue } from './SessionsType';
import { SessionsContext } from './SessionsContext';

export function useSessionsContext(): SessionContextValue {
  const context = useContext(SessionsContext);

  if (!context) {
    throw new Error(
      'useSessionsContext must be used within a SessionsContextProvider'
    );
  }

  return context;
}