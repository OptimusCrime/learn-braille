import React from 'react';
import { PreviousWordStateProps } from '../stateProps';
import { BrailleSymbol } from '../../../components';
import { SYMBOLS, SYMBOLS_LETTERS } from '../../../symbols';
import { verifyCorrectAnswer, verifyCorrectSymbols } from '../helpers';

interface WordPreviousProps {
  previousWord: PreviousWordStateProps | null;
}

interface WordPreviousCommonHidden {
  hidden: true;
}

interface WordPreviousCommonContent {
  correct: string;
  answer: string;
}

// Over engineering much??
type WordPreviousCommonProps = WordPreviousCommonHidden | WordPreviousCommonContent;
const propsIsWordPreviousCommonHidden = (props: WordPreviousCommonProps): props is WordPreviousCommonContent =>
  (props as WordPreviousCommonContent).correct !== undefined;

const WordPreviousBraille = (props: WordPreviousCommonProps) => {
  if (!propsIsWordPreviousCommonHidden(props)) {
    return (
      <div className="flex justify-center flex-row flex-wrap opacity-0">
        <BrailleSymbol input={SYMBOLS[SYMBOLS_LETTERS]['a'][0]} />
      </div>
    );
  }

  const { correct, answer } = props;

  const verifiedSymbols = verifyCorrectSymbols({
    correct: correct,
    answer: answer,
  });

  return (
    <div className="flex justify-center flex-row flex-wrap pacity-60'}">
      {verifiedSymbols.map((item) => (
        <BrailleSymbol input={item.symbol} highlight={item.correct ? 'success' : 'failure'} />
      ))}
    </div>
  );
};

const WordPreviousText = (props: WordPreviousCommonProps) => {
  if (!propsIsWordPreviousCommonHidden(props)) {
    return (
      <div className="flex justify-center mb-8 opacity-0">
        <p>Lorem ipsum</p>
      </div>
    );
  }

  const { correct, answer } = props;

  const verifiedAnswer = verifyCorrectAnswer({
    correct: correct,
    answer: answer,
  });

  return (
    <div className="flex justify-center mb-8 opacity-60">
      {verifiedAnswer.map((item) => {
        if (item.correct) {
          return <span className="text-green-600">{item.character}</span>;
        }

        return <span className={`text-red-500 ${item.underline ? 'underline' : ''}`}>{item.character}</span>;
      })}
    </div>
  );
};

export const WordPrevious = ({ previousWord }: WordPreviousProps) => {
  // Render an empty box to avoid the screen from jumping after the first guess
  if (previousWord === null) {
    return (
      <>
        <WordPreviousBraille hidden={true} />
        <WordPreviousText hidden={true} />
      </>
    );
  }

  return (
    <>
      <WordPreviousBraille correct={previousWord.correct} answer={previousWord.answer} />
      <WordPreviousText correct={previousWord.correct} answer={previousWord.answer} />
    </>
  );
};
