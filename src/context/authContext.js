import { createContext, useContext } from 'react';

export const authContext = createContext();

export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

