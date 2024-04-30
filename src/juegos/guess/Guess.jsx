import React, { useState, useEffect } from 'react';
import animal1 from './img/Animal1.png';
import animal2 from './img/Animal2.png';
import bicho from './img/Bicho.png'; // Importa las nuevas imágenes
import donut from './img/Donut.png';
import pelota from './img/Pelota.png';
import tostadora from './img/Tostadora.png';

const animals = [animal1, animal2, bicho, donut, pelota, tostadora];

function shuffle(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function Guess() {
    const [animalImages, setAnimalImages] = useState([]);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [victory, setVictory] = useState(false);

    useEffect(() => {
        const shuffledAnimals = shuffle([...animals]); // Baraja las imágenes de los animales
        setAnimalImages(shuffledAnimals); // Asigna las imágenes barajadas al estado
    }, []);

    const selectAnimal = (index) => {
        const updatedImages = [...animalImages];
        updatedImages[index] = null; // Hace que la imagen desaparezca
        setAnimalImages(updatedImages);

        const selectedAnimals = updatedImages.filter(img => img !== null);
        if (selectedAnimals.length === animals.length) {
            setVictory(true);
        }
    };

    const handleImageClick = (index) => {
        if (animalImages[index] !== null) {
            if (index < animals.length) {
                setScore(score + 1); // Aumenta la puntuación si se selecciona una imagen correcta
            } else {
                setMistakes(mistakes + 1); // Aumenta los errores si se selecciona una imagen incorrecta
            }
            selectAnimal(index);
        }
    };

    return (
        <div className="container mx-auto py-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Guess the Animal</h1>
            <p>Score: {score}</p>
            <p>Mistakes: {mistakes}</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
                {animalImages.map((image, index) => (
                    <div
                        key={index}
                        className="p-1 rounded-lg flex justify-center items-center h-full"
                        onClick={() => handleImageClick(index)}
                    >
                        {image && <img className="w-full h-auto cursor-pointer" src={image} alt={`Animal ${index}`} />}
                    </div>
                ))}
            </div>
            {victory && (
                <div className="mt-4 text-green-600 font-bold">Congratulations! You guessed all the animals.</div>
            )}
        </div>
    );
}

export default Guess;
