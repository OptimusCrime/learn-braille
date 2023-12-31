import React from 'react';

import { LETTERS, NUMBERS, SIGNS } from '../../symbols/keys';
import { saveSettingsInLocalStorage, SettingData } from '../../utilities';
import { SettingsSection } from './components';

interface SettingsProps {
  goToGame: () => void;
  settings: SettingData[];
  setSettings: React.Dispatch<React.SetStateAction<SettingData[]>>;
}

const numberOfSymbolsSelectedForSection = (symbols: string[], settings: SettingData[]): string =>
  `${symbols.filter((symbol) => settings.find((item) => item.character === symbol)).length} / ${symbols.length}`;

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

export const Settings = (props: SettingsProps) => {
  const { settings, setSettings, goToGame } = props;

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
