import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Kinematics.css';

const Kinematics = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);
    const [canvasContainerAdded, setCanvasContainerAdded] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState(new Image());

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const studentId = searchParams.get('id');
    const gameTestId = searchParams.get('gameTest_id');
    const testId = searchParams.get('test_id');
    const gameId = searchParams.get('game_id');
    const level = searchParams.get('level');

    const [helicopter, setHelicopter] = useState({
        x: 0,
        y: 0,
        initialPosY: 0,
        width: 200,
        height: 150,
        velocityX: -100,
        maxVelocityX: 0,
        velocityY: 0,
        amplitudeY: 100,
        frequencyY: 0.08,
        smoothness: 800,
        image: new Image()
    });

    const [plane, setPlane] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        velocityX: 150,
        maxVelocityX: 0,
        velocityY: 0,
        image: new Image()
    });

    const [car, setCar] = useState({
        x: 0,
        y: 0,
        width: 300,
        height: 150,
        velocityX: 80,
        maxVelocityX: 0,
        velocityY: 0,
        image: new Image()
    });

    const [boat, setBoat] = useState({
        x: 0,
        y: 0,
        width: 400,
        height: 300,
        velocityX: 60,
        maxVelocityX: 0,
        velocityY: 0,
        image: new Image()
    });

    useEffect(() => {
        const newCanvas = document.createElement('canvas');
        const canvasWidth = Math.floor(window.innerWidth * 0.7);
        const canvasHeight = Math.floor(window.innerHeight * 0.7);
        newCanvas.width = canvasWidth;
        newCanvas.height = canvasHeight;
        setCanvas(newCanvas);
    }, []);

    useEffect(() => {
        if (!canvas) return;

        const newContext = canvas.getContext('2d');
        setContext(newContext);

        const backgroundImage = new Image();
        backgroundImage.src = 'src/juegos/kinematics/sprites/Utils/GameBackground.png';
        setBackgroundImage(backgroundImage);

        const helicopterImage = new Image();
        helicopterImage.src = 'src/juegos/kinematics/sprites/Vehicles/Helicopter.png';
        setHelicopter(prevState => ({
            ...prevState,
            x: (canvas.width - 200) - (helicopter.width / 2),
            y: (canvas.height / 2 - 150) - (helicopter.width / 2),
            image: helicopterImage
        }));

        const planeImage = new Image();
        planeImage.src = 'src/juegos/kinematics/sprites/Vehicles/Plane.png';
        setPlane(prevState => ({
            ...prevState,
            x: 200 - (plane.width / 2),
            y: 200,
            image: planeImage
        }));

        const carImage = new Image();
        carImage.src = 'src/juegos/kinematics/sprites/Vehicles/Car.png';
        setCar(prevState => ({
            ...prevState,
            x: 200 - (car.width / 2),
            y: canvas.height - 200,
            image: carImage
        }));

        if (level === '5' || level === '10') {
            const boatImage = new Image();
            boatImage.src = 'src/juegos/kinematics/sprites/Vehicles/Boat.png';
            setBoat(prevState => ({
                ...prevState,
                x: (canvas.width - 200) - (helicopter.width / 2),
                y: canvas.height - 400,
                image: boatImage
            }));
        }
    }, [canvas, level]);

    useEffect(() => {
        if (canvas && context && !canvasContainerAdded) {
            console.log(canvas.width, canvas.height)
            let requestId;
            let lastTimestamp = 0;
            let time = 0;

            function gameLoop(timestamp) {
                if (!lastTimestamp) {
                    lastTimestamp = timestamp;
                }
                const deltaTime = timestamp - lastTimestamp;
                if (deltaTime > 1000 / 60) {
                    lastTimestamp = timestamp;

                    time += deltaTime;
                    handleMovements(deltaTime, time);

                    render();
                }
                requestId = requestAnimationFrame(gameLoop);
            }

            function handleMovements(deltaTime, time) {
                setHelicopter(prevState => ({
                    ...prevState,
                    x: helicopter.x += prevState.velocityX * deltaTime / 1000,
                    y: helicopter.y = helicopter.initialPosY + (prevState.amplitudeY * Math.cos((time / 1000) * prevState.frequencyY * (180 / Math.PI))),
                    initialPosY: helicopter.initialPosY += (helicopter.y - helicopter.initialPosY) / prevState.smoothness,
                }));

                setPlane(prevState => ({
                    ...prevState,
                    x: plane.x += prevState.velocityX * deltaTime / 1000,
                }));

                setCar(prevState => ({
                    ...prevState,
                    x: car.x += prevState.velocityX * deltaTime / 1000,
                }));

                if (level === '5' || level === '10') {
                    setBoat(prevState => ({
                        ...prevState,
                        x: boat.x -= prevState.velocityX * deltaTime / 1000,
                    }));
                }
            }

            let renderImage = (e, image) => {
                if (image === backgroundImage) {
                    e.target.context.drawImage(image, 0, 0, canvas.width, canvas.height);
                } else if (image === helicopter.image) {
                    e.target.context.drawImage(image, helicopter.x, helicopter.y, helicopter.width, helicopter.height);
                } else if (image === plane.image) {
                    e.target.context.drawImage(image, plane.x, plane.y, plane.width, plane.height);
                } else if (image === car.image) {
                    e.target.context.drawImage(image, car.x, car.y, car.width, car.height);
                } else if (image === boat.image) {
                    e.target.context.drawImage(image, boat.x, boat.y, boat.width, boat.height);
                }
            }

            let draw = () => {
                context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                const imagesArray = [backgroundImage, helicopter.image];
            
                if (level === '5' || level === '10') {
                    imagesArray.push(boat.image);
                }

                imagesArray.push(car.image);
                imagesArray.push(plane.image);
            
                const animate = () => {
                    imagesArray.forEach((image) => {
                        renderImage({ target: { context } }, image);
                    });
                };
            
                animate();
            }
            
            function render() {
                draw();
            }

            window.addEventListener("resize", fitCanvasToScreen);

            function fitCanvasToScreen() {
                canvas.width = Math.floor(window.innerWidth * 0.7);
                canvas.height = Math.floor(window.innerHeight * 0.7);
            }

            const container = document.createElement('div');
            container.className = 'canvas-container';
            document.getElementById('root').appendChild(container);
            container.appendChild(canvas);

            setCanvasContainerAdded(true);

            fitCanvasToScreen();
            gameLoop();

            return () => {
                window.removeEventListener("resize", fitCanvasToScreen);
                document.getElementById('root').removeChild(container);
                cancelAnimationFrame(requestId);
            };
        }
    }, [canvas, context, level]);

    useEffect(() => {
        const maxTimer = level === '5' || level === '10' ? 12 : 8;
        if (timer === maxTimer) {
            setShowQuestion(true);
        }
    }, [timer, level]);
    
    const handleAnswerSelection = (answer) => {
        let score = 0;
        let errors = 0;
    
        if (level === '1') {
            if (answer === 'yellow') {
                score = 1;
            } else {
                errors = 1;
            }
        } else if (level === '5') {
            if (answer === 'boat') {
                score = 1;
            } else {
                errors = 1;
            }
        } else if (level === '10') {
            if (answer === 'Plane, Car, Boat, Rocket') {
                score = 1;
            } else {
                errors = 1;
            }
        }
    
        setSelectedAnswer(answer);
        enviarDatosAlServidor(score, errors);
    };
    
    const enviarDatosAlServidor = (score, errors) => {
        const data = {
            student_id: parseInt(studentId),
            score: score,
            errors: errors,
            game_test_id: parseInt(gameTestId),
            test_id: parseInt(testId),
            game_id: parseInt(gameId),
            time: 0,
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
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const endGame = () => {
        enviarDatosAlServidor(0, 0); // Example data, adjust as needed
    };

    return (
        <div>
            <h1 className='title'>Kinematics Game</h1>
            {!showQuestion && <p className='statement'>Analiza la escena que acontece:</p>}
            {showQuestion && (
                <div className="question-container">
                    {level === '1' && (
                        <>
                            <h2>¿De qué color es el vehículo terrestre?</h2>
                            <div className="answers">
                                <button className='button' onClick={() => handleAnswerSelection('yellow')}>Amarillo</button>
                                <button className='button' onClick={() => handleAnswerSelection('red')}>Rojo</button>
                                <button className='button' onClick={() => handleAnswerSelection('blue')}>Azul</button>
                            </div>
                        </>
                    )}
                    {level === '5' && (
                        <>
                            <h2>¿Qué vehículo no encaja en la escena?</h2>
                            <div className="answers">
                                <button className='button' onClick={() => handleAnswerSelection('rocket')}>Cohete</button>
                                <button className='button' onClick={() => handleAnswerSelection('plane')}>Avión</button>
                                <button className='button' onClick={() => handleAnswerSelection('car')}>Coche</button>
                                <button className='button' onClick={() => handleAnswerSelection('boat')}>Barco</button>
                            </div>
                        </>
                    )}
                    {level === '10' && (
                        <>
                            <h2>¿Qué vehículos aparecieron?</h2>
                            <div className="answers">
                                <button className='button' onClick={() => handleAnswerSelection('Plane, Car, Boat, Helicopter')}>Avión, Coche, Barco, Helicóptero</button>
                                <button className='button' onClick={() => handleAnswerSelection('Plane, Car, Boat, Rocket')}>Avión, Coche, Barco, Cohete</button>
                                <button className='button' onClick={() => handleAnswerSelection('Plane, Car, Bicycle, Rocket')}>Avión, Coche, Bicicleta, Cohete</button>
                                <button className='button' onClick={() => handleAnswerSelection('Paper plane, Car, Boat, Rocket')}>Avión de papel, Coche, Barco, Cohete</button>
                            </div>
                        </>
                    )}
                </div>
            )}
            {selectedAnswer && (
                <div className="navigation-buttons">
                    <Link to="/" onClick={endGame} className="button">Volver al Menú</Link>
                </div>
            )}
        </div>
    );
};

export default Kinematics;
