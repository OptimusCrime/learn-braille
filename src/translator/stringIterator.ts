// Because the symbol iterator was dumb
export class StringIterator {
  private readonly characters: string[];
  private readonly length: number;
  private index: number = 0;

  constructor(string: string) {
    const characters = string.split(''); // Not sure if this is the optimal way of doing this...
    this.characters = characters;
    this.length = characters.length;
  }

  hasNext() {
    return this.length >= (this.index + 1);
  }

  goForwards(steps?: number) {
    this.index = this.index + (steps ?? 1);
  }

  get(steps?: number) {
    return this.characters[this.index + (steps ?? 0)];
  }
}

