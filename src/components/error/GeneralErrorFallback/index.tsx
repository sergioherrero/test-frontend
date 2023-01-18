import { Alert, AlertTitle, Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';
import { GeneralErrorFallbackProps } from './types';

const GeneralErrorFallback: FC<GeneralErrorFallbackProps> = ({ componentStack, error }) => {
  const { t } = useTranslation();
  return (
    <Alert className="error-container" flexDirection="column" status="error">
      <AlertTitle>{t('error.fallbackError.title')}</AlertTitle>
      <Card>
        <CardHeader>{error.message}</CardHeader>
        <CardBody>
          <code>
            <p>
              <strong>{t('error.fallbackError.error')}</strong>
              &#58;&nbsp;
              {error.message}
            </p>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              <strong>{t('error.fallbackError.stacktrace')}</strong>
              &#58;&nbsp;
              {componentStack}
            </p>
          </code>
        </CardBody>
        <CardFooter>
          {t('error.fallbackError.go')}
          &nbsp;
          <a href="/">{t('error.fallbackError.dashboard')}</a>
        </CardFooter>
      </Card>
    </Alert>
  );
};

export default GeneralErrorFallback;
