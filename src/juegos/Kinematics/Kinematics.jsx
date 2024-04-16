import React, { useState, useEffect } from 'react';
import './Kinematics.css';

const Kinematics = () => {
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);
    const [canvasContainerAdded, setCanvasContainerAdded] = useState(false);

    const [backgroundImage, setBackgroundImage] = useState(new Image());

    const [helicopter, setHelicopter] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        velocityX: -2,
        maxVelocityX: 0,
        velocityY: 0,
        images: new Image()
    });

    const [plane, setPlane] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        velocityX: 4,
        maxVelocityX: 0,
        velocityY: 0,
        images: new Image()
    });

    const [car, setCar] = useState({
        x: 0,
        y: 0,
        width: 300,
        height: 150,
        velocityX: 3,
        maxVelocityX: 0,
        velocityY: 0,
        images: new Image()
    });

    
    useEffect(() => {
        const newCanvas = document.createElement('canvas');
        setCanvas(newCanvas);
        const newContext = newCanvas.getContext('2d');
        setContext(newContext);

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = (error) => reject(error);
                image.src = src;
            });
        };

        const loadImages = async () => {
            try {
                const backgroundImage = await loadImage('/Sprites/Utils/GameBackground.png');
                setBackgroundImage(backgroundImage);

                const helicopterImage = await loadImage('/Sprites/Vehicles/Helicopter.png');
                setHelicopter(prevState => ({ ...prevState, images: helicopterImage }));

                const planeImage = await loadImage('/Sprites/Vehicles/Plane.png');
                setPlane(prevState => ({ ...prevState, images: planeImage }));

                const carImage = await loadImage('/Sprites/Vehicles/Car.png');
                setCar(prevState => ({ ...prevState, images: carImage }));
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadImages();

        return () => {
            newContext.clearRect(0, 0, newCanvas.width, newCanvas.height);
        };
    }, []);

    useEffect(() => {
        if (canvas && context && !canvasContainerAdded) {
            const canvasWidth = Math.floor(window.innerWidth * 0.7);
            const canvasHeight = Math.floor(window.innerHeight * 0.7);
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

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
                    x: prevState.x + prevState.velocityX * deltaTime / 1000,
                    y: prevState.initialPosY + (prevState.amplitudeY * Math.cos((time / 1000) * prevState.frequencyY * (Math.PI / 180))),
                    initialPosY: prevState.initialPosY + (prevState.y - prevState.initialPosY) / prevState.smoothness
                }));

                setPlane(prevState => ({
                    ...prevState,
                    x: prevState.x + prevState.velocityX * deltaTime / 1000
                }));

                setCar(prevState => ({
                    ...prevState,
                    x: prevState.x + prevState.velocityX * deltaTime / 1000
                }));
            }

            function render() {
                context.clearRect(0, 0, canvas.width, canvas.height);

                context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                context.drawImage(helicopter.images, helicopter.x, helicopter.y, helicopter.width, helicopter.height);
                context.drawImage(plane.images, plane.x, plane.y, plane.width, plane.height);
                context.drawImage(car.images, car.x, car.y, car.width, car.height);
                
                context.fillStyle = 'red';
                context.fillRect(200, 200, 100, 100);

                context.strokeStyle = 'blue';
                context.lineWidth = 2;
                context.strokeRect(200, 50, 100, 100);
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
                cancelAnimationFrame(requestId);
            };
        }
    }, [canvas, context]);

    return null;
};

export default Kinematics;
