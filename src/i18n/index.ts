import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import eng from './eng';
import esp from './esp';

const resources = {
  esp: {
    translation: { ...esp },
  },
  eng: {
    translation: { ...eng },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'eng',
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
});

export { i18n, resources };
