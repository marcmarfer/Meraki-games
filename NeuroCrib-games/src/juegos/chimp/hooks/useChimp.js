import { useEffect, useRef, useState } from 'react'
import { TOTAL_BUTTONS } from '../constants'

const useChimp = () => {
  const [buttonChildren, setButtonChildren] = useState([])
  const [sequence, setSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedOne, setSelectedOne] = useState(false)
  const [enabledButtons, setEnabledButtons] = useState([])
  const [playingIndex, setPlayingIndex] = useState(0)
  const [current, setCurrent] = useState(4)
  const [lost, setLost] = useState(false)
  const [points, setPoints] = useState(0)
  const [playButton, setPlayButton] = useState(false)
  const buttonRefs = Array.from({ length: TOTAL_BUTTONS.length }, _ =>
    useRef(null)
  )

  const addToSequence = () => {
    let newSequence = []
    while (newSequence.length < current) {
      const randomIndex = Math.floor(Math.random() * TOTAL_BUTTONS.length)
      if (!newSequence.includes(randomIndex)) newSequence.push(randomIndex)
    }
    setSequence(newSequence)
  }

  const handlePlay = () => {
    if (!isPlaying) {
      addToSequence()
      setPlayButton(true)
    }
  }

  const resetGame = () => {
    buttonRefs.forEach(buttonRef => {
      buttonRef.current.classList.remove('bg-red-500')
    })
    setSelectedOne(false)
    setSequence([])
    setEnabledButtons([])
    setButtonChildren([])
    setCurrent(4)
    setIsPlaying(false)
    setPlayingIndex(0)
    setLost(false)
    setPoints(0)
    setPlayButton(false)
  }

  const handleClick = e => {
    if (!isPlaying) return

    const click = e.target.getAttribute('id')

    if (sequence[playingIndex] === parseInt(click)) {
      if (playingIndex === sequence.length - 1) {
        buttonRefs.forEach(buttonRef => {
          buttonRef.current.classList.add('bg-green-500/75')
        })
        setTimeout(() => {
          buttonRefs.forEach(buttonRef => {
            buttonRef.current.classList.remove('bg-green-500/75')
          })
          setSelectedOne(false)
          setSequence([])
          setButtonChildren([])
          setCurrent(current + 1)
          setPlayingIndex(0)
          addToSequence()
          setIsPlaying(false)
        }, 500)
      } else {
        setPlayingIndex(playingIndex + 1)
        setSelectedOne(true)
      }
    } else {
      buttonRefs.forEach(buttonRef => {
        buttonRef.current.classList.remove('bg-white')
        setButtonChildren([])
        buttonRef.current.classList.add('bg-red-500')
      })
      setLost(true)
      setPoints(current)
    }

    setTimeout(() => {
      buttonRefs[parseInt(click)].current.classList.remove('bg-white')
    }, 100)
  }

  useEffect(() => {
    if (sequence.length === 0) return

    sequence.forEach((buttonIndex, i) => {
      const ref = buttonRefs[buttonIndex].current
      ref.classList.add('bg-blue-500')
      setEnabledButtons(prev => [...prev, true])
      setButtonChildren(prev => [...prev, i + 1])
    })

    setIsPlaying(true)
  }, [sequence])

  return {
    handlePlay,
    handleClick,
    buttonChildren,
    enabledButtons,
    selectedOne,
    sequence,
    resetGame,
    buttonRefs,
    lost,
    points,
    sequenceLength: sequence.length,
    current,
    playButton,
  }
}

export default useChimp
