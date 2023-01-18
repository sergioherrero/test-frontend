import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import config from 'config';
import axiosInstance from 'config/axios';
import { useAppContext } from 'hooks/useAppContext';
import LandingPage from 'pages/Landing';

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
        <Routes>
          <Route element={<LandingPage />} path={config.url.landing} />
        </Routes>
      )}
    </main>
  );
};

export default App;
