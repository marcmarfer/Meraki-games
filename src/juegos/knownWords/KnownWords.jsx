import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link

function KnownWords() {
    const [gameStarted, setGameStarted] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [correctWords, setCorrectWords] = useState([]);
    const [fakeWordsSelected, setFakeWordsSelected] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("easy"); // Por defecto, nivel fácil
    const [wordsToUse, setWordsToUse] = useState([]);

    const wordsEasy = [
        { id: 1, text: 'Mano', isFake: false },
        { id: 2, text: 'Mamá', isFake: false },
        { id: 3, text: 'Mapa', isFake: false },
        { id: 4, text: 'Avión', isFake: false },
        { id: 5, text: 'Botón', isFake: false },
        { id: 6, text: 'Ratón', isFake: false },
        { id: 7, text: 'Sol', isFake: false },
        { id: 8, text: 'Queso', isFake: false },
        { id: 9, text: 'Oso', isFake: false },
        { id: 10, text: 'Hormiga', isFake: false },
        { id: 11, text: 'Tortuga', isFake: false },
        { id: 12, text: 'Pastel', isFake: false },
        { id: 13, text: 'Gato', isFake: false },
        { id: 14, text: 'Pelota', isFake: false },
        { id: 15, text: 'Fruta', isFake: false },
        { id: 16, text: 'Flor', isFake: false },
        { id: 17, text: 'Pescado', isFake: false },
        { id: 18, text: 'Luna', isFake: false },
        // Palabras que NO existen:
        { id: 19, text: 'Buja', isFake: true },
        { id: 20, text: 'Ambiar', isFake: true },
        { id: 21, text: 'Cabilla', isFake: true },
        { id: 22, text: 'Cholate', isFake: true },
        { id: 23, text: 'Pemia', isFake: true },
        { id: 24, text: 'Zanbo', isFake: true }
    ];

    const wordsMid = [
        { id: 1, text: 'Naturaleza', isFake: false },
        { id: 2, text: 'Vacaciones', isFake: false },
        { id: 3, text: 'Murciélago', isFake: false },
        { id: 4, text: 'París', isFake: false },
        { id: 5, text: 'Guía', isFake: false },
        { id: 6, text: 'Guisante', isFake: false },
        { id: 7, text: 'Herido', isFake: false },
        { id: 8, text: 'Hipo', isFake: false },
        { id: 9, text: 'Chispa', isFake: false },
        { id: 10, text: 'Pecho', isFake: false },
        { id: 11, text: 'Mosca', isFake: false },
        { id: 12, text: 'Punta', isFake: false },
        { id: 13, text: 'Fondo', isFake: false },
        { id: 14, text: 'Alma', isFake: false },
        { id: 15, text: 'Arte', isFake: false },
        { id: 16, text: 'Onda', isFake: false },
        { id: 17, text: 'Andar', isFake: false },
        { id: 18, text: 'Billete', isFake: false },
        { id: 19, text: 'Carrete', isFake: false },
        { id: 20, text: 'Cerilla', isFake: false },
        // Palabras que NO existen:
        { id: 21, text: 'Flopar', isFake: true },
        { id: 22, text: 'Chirimbolo', isFake: true },
        { id: 23, text: 'Turtul', isFake: true },
        { id: 24, text: 'Plufin', isFake: true },
        { id: 25, text: 'Luminela', isFake: true },
        { id: 26, text: 'Tricletín', isFake: true },
        { id: 27, text: 'Glublo', isFake: true },
        { id: 28, text: 'Frutimán', isFake: true },
        { id: 29, text: 'Chisparejo', isFake: true },
        { id: 30, text: 'Burbujastra', isFake: true },
    ];

    const wordsHard = [
        { id: 1, text: 'Aventúreo', isFake: false },
        { id: 2, text: 'Fantástilo', isFake: false },
        { id: 3, text: 'Explorín', isFake: false },
        { id: 4, text: 'Amigableta', isFake: false },
        { id: 5, text: 'Maginífico', isFake: false },
        { id: 6, text: 'Escurriple', isFake: false },
        { id: 7, text: 'Brillantino', isFake: false },
        { id: 8, text: 'Risonete', isFake: false },
        { id: 9, text: 'Curiosín', isFake: false },
        { id: 10, text: 'Asombrolete', isFake: false },
        { id: 11, text: 'Intrépido', isFake: false },
        { id: 12, text: 'Rumbalón', isFake: false },
        { id: 13, text: 'Fantasmagorín', isFake: false },
        { id: 14, text: 'Alocadín', isFake: false },
        { id: 15, text: 'Maravillín', isFake: false },
        // Palabras que NO existen:
        { id: 16, text: 'Carapleno', isFake: true },
        { id: 17, text: 'Espolvín', isFake: true },
        { id: 18, text: 'Sopletón', isFake: true },
        { id: 19, text: 'Rutilín', isFake: true },
        { id: 20, text: 'Fragüet', isFake: true },
        { id: 21, text: 'Zumbiquín', isFake: true },
        { id: 22, text: 'Carantoña', isFake: true },
        { id: 23, text: 'Chispeza', isFake: true },
        { id: 24, text: 'Trasguto', isFake: true },
        { id: 25, text: 'Murmulique', isFake: true },
        { id: 26, text: 'Destellor', isFake: true },
        { id: 27, text: 'Fulmín', isFake: true },
        { id: 28, text: 'Marrama', isFake: true },
        { id: 29, text: 'Espumanteo', isFake: true },
        { id: 30, text: 'Chiribiris', isFake: true },
    ];

    useEffect(() => {
        let words = wordsEasy; // Por defecto, nivel fácil

        if (selectedLevel === "medium") {
            words = wordsMid;
        } else if (selectedLevel === "hard") {
            words = wordsHard;
        }

        // Mezcla las palabras aleatoriamente al inicio del juego y al cambiar de dificultad
        setWordsToUse(shuffleArray(words));
    }, [selectedLevel]);

    const shuffleArray = (array) => {
        // Copia el array para no mutarlo directamente
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const endGame = () => {
        setGameStarted(false);
    };

    const handleWordClick = (wordId, isFake) => {
        if (selectedWords.includes(wordId)) return;

        setSelectedWords([...selectedWords, wordId]);

        if (!isFake) {
            setCorrectWords([...correctWords, wordId]);
        } else {
            setFakeWordsSelected([...fakeWordsSelected, wordId]);
        }
    };

    return (
        <div className="container mx-auto p-6 pt-36">
            <div>
                <h2 className="text-xl font-bold mb-4">Selecciona las palabras que conoces:</h2>
                <div className="grid grid-cols-3 gap-4">
                    {wordsToUse.map((word) => (
                        <button
                            key={word.id}
                            className={`py-2 px-4 rounded ${selectedWords.includes(word.id) ? 'bg-green-600' : word.isFake ? 'bg-blue-500' : 'bg-blue-500'} text-white font-bold`}
                            onClick={() => handleWordClick(word.id, word.isFake)}
                        >
                            {word.text}
                        </button>
                    ))}
                </div>
                <div className="mt-4 mb-2 text-left">
                    <Link to="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Terminar Juego</Link>
                </div>
                <p>Palabras conocidas: {correctWords.length}</p>
                <p>Palabras falsas seleccionadas: {fakeWordsSelected.length}</p>
            </div>
            <div className="mt-4">
                <button onClick={() => setSelectedLevel("easy")} className={`mr-2 ${selectedLevel === "easy" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Fácil</button>
                <button onClick={() => setSelectedLevel("medium")} className={`mr-2 ${selectedLevel === "medium" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Medio</button>
                <button onClick={() => setSelectedLevel("hard")} className={`mr-2 ${selectedLevel === "hard" ? "bg-yellow-300" : "bg-gray-300"} hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded`}>Difícil</button>
            </div>
        </div>
    );
}

export default KnownWords;
