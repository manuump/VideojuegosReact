import React from "react";

const VideojuegoItem = ({ videojuego, plataformas, categorias, onSelect }) => {
  return (
    <div className="videojuego-item" onClick={() => onSelect(videojuego)}>
      <h3>{videojuego.nombre}</h3>
      <img src={videojuego.url_imagen} alt={videojuego.nombre} className="videojuego-portada" />
      <p><strong>Plataformas:</strong> {videojuego.plataformas.map(id => plataformas[id]).join(", ")}</p>
      <p><strong>Categorías:</strong> {videojuego.categorias.map(id => categorias[id]).join(", ")}</p>
      <p><strong>Precio:</strong> {videojuego.precio}€</p>
      <a href={videojuego.url_video} target="_blank" rel="noopener noreferrer" className="ver-trailer">Ver Trailer</a>
      <p><strong>Descripción:</strong> {videojuego.descripción.slice(0, 100)}...</p>
    </div>
  );
};

export default VideojuegoItem;
