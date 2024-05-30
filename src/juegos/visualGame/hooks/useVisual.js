import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TOTAL_BUTTONS } from '../constants';

const useVisual = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('id');
  const gameTestId = searchParams.get('gameTest_id');
  const testId = searchParams.get('test_id');
  const gameId = searchParams.get('game_id');
  const level = searchParams.get('level');

  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [current, setCurrent] = useState(2); // Initial sequence has 2 keys
  const [lost, setLost] = useState(false);
  const [points, setPoints] = useState(0);
  const [playButton, setPlayButton] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0); // Total errors across all sequences
  const buttonRefs = Array.from({ length: TOTAL_BUTTONS.length }, (_) =>
    useRef(null)
  );

  const difficultyLevels = {
    1: { sequences: 6, name: 'Easy' },
    5: { sequences: 8, name: 'Medium' },
    10: { sequences: 10, name: 'Hard' },
  };

  const selectedDifficulty = difficultyLevels[level] || difficultyLevels[1];

  const addToSequence = () => {
    const newNumbers = [];
    const usedNumbers = new Set();
  
    while (newNumbers.length < current) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * TOTAL_BUTTONS.length);
      } while (usedNumbers.has(randomNumber));
      usedNumbers.add(randomNumber);
      newNumbers.push(randomNumber);
    }
  
    setSequence(newNumbers);
  };
  

  const handleClick = (e) => {
    if (!isPlaying) return;

    const click = parseInt(e.target.getAttribute('id'));

    setPlayerSequence([...playerSequence, click]);

    if (!sequence.includes(click) && !lost) {
      setLost(true);
      setTotalErrors(totalErrors + 1); // Increment the total errors count
    }

    setPlayingIndex(playingIndex + 1);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      addToSequence();
      setPlayButton(true);
    }
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setIsPlaying(false);
    setPlayingIndex(0);
    setCurrent(2); // Reset the number of keys in the sequence to 2
    setLost(false);
    setPoints(0);
    setPlayButton(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (playingIndex === sequence.length) {
      if (playerSequence.length === sequence.length && !lost) {
        setPoints(points + 1);
      }

      setPlayerSequence([]);
      setLost(false);
      setPlayingIndex(0);
      setCurrent((prevCurrent) => prevCurrent < 10 ? prevCurrent + 1 : prevCurrent); // Increment the number of keys in the sequence if it's not already 10
      addToSequence();
    }
  }, [playingIndex]);

  useEffect(() => {
    if (sequence.length === 0) return;

    sequence.forEach((buttonIndex) => {
      const ref = buttonRefs[buttonIndex].current;
      ref.classList.add('brightness-[2.5]');
    });

    setTimeout(() => {
      sequence.forEach((buttonIndex) => {
        const ref = buttonRefs[buttonIndex].current;
        ref.classList.remove('brightness-[2.5]');
      });

      setIsPlaying(true);
    }, 1000);
  }, [sequence]);

  useEffect(() => {
    console.log(points, totalErrors, selectedDifficulty.sequences)
    if (points + totalErrors === selectedDifficulty.sequences) {
      enviarDatosAlServidor();
    }
  }, [points, totalErrors]);

  const enviarDatosAlServidor = () => {
    const data = {
      student_id: parseInt(studentId),
      game_test_id: parseInt(gameTestId),
      test_id: parseInt(testId),
      game_id: parseInt(gameId),
      time: 0,
      score: points,
      errors: totalErrors,
      played: 'true',
      level: parseInt(level),
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
          throw new Error('Error sending data to server');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
    selectedDifficulty,
  };
};

export default useVisual;
