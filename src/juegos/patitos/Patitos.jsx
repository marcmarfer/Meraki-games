import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Patitos.css';
import patitoSinColor from './img/Vector 20.png';
import verdeRosa from './img/verdeRosa.png';
import azulGris from './img/azulGris.png';

// Define las dificultades y la cantidad de patitos para cada una
const dificultades = {
  easy: { rows: 4, cols: 3 },
  normal: { rows: 4, cols: 4 },
  hard: { rows: 4, cols: 5 },
};

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generarPatitos(dificultad) {
  const colores = ['rosa', 'rojo', 'azul', 'azulFlojo', 'azulFuerte', 'blanco', 'dorao', 'gris', 'grisAzulado', 'lila', 'naranja', 'rojoFuerte'];
  const bicolores = ['verdeRosa', 'azulGris']; // Lista de colores bicolores para normal y hard
  const tricolores = ['tripleRosa', 'tripleRojo']; // Lista de colores tricolores solo para hard
  const { rows, cols } = dificultades[dificultad];
  let parejasNecesarias = rows * cols / 2;

  if (dificultad === 'easy') parejasNecesarias = 6;
  else if (dificultad === 'normal') parejasNecesarias = 8;
  else if (dificultad === 'hard') parejasNecesarias = 10;

  let parejasBicolores = [];
  if (dificultad === 'normal' || dificultad === 'hard') {
    parejasBicolores = bicolores.slice(0, parejasNecesarias / 2);
  }

  let parejasTricolores = [];
  if (dificultad === 'hard') {
    parejasTricolores = tricolores.slice(0, parejasNecesarias - parejasBicolores.length);
  }

  const parejasDisponibles = [];

  // Crear parejas de colores no bicolores
  const coloresNoBicolores = colores.filter(color => !bicolores.includes(color) && !tricolores.includes(color));
  const parejasColores = shuffle(coloresNoBicolores).slice(0, parejasNecesarias - parejasBicolores.length - parejasTricolores.length);

  // Combinar todas las parejas
  parejasDisponibles.push(...parejasColores);

  // Agregar parejas de bicolores solo para normal y hard
  if (dificultad === 'normal' || dificultad === 'hard') {
    parejasDisponibles.push(...parejasBicolores);
  }

  // Agregar parejas de tricolores solo para hard
  if (dificultad === 'hard') {
    parejasDisponibles.push(...parejasTricolores);
  }

  // Barajar las parejas disponibles
  const shuffledParejas = shuffle([...parejasDisponibles, ...parejasDisponibles]); // Duplicar para formar parejas

  // Crear patitos a partir de las parejas barajadas
  const patitos = shuffledParejas.map((color, index) => ({
    id: index + 1,
    color
  }));

  return patitos;
}

function Patitos() {
  const [shuffledPatitos, setShuffledPatitos] = useState([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [selectedPatitos, setSelectedPatitos] = useState([]);
  const [guessedPatitos, setGuessedPatitos] = useState([]);
  const [victory, setVictory] = useState(false);
  const [dificultad, setDificultad] = useState('easy'); // Por defecto, comienza en easy
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const studentId = searchParams.get('id');
  const gameTestId = searchParams.get('gameTest_id');
  const testId = searchParams.get('test_id');
  const gameId = searchParams.get('game_id');
  const level = searchParams.get('level');

  // Map URL level parameter to difficulty
  const levelToDifficulty = {
    '1': 'easy',
    '5': 'normal',
    '10': 'hard'
  };

  useEffect(() => {
    if (level && levelToDifficulty[level]) {
      setDificultad(levelToDifficulty[level]);
    }
  }, [level]);

  useEffect(() => {
    setShuffledPatitos(shuffle(generarPatitos(dificultad)));
    setStartTime(Date.now());
  }, [dificultad]);

  useEffect(() => {
    if (guessedPatitos.length === dificultades[dificultad].rows * dificultades[dificultad].cols) {
      setVictory(true);
      setEndTime(Date.now());
    }
  }, [guessedPatitos, dificultad]);

  useEffect(() => {
    if (victory && startTime && endTime) {
      enviarDatosAlServidor();
    }
  }, [victory, startTime, endTime]);

  const selectPatito = (patito) => {
    if (selectedPatitos.some(selected => selected.id === patito.id) || guessedPatitos.some(guessed => guessed.id === patito.id)) {
      return;
    }

    setSelectedPatitos([...selectedPatitos, patito]);

    if (selectedPatitos.length === 1) {
      if (selectedPatitos[0].color === patito.color) {
        setScore(score + 1);

        // Cambiar la imagen del patito acertado
        setShuffledPatitos(prevPatitos => {
          const newPatitos = prevPatitos.map(p => {
            if (p.id === patito.id || p.id === selectedPatitos[0].id) {
              return { ...p, color: 'sinColor' };
            }
            return p;
          });
          return newPatitos;
        });

        // Actualizar los patitos acertados
        setGuessedPatitos([...guessedPatitos, patito, selectedPatitos[0]]);
      } else {
        setMistakes(mistakes + 1);
      }
      setSelectedPatitos([]);
    }
  };

  const getPatitoSizeClass = () => {
    if (dificultad === 'easy') {
      return 'w-50 mt-5';
    } else if (dificultad === 'normal') {
      return 'w-48';
    } else if (dificultad === 'hard') {
      return 'w-40';
    }
  };

  const enviarDatosAlServidor = () => {
    const timePlayed = Math.round((endTime - startTime) / 1000); // Time in seconds

    const data = {
      student_id: parseInt(studentId),
      game_test_id: parseInt(gameTestId),
      test_id: parseInt(testId),
      game_id: parseInt(gameId),
      time: timePlayed,
      score: parseInt(score),
      errors: parseInt(mistakes),
      played: "true",
      level: parseInt(level)
    };

    fetch('https://neurolab-dev.alumnes-monlau.com/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al enviar los datos al servidor');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="patitosTitle">Patitos</h1>
      <p className='statement'>Busca las coincidencias de color</p>
      <div className="grid grid-cols-4 gap-4 mt-8" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {shuffledPatitos.map((patito) => (
          <div
            key={patito.id}
            className="p-1 rounded-lg flex justify-center items-center h-full"
          >
            {patito.color === 'sinColor' ? (
              <img className={`${getPatitoSizeClass()} h-auto cursor-pointer`} src={patitoSinColor} alt={`Patito sin color`} onClick={() => selectPatito(patito)} />
            ) : patito.color ===
              'sinColor' ? (
              <img className={`${getPatitoSizeClass()} h-auto cursor-pointer`} src={patitoSinColor} alt={`Patito sin color`} onClick={() => selectPatito(patito)} />
            ) : patito.color === 'verdeRosa' || patito.color === 'azulGris' ? (
              <img className={`${getPatitoSizeClass()} h-auto cursor-pointer`} src={patito.color === 'verdeRosa' ? verdeRosa : azulGris} alt={`Patito ${patito.color}`} onClick={() => selectPatito(patito)} />
            ) : (
              <img className={`${getPatitoSizeClass()} h-auto cursor-pointer`} src={`/src/juegos/patitos/img/${patito.color}.png`} alt={`Patito ${patito.color}`} onClick={() => selectPatito(patito)} />
            )}
          </div>
        ))}
      </div>
      {victory && (
        <div className="navigation-buttons mt-4">
          <Link to="/" className="button">Volver al Menú</Link>
        </div>
      )}
    </div>
  );
}

export default Patitos;
