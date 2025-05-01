'use client';
import { useState } from 'react';
import { Button, TextField, Typography, Divider, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { loginUser, loginWithGoogle } from '@/services/firebase';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailLogin = async () => {
    try {
      await loginUser(email, password);
      router.push('/user');
    } catch (error) {
      alert('Error al iniciar sesión: ' + error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push('/user');
    } catch (error) {
      alert('Error al iniciar sesión con Google: ' + error);
    }
  };

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

      <Button 
        variant="contained" 
        sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#2E7D32' } }}
        onClick={handleEmailLogin}
      >
        Inicia sesión
      </Button>

      <Divider>O continúa con</Divider>

      <Button
      variant="outlined"
      onClick={handleGoogleLogin}
      sx={{
        bgcolor: '#fff',
        color: '#757575',
        textTransform: 'none',
        borderColor: '#ddd',
        boxShadow: 'none',
        '&:hover': {
          bgcolor: '#f7f7f7',
          borderColor: '#ccc',
        },
      }}
      startIcon={
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google Logo"
          style={{ width: 20, height: 20 }}
        />
      }
    >
      Iniciar sesión con Google
    </Button>
    </Stack>
  );
};
