import React, { useEffect, useState } from 'react';
import './Patitos.css';

function shuffleArray(array) {
  for (let i = array.length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateUniqueNames() {
  const baseName = 'Square';
  const names = [];
  for (let i = 1; i <= 24; i++) {
    names.push(`${baseName}${i}`);
  }
  return shuffleArray(names);
}

export default function Patitos() {
  const [shuffledIds, setShuffledIds] = useState([]);
  const [shuffledNames, setShuffledNames] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const uniqueColor = '#808080'; // Color gris
  const uniqueName = 'SquareLonely'; // Nombre para el id

  useEffect(() => {
    const uniqueIds = Array.from({ length: 12 }, (_, index) => index);
    const duplicatedIds = [...uniqueIds, ...uniqueIds];
    const shuffledIds = shuffleArray(duplicatedIds);
    setShuffledIds(shuffledIds);

    const names = generateUniqueNames();
    setShuffledNames(names);
  }, []);

  const colores = [
    '#001F3F', // Azul oscuro
    '#ADD8E6', // Azul claro
    '#FFA500', // Naranja
    '#FF0000', // Rojo
    '#FFC0CB', // Rosa
    '#C8A2C8', // Lila
    '#000000', // Negro
    '#8B4513', // Marrón
    '#FFFFE0', // Amarillo claro
    '#FFD700', // Amarillo oscuro
    '#90EE90', // Verde claro
    '#008000', // Verde oscuro
    uniqueColor, // Color único para cuadrado de ID única
  ];

  const handleClick = (id, name1, name2) => {
    if (shuffledIds.indexOf(id) === shuffledIds.lastIndexOf(id)) {
      return; // No hacer nada si el id es único
    }
  
    if (selectedId === null) {
      setSelectedId(id);
    } else {
      let clickedName = name1;
      let selectedName = name2;
      // console.log("clickedName:" + clickedName + " selectedName:" + selectedName + " id:" + id + " selectedId:" + selectedId);
      if (clickedName !== selectedName && id === selectedId) {
        
        setScore(score + 1);
      }
  
      setSelectedId(null);
    }
  };
  
  return (
    <div>
      <div className="tablero">
        {shuffledIds.map((id, index) => (
          <div
            key={index}
            className="pato"
            id={`pato-${id}`}
            name={shuffledNames[index]} // Agregar el nombre como un atributo "name"
            style={{
              backgroundColor: id === selectedId ? colores[id] : (shuffledIds.indexOf(id) === shuffledIds.lastIndexOf(id) ? uniqueColor : colores[id]),
            }}
            onClick={() => handleClick(id, shuffledNames[index])} // Pasar el nombre como parámetro
          />
        ))}
      </div>
      <div className="puntuacion">{`Puntuación: ${score}`}</div>
    </div>
  );
}


