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
            onChange={() => {
              if (seleccionados.includes(Number(id))) {
                onToggle(seleccionados.filter(item => item !== Number(id)));
              } else {
                onToggle([...seleccionados, Number(id)]);
              }
            }}
          />
          {nombre}
        </label>
      ))}
    </div>
  </div>
);


export default FiltroMenu;