import { formatClock } from '../helpers';
import React from 'react';

interface StatsProps {
  wordListSize: number;
  clockDuration: number;
  guesses: {
    words: {
      total: number;
      correct: number;
    };
    symbols: {
      total: number;
      correct: number;
    };
  };
}

// Avoiding 0 division here (if that is even possible?)
const calculatePerMinute = (correct: number, clockDuration: number): string =>
  Math.round(correct / (clockDuration === 0 ? 0.0001 : clockDuration / (1000 * 60))).toLocaleString();

export const Stats = ({ wordListSize, clockDuration, guesses }: StatsProps) => (
  <div className="flex flex-col justify-center space-x-4">
    <div className="flex justify-center space-x-4 mb-4 flex-nowrap">
      <div>
        <strong>Wordlist</strong>: {wordListSize.toLocaleString()}
      </div>
      <div>
        <strong>Words:</strong> {guesses.words.correct.toLocaleString()} / {guesses.words.total.toLocaleString()}
      </div>
      <div>
        <strong>Symbols:</strong> {guesses.symbols.correct.toLocaleString()} / {guesses.symbols.total.toLocaleString()}
      </div>
      <div>
        <strong className="cursor-help" title="Words per minute">
          WPM:
        </strong>{' '}
        {calculatePerMinute(guesses.words.correct, clockDuration)}
      </div>
      <div>
        <strong className="cursor-help" title="Symbols per minute">
          SPM:
        </strong>{' '}
        {calculatePerMinute(guesses.symbols.correct, clockDuration)}
      </div>
    </div>
    <div className="flex justify-center space-x-4 mb-4">
      <div>
        <strong>Time:</strong> {clockDuration > 0 ? formatClock(clockDuration) : '00:00:00'}
      </div>
    </div>
  </div>
);
