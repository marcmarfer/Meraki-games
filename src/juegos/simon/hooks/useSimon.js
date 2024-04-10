import { useState, useEffect, useRef } from 'react'
import { TOTAL_BUTTONS } from '../constants'

const useSimon = () => {
  const [sequence, setSequence] = useState([])
  const [reversedSequence, setReversedSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingIndex, setPlayingIndex] = useState(0)
  const [lost, setLost] = useState(false)
  const [points, setPoints] = useState(0)
  const [playButton, setPlayButton] = useState(false)
  const buttonRefs = Array.from({ length: TOTAL_BUTTONS.length }, _ =>
    useRef(null)
  )

  const addToSequence = () => {
    const randomIndex = Math.floor(Math.random() * TOTAL_BUTTONS.length)
    const newSequence = [...sequence, randomIndex]
    setSequence(newSequence)
    reverseSequence({ newSequence })
  }

  const handlePlay = () => {
    if (!isPlaying) {
      addToSequence()
      setPlayButton(true)
    }
  }

  const reverseSequence = ({ newSequence }) => {
    const newReversedSequence = [...newSequence].reverse()
    setReversedSequence(newReversedSequence)
  }

  const resetGame = () => {
    buttonRefs.forEach(buttonRef => {
      buttonRef.current.classList.remove('bg-red-500')
    })
    setLost(false)
    setIsPlaying(false)
    setPlayingIndex(0)
    setSequence([])
    setReversedSequence([])
    setPlayButton(false)
  }

  const handleClick = e => {
    if (isPlaying) {
      const click = e.target.getAttribute('id')

      if (reversedSequence[playingIndex] === parseInt(click)) {
        if (playingIndex === sequence.length - 1) {
          buttonRefs.forEach(buttonRef => {
            buttonRef.current.classList.add('bg-green-500/75')
          })
          setTimeout(() => {
            buttonRefs.forEach(buttonRef => {
              buttonRef.current.classList.remove('bg-green-500/75')
            })
            setPlayingIndex(0)
            addToSequence()
            setIsPlaying(false)
          }, 250)
        } else {
          setPlayingIndex(playingIndex + 1)
        }
      } else {
        buttonRefs.forEach(buttonRef => {
          buttonRef.current.classList.add('bg-red-500')
        })
        setLost(true)
        setPoints(sequence.length)
      }
    }
  }

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (index = 0) => {
        let ref = null

        buttonRefs.forEach((buttonRef, i) => {
          if (sequence[index] === i) {
            ref = buttonRef
            return
          }
        })

        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.classList.add('brightness-[2.5]')
            setTimeout(() => {
              ref.current.classList.remove('brightness-[2.5]')

              if (index < sequence.length - 1) showSequence(index + 1)
              else setIsPlaying(true)
            }, 250)
          }
        }, 250)
      }
      showSequence()
    }
  }, [sequence])

  return {
    handlePlay,
    handleClick,
    isPlaying,
    resetGame,
    buttonRefs,
    lost,
    points,
    sequenceLength: sequence.length,
    playButton,
  }
}

export default useSimon
