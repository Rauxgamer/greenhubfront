'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, TextField, InputAdornment, Button, Tooltip, Avatar, Typography, Box } from '@mui/material';
import { ShoppingCart, Search, Person } from '@mui/icons-material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function MenuComponent() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppBar position="fixed" color="inherit" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', paddingY: '12px' }}>
        <Image src="/log.png" alt="Logo" width={60} height={60} />

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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Carrito">
            <IconButton component={Link} href="/checkout">
              <ShoppingCart />
            </IconButton>
          </Tooltip>
          <Button component={Link} href="/products">Productos</Button>

          <Button
            component={Link}
            href={user ? "/user" : "/login"}
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