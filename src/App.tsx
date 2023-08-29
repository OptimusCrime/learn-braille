import React, { useState } from 'react';

import { BrailleSymbol, BrailleSymbolSpace } from './components/BrailleSymbol';
import { decode } from './decoder';
import { BRAILLE } from './symbols';
import { translate } from './translator';
import {WordList} from "./wordList/wordList";
import {Layout} from "./components/Layout";
import {Pages} from "./types";
import {LETTERS, NUMBERS, SIGNS} from "./symbols/keys";
import {getSettings, saveSettings} from "./settings/settings";

interface SettingsSectionProps {
  symbols: string[];
  heading: string;
}

const checkError = (params: {
  correct: BRAILLE[][];
  answer: BRAILLE[][] | null;
  wordIdx: number;
  letterIdx: number;
}): boolean | null => {
  const { correct, answer, wordIdx, letterIdx } = params;

  // Force this because we know it has to exist
  const correctSymbol = correct[wordIdx][letterIdx] as BRAILLE;

  // If no answer was given, return true
  if (answer === null) {
    return null;
  }

  // Check array lengths
  if (answer.length <= wordIdx) {
    return true;
  }
  if (answer[wordIdx].length < letterIdx) {
    return true;
  }

  return correctSymbol !== answer[wordIdx][letterIdx];
};

const wordList = new WordList();
console.log(wordList.applySettings(getSettings()));

export const App = () => {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const [page, setPage] = useState<Pages>(Pages.Game);
  const [answer, setAnswer] = useState<BRAILLE[][] | null>(null);
  const [currentExercise, setCurrentExercise] = useState<string[] | null>(null);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [maxLines, setMaxLines] = useState<number | null>(null);
  const [settings, setSettings] = useState<string[]>(getSettings());

  /*
  const reset = () => {
    setAnswer(null);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const verifyInput = () => {
    const input = inputRef.current?.value;
    if (!input) {
      return;
    }

    setAnswer(translate(input));
  };

  const resetError = () => {
    setAnswer(null);
  };

  const selectExercise = (exerciseName: string) => {
    const exercise = texts.find((exercise) => exercise.name === exerciseName);
    if (!exercise) {
      return;
    }

    setCurrentExercise(shuffleArray(exercise.lines));
    setCurrentLine(0);
    setMaxLines(exercise.lines.length);
    reset();
  };

  const changeLine = (move: number) => {
    if (currentLine !== null) {
      // Whatever
      setCurrentLine(currentLine + move);
      reset();
    }
  };

  const translated =
    currentLine === null || currentExercise === null ? null : translate(currentExercise[currentLine] as string);
  */

  if (page === Pages.Game) {
    return (
      <Layout setPage={setPage} page={page}>
        <p>Game</p>
      </Layout>
    );
  }

  const SettingsSection = ({symbols, heading}: SettingsSectionProps ) => (
    <>
      <h2 className="m-4">{heading}</h2>
      <ul className="flex flex-wrap">
        {symbols.map(symbol => {
          const brailleInput = decode(translate(symbol)[0][0]);
          return (
            <div
              className="pr-8 pb-8 cursor-pointer"
              onClick={() => {
                if (settings.includes(symbol)) {
                  // This is so dumb...
                  setSettings(prevState => [
                    ...prevState.filter(value => value !== symbol)
                  ]);
                }
                else {
                  setSettings(prevState => [
                    ...prevState,
                    symbol
                  ]);
                }
              }}
            >
              <BrailleSymbol input={brailleInput} error={!(settings.includes(symbol))} text={symbol} />
            </div>
          );
        })}
      </ul>
    </>
  );

  return (
    <Layout setPage={setPage} page={page}>
      <div className="flex justify-center flex-col w-1/3">
        <h1>Toggle symbols</h1>
        <SettingsSection symbols={LETTERS} heading="Letters" />
        <SettingsSection symbols={NUMBERS} heading="Numbers" />
        <SettingsSection symbols={SIGNS} heading="Signs" />
        <button
          className="btn"
          onClick={() => saveSettings(settings)}
          >
          Save settings
        </button>
      </div>
    </Layout>
  );

  /*

  return (
    <>
      <div className="flex py-10 justify-center">
        <select
          className="select select-bordered w-full max-w-xs flex-wrap"
          onChange={(e) => selectExercise(e.target.value)}
        >
          <option disabled selected>
            Select exercise
          </option>
          {texts.map((text) => (
            <option value={text.name}>{text.name}</option>
          ))}
        </select>
      </div>
      {translated !== null && (
        <>
          <div className="flex justify-center mx-14 flex-wrap">
            {translated.map((word, wordIdx) => (
              <>
                <div className="flex pb-7">
                  {wordIdx > 0 ? <BrailleSymbolSpace /> : ''}
                  {word.map((letter, letterIdx) => {
                    const decoded = decode(letter);

                    // Special handling for spaces
                    if (decoded.every((value) => !value)) {
                      return <BrailleSymbolSpace />;
                    }

                    const error = checkError({
                      correct: translated,
                      answer: answer,
                      wordIdx: wordIdx,
                      letterIdx: letterIdx,
                    });

                    return <BrailleSymbol input={decoded} error={error} />;
                  })}
                </div>
              </>
            ))}
          </div>
          <div className="flex justify-center">
            {currentExercise !== null && currentLine !== null && currentExercise.length && currentLine > 0 && (
              <div className="flex pr-4">
                <button className="btn" onClick={() => changeLine(-1)}>
                  {`Previous line ${`(${currentLine} / ${maxLines as number})`}`}
                </button>
              </div>
            )}
            <div className="flex w-full max-w-xl">
              <input
                type="text"
                ref={inputRef}
                placeholder="Type here"
                className="input w-full input-bordered max-w-xl"
                onKeyUp={(e) => {
                  if (e.key.toLowerCase() === 'enter') {
                    verifyInput();
                  } else {
                    resetError();
                  }
                }}
              />
            </div>
            {currentExercise !== null &&
              currentLine !== null &&
              currentExercise.length &&
              currentExercise.length > currentLine + 1 && (
                <div className="flex pl-4">
                  <button className="btn" onClick={() => changeLine(1)}>
                    {`Next line ${`(${currentLine + 2} / ${maxLines as number})`}`}
                  </button>
                </div>
              )}
          </div>
        </>
      )}
    </>
  );
   */
};
