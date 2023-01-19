import React from 'react';
import { Route, Routes as RoutesWrapper } from 'react-router-dom';

import config from 'config';
import LandingPage from 'pages/Landing';

const Routes = () => (
  <RoutesWrapper>
    <Route element={<LandingPage />} path={config.url.landing} />
  </RoutesWrapper>
);

export default Routes;
