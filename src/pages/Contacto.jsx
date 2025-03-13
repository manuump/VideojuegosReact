import React from 'react';
import '../style/Contacto.css';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import '../style/Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto">
      <h1 className="contacto-title">Contacto</h1>
      <p className="contacto-description">
        ¡Conéctate con nosotros a través de nuestras redes sociales o envíanos un correo electrónico!
      </p>
      <div className="contacto-info">
        <p><FaEnvelope /> Email: <a href="mailto:contacto@manugames.com">contacto@manugames.com</a></p>
        <p><FaFacebook /> Facebook: <a href="https://facebook.com/manugames" target="_blank" rel="noopener noreferrer">@ManuGames</a></p>
        <p><FaTwitter /> Twitter: <a href="https://twitter.com/manugames" target="_blank" rel="noopener noreferrer">@ManuGames</a></p>
        <p><FaInstagram /> Instagram: <a href="https://instagram.com/manugames" target="_blank" rel="noopener noreferrer">@ManuGames</a></p>
      </div>
    </div>
  );
};

export default Contacto;
