import Button from './Button'
import WinnerModal from './WinnerModal'
import { TOTAL_BUTTONS } from '../constants'
import useChimp from '../hooks/useChimp'

function Board() {
  const {
    handlePlay,
    handleClick,
    buttonChildren,
    selectedOne,
    enabledButtons,
    sequence,
    resetGame,
    buttonRefs,
    lost,
    points,
    sequenceLength,
    current,
    playButton,
  } = useChimp()

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <button
        className="w-[100px] bg-white p-4 font-semibold rounded-full hover:scale-105 duration-100"
        onClick={handlePlay}
        disabled={playButton}
      >
        {sequenceLength === 0 ? 'PLAY' : current}
      </button>
      <section className=" w-screen max-w-[1000px] min-h-[50vh] grid justify-center items-center grid-cols-8 grid-rows-5 gap-3 p-6">
        {TOTAL_BUTTONS.map((_, index) => (
          <Button
            key={index}
            index={index}
            ref={buttonRefs[index]}
            disabled={!enabledButtons[sequence.indexOf(index)]}
            onClick={handleClick}
            selectedOne={selectedOne}
          >
            {buttonChildren[sequence.indexOf(index)]}
          </Button>
        ))}
      </section>
      <WinnerModal lost={lost} points={points} onClick={resetGame} />
    </main>
  )
}

export default Board
