import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="titulo-pagina">
            <img src={logo} alt="Logo" className="logo-img" />
            ManuGames
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/videojuegos">Videojuegos</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;