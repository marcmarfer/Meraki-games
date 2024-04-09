import { Link } from "react-router-dom";

export default function Menu() {

  return (
    <>
      <h1 className='text-blue-700 text-5xl text-center pt-40'>¡Bienvenido a NeuroLab!</h1>
      <h3 className="text-blue-600 text-xl text-center pt-10">Por favor, selecciona a qué quieres jugar:</h3>
      <ul className="flex flex-wrap justify-center text-blue-400 text-lg text-center pt-10">
        <li className="w-1/2 p-5">
          <Link to="/patitos">Patitos</Link>
        </li>
        <li className="w-1/2 p-5">
          <Link to="/simon">Simón dice</Link>
        </li>
        <li className="w-1/2 p-5">
          <Link to="/chimp">Chimp</Link>
        </li>
        <li className="w-1/2 p-5">
          <Link to="/visual">Visual</Link>
        </li>

      </ul>
    </>
  )
}