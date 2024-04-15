import { Link } from "react-router-dom";
import monkey from './assets/monkey.png';
import duck from './assets/duck.png';
import brain from './assets/brain.png';
import eyes from './assets/eyes.png';
import titulo from './assets/titulo.png';
import rocket from './assets/rocket.png';

export default function Menu() {
  return (
    <div id="root" className="h-screen flex flex-col justify-center items-center">
      <h1 className='text-blue-700 text-5xl text-center pt-8'>
        <div className="pt-4 mr-7">Bienvenido a</div> <img src={titulo} className="w-80 mt-5" alt="Título" />
      </h1>
      <h3 className="text-blue-600 text-xl text-center mt-5">Por favor, selecciona a qué quieres jugar:</h3>
      <ul className="flex flex-wrap justify-center text-blue-600 text-lg text-center pt-5">
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/patitos" className="hover:text-yellow-500">Patitos</Link>
          <Link to="/patitos"><img src={duck} alt="" className="w-8 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/simon" className="hover:text-yellow-500">Sequence Memory</Link>
          <Link to="/simon"><img src={brain} alt="" className="w-9 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/chimp" className="hover:text-yellow-500">Chimp Test</Link>
          <Link to="/chimp"><img src={monkey} alt="" className="w-9 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/visual" className="hover:text-yellow-500">Visual Memory</Link>
          <Link to="/visual"><img src={eyes} alt="" className="w-8 mt-2" /></Link>
        </li>
        <li className="w-1/2 p-5 flex flex-col items-center">
          <Link to="/kinematics" className="hover:text-yellow-500">Kinematics</Link>
          <Link to="/kinematics"><img src={rocket} alt="" className="w-8 mt-2" /></Link>
        </li>
      </ul>
    </div>
  );
}
