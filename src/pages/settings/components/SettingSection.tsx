import React from 'react';

import { BrailleSymbol } from '../../../components';
import { translate } from '../../../translator';
import { SettingData } from '../../../utilities';

interface SettingsSectionProps {
  symbols: string[];
  heading: string;
  settings: SettingData[];
  setSettings: React.Dispatch<React.SetStateAction<SettingData[]>>;
}

export const SettingsSection = ({ symbols, heading, settings, setSettings }: SettingsSectionProps) => (
  <div className="flex flex-col">
    <div className="prose">
      <h3 className="m-4">{heading}</h3>
    </div>
    <ul className="flex flex-wrap">
      {symbols.map((symbol) => {
        const highlight = settings.find((item) => item.character === symbol);

        return (
          <div
            className="pr-8 pb-8 cursor-pointer"
            onClick={() => {
              const inSettings = settings.find((item) => item.character === symbol);
              if (!inSettings) {
                return setSettings((prevState) => [...prevState, { character: symbol, mode: 'include' }]);
              }
              if (inSettings.mode === 'include') {
                return setSettings((prevState) => [
                  ...prevState.filter((item) => item.character !== symbol),
                  {
                    character: symbol,
                    mode: 'require',
                  },
                ]);
              }

              return setSettings((prevState) => [...prevState.filter((item) => item.character !== symbol)]);
            }}
          >
            <BrailleSymbol
              input={translate(symbol)[0]}
              highlight={!highlight ? 'failure' : highlight.mode === 'include' ? 'success' : 'require'}
              text={symbol}
            />
          </div>
        );
      })}
    </ul>
  </div>
);
