'use client';
import { useState } from 'react';
import { Button, TextField, Typography, Divider, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Stack spacing={2}>
      <Typography variant="h5" color="#4CAF50" align="center" fontWeight="bold">
        Bienvenido de nuevo
      </Typography>

      <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#2E7D32' } }}>
        Inicia sesión
      </Button>

      <Divider>O continúa con</Divider>

      <Button variant="contained" color="error" startIcon={<GoogleIcon />}>
        Iniciar sesión con Google
      </Button>
    </Stack>
  );
}
