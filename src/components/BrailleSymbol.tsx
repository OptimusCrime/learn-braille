import React from 'react';
import {DecodeResponseType} from "../types";

const BrailleSymbolRow = ({ children, padding }: { children: React.ReactNode; padding?: boolean }) => (
  <div className={`${padding ? 'pb-1' : ''} flex items-center justify-between`}>{children}</div>
);

const BrailleDot = ({ enabled, padding }: { enabled: boolean; padding?: boolean }) => (
  <div className={`${padding ? 'ml-1' : ''} flex w-6 h-6 items-center justify-center`}>
    <div className={`${enabled ? 'w-4' : 'w-2'} ${enabled ? 'h-4' : 'h-2'} bg-black rounded-full`} />
  </div>
);

interface BrailleSymbolProps {
  input: DecodeResponseType;
  error: boolean | null;
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
export const BrailleSymbol = ({ input, error, text }: BrailleSymbolProps) => (
  <div>
    <div
      className={`flex flex-col items-center justify-center mr-2 rounded ${
        error === null ? '' : error ? 'bg-red-500' : 'bg-green-600'
      }`}
    >
      <BrailleSymbolRow padding={true}>
        <BrailleDot enabled={input[0]} />
        <BrailleDot enabled={input[3]} padding={true} />
      </BrailleSymbolRow>
      <BrailleSymbolRow padding={true}>
        <BrailleDot enabled={input[1]} />
        <BrailleDot enabled={input[4]} padding={true} />
      </BrailleSymbolRow>
      <BrailleSymbolRow>
        <BrailleDot enabled={input[2]} />
        <BrailleDot enabled={input[5]} padding={true} />
      </BrailleSymbolRow>
    </div>
    {text && (
      <div className="text-center"
      >
        {text}
      </div>
    )}
  </div>
);

export const BrailleSymbolSpace = () => <div className="flex w-6"></div>;
