import React from 'react';

import { BrailleSymbol } from '../../../components';
import { translate } from '../../../translator';

interface CurrentWordProps {
  word: string | null;
}

export const WordCurrent = ({ word }: CurrentWordProps) => {
  // Special handling for when no words could be select
  if (word === null) {
    return (
      <div className="prose mb-8">
        <p className="text-red-500">
          Found no words matching the symbols you have selected. Try to select some more :)
        </p>
      </div>
    );
  }

  const translated = translate(word);

  return (
    <>
      {translated.map((symbol) => (
        <BrailleSymbol input={symbol} />
      ))}
    </>
  );
};
