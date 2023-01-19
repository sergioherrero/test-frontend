import React from 'react';

import { CollectionName } from 'model/enums/CollectionName';

import { ConfigFeatureFlag } from 'model/type/ConfigFeatureFlag';

import Routes from 'components/Routes';

import config from 'config';
import { useAppContext } from 'hooks/useAppContext';
import useFetch from 'hooks/useFetch';

const App = () => {
  const { loading } = useAppContext();
  const { data, isLoading } = useFetch<ConfigFeatureFlag>(
    CollectionName.room,
    config.api.config.getConfig,
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
