import React from "react";

import {DecodeResponseType} from "../decoder";

const BrailleSymbolRow = ({children, padding}: { children: React.ReactNode, padding?: boolean }) => (
  <div className={`${padding ? 'pb-1' : ''} flex items-center justify-between`}>
    {children}
  </div>
);

const BrailleDot = ({ enabled, padding }: { enabled: boolean; padding?: boolean }) => (
  <div className={`${padding ? 'ml-1' : ''} flex w-6 h-6 items-center justify-center`}>
    <div className={`${enabled ? 'w-4' : 'w-2'} ${enabled ? 'h-4' : 'h-2'} bg-black rounded-full`} />
  </div>
);

export const BrailleSymbol = ({ input }: { input: DecodeResponseType }) => (
  <div className="flex flex-col items-center justify-center mr-2">
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
);

export const BrailleSymbolSpace = () => (
  <div className="flex w-6"></div>
)
