import { useEffect, useRef, useState } from 'react'
import { TOTAL_BUTTONS } from '../constants'

const useVisual = () => {
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingIndex, setPlayingIndex] = useState(0)
  const [current, setCurrent] = useState(3)
  const [lost, setLost] = useState(false)
  const [points, setPoints] = useState(0)
  const [playButton, setPlayButton] = useState(false)
  const buttonRefs = Array.from({ length: TOTAL_BUTTONS.length }, _ =>
    useRef(null)
  )

  const addToSequence = () => {
    const newNumbers = []

    while (newNumbers.length < current) {
      const randomNumber = Math.floor(Math.random() * TOTAL_BUTTONS.length)

      newNumbers.push(randomNumber)
    }

    setSequence(newNumbers)
  }

  const handleClick = e => {
    if (!isPlaying) return

    const click = parseInt(e.target.getAttribute('id'))

    const isButtonInSequence = sequence.includes(click)

    // pierde directamente
    if (!isButtonInSequence) {
      buttonRefs.forEach(ref => {
        ref.current.classList.add('bg-red-500')
      })
      setLost(true)
      setPoints(current)
    } else {
      // sigue jugando
      setPlayerSequence([...playerSequence, click])
      setPlayingIndex(playingIndex + 1)
    }
  }

  const handlePlay = () => {
    if (!isPlaying) {
      addToSequence()
      setPlayButton(true)
    }
  }

  const resetGame = () => {
    setSequence([])
    setPlayerSequence([])
    setIsPlaying(false)
    setPlayingIndex(0)
    setCurrent(3)
    setLost(false)
    setPoints(0)
    setPlayButton(false)
  }

  useEffect(() => {
    if (!isPlaying) return
    if (playingIndex === sequence.length) {
      const isCorrectSequence =
        JSON.stringify(playerSequence.sort()) ===
        JSON.stringify(sequence.sort())

      if (isCorrectSequence) {
        buttonRefs.forEach(buttonRef => {
          buttonRef.current.disabled = true
          buttonRef.current.classList.add('bg-green-500/75')
        })

        setTimeout(() => {
          buttonRefs.forEach(buttonRef => {
            buttonRef.current.disabled = false
            buttonRef.current.classList.remove('bg-green-500/75')
          })

          setIsPlaying(false)
          setSequence([])
          setPlayerSequence([])
          setCurrent(current + 1)
          setPlayingIndex(0)
          addToSequence()
        }, 1000)
      } else {
        buttonRefs.forEach(buttonRef => {
          buttonRef.current.classList.add('bg-red-500')
        })
        setLost(true)
        setPoints(current)
      }
    }
  }, [playingIndex])

  useEffect(() => {
    if (sequence.length === 0) return

    // Filtrar la secuencia y contar la frecuencia de cada número
    const frequencyMap = sequence.reduce((map, num) => {
      map[num] = (map[num] || 0) + 1
      return map
    }, {})

    // Resaltar todos los botones al mismo tiempo
    sequence.forEach(buttonIndex => {
      const ref = buttonRefs[buttonIndex].current
      ref.classList.add('brightness-[2.5]')
    })

    // Después de un tiempo, quitar el resaltado
    setTimeout(() => {
      sequence.forEach(buttonIndex => {
        const ref = buttonRefs[buttonIndex].current
        ref.classList.remove('brightness-[2.5]')
      })

      // Resaltar de nuevo los duplicados según su frecuencia
      setTimeout(() => {
        let time = 0

        for (const [num, frequency] of Object.entries(frequencyMap)) {
          if (frequency > 1) {
            // Resaltar tantas veces como sea la frecuencia
            for (let i = 0; i < frequency; i++) {
              const buttonIndex = parseInt(num)
              const ref = buttonRefs[buttonIndex].current
              time = i * 500
              console.log(time)

              // Agregar un resaltado adicional después de un tiempo
              setTimeout(() => {
                ref.classList.add('brightness-[2.5]')
                setTimeout(() => {
                  ref.classList.remove('brightness-[2.5]')
                }, 200)
              }, time) // Ajusta el tiempo según sea necesario
            }
          }
        }

        // Habilitar la interacción del jugador después de completar todas las animaciones
        setTimeout(() => {
          setIsPlaying(true)
        }, time) // Ajusta el tiempo según sea necesario
      }, 500) // Ajusta el tiempo según sea necesario
    }, 1000) // Ajusta el tiempo según sea necesario
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
    current,
    playButton,
  }
}

export default useVisual
