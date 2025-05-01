'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment, Button, Tooltip } from '@mui/material';
import { ShoppingCart, Person, AdminPanelSettings, Search } from '@mui/icons-material';

export default function MenuComponent() {
  return (
    <AppBar position="fixed" color="inherit" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Image src="/log.png" alt="Logo" width={50} height={50} />

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
          sx={{ width: '30%' }}
        />

        <div>
          <Tooltip title="Perfil">
            <IconButton component={Link} href="/user"><Person /></IconButton>
          </Tooltip>
          <Tooltip title="Carrito">
            <IconButton component={Link} href="/checkout"><ShoppingCart /></IconButton>
          </Tooltip>
          <Button component={Link} href="/products">Productos</Button>
          <Tooltip title="Admin deshabilitado">
            <IconButton disabled><AdminPanelSettings /></IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}
