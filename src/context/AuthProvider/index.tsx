import React, { useReducer, FC, useMemo } from 'react';

import { reducer, initialState } from 'reducers/appState';
import { DispatchTypes } from 'reducers/appState/types';

import { AuthContext } from 'hooks/useAppContext';

import { AuthProviderProps } from './types';

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(reducer, initialState);

  const setLoading = (isLoading: boolean) => {
    dispatchAuth({ type: DispatchTypes.SET_LOADING, payload: isLoading });
  };

  const value = useMemo(() => ({ ...auth, setLoading }), [auth, setLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
