import React from 'react';
import { BRAILLE } from '../symbols';
import { convertToDots } from '../utilities';

const BrailleSymbolRow = ({ children, padding }: { children: React.ReactNode; padding?: boolean }) => (
  <div className={`${padding ? 'pb-1' : ''} flex items-center justify-between`}>{children}</div>
);

const BrailleDot = ({ enabled, padding }: { enabled: boolean; padding?: boolean }) => (
  <div className={`${padding ? 'ml-1' : ''} flex w-6 h-6 items-center justify-center`}>
    <div className={`${enabled ? 'w-4' : 'w-2'} ${enabled ? 'h-4' : 'h-2'} bg-black rounded-full`} />
  </div>
);

interface BrailleSymbolProps {
  input: BRAILLE;
  highlight?: 'success' | 'failure';
  text?: string;
}

/**
 * Component that renders the actual braille symbol, with any mistakes or correct guesses highlighted (if applicable).
 *
 * Note that the component read the input as it the Braille symbols are often transcribed, like this:
 *
 *  1  4
 *  2  5
 *  3  6
 *
 * @param input
 * @param error
 * @param text
 * @constructor
 */
export const BrailleSymbol = ({ input, highlight, text }: BrailleSymbolProps) => {
  const [dot1, dot2, dot3, dot4, dot5, dot6] = convertToDots(input);

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center mr-2 mb-4 rounded ${
          !highlight ? '' : highlight === 'failure' ? 'bg-red-500' : 'bg-green-600'
        }`}
      >
        <BrailleSymbolRow padding={true}>
          <BrailleDot enabled={dot1} />
          <BrailleDot enabled={dot4} padding={true} />
        </BrailleSymbolRow>
        <BrailleSymbolRow padding={true}>
          <BrailleDot enabled={dot2} />
          <BrailleDot enabled={dot5} padding={true} />
        </BrailleSymbolRow>
        <BrailleSymbolRow>
          <BrailleDot enabled={dot3} />
          <BrailleDot enabled={dot6} padding={true} />
        </BrailleSymbolRow>
      </div>
      {text && (
        <div className="text-center prose">
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};
