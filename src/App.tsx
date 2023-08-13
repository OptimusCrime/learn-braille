import React from 'react';

import {BrailleSymbol, BrailleSymbolSpace} from "./components/BrailleSymbol";
import {decode} from "./decoder";
import {translate} from "./translator";

export const App = () => {
  const input = 'Thomas';
  const translated = translate(input);
  return (
    <>
      <p>Hello world</p>
      <p>{input}</p>
      <div className="flex">
        {translated.map(word => {
          const decoded = decode(word);

          // Special handling for spaces
          if (decoded.every(value => !value)) {
            return (
              <BrailleSymbolSpace />
            );
          }

          return (
            <BrailleSymbol input={decoded} />
          );
        })}
      </div>
    </>
  )
};
