import { getSettingsFromLocalStorage } from '../utilities';
import wordsPayload from './words.json';

// TODO
// const isLetter = (str: string): boolean => /[a-zæøåA-ZÆØÅ]/i.test(str);
// const randomChance = (percentage: number): boolean => (Math.random() * 100) < percentage;

export class WordListContainer {
  private readonly lookup: string[];
  private settings: string[] = [];
  private filtered: string[] = [];
  private filteredLength: number = 0;

  constructor() {
    this.lookup = wordsPayload.words;
  }

  applySettings() {
    this.settings = getSettingsFromLocalStorage();

    // There has got to be a better way of doing this lmao
    for (const word of this.lookup) {
      const letters = word.split('');
      let skip = false;
      for (const letter of letters) {
        if (!this.settings.includes(letter)) {
          skip = true;
          break;
        }

        if (skip) {
          break;
        }
      }

      if (!skip) {
        this.filtered.push(word);
      }
    }

    this.filteredLength = this.filtered.length;
  }

  getWordListSize(): number {
    return this.filteredLength;
  }

  getRandomWord(): string | null {
    if (this.filtered.length === 0) {
      return null;
    }

    // The word list does not include all the special characters, so we add them here with some randomness
    // TODO

    return this.filtered[Math.floor(Math.random() * this.filteredLength)];
  }
}
