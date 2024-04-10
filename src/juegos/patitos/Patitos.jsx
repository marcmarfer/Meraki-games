import React, { useState, useEffect } from 'react';

// Idea: tres constantes. patitosEasy, patitosMid, patitosHard
const patitos = [
  { id: 1, color: 'rosa' },
  { id: 2, color: 'rojo' },
  { id: 3, color: 'azul' },
  // Puedes añadir más patitos si lo deseas
  { id: 4, color: 'rosa' },
  { id: 5, color: 'rojo' },
  { id: 6, color: 'azul' },
];

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Patitos() {
  const [shuffledPatitos, setShuffledPatitos] = useState([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [selectedPatitos, setSelectedPatitos] = useState([]);

  useEffect(() => {
    setShuffledPatitos(shuffle(patitos));
  }, []);

  const selectPatito = (patito) => {
    if (selectedPatitos.some(selected => selected.id === patito.id)) {
      return;
    }

    setSelectedPatitos([...selectedPatitos, patito]);

    if (selectedPatitos.length === 1) {
      if (selectedPatitos[0].color === patito.color) {
        setScore(score + 1);
        // Eliminar los patitos seleccionados si coinciden
        setTimeout(() => {
          setShuffledPatitos(shuffledPatitos.filter(p => p.id !== patito.id && p.id !== selectedPatitos[0].id));
        }, 500);
      } else {
        setMistakes(mistakes + 1);
      }
      setSelectedPatitos([]);
    }
  };

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Patitos</h1>
      <p>Puntuación: {score}</p>
      <p>Errores: {mistakes}</p>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {shuffledPatitos.map((patito) => (
          <div
            key={patito.id}
            className="p-4 cursor-pointer bg-gray-200 rounded-lg"
            onClick={() => selectPatito(patito)}
          >
            <img src={`/src/juegos/patitos/img/${patito.color}.png`} alt={`Patito ${patito.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patitos;
