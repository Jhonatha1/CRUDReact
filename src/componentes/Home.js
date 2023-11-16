import React, { useState, useEffect } from 'react';
import imagemFundo from '../blur_image.jpg';

function Home() {
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
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
  };

  const estiloTexto = {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    transition: 'text-shadow 0.3s ease-out',
  };

  const estiloTextoHover = {
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  return (
    <div className="Home" style={estiloDoFundo}>
      <div
        style={{ ...estiloTexto, ...(hovered ? estiloTextoHover : {}) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h1>Seja Bem-Vindo!</h1>
        <p>Navegue entre as abas no canto superior da página...</p>
      </div>
    </div>
  );
}

export default Home;
