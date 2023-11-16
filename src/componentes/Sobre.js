import React, { useState, useEffect } from 'react';
import imagemFundo from '../blur_image.jpg';

function Sobre() {
  const [hovered, setHovered] = useState(true);

  useEffect(() => {
    // Define o estado para false após 3 segundos (3000 milissegundos)
    const timeout = setTimeout(() => {
      setHovered(false);
    }, 3000);

    // Limpa o timeout ao desmontar o componente
    return () => clearTimeout(timeout);
  }, []);

  const estiloDoFundo = {
    backgroundImage: `url(${imagemFundo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    alignItems: 'center',
    color: 'black',
    textAlign: 'left',
  };

  const estiloTexto = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const estiloTextoHover = {
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <div className="Sobre" style={estiloDoFundo}>
      <div
        style={{ ...estiloTexto, ...(hovered ? estiloTextoHover : {}) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h1>CRUD de Alunos</h1>
        
      </div>
      <p>
          O site é responsável por gerenciar dados de alunos, permitindo operações como adição, atualização, exclusão e consulta de informações.
          Utilizei uma API feita com JSON, ela garante o funcionamento do site. Essa página foi feita utilizando React e Bootstrap, também utilizei o React Router para criar as rotas.
        </p>
    </div>
  );
}

export default Sobre;
