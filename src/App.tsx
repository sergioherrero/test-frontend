import React from 'react';

import Routes from 'components/Routes';

import { useAppContext } from 'hooks/useAppContext';

const App = () => {
  const { loading } = useAppContext();

  return (
    <main className="app">
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
