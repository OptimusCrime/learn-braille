import React, { useState } from 'react';

import { LETTERS, NUMBERS, SIGNS } from '../../symbols/keys';
import { getSettingsFromLocalStorage, saveSettingsInLocalStorage } from '../../utilities';
import { SettingsSection } from './components';

interface SettingsProps {
  goToGame: () => void;
}

const numberOfSymbolsSelectedForSection = (symbols: string[], settings: string[]): string =>
  `${symbols.filter((symbol) => settings.includes(symbol)).length} / ${symbols.length}`;

const sections: { symbols: string[]; heading: string }[] = [
  {
    symbols: LETTERS,
    heading: 'Letters',
  },
  {
    symbols: NUMBERS,
    heading: 'Numbers',
  },
  {
    symbols: SIGNS,
    heading: 'Signs',
  },
];

export const Settings = ({ goToGame }: SettingsProps) => {
  const [settings, setSettings] = useState<string[]>(getSettingsFromLocalStorage());

  return (
    <div className="flex justify-center flex-col w-full max-w-xl">
      <div className="prose">
        <h2>Toggle symbols</h2>
      </div>
      {sections.map(({ symbols, heading }) => (
        <SettingsSection
          key={heading}
          symbols={symbols}
          heading={`${heading} (${numberOfSymbolsSelectedForSection(symbols, settings)})`}
          settings={settings}
          setSettings={setSettings}
        />
      ))}
      <div className="flex justify-center">
        <button
          className="btn"
          onClick={() => {
            saveSettingsInLocalStorage(settings);
            goToGame();
          }}
        >
          Save settings
        </button>
      </div>
    </div>
  );
};