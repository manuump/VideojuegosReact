import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ListaVideojuegos from './components/ListaVideojuegos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videojuegos" element={<PrivateRoute element={<ListaVideojuegos />} />} />
          <Route path="/contacto" element={<PrivateRoute element={<Contacto />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;