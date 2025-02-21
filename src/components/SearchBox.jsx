import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box">
      Busca por nombre:
      <input 
        type="text" 
        placeholder="Buscar videojuegos..." 
        value={value}
        onChange={(e) => onChange(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default SearchBox;
