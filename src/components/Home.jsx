import React from 'react';
import { Link } from 'react-router-dom'; 
import '../style/Home.css';

const Home = () => {
  return (
    <div className="home-div">
      <div className="home-container">
        <h1 className="home-title">Bienvenido a ManuGames</h1>
        <p className="home-description">
          Explora una amplia variedad de videojuegos y sumérgete en aventuras únicas.
        </p>
        <Link to="/videojuegos" className="videojuegos-link">Catalogo Videojuegos</Link>
      </div>
    </div>
  );
};

export default Home;
