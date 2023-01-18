import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esp from './esp';

const resources = {
  esp: {
    translation: { ...esp },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'esp',
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });

export { i18n, resources };
