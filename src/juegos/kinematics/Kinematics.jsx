import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Kinematics.css';

const Kinematics = () => {
    const canvasRef = useRef(null)
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

        //set images for each sprite and set their initial position on the canvas
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
    }, [canvas]);

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
                }
            }

            let draw = () => {
                context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                const imagesArray = [backgroundImage, helicopter.image, plane.image, car.image];

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

            //function to resize the canvas in case the window is resized
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
    }, [canvas, context]);

    useEffect(() => {
        if (timer === 10) {
            setShowQuestion(true);
        }
    }, [timer]);

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        enviarDatosAlServidor();
    };

    const enviarDatosAlServidor = () => {
        const data = {
            student_id: parseInt(studentId),
            score: selectedAnswer === 'yellow' ? 1 : 0,
            errors: selectedAnswer !== 'yellow' ? 1 : 0,
            student_id: parseInt(studentId),
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

    return (
        <div>
            <h1>Kinematics Game</h1>
            <p>Análisis de la escena que acontece.</p>
            {showQuestion && (
                <div className="question-container">
                    <h2>¿De qué color es el vehículo terrestre?</h2>
                    <div className="answers">
                        <button onClick={() => handleAnswerSelection('yellow')}>Amarillo</button>
                        <button onClick={() => handleAnswerSelection('red')}>Rojo</button>
                        <button onClick={() => handleAnswerSelection('blue')}>Azul</button>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Kinematics;
