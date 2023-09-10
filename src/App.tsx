import React, { useState } from 'react';

import { Layout } from './components';
import { Game, Settings } from './pages';
import { Pages } from './types';
import { getSettingsFromLocalStorage } from './utilities';

export const App = () => {
  const [page, setPage] = useState<Pages>(Pages.Game);
  const [settings, setSettings] = useState<string[]>(getSettingsFromLocalStorage());

  const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <Layout setPage={setPage} page={page}>
      {children}
    </Layout>
  );

  switch (page) {
    case Pages.Settings:
      return (
        <AppWrapper>
          <Settings goToGame={() => setPage(Pages.Game)} settings={settings} setSettings={setSettings} />
        </AppWrapper>
      );
    case Pages.Game:
    default:
      return (
        <AppWrapper>
          <Game settings={settings} />
        </AppWrapper>
      );
  }
};
