import React from 'react';

interface StartGameProps {
  loaded: boolean;
  startGame: () => void;
}

export const StartGame = ({ loaded, startGame }: StartGameProps) => (
  <div className="flex justify-center flex-col w-full max-w-xl">
    <div className="flex mt-16 justify-center">
      <button
        className="btn"
        disabled={!loaded}
        onClick={() => {
          if (loaded) {
            startGame();
          }
        }}
      >
        {loaded ? 'Start game' : 'Loading'}
      </button>
    </div>
  </div>
);
