import React, { useState } from 'react';

import { Layout } from './components';
import { Pages } from './types';
import { Game, Settings } from './pages';

export const App = () => {
  const [page, setPage] = useState<Pages>(Pages.Game);

  const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <Layout setPage={setPage} page={page}>
      {children}
    </Layout>
  );

  switch (page) {
    case Pages.Settings:
      return (
        <AppWrapper>
          <Settings />
        </AppWrapper>
      );
    case Pages.Game:
    default:
      return (
        <AppWrapper>
          <Game />
        </AppWrapper>
      );
  }
};
