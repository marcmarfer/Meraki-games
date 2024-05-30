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
    { to: "/patitos?id=123&gameTest_id=7&test_id=10&game_id=13&level=5", name: "Patitos", img: duck, imgClass: "w-8" },
    { to: "/simon?id=124&gameTest_id=8&test_id=11&game_id=14&level=5", name: "Sequence Memory", img: brain, imgClass: "w-9" },
    { to: "/chimp?id=125&gameTest_id=9&test_id=12&game_id=15&level=1", name: "Chimp Test", img: monkey, imgClass: "w-9" },
    { to: "/visual?id=126&gameTest_id=10&test_id=13&game_id=16&level=5", name: "Visual Memory", img: eyes, imgClass: "w-8" },
    { to: "/kinematics?id=127&gameTest_id=11&test_id=14&game_id=17&level=5", name: "Kinematics", img: rocket, imgClass: "w-8" },
    { to: "/words-box-1?id=128&gameTest_id=12&test_id=15&game_id=18&level=5", name: "WordsBox1", img: gift, imgClass: "w-12" },
    { to: "/knownWords?id=129&gameTest_id=13&test_id=16&game_id=19&level=5", name: "Known Words", img: interrogante, imgClass: "w-6" },
    // { to: "/guess?id=130&gameTest_id=14&test_id=17&game_id=20&level=5", name: "Guess!", img: guess, imgClass: "w-12" },
    //guess game is not ended yet
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
