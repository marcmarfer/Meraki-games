import Button from './Button'
import WinnerModal from './WinnerModal'
import useSimon from '../hooks/useSimon'
import { TOTAL_BUTTONS } from '../constants'

const Board = () => {
  const {
    handlePlay,
    handleClick,
    isPlaying,
    resetGame,
    buttonRefs,
    lost,
    points,
    sequenceLength,
    playButton,
  } = useSimon()

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="relative w-screen max-w-[1000px] min-h-[50vh] grid justify-center items-center grid-cols-4 grid-rows-4 gap-3 p-6">
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
          className="absolute text-white bg-gray-800 p-4 rounded-full hover:scale-105 duration-100"
          onClick={handlePlay}
          disabled={playButton}
        >
          {sequenceLength === 0 ? 'PLAY' : sequenceLength}
        </button>
      </section>
      <WinnerModal lost={lost} points={points} onClick={resetGame} />
    </main>
  )
}

export default Board
