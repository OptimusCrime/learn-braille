// Man webpack is dumb. I could not figure out how build this during transpiling, so here we are...
const fs = require('fs');

const files = [
  './lists/nsf2022.txt',
  './lists/ordliste_gamle_norske_fornavn.txt',
  './lists/ordliste_passord_topp_125.txt',
  './lists/ordliste_ssb_norske_etternavn.txt',
  './lists/ordliste_ssb_norske_fornavn.txt',
];

const isValid = (input) => input.length > 1;

const main = () => {
  const map = new Map();

  for (const file of files) {
    const contents = fs.readFileSync(file, 'utf-8');
    const lines = contents.split(/\r?\n/);

    for (const line of lines) {
      // O(1) bby
      if (isValid(line) && !map.has(line)) {
        map.set(line, true);
      }
    }
  }

  const words = Array.from(map.keys());

  fs.writeFileSync('./output/words.json', JSON.stringify({ words: words}));
  console.log(words.length);
}

main();
