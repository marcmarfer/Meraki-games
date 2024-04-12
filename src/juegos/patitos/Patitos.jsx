import React, { useState, useEffect } from 'react';
import patitoSinColor from './img/Vector 20.png';
import patitoRojoAzul from './img/verde.png';
import patitoRojoAzulMas from './img/verdeFlojo.png';

// Define las dificultades y la cantidad de patitos para cada una
const dificultades = {
  easy: {rows: 4, cols: 3},
  normal: {rows: 4, cols: 4},
  hard: {rows: 4, cols: 5},
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
  const {rows, cols} = dificultades[dificultad];
  const parejasNecesarias = rows * cols / 2;
  const parejasDisponibles = [];

  // Crear parejas de colores
  for (let i = 0; i < parejasNecesarias; i++) {
    let color;
    if ((dificultad === 'normal' || dificultad === 'hard') && i % 3 === 0) {
      // Si es normal o hard, agregar parejas de patitos bicolores cada 3 patitos
      color = i % 2 === 0 ? 'verde' : 'verdeFlojo';
    } else {
      color = colores[i % colores.length];
    }
    parejasDisponibles.push(color, color); // Agregar dos veces el mismo color para formar una pareja
  }

  // Barajar las parejas disponibles
  const shuffledParejas = shuffle(parejasDisponibles);

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

  useEffect(() => {
    setShuffledPatitos(shuffle(generarPatitos(dificultad)));
  }, [dificultad]);

  useEffect(() => {
    if (guessedPatitos.length === dificultades[dificultad].rows * dificultades[dificultad].cols) {
      setVictory(true);
    }
  }, [guessedPatitos, dificultad]);

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

  const handleDificultadChange = (e) => {
    setDificultad(e.target.value);
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Patitos</h1>
      <p>Puntuación: {score}</p>
      <p>Errores: {mistakes}</p>
      <div className="mt-4">
        <label htmlFor="dificultad">Dificultad:</label>
        <select id="dificultad" value={dificultad} onChange={handleDificultadChange}>
          <option value="easy">Fácil</option>
          <option value="normal">Normal</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {shuffledPatitos.map((patito) => (
          <div
            key={patito.id}
            className="p-1 cursor-pointer bg-gray-200 rounded-lg"
            onClick={() => selectPatito(patito)}
          >
            {patito.color === 'sinColor' ? (
              <img className="w-28 h-auto" src={patitoSinColor} alt={`Patito sin color`} />
            ) : patito.color === 'rojo-azul' || patito.color === 'rojo-azul-mas' ? (
              <img className="w-28 h-auto" src={patito.color === 'rojo-azul' ? patitoRojoAzul : patitoRojoAzulMas} alt={`Patito ${patito.color}`} />
            ) : (
              <img className="w-28 h-auto" src={`/src/juegos/patitos/img/${patito.color}.png`} alt={`Patito ${patito.color}`} />
            )}
          </div>
        ))}
      </div>
      {victory && (
        <div className="mt-4 text-green-600 font-bold">¡Felicidades! Has encontrado todos los patitos.</div>
      )}
    </div>
  );
}

export default Patitos;
