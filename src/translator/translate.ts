import {
  BRAILLE,
  isLetterKey,
  isSignKey,
  SYMBOLS,
  SYMBOLS_LETTERS,
  SYMBOLS_SIGNS,
  SYMBOLS_SPECIAL,
  SYMBOLS_SPECIAL_CAPITAL_LETTER,
  SYMBOLS_SPECIAL_SPACE,
  SYMBOLS_SPECIAL_UNKNOWN,
} from '../symbols';
import { BrailleNotFoundException, UnexpectedCharacterException } from './errors';
import { StringIterator } from './stringIterator';

export const translate = (input: string, ignoreError?: boolean): BRAILLE[] => {
  const it = new StringIterator(input);

  const output: BRAILLE[] = [];

  while (it.hasNext()) {
    if (isSpace(it)) {
      output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_SPACE]);
      it.goForwards();
      continue;
    }

    if (isDoubleDash(it)) {
      output.push(...SYMBOLS[SYMBOLS_SIGNS]['--']);
      it.goForwards(2);
      continue;
    }

    if (isUpperCase(it)) {
      output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_CAPITAL_LETTER]);

      const lowerCaseLetter = it.get().toLowerCase();
      if (!isLetterKey(lowerCaseLetter)) {
        if (ignoreError) {
          output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
          it.goForwards();
          continue;
        }

        throw new BrailleNotFoundException(`Could not find braille symbol for: "${lowerCaseLetter}"`);
      }

      output.push(...SYMBOLS[SYMBOLS_LETTERS][lowerCaseLetter]);

      it.goForwards();
      continue;
    }

    if (isLowerCase(it)) {
      const letter = it.get();
      if (!isLetterKey(letter)) {
        if (ignoreError) {
          output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
          it.goForwards();
          continue;
        }

        throw new BrailleNotFoundException(`Could not find braille symbol for: "${letter}"`);
      }

      output.push(...SYMBOLS[SYMBOLS_LETTERS][letter]);

      it.goForwards();
      continue;
    }

    if (isSign(it)) {
      output.push(...SYMBOLS[SYMBOLS_SIGNS][it.get()]);

      it.goForwards();
      continue;
    }

    if (isNumber(it)) {
      if (ignoreError) {
        output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
        it.goForwards();
        continue;
      }

      // Bah, do this later
      // TODO
      output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
      it.goForwards();
      continue;

      // throw new Error('Translating numbers has not yet been implemented');
    }

    // If we got here, we found an unexpected character
    if (ignoreError) {
      output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
      it.goForwards();
      continue;
    }

    // TODO
    output.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
    it.goForwards();

    throw new UnexpectedCharacterException(`Encountered character we do not know how to handle: ${it.get()}`);
  }

  return output;
};

const isSpace = (it: StringIterator): boolean => it.get() === ' ';
const isDoubleDash = (it: StringIterator): boolean => it.get() === '-' && it.hasNext() && it.get(1) === '-';
const isUpperCase = (it: StringIterator): boolean => it.get() !== it.get().toLowerCase();
const isLowerCase = (it: StringIterator): boolean => it.get() !== it.get().toUpperCase();
const isSign = (it: StringIterator): boolean => isSignKey(it.get());
const isNumber = (it: StringIterator): boolean => /[0-9]/.test(it.get());
