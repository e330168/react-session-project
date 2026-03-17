import { useContext } from 'react';
import { SessionsContext } from './SessionsContext';
import type { SessionContextValue } from './SessionsType';

export function useSessionsContext(): SessionContextValue {
  const context = useContext(SessionsContext);

  if (!context) {
    throw new Error(
      'useSessionsContext must be used within a SessionsContextProvider'
    );
  }

  return context;
}