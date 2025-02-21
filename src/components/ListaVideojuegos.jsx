import React, { useEffect, useState } from "react";
import '../style/ListaVideojuegos.css';
import FiltroMenu from "./FiltroMenu";
import VideojuegoItem from "./VideojuegoItem";
import DetalleVideojuego from "./DetalleVideojuego";
import SearchBox from "./SearchBox";

const ListaVideojuegos = () => {
  const [videojuegos, setVideojuegos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [plataformas, setPlataformas] = useState({});
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedPlataformas, setSelectedPlataformas] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [selectedJuego, setSelectedJuego] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesRes, catsRes, platRes] = await Promise.all([
          fetch("http://localhost:3000/videojuegos"),
          fetch("http://localhost:3000/categorias"),
          fetch("http://localhost:3000/plataformas")
        ]);
        
        const gamesData = await gamesRes.json();
        const catsData = await catsRes.json();
        const platData = await platRes.json();

        const catsMap = Object.fromEntries(catsData.map(c => [c.id, c.nombre]));
        const platMap = Object.fromEntries(platData.map(p => [p.id, p.nombre]));

        setCategorias(catsMap);
        setPlataformas(platMap);
        setVideojuegos(gamesData);

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const videojuegosFiltrados = videojuegos.filter(juego => {
    const matchSearchTerm = juego.nombre.toLowerCase().includes(buscar) || juego.descripción.toLowerCase().includes(buscar);
    const matchCategorias = selectedCategorias.length === 0 || juego.categorias.some(catId => selectedCategorias.includes(catId));
    const matchPlataformas = selectedPlataformas.length === 0 || juego.plataformas.some(platId => selectedPlataformas.includes(platId));
    return matchSearchTerm && matchCategorias && matchPlataformas;
  });

  return (
    <div className="videojuegos-list">
      <h2>Lista Videojuegos</h2>

      <FiltroMenu
        titulo="Categorías"
        opciones={categorias}
        seleccionados={selectedCategorias}
        onToggle={setSelectedCategorias}
      />
      
      <FiltroMenu
        titulo="Plataformas"
        opciones={plataformas}
        seleccionados={selectedPlataformas}
        onToggle={setSelectedPlataformas}
      />

      <SearchBox value={buscar} onChange={setBuscar} />

      <div className="videojuegos-container">
        {videojuegosFiltrados.map((videojuego) => (
          <VideojuegoItem
            key={videojuego.id}
            videojuego={videojuego}
            plataformas={plataformas}
            categorias={categorias}
            onSelect={setSelectedJuego}
          />
        ))}
      </div>

      {selectedJuego && (
        <DetalleVideojuego
          videojuego={selectedJuego}
          plataformas={plataformas}
          categorias={categorias}
          onClose={() => setSelectedJuego(null)}
          onDelete={setVideojuegos}
        />
      )}
    </div>
  );
};

export default ListaVideojuegos;
