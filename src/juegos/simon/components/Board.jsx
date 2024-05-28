import React from 'react';
import Button from './Button';
import useSimon from '../hooks/useSimon';
import { TOTAL_BUTTONS } from '../constants';

const Board = () => {
  const {
    handlePlay,
    handleClick,
    resetGame,
    buttonRefs,
    points,
    playButton,
    handleChangeDifficulty,
    difficulty
  } = useSimon();

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="relative w-screen max-w-[1000px] min-h-[50vh] grid justify-center items-center grid-cols-4 grid-rows-4 gap-3 p-6">
        {TOTAL_BUTTONS.map((_, index) => (
          <Button
            key={index}
            index={index}
            ref={buttonRefs[index]}
            onClick={handleClick}
          />
        ))}

        <button
          className="absolute text-white bg-gray-800 p-4 rounded-full hover:scale-105 duration-100"
          onClick={handlePlay}
          disabled={playButton}
        >
          {playButton ? 'Playing' : 'Play'}
        </button>
        <select
          className="absolute right-10 top-5 bg-gray-800 text-white px-3 py-2 rounded-md"
          onChange={handleChangeDifficulty}
          value={difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </section>
    </main>
  );
};

export default Board;