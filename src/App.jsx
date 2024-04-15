// Librerias
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Patitos from './juegos/patitos/Patitos';
import Visual from './juegos/visualGame/Visual';
import Chimp from './juegos/chimp/Chimp';
import Simon from './juegos/simon/Simon';
import Menu from './Menu';
import Kinematics from './juegos/Kinematics/Kinematics';

// Estilos CSS
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/patitos" element={<Patitos />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/simon" element={<Simon />} />
        <Route path="/chimp" element={<Chimp />} />
        <Route path="/kinematics" element={<Kinematics />} />
      </Routes>
    </Router>
  );
}