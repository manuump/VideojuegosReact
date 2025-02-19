import React, { useEffect, useState } from "react";
import '../style/ListaVideojuegos.css';
import FiltroMenu from "./FiltroMenu";

const ListaVideojuegos = () => {
  const [videojuegos, setVideojuegos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [plataformas, setPlataformas] = useState({});
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [selectedPlataformas, setSelectedPlataformas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        
        setSelectedCategorias([]);
        setSelectedPlataformas([]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const videojuegosFiltrados = videojuegos.filter(juego => {
    const matchSearchTerm = juego.nombre.toLowerCase().includes(searchTerm) || juego.descripción.toLowerCase().includes(searchTerm);
    const matchCategorias = selectedCategorias.length === 0 || juego.categorias.some(catId => selectedCategorias.includes(catId));
    const matchPlataformas = selectedPlataformas.length === 0 || juego.plataformas.some(platId => selectedPlataformas.includes(platId));
    return matchSearchTerm && matchCategorias && matchPlataformas;
  });

  const handleToggleCategoria = (categoriaId) => {
    if (selectedCategorias.includes(categoriaId)) {
      setSelectedCategorias(selectedCategorias.filter(id => id !== categoriaId));
    } else {
      setSelectedCategorias([...selectedCategorias, categoriaId]);
    }
  };
  

  const handleTogglePlataforma = (plataformaId) => {
    if (selectedPlataformas.includes(plataformaId)) {
      setSelectedPlataformas(selectedPlataformas.filter(id => id !== plataformaId));
    } else {
      setSelectedPlataformas([...selectedPlataformas, plataformaId]);
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelectJuego = (videojuego) => {
    setSelectedJuego(videojuego);
  };

  const handleDeleteJuego = async (id) => {
    try {
      await fetch(`http://localhost:3000/videojuegos/${id}`, { method: 'DELETE' });
      setVideojuegos(prev => prev.filter(juego => juego.id !== id));
      setSelectedJuego(null); 
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  return (
    <div className="videojuegos-list">
      <h2>Lista Videojuegos</h2>
      
      <FiltroMenu
        titulo="Categorías"
        opciones={categorias}
        seleccionados={selectedCategorias}
        onToggle={handleToggleCategoria}
      />
      
      <FiltroMenu
        titulo="Plataformas"
        opciones={plataformas}
        seleccionados={selectedPlataformas}
        onToggle={handleTogglePlataforma}
      />

      <div className="search-box">
        Busca por nombre:
        <input 
          type="text" 
          placeholder="Buscar videojuegos..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="videojuegos-container">
        {videojuegosFiltrados.map((videojuego) => (
          <div 
            key={videojuego.id} 
            className="videojuego-item" 
            onClick={() => handleSelectJuego(videojuego)}
          >
            <h3>{videojuego.nombre}</h3>
            <img src={videojuego.url_imagen} alt={videojuego.nombre} className="videojuego-portada" />
            <p><strong>Plataformas:</strong> {videojuego.plataformas.map(id => plataformas[id]).join(", ")}</p>
            <p><strong>Categorías:</strong> {videojuego.categorias.map(id => categorias[id]).join(", ")}</p>
            <p><strong>Precio:</strong> {videojuego.precio}€</p>
            <a href={videojuego.url_video} target="_blank" rel="noopener noreferrer" className="ver-trailer">Ver Trailer</a>
            <p><strong>Descripción:</strong> {videojuego.descripción.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedJuego && (
  <div className="detalle-videojuego-overlay">
    <div className="detalle-videojuego">
      <h2>{selectedJuego.nombre}</h2>
      <img src={selectedJuego.url_imagen} alt={selectedJuego.nombre} className="detalle-imagen" />
      <p><strong>Precio:</strong> {selectedJuego.precio}€</p>
      <p><strong>Plataformas:</strong> {selectedJuego.plataformas.map(id => plataformas[id]).join(", ")}</p>
      <p><strong>Categorías:</strong> {selectedJuego.categorias.map(id => categorias[id]).join(", ")}</p>
      <p><strong>Descripción:</strong> {selectedJuego.descripción}</p>
      <a href={selectedJuego.url_video} target="_blank" rel="noopener noreferrer" className="ver-trailer">Ver Trailer</a>
        <button 
          onClick={() => handleDeleteJuego(selectedJuego.id)} 
          className="delete-button-videojuego"
        >Eliminar Videojuego</button>
      <span onClick={() => setSelectedJuego(null)} className="close-icon">X</span>
    </div>
  </div>
)}

    </div>
  );
}

export default ListaVideojuegos;
