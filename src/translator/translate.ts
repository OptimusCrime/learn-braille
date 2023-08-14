import {
  BRAILLE, isLetterKey, isSignKey,
  SYMBOLS, SYMBOLS_LETTERS,
  SYMBOLS_SIGNS,
  SYMBOLS_SPECIAL,
  SYMBOLS_SPECIAL_CAPITAL_LETTER
} from "../symbols";
import {SYMBOLS_SPECIAL_UNKNOWN} from "../symbols/consts";
import {BrailleNotFoundException} from "./BrailleNotFoundException";
import {StringIterator} from "./stringIterator";
import {UnexpectedCharacterException} from "./UnexpectedCharacterException";

export const translate = (input: string, ignoreError?: boolean): BRAILLE[][] => {
  const it = new StringIterator(input);

  const output: BRAILLE[][] = [];
  let temporary: BRAILLE[] = [];

  while (it.hasNext()) {
    if (isSpace(it)) {
      output.push(temporary);
      temporary = [];
      it.goForwards();
      continue;
    }

    if (isDoubleDash(it)) {
      temporary.push(...SYMBOLS[SYMBOLS_SIGNS]['--']);
      it.goForwards(2);
      continue;
    }

    if (isUpperCase(it)) {
      temporary.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_CAPITAL_LETTER]);

      const lowerCaseLetter = it.get().toLowerCase();
      if (!isLetterKey(lowerCaseLetter)) {
        if (ignoreError) {
          temporary.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
          it.goForwards();
          continue;
        }

        throw new BrailleNotFoundException(`Could not find braille symbol for: "${lowerCaseLetter}"`);
      }

      temporary.push(...SYMBOLS[SYMBOLS_LETTERS][lowerCaseLetter]);

      it.goForwards();
      continue;
    }

    if (isLowerCase(it)) {
      const letter = it.get();
      if (!isLetterKey(letter)) {
        if (ignoreError) {
          temporary.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
          it.goForwards();
          continue;
        }

        throw new BrailleNotFoundException(`Could not find braille symbol for: "${letter}"`);
      }

      temporary.push(...SYMBOLS[SYMBOLS_LETTERS][letter]);

      it.goForwards();
      continue;
    }

    if (isSign(it)) {
      temporary.push(...SYMBOLS[SYMBOLS_SIGNS][it.get()]);

      it.goForwards();
      continue;
    }

    if (isNumber(it)) {
      if (ignoreError) {
        temporary.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
        it.goForwards();
        continue;
      }

      // Bah, do this later
      throw new Error('Translating numbers has not yet been implemented');
    }

    // If we got here, we found an unexpected character
    if (ignoreError) {
      temporary.push(...SYMBOLS[SYMBOLS_SPECIAL][SYMBOLS_SPECIAL_UNKNOWN]);
      it.goForwards();
      continue;
    }

    throw new UnexpectedCharacterException(`Encountered character we do not know how to handle: ${it.get()}`);
  }

  if (temporary.length > 0) {
    output.push(temporary);
  }

  return output;
}

const isSpace = (it: StringIterator): boolean => it.get() === ' ';
const isDoubleDash = (it: StringIterator): boolean => it.get() === '-' && it.hasNext() && it.get(1) === '-';
const isUpperCase = (it: StringIterator): boolean => it.get() !== it.get().toLowerCase();
const isLowerCase = (it: StringIterator): boolean => it.get() !== it.get().toUpperCase();
const isSign = (it: StringIterator): boolean => isSignKey(it.get());
const isNumber = (it: StringIterator): boolean => /[0-9]/.test(it.get());
