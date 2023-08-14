import {
  SYMBOLS_LETTERS, SYMBOLS_NUMBERS,
  SYMBOLS_SIGNS,
  SYMBOLS_SPECIAL,
  SYMBOLS_SPECIAL_CAPITAL_LETTER,
  SYMBOLS_SPECIAL_NUMBER_START,
  SYMBOLS_SPECIAL_SPACE, SYMBOLS_SPECIAL_UNKNOWN
} from "./consts";
import {SymbolsInterface} from "./types";

/**
 * All symbols consists of six dots which are either present or missing. They are most often structured like this:
 *   1  4
 *   2  5
 *   3  6
 *
 * In this file we encode all the valid symbols. The symbols are encoded as six bits (JavaScript stores
 * it as a 64-bit number or something behind the scenes, but we don't care about that). The bits are organized the same
 * way as the matrix above, where 1 indicates a present "bump", and a 0 indicates a missing "bump".
 *
 * Also note that there are some special characters, and that some characters are a collection of multiple brailles.
 */
export const SYMBOLS : SymbolsInterface = {
  [SYMBOLS_LETTERS]: {
    'a': [0b100000],
    'b': [0b110000],
    'c': [0b100100],
    'd': [0b100110],
    'e': [0b100010],
    'f': [0b110100],
    'g': [0b110110],
    'h': [0b110010],
    'i': [0b010100],
    'j': [0b010110],
    'k': [0b101000],
    'l': [0b111000],
    'm': [0b101100],
    'n': [0b101110],
    'o': [0b101010],
    'p': [0b111100],
    'q': [0b111110],
    'r': [0b111010],
    's': [0b011100],
    't': [0b011110],
    'u': [0b101001],
    'v': [0b111001],
    'w': [0b010111],
    'x': [0b101101],
    'y': [0b101111],
    'z': [0b101011],
    'æ': [0b001110],
    'ø': [0b010101],
    'å': [0b100001],
  },
  [SYMBOLS_SIGNS]: {
    '.': [0b001000],
    ',': [0b010000],
    ';': [0b011000],
    ':': [0b010010],
    '"': [0b010011],
    '?': [0b010001],
    '!': [0b011001],
    '(': [0b011001],
    ')': [0b001011],
    '-': [0b001001], // Regular dash
    '—': [0b111111, 0b001001, 0b001001, 0b111111], // Long dash
    '--': [0b111111, 0b000000, 0b001001, 0b001001, 0b000000, 0b111111], // Thought pause (thought dash)
    '/': [0b001100],
  },
  [SYMBOLS_NUMBERS]: {
    '1': [0b100000],
    '2': [0b110000],
    '3': [0b100100],
    '4': [0b100110],
    '5': [0b100010],
    '6': [0b110100],
    '7': [0b110110],
    '8': [0b110010],
    '9': [0b010100],
    '0': [0b010110],
  },
  [SYMBOLS_SPECIAL]: {
    [SYMBOLS_SPECIAL_CAPITAL_LETTER]: [0b000001],
    [SYMBOLS_SPECIAL_NUMBER_START]:   [0b001111],
    [SYMBOLS_SPECIAL_SPACE]: [0b000000], // Does not actually exist in symbols. Used to denote space
    [SYMBOLS_SPECIAL_UNKNOWN]: [0b111111] // Does not actually exist in symbols. Used to denote unknown character
  }
}
