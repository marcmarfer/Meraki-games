import React, { useState, useEffect } from 'react';
import './Kinematics.css';

const Kinematics = () => {
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null);

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

        return () => {
            newContext.clearRect(0, 0, newCanvas.width, newCanvas.height);
        };
    }, []);

    useEffect(() => {
        if (canvas && context) {
            const canvasWidth = Math.floor(window.innerWidth * 0.7);
            const canvasHeight = Math.floor(window.innerHeight * 0.7);
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            let requestId;
            let lastTimestamp = 0;
            let time = 0;

            const background = new Image();
            background.src = '/Sprites/Utils/GameBackground.png';
            setBackgroundImage(background);

            const helicopterImage = new Image();
            helicopterImage.src = '/Sprites/Vehicles/Helicopter.png';
            const planeImage = new Image();
            planeImage.src = '/Sprites/Vehicles/Plane.png';
            const carImage = new Image();
            carImage.src = '/Sprites/Vehicles/Car.png';

            setHelicopter(prevState => ({ ...prevState, images: helicopterImage }));
            setPlane(prevState => ({ ...prevState, images: planeImage }));
            setCar(prevState => ({ ...prevState, images: carImage }));

            console.log('Helicopter:', helicopter);
            console.log('Plane:', plane);
            console.log('Car:', car);

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
            }

            fitCanvasToScreen();
            gameLoop();

            window.addEventListener("resize", fitCanvasToScreen);

            function fitCanvasToScreen() {
                canvas.width = Math.floor(window.innerWidth * 0.7);
                canvas.height = Math.floor(window.innerHeight * 0.7);
            }

            document.getElementById('root').appendChild(canvas);

            return () => {
                window.removeEventListener("resize", fitCanvasToScreen);
                cancelAnimationFrame(requestId);
                document.getElementById('root').removeChild(canvas);
            };
        }
    }, [canvas, context]);

};

export default Kinematics;
