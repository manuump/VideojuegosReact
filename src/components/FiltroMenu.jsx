import React from 'react';

const FiltroMenu = ({ titulo, opciones, seleccionados, onToggle }) => (
  <div className="filtro-menu">
    <h3>{titulo}</h3>
    <div className="opciones-container">
      {Object.entries(opciones).map(([id, nombre]) => (
        <label key={id} className="opcion-item">
          <input
            type="checkbox"
            checked={seleccionados.includes(Number(id))}
            onChange={() => onToggle(Number(id))}
          />
          {nombre}
        </label>
      ))}
    </div>
  </div>
);

export default FiltroMenu;