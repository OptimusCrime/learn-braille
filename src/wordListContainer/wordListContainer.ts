import { SettingData } from '../utilities';
import wordsPayload from './words.json';

// TODO
// const isLetter = (str: string): boolean => /[a-zæøåA-ZÆØÅ]/i.test(str);
// const randomChance = (percentage: number): boolean => (Math.random() * 100) < percentage;

export class WordListContainer {
  private readonly lookup: string[];
  private settings: SettingData[] = [];
  private filtered: string[] = [];
  private filteredLength: number = 0;

  constructor() {
    this.lookup = wordsPayload.words;
  }

  async applySettings(settings: SettingData[]) {
    console.log(settings);
    this.settings = settings;

    // Remember to reset the list, dummy, otherwise you'll find all sort of weird bugs...
    this.filtered = [];

    const requiredSymbols = settings.filter((item) => item.mode === 'require');

    // There has got to be a better way of doing this lmao
    for (const word of this.lookup) {
      const letters = word.split('');
      let skip = false;
      for (const letter of letters) {
        const inSettings = this.settings.find((item) => item.character === letter);
        if (!inSettings) {
          skip = true;
          break;
        }

        if (skip) {
          break;
        }
      }

      if (!skip) {
        if (requiredSymbols.length === 0) {
          this.filtered.push(word);
        }

        if (WordListContainer.containsAllRequireSettings(word, requiredSymbols)) {
          this.filtered.push(word);
        }
      }
    }

    this.filteredLength = this.filtered.length;
    return true;
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

  private static containsAllRequireSettings(word: string, requiredSymbols: SettingData[]): boolean {
    for (const requiredSymbol of requiredSymbols) {
      if (!word.includes(requiredSymbol.character)) {
        return false;
      }
    }

    return true;
  }
}
