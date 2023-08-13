import {
  SYMBOLS_LETTERS,
  SYMBOLS_NUMBERS,
  SYMBOLS_SIGNS,
  SYMBOLS_SPECIAL,
  SYMBOLS_SPECIAL_CAPITAL_LETTER,
  SYMBOLS_SPECIAL_NUMBER_START,
  SYMBOLS_SPECIAL_SPACE
} from "./consts";
import {LETTERS, NUMBERS, SIGNS} from "./keys";

export type BRAILLE = number;

export interface SymbolsInterface {
  [SYMBOLS_LETTERS]: {
    [key in typeof LETTERS[number]]: BRAILLE[];
  }
  [SYMBOLS_SIGNS]: {
    [key in typeof SIGNS[number]]: BRAILLE[];
  }
  [SYMBOLS_NUMBERS]: {
    [key in typeof NUMBERS[number]]: BRAILLE[];
  }
  [SYMBOLS_SPECIAL]: {
    [SYMBOLS_SPECIAL_CAPITAL_LETTER]: BRAILLE[];
    [SYMBOLS_SPECIAL_NUMBER_START]:   BRAILLE[];
    [SYMBOLS_SPECIAL_SPACE]: BRAILLE[];
  }
}
