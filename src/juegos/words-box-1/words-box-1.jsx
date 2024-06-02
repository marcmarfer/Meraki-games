import React, { useState, useEffect } from 'react';
import './words-box-1.css';
import { useLocation } from 'react-router-dom';

const WordsBox1 = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const studentId = searchParams.get('id');
  const testId = searchParams.get('test_id');
  const gameId = searchParams.get('game_id');
  const gameTestId = searchParams.get('gameTest_id');
  const level = parseInt(searchParams.get('level'), 10);

  const [words, setWords] = useState([
    { id: '1', content: 'alo', color: '' },
    { id: '2', content: 'me', color: '' },
    { id: '3', content: 'llamo', color: '' },
    { id: '4', content: 'Marc', color: '' },
    { id: '5', content: 'análisis', color: '' },
    { id: '6', content: 'barco', color: '' },
    { id: '7', content: 'avión', color: '' },
    { id: '8', content: 'casa', color: '' },
    { id: '9', content: 'árbol', color: '' },
    { id: '10', content: 'zapato', color: '' }
  ]);

  const [wordsWithA, setWordsWithA] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    const determineLevel = (level) => {
      if (level === 1) return "easy";
      if (level === 5) return "medium";
      if (level === 10) return "hard";
      return "easy";
    };

    setSelectedLevel(determineLevel(level));
  }, [level]);

  useEffect(() => {
    let newWords = [];

    if (selectedLevel === "easy") {
      newWords = [
        { id: '1', content: 'alo', color: '' },
        { id: '2', content: 'me', color: '' },
        { id: '3', content: 'llamo', color: '' },
        { id: '4', content: 'Marc', color: '' },
        { id: '5', content: 'análisis', color: '' },
        { id: '6', content: 'barco', color: '' },
        { id: '7', content: 'avión', color: '' },
        { id: '8', content: 'casa', color: '' },
        { id: '9', content: 'árbol', color: '' },
        { id: '10', content: 'zapato', color: '' }
      ];
    } else if (selectedLevel === "medium") {
      newWords = [
        { id: '1', content: 'alo', color: '' },
        { id: '2', content: 'me', color: '' },
        { id: '3', content: 'llamo', color: '' },
        { id: '4', content: 'Marc', color: '' },
        { id: '5', content: 'análisis', color: '' },
        { id: '6', content: 'barco', color: '' },
        { id: '7', content: 'avión', color: '' },
        { id: '8', content: 'casa', color: '' },
        { id: '9', content: 'árbol', color: '' },
        { id: '10', content: 'zapato', color: '' },
        { id: '11', content: 'amigos', color: '' }
      ];
    } else if (selectedLevel === "hard") {
      newWords = [
        { id: '1', content: 'alo', color: '' },
        { id: '2', content: 'me', color: '' },
        { id: '3', content: 'llamo', color: '' },
        { id: '4', content: 'Marc', color: '' },
        { id: '5', content: 'análisis', color: '' },
        { id: '6', content: 'barco', color: '' },
        { id: '7', content: 'avión', color: '' },
        { id: '8', content: 'casa', color: '' },
        { id: '9', content: 'árbol', color: '' },
        { id: '10', content: 'zapato', color: '' },
        { id: '11', content: 'caballo', color: '' },
        { id: '12', content: 'camión', color: '' }
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
      setWordsWithA(prevState => [...prevState, { ...word, color: '#000' }]);
      setWords(prevState => prevState.filter(w => w.id !== id));
  
      if (selectedLevel === "easy" && content.startsWith('a')) {
        setScore(score + 1);
      } else if (selectedLevel === "medium" && content.startsWith('a') && content.endsWith('s')) {
        setScore(score + 1);
      } else if (selectedLevel === "hard" && content.startsWith('c') && content.includes('a')) {
        setScore(score + 1);
      } else {
        setMistakes(mistakes + 1);
      }
    } else {
      setWords(prevState => prevState.map(w => w.id === id ? { ...w, color: '#fff' } : w));
      setWordsWithA(prevState => prevState.filter(w => w.id !== id));
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
      level: parseInt(level),
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
      return "Introduce las palabras que empiecen con 'a'";
    } else if (selectedLevel === "medium") {
      return "Introduce las palabras que empiecen con 'a' y terminen con 's'";
    } else if (selectedLevel === "hard") {
      return "Introduce las palabras que empiecen con 'c' y contengan la letra 'a'";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className='words-box-1-container'>
        <div className='title'>
          <h2>{renderTitle()}</h2>
        </div>
        <div className='words-grid flex flex-wrap justify-center'>
          {words.map(word => (
            <div
              key={word.id}
              draggable='true'
              onDragStart={(e) => onDragStart(e, word.id, word.content)}
              className='word white'
            >
              {word.content}
            </div>
          ))}
        </div>
        <div
          onDrop={(e) => onDrop(e, 'box-a')}
          onDragOver={onDragOver}
          className='drop-box'
        >
          {wordsWithA.map(word => (
            <div key={word.id} style={{ margin: '8px 0' }}>
              {word.content}
            </div>
          ))}
        </div>
        <div className='end-game-button'>
          <button onClick={endGame} className='end-game-btn'>Terminar Juego</button>
        </div>
      </div>
    </div>
  );
}

export default WordsBox1;
