import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './componentes/Home';
import Sobre from './componentes/Sobre';
import Alunos from './componentes/Alunos';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">CRUD App with React</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
            <Nav.Link as={Link} to="/alunos">Alunos</Nav.Link>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/alunos" element={<Alunos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
