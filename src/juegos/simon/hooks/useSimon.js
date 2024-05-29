import { useState, useEffect, useRef } from 'react';
import { TOTAL_BUTTONS } from '../constants';
import { useLocation } from 'react-router-dom';

const useSimon = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('id');
  const gameTestId = searchParams.get('gameTest_id');
  const testId = searchParams.get('test_id');
  const gameId = searchParams.get('game_id');
  const level = searchParams.get('level');
  
  const [sequence, setSequence] = useState([]);
  const [reversedSequence, setReversedSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);
  const [playButton, setPlayButton] = useState(false);
  const [rounds, setRounds] = useState(4);
  const [difficulty, setDifficulty] = useState('easy');
  const [errorCounted, setErrorCounted] = useState(false);
  const [sequenceFailed, setSequenceFailed] = useState(false); // New state variable to track if sequence has failed
  const buttonRefs = Array.from({ length: TOTAL_BUTTONS.length }, (_) =>
    useRef(null)
  );

  const addToSequence = () => {
    const randomIndex = Math.floor(Math.random() * TOTAL_BUTTONS.length);
    const newSequence = [...sequence, randomIndex];
    setSequence(newSequence);
    reverseSequence({ newSequence });
  };

  const handlePlay = () => {
    if (!isPlaying) {
      addToSequence();
      setPlayButton(true);
    }
  };

  const reverseSequence = ({ newSequence }) => {
    const newReversedSequence = [...newSequence].reverse();
    setReversedSequence(newReversedSequence);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setPlayingIndex(0);
    setSequence([]);
    setReversedSequence([]);
    setPlayButton(false);
    setErrors(0);
    setErrorCounted(false);
    setSequenceFailed(false); // Reset sequenceFailed on game reset
  };

  const handleClick = (e) => {
    if (isPlaying) {
      const click = e.target.getAttribute('id');

      if (reversedSequence[playingIndex] === parseInt(click)) {
        if (playingIndex === sequence.length - 1) {
          setPlayingIndex(0);
          addToSequence();
          setIsPlaying(false);
          if (!sequenceFailed) {
            setPoints(points + 1); // Increment points after completing a sequence if the sequence didn't fail
          }
          setErrorCounted(false);
          setSequenceFailed(false);
        } else {
          setPlayingIndex(playingIndex + 1);
        }
      } else {
        if (!errorCounted) {
          setErrors(errors + 1);
          setErrorCounted(true);
          setSequenceFailed(true); // Set sequenceFailed to true if an error occurs in the sequence
        }
      }
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const showSequence = (index = 0) => {
        let ref = null;

        buttonRefs.forEach((buttonRef, i) => {
          if (sequence[index] === i) {
            ref = buttonRef;
            return;
          }
        });

        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.classList.add('brightness-[2.5]');
            setTimeout(() => {
              ref.current.classList.remove('brightness-[2.5]');

              if (index < sequence.length - 1) showSequence(index + 1);
              else setIsPlaying(true);
            }, 250);
          }
        }, 250);
      };
      showSequence();
    }
  }, [sequence]);

  useEffect(() => {
    setRounds(difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8);
  }, [difficulty]);

  useEffect(() => {
    if (points + errors === rounds) {
      enviarDatosAlServidor();
      resetGame();
    }
  }, [points]);

  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
    resetGame();
  };

  const enviarDatosAlServidor = () => {
    const data = {
      student_id: parseInt(studentId),
      game_test_id: parseInt(gameTestId),
      test_id: parseInt(testId),
      game_id: parseInt(gameId),
      time: 0,
      score: points,
      errors: errors,
      played: "true",
      level: parseInt(level)
    };

    fetch('https://neurolab-dev.alumnes-monlau.com/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos enviados correctamente:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    console.log('Errors:', errors);
    console.log('Score:', points);
  }, [errors, points]);

  return {
    handlePlay,
    handleClick,
    resetGame,
    buttonRefs,
    points,
    playButton,
    handleChangeDifficulty,
    difficulty
  };
};

export default useSimon;
