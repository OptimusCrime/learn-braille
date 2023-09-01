import React from 'react';
import { BrailleSymbol } from '../../../components';
import { translate } from '../../../translator';

interface SettingsSectionProps {
  symbols: string[];
  heading: string;
  settings: string[];
  setSettings: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SettingsSection = ({ symbols, heading, settings, setSettings }: SettingsSectionProps) => (
  <div className="flex flex-col">
    <div className="prose">
      <h3 className="m-4">{heading}</h3>
    </div>
    <ul className="flex flex-wrap">
      {symbols.map((symbol) => (
        <div
          className="pr-8 pb-8 cursor-pointer"
          onClick={() => {
            if (settings.includes(symbol)) {
              // This is so dumb...
              setSettings((prevState) => [...prevState.filter((value) => value !== symbol)]);
            } else {
              setSettings((prevState) => [...prevState, symbol]);
            }
          }}
        >
          <BrailleSymbol
            input={translate(symbol)[0]}
            highlight={settings.includes(symbol) ? 'success' : 'failure'}
            text={symbol}
          />
        </div>
      ))}
    </ul>
  </div>
);
