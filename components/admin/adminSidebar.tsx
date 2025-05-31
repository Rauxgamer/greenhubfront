'use client';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, ShoppingCart, BarChart, People } from '@mui/icons-material';
import Link from 'next/link';

export default function AdminSidebar() {
  const menuItems = [
    { text: 'HomePage', icon: <Home />, link: '/home' },
    { text: 'Pedidos', icon: <ShoppingCart />, link: '/admin/pedidos' },
    { text: 'Estadísticas', icon: <BarChart />, link: '/admin/estadisticas' },
    { text: 'Productos', icon: <ShoppingCart />, link: '/admin/productos' },
    { text: 'Usuarios', icon: <People />, link: '/admin/usuarios' },
  ];

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: '#ffffff',
        color: '#333',
        position: 'fixed',
        top: 64,
        bottom: 0,
        left: 0,
        overflowY: 'auto',
        boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>
        Admin Panel
      </Typography>

      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              href={item.link}
              passHref
              sx={{
                borderRadius: '10px',
                '&:hover': {
                  bgcolor: '#e0f2f1',
                  transition: 'background-color 0.3s ease',
                },
              }}
            >

              <ListItemIcon sx={{ color: '#757575' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}