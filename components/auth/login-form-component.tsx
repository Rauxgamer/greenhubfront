'use client';

import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { loginUser, loginWithGoogle } from '@/services/firebase';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Estados para el diálogo de feedback
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState('');

  const showDialog = (title: string, text: string) => {
    setDialogTitle(title);
    setDialogText(text);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleEmailLogin = async () => {
    try {
      await loginUser(email, password);
      showDialog('¡Bienvenido de nuevo!', 'Redirigiendo a tu perfil…');
      setTimeout(() => {
        handleClose();
        router.push('/user');
      }, 1500);
    } catch {
      showDialog('¡Ups! Algo salió mal', 'Prueba a volver a loguearte');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showDialog('¡Bienvenido de nuevo!', 'Redirigiendo a tu perfil…');
      setTimeout(() => {
        handleClose();
        router.push('/user');
      }, 1500);
    } catch {
      showDialog('¡Ups! Algo salió mal', 'Prueba a volver a loguearte');
    }
  };

  return (
    <>
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
          fullWidth
          sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#2E7D32' } }}
          onClick={handleEmailLogin}
        >
          Inicia sesión
        </Button>

        <Divider>O continúa con</Divider>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleGoogleLogin}
          startIcon={<FaGoogle style={{ color: '#4285F4' }} />}
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
        >
          Iniciar sesión con Google
        </Button>
      </Stack>

      {/* Diálogo de feedback */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography align="center" variant="h6">
            {dialogTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText align="center">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: 'green',
              color: 'white',
              px: 4,
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' },
              },
              '&:hover': {
                bgcolor: 'darkgreen',
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
