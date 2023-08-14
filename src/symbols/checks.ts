import { LETTERS, NUMBERS, SIGNS } from './keys';

export const isLetterKey = (input: string): input is typeof LETTERS[number] => LETTERS.includes(input);
export const isNumberKey = (input: string): input is typeof NUMBERS[number] => NUMBERS.includes(input);
export const isSignKey = (input: string): input is typeof SIGNS[number] => SIGNS.includes(input);
