// This will verify each letter guessed, because some letters and characters can correspond to multiple braille symbols
import { translate } from '../../../translator';
import { BRAILLE } from '../../../symbols';

interface VerifyCorrectSymbolsResponse {
  symbol: BRAILLE;
  correct: boolean;
}

export const verifyCorrectSymbols = (params: { correct: string; answer: string }): VerifyCorrectSymbolsResponse[] => {
  const { correct, answer } = params;

  const output: VerifyCorrectSymbolsResponse[] = [];

  const correctTranslated = translate(correct);
  const answerTranslated = translate(answer);
  const answerTranslatedLength = answerTranslated.length;

  for (let i = 0; i < correctTranslated.length; i++) {
    if (i > answerTranslatedLength) {
      output.push({
        symbol: correctTranslated[i],
        correct: false,
      });
      continue;
    }

    output.push({
      symbol: correctTranslated[i],
      correct: correctTranslated[i] === answerTranslated[i],
    });
  }

  return output;
};
