type PropertySources = {
  name: string;
  source: {
    [key: string]: string;
  };
};

export type ConfigFeatureFlag = {
  name: string;
  profiles: string[];
  label: string;
  version: string;
  state: string;
  propertySources: PropertySources[];
};
