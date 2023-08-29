import wordsPayload from './words.json';

const isLetter = (str: string): boolean => /[a-zæøåA-ZÆØÅ]/i.test(str);

const randomChance = (percentage: number): boolean => (Math.random() * 100) < percentage;

export class WordList {
  private readonly lookup: string[];
  private filtered: string[];


  constructor() {
    this.lookup = wordsPayload.words;
    this.filtered = [];
  }

  /**
   * There has got to be a better way of doing this...
   * @param settings
   */
  applySettings(settings: string[]): string[] {
    this.filtered = [];
    for (const word of this.lookup) {
      const letters = word.split('');
      let skip = false;
      for (const letter of letters) {
        if (!settings.includes(letter)) {
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

    return this.filtered;
  }

  /*
  getWord(): string {
    const randomWord = this.words[Math.floor(Math.random() * this.wordCount)];
    if (isLetter(randomWord) && randomChance(20)) {
      return `${randomWord.charAt(0).toUpperCase()}${randomWord.slice(1)}`;
    }

    return randomWord;
  }
  */
}
