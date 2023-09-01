export interface GuessesStateProps {
  words: {
    total: number;
    correct: number;
  };
  symbols: {
    total: number;
    correct: number;
  };
}

export interface PreviousWordStateProps {
  answer: string;
  correct: string;
}
