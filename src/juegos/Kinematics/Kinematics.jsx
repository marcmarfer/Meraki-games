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
        image: new Image()
    });

    const [plane, setPlane] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 150,
        velocityX: 4,
        maxVelocityX: 0,
        velocityY: 0,
        image: new Image()
    });

    const [car, setCar] = useState({
        x: 0,
        y: 0,
        width: 300,
        height: 150,
        velocityX: 3,
        maxVelocityX: 0,
        velocityY: 0,
        image: new Image()
    });

    useEffect(() => {
        const newCanvas = document.createElement('canvas');
        setCanvas(newCanvas);
        const newContext = newCanvas.getContext('2d');
        setContext(newContext);

        const backgroundImage = new Image();
        backgroundImage.src = 'src/juegos/Kinematics/Sprites/Utils/GameBackground.png';
        setBackgroundImage(backgroundImage);

        const helicopterImage = new Image();
        helicopterImage.src = 'src/juegos/Kinematics/Sprites/Vehicles/Helicopter.png';
        setHelicopter(prevState => ({ ...prevState, image: helicopterImage }));

        const planeImage = new Image();
        planeImage.src = 'src/juegos/Kinematics/Sprites/Vehicles/Plane.png';
        setPlane(prevState => ({ ...prevState, image: planeImage }));

        const carImage = new Image();
        carImage.src = 'src/juegos/Kinematics/Sprites/Vehicles/Car.png';
        setCar(prevState => ({ ...prevState, image: carImage }));
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

            let drawImage = (e, image) => {
                if (image === backgroundImage) {
                    e.target.context.drawImage(image, 0, 0, canvas.width, canvas.height);
                } else if (image === helicopter.image) {
                    e.target.context.drawImage(image, (canvas.width - 200) - (helicopter.width / 2), (canvas.height / 2 - 150) - (helicopter.height / 2), helicopter.width, helicopter.height);
                } else if (image === plane.image) {
                    e.target.context.drawImage(image, 200 - (plane.width / 2), 200, plane.width, plane.height);
                } else if (image === car.image) {
                    e.target.context.drawImage(image, 200 - (car.width / 2), canvas.height - 200, car.width, car.height);
                }
            }

            let draw = (e) => {
                const imagesArray = [backgroundImage, helicopter.image, plane.image, car.image];

                imagesArray.forEach((image) => {
                    image.context = context;
                    image.onload = (e) => drawImage(e, image);
                });
            }

            function render() {

                // context.clearRect(0, 0, canvas.width, canvas.height);

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
                cancelAnimationFrame(requestId);
            };
        }
    }, [canvas, context]);

    return null;
};

export default Kinematics;
