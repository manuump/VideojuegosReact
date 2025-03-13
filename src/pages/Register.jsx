import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [mensaje , setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email: email,
        password: password,
      });
      console.log('Usuario registrado:', response.data);
      setMensaje('Usuario registrado con exito')
      navigate('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      setMensaje('Error al registrar usuario')
      if (error.response) {
        console.error('Datos del error:', error.response.data);
        console.error('Código de estado:', error.response.status);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };

  return (
    <Container>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>

        <div style={{color:"red"}}>{mensaje}</div>
      </form>
    </Container>
  );
};

export default Register;