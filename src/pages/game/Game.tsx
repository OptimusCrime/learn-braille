import React, { useEffect, useState } from 'react';
import { WordListContainer } from '../../wordListContainer';
import { WordCurrent, StartGame, Stats, TextField, WordPrevious } from './components';
import { GuessesStateProps, PreviousWordStateProps } from './stateProps';
import { guessesInitialState } from './initialStates';
import { verifyCorrectSymbols } from './helpers';

const wordListContainer = new WordListContainer();

export const Game = () => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  // I don't really know if this works, but it is set after the wordlist has been filtered
  const [ready, setReady] = useState<boolean>(false);

  // Don't know if you are "allowed" to name state and set state like this in React \o,0/
  const [gameStarted, startGame] = useState<boolean>(false);

  // Allows for a more fluid clock with multiple updates every second
  const [clockStart, setClockStart] = useState<number>(0);
  const [clockNow, setClockNow] = useState<number>(0);

  const [guesses, setGuesses] = useState<GuessesStateProps>(guessesInitialState);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [previousWord, setPreviousWord] = useState<PreviousWordStateProps | null>(null);

  const startClock = () => {
    setClockStart(Date.now());
    setInterval(updateClock, 250);
  };

  const updateClock = () => {
    setClockNow(Date.now());
  };

  useEffect(() => {
    if (!gameStarted) {
      wordListContainer.applySettings();

      // Make the game playable after the wordlist has been loaded with applied filters
      setReady(true);
      setCurrentWord(wordListContainer.getRandomWord());
    }

    startClock();

    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();
  }, [gameStarted]);

  if (!gameStarted) {
    return <StartGame loaded={ready} startGame={() => startGame(true)} />;
  }

  const answer = () => {
    // This should practically never happen...
    if (!inputRef.current || currentWord === null) {
      return;
    }

    const answer = inputRef.current.value.trim();
    inputRef.current.value = '';

    const verifiedSymbols = verifyCorrectSymbols({
      correct: currentWord,
      answer: answer,
    });

    setPreviousWord({
      correct: currentWord,
      answer: answer,
    });
    setCurrentWord(wordListContainer.getRandomWord());
    setGuesses((prevState) => ({
      words: {
        total: prevState.words.total + 1,
        correct: prevState.words.correct + (verifiedSymbols.every((item) => item.correct) ? 1 : 0),
      },
      symbols: {
        total: prevState.symbols.total + verifiedSymbols.length,
        correct: prevState.symbols.correct + verifiedSymbols.filter((item) => item.correct).length,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Stats
        wordListSize={wordListContainer.getWordListSize()}
        clockDuration={clockNow - clockStart}
        guesses={guesses}
      />
      <div className="flex flex-col w-full justify-center mt-8">
        <WordPrevious previousWord={previousWord} />
      </div>
      <div className="flex w-full justify-center mt-4">
        <WordCurrent word={currentWord} />
      </div>
      {currentWord !== null && (
        <div className="w-full max-w-3xl">
          <TextField inputRef={inputRef} answer={answer} />
        </div>
      )}
    </div>
  );
};
