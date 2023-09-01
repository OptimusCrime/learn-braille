interface VerifyCorrectAnswerResponse {
  character: string;
  correct: boolean;
  underline?: true;
}

// Guess this function could have been written a little bit prettier
export const verifyCorrectAnswer = (params: { correct: string; answer: string }): VerifyCorrectAnswerResponse[] => {
  const { correct, answer } = params;

  const output: VerifyCorrectAnswerResponse[] = [];

  const answerLength = answer.length;
  const correctLength = correct.length;

  for (let i = 0; i < Math.max(answerLength, correctLength); i++) {
    if (i > answerLength - 1) {
      // We did not answer the correct length of the word
      output.push({
        character: correct[i],
        correct: false,
        underline: true,
      });

      continue;
    }
    if (i > correctLength - 1) {
      // We answered more letter than the correct word
      output.push({
        character: answer[i],
        correct: false,
        underline: true,
      });

      continue;
    }

    const answerLetter = answer[i];

    if (correct[i] === answerLetter) {
      output.push({
        character: answerLetter,
        correct: true,
      });

      continue;
    }

    output.push({
      character: correct[i],
      correct: false,
    });
  }

  return output;
};
