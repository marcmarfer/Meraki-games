import { Link } from "react-router-dom";
import monkey from './assets/monkey.png';
import duck from './assets/duck.png';
import brain from './assets/brain.png';
import eyes from './assets/eyes.png';

export default function Menu() {
  return (
    <>
      <h1 className='text-blue-700 text-5xl text-center pt-40'>¡Bienvenido a NeuroLab!</h1>
      <h3 className="text-blue-600 text-xl text-center pt-10">Por favor, selecciona a qué quieres jugar:</h3>
      <ul className="flex flex-wrap justify-center text-blue-400 text-lg text-center pt-10">
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/patitos">Patitos</Link>
          <Link to="/patitos"><img src={duck} alt="" className="w-8 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/simon">Sequence Memory</Link>
          <Link to="/simon"><img src={brain} alt="" className="w-9 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/chimp">Chimp Test</Link>
          <Link to="/chimp"><img src={monkey} alt="" className="w-9 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/visual">Visual Memory</Link>
          <Link to="/visual"><img src={eyes} alt="" className="w-8 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5">
          <Link to="/kinematics">Kinematics</Link>
        </li>
      </ul>
    </>
  );
}
