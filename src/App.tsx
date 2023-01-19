import React from 'react';
import { useQuery } from 'react-query';

import Routes from 'components/Routes';

import axiosInstance from 'config/axios';
import { useAppContext } from 'hooks/useAppContext';

const App = () => {
  const { loading } = useAppContext();
  const { isLoading, data } = useQuery('repoConfig', () =>
    axiosInstance.get('feature-flag/master'),
  );

  return (
    <main className="app">
      {isLoading && <div>LOADING CONFIG...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {loading ? (
        // TODO: Add loader component
        <div>LOADING...</div>
      ) : (
        <Routes />
      )}
    </main>
  );
};

export default App;
