import { useContext, createContext } from 'react';

import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAppContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext must exist to call useAppContext');
  }
  return context;
};
