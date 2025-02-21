import React from "react";

const DetalleVideojuego = ({ videojuego, plataformas, categorias, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/videojuegos/${videojuego.id}`, { method: 'DELETE' });
      onDelete(prev => prev.filter(juego => juego.id !== videojuego.id));
      onClose();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div className="detalle-videojuego-overlay">
      <div className="detalle-videojuego">
        <h2>{videojuego.nombre}</h2>
        <img src={videojuego.url_imagen} alt={videojuego.nombre} className="detalle-imagen" />
        <p><strong>Precio:</strong> {videojuego.precio}€</p>
        <p><strong>Plataformas:</strong> {videojuego.plataformas.map(id => plataformas[id]).join(", ")}</p>
        <p><strong>Categorías:</strong> {videojuego.categorias.map(id => categorias[id]).join(", ")}</p>
        <p><strong>Descripción:</strong> {videojuego.descripción}</p>
        <a href={videojuego.url_video} target="_blank" rel="noopener noreferrer" className="ver-trailer">Ver Trailer</a>
        <button onClick={handleDelete} className="delete-button-videojuego">Eliminar Videojuego</button>
        <span onClick={onClose} className="close-icon">X</span>
      </div>
    </div>
  );
};

export default DetalleVideojuego;
