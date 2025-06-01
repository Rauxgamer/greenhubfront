'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Tooltip,
  Avatar,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { ShoppingCart, Search, Person, Menu as MenuIcon } from '@mui/icons-material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useTheme } from '@mui/material/styles';

export default function MenuComponent({ onMenuClick, isAdmin }) {
  const [user, setUser] = useState(null);
  const theme = useTheme();
  // Definimos “small” como ancho < 900px (igual que tu sidebar)
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // md ≈ 900px

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={2}
      sx={{
        // zIndex mayor que el Drawer para que siempre quede encima
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          paddingY: '8px',
          height: '80px',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/**
            - Solo si es admin y estamos en móvil, mostramos el botón hamburguesa.
            - En pantallas >= md (900px), el botón desaparece automáticamente.
          **/}
          {isAdmin && isMobile && (
            <IconButton
              color="inherit"
              aria-label="open sidebar"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Image
            src="/logo2.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
            priority
            unoptimized
          />
        </Box>

        {/* Search Bar centrada */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: '40%',
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              '&:hover': { bgcolor: '#f1f1f1', transition: '0.3s ease' },
            },
          }}
        />

        {/* Iconos/User a la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Carrito">
            <IconButton component={Link} href="/checkout">
              <ShoppingCart />
            </IconButton>
          </Tooltip>
          <Button component={Link} href="/products">
            Productos
          </Button>

          <Button
            component={Link}
            href={user ? '/user' : '/login'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: '20px',
              bgcolor: '#e8f5e9',
              color: '#333',
              textTransform: 'none',
              paddingX: '10px',
              '&:hover': {
                bgcolor: '#c8e6c9',
                transition: 'background-color 0.3s ease',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {user ? user.displayName || 'Usuario' : 'Iniciar sesión'}
            </Typography>
            {user && user.photoURL ? (
              <Avatar src={user.photoURL} sx={{ width: 30, height: 30 }} />
            ) : (
              <Avatar sx={{ bgcolor: '#757575', width: 30, height: 30 }}>
                <Person fontSize="small" />
              </Avatar>
            )}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
