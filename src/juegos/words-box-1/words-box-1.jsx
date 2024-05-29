import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WordsBox1 = () => {
  const [words, setWords] = useState([
    { id: '1', content: 'alo' },
    { id: '2', content: 'me' },
    { id: '3', content: 'llamo' },
    { id: '4', content: 'Marc' },
    { id: '5', content: 'análisis' },
    { id: '6', content: 'barco' },
    { id: '7', content: 'avión' },
    { id: '8', content: 'casa' },
    { id: '9', content: 'árbol' },
    { id: '10', content: 'zapato' }
  ]);
  const [wordsWithA, setWordsWithA] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const studentId = searchParams.get('id');
  const testId = searchParams.get('test_id');
  const gameId = searchParams.get('game_id');
  const gameTestId = searchParams.get('gameTest_id');

  useEffect(() => {
    let newWords = [];

    if (selectedLevel === "easy") {
      newWords = [
        { id: '1', content: 'alo' },
        { id: '2', content: 'me' },
        { id: '3', content: 'llamo' },
        { id: '4', content: 'Marc' },
        { id: '5', content: 'análisis' },
        { id: '6', content: 'barco' },
        { id: '7', content: 'avión' },
        { id: '8', content: 'casa' },
        { id: '9', content: 'árbol' },
        { id: '10', content: 'zapato' }
      ];
    } else if (selectedLevel === "medium") {
      newWords = [
        { id: '1', content: 'alo' },
        { id: '2', content: 'me' },
        { id: '3', content: 'llamo' },
        { id: '4', content: 'Marc' },
        { id: '5', content: 'análisis' },
        { id: '6', content: 'barco' },
        { id: '7', content: 'avión' },
        { id: '8', content: 'casa' },
        { id: '9', content: 'árbol' },
        { id: '10', content: 'zapato' },
        { id: '11', content: 'amigos' }
      ];
    } else if (selectedLevel === "hard") {
      newWords = [
        { id: '1', content: 'alo' },
        { id: '2', content: 'me' },
        { id: '3', content: 'llamo' },
        { id: '4', content: 'Marc' },
        { id: '5', content: 'análisis' },
        { id: '6', content: 'barco' },
        { id: '7', content: 'avión' },
        { id: '8', content: 'casa' },
        { id: '9', content: 'árbol' },
        { id: '10', content: 'zapato' },
        { id: '11', content: 'caballo' },
        { id: '12', content: 'camión' }
      ];
    }

    setWords(newWords);
    setWordsWithA([]);
    setScore(0);
    setMistakes(0);
  }, [selectedLevel]);

  const onDragStart = (e, id, content) => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('content', content);
  };

  const onDrop = (e, target) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const content = e.dataTransfer.getData('content');
    const word = { id, content };

    if (target === 'box-a') {
      setWordsWithA(prevState => [...prevState, word]);
      setWords(prevState => prevState.filter(word => word.id !== id));

      if (selectedLevel === "easy" && content.startsWith('a')) {
        setScore(score + 1);
      } else if (selectedLevel === "medium" && content.startsWith('a') && content.endsWith('s')) {
        setScore(score + 1);
      } else if (selectedLevel === "hard" && content.startsWith('c') && content.includes('a')) {
        setScore(score + 1);
      } else {
        setMistakes(mistakes + 1);
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const enviarDatosAlServidor = () => {
    const data = {
      student_id: parseInt(studentId),
      test_id: parseInt(testId),
      game_id: parseInt(gameId),
      gameTest_id: parseInt(gameTestId),
      time: 0,
      score: parseInt(score),
      errors: parseInt(mistakes),
      played: "true"
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
        return response.json();
      })
      .then(data => {
        console.log('Datos enviados correctamente:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const endGame = () => {
    enviarDatosAlServidor();
  };

  const renderTitle = () => {
    if (selectedLevel === "easy") {
      return "Fácil: Empieza con 'a'";
    } else if (selectedLevel === "medium") {
      return "Medio: Empieza con 'a' y termina con 's'";
    } else if (selectedLevel === "hard") {
      return "Difícil: Empieza con 'c' y contiene 'a'";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='words-box-1-container'>
        <div className="mb-4">
          <h2>{renderTitle()}</h2>
        </div>
        <div className="mb-4">
          <button onClick={() => setSelectedLevel("easy")} className={`mr-2 ${selectedLevel === "easy" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Fácil</button>
          <button onClick={() => setSelectedLevel("medium")} className={`mr-2 ${selectedLevel === "medium" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Medio</button>
          <button onClick={() => setSelectedLevel("hard")} className={`mr-2 ${selectedLevel === "hard" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Hard</button>
        </div>
        <div
          onDrop={(e) => onDrop(e, 'box-1')}
          onDragOver={onDragOver}
          style={{ border: '1px solid black', padding: '10px', width: '200px', minHeight: '100px' }}
        >
          {words.map(word => (
            <div
              key={word.id}
              draggable
              onDragStart={(e) => onDragStart(e, word.id, word.content)}
              style={{ margin: '8px 0', cursor: 'move' }}
            >
              {word.content}
            </div>
          ))}
        </div>
        <div
          onDrop={(e) => onDrop(e, 'box-a')}
          onDragOver={onDragOver}
          style={{ marginTop: '20px', border: '1px solid green', padding: '10px', width: '200px', minHeight: '100px' }}
        >
          {wordsWithA.map(word => (
            <div key={word.id} style={{ margin: '8px 0' }}>
              {word.content}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p>Puntaje: {score}</p>
          <p>Errores: {mistakes}</p>
        </div>
        <div className="mt-4">
          <button onClick={endGame} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Terminar Juego</button>
        </div>
      </div>
    </div>
  );
}

export default WordsBox1;