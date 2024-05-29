import { Link } from "react-router-dom";
import monkey from './assets/monkey.png';
import duck from './assets/duck.png';
import brain from './assets/brain.png';
import eyes from './assets/eyes.png';
import titulo from './assets/titulo.png';
import rocket from './assets/rocket.png';
import gift from './assets/gift.png';
import interrogante from './assets/interrogante.png';
import guess from './assets/guess.png';

export default function Menu() {
  const games = [
    { to: "/patitos", name: "Patitos", img: duck, imgClass: "w-8" },
    { to: "/simon", name: "Sequence Memory", img: brain, imgClass: "w-9" },
    { to: "/chimp", name: "Chimp Test", img: monkey, imgClass: "w-9" },
    { to: "/visual", name: "Visual Memory", img: eyes, imgClass: "w-8" },
    { to: "/kinematics", name: "Kinematics", img: rocket, imgClass: "w-8" },
    { to: "/words-box-1", name: "WordsBox1", img: gift, imgClass: "w-12" },
    { to: "/knownWords", name: "Known Words", img: interrogante, imgClass: "w-6" },
    { to: "/guess", name: "Guess!", img: guess, imgClass: "w-12" },
  ];

  return (
    <div id="root" className="h-screen flex flex-col justify-center items-center px-5 md:px-10 lg:px-20 overflow-hidden">
      <img src={titulo} className="w-60" alt="Título" />
      <h3 className="text-blue-600 text-2xl text-center mt-5 mb-10">
        Por favor, selecciona a qué quieres jugar:
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white text-lg text-center">
        {games.map((game, index) => (
          <li key={index} className="flex justify-center">
            <Link
              to={game.to}
              className="w-full p-8 flex flex-col items-center bg-teal-400 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <span>{game.name}</span>
              <img src={game.img} alt={game.name} className={`${game.imgClass} mt-2`} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
