import Button from './Button'
import { TOTAL_BUTTONS } from '../constants'
import useVisual from '../hooks/useVisual'

const Board = () => {
  const {
    buttonRefs,
    isPlaying,
    lost,
    points,
    sequenceLength,
    current,
    handleClick,
    handlePlay,
    resetGame,
    playButton,
  } = useVisual()

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section
        className={`relative w-screen max-w-[1000px] min-h-[50vh] grid justify-center items-center grid-cols-4 gap-3 p-6`}
      >
        {TOTAL_BUTTONS.map((_, index) => (
          <Button
            key={index}
            index={index}
            ref={buttonRefs[index]}
            onClick={handleClick}
            disabled={!isPlaying}
          />
        ))}

        <button
          className="absolute text-white bg-[#09090b] p-4 rounded-full hover:scale-105 duration-100"
          onClick={handlePlay}
          disabled={playButton}
        >
          {sequenceLength === 0 ? 'PLAY' : current}
        </button>
      </section>
      {/* <WinnerModal lost={lost} points={points} onClick={resetGame} /> */}
    </main>
  )
}

export default Board
