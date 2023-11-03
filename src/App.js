import './App.css';
import Home from './componentes/Home';
import Sobre from './componentes/Sobre';
import Alunos from './componentes/Alunos';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD App with React</h1>
      <BrowserRouter>
      <Nav variant="tabs"><Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
      <Nav.Link as={Link} to="/alunos">Alunos</Nav.Link>
      <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link></Nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/alunos" element={<Alunos />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
