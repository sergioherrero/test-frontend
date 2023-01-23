import { useMemo } from 'react';

import { CollectionName } from 'model/enums/CollectionName';

import { ConfigFeatureFlag } from 'model/types/ConfigFeatureFlag';

import config from 'config';
import useFetch from 'hooks/useFetch';

import { HasPermissionProps } from './types';

const HasPermission = ({ children, expectedValue, propName }: HasPermissionProps) => {
  const { data, isLoading } = useFetch<ConfigFeatureFlag>(
    CollectionName.room,
    config.api.config.getConfig,
  );

  const enabled = useMemo(
    () => data?.propertySources[0].source[propName] === expectedValue,
    [data, expectedValue, propName],
  );

  if (isLoading || !enabled) {
    return null;
  }

  return children;
};

export default HasPermission;
