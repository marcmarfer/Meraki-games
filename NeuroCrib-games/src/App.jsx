// Librerias
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Patitos from './juegos/patitos/Patitos';
import Menu from './Menu';

// Estilos CSS
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/patitos" element={<Patitos />} />
      </Routes>
    </Router>
  );
}