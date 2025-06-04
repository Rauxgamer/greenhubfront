'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  BarChart,
  People,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface AdminSidebarProps {
  open: boolean;                       // Si el Drawer está abierto (persistent) o visible (temporary en móvil)
  onClose: () => void;                 // Callback para cerrar el Drawer en modo "temporary"
  variant: 'permanent' | 'temporary';  // Define si es permanente (desktop) o temporal (móvil)
  collapsed: boolean;                  // Estado externo: true = colapsado (60px), false = expandido (240px)
  setCollapsed: (value: boolean) => void;
}

export default function AdminSidebar({
  open,
  onClose,
  variant,
  collapsed,
  setCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  // “isMobile” será true si ancho <= md (~900px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // useRef para saber si ya inicializamos el estado en desktop
  const initializedDesktop = useRef(false);

  useEffect(() => {
    if (isMobile) {
      // Siempre que estemos en móvil, colapsamos el sidebar
      setCollapsed(true);
      // Y dejamos que initializedDesktop vuelva a false (para que, si volvemos a desktop, 
      // sepamos que debemos inicializar allí otra vez)
      initializedDesktop.current = false;
    } else {
      // Estamos en desktop
      // Si aún no hemos inicializado el estado en desktop => expandimos
      if (!initializedDesktop.current) {
        setCollapsed(false);           // Por defecto, expandido (240px)
        initializedDesktop.current = true; // Marcamos que ya inicializamos en desktop
      }
      // Si ya inicializamos alguna vez en desktop, NO hacemos setCollapsed(false) de nuevo,
      // para no “forzar” la expansión cuando el usuario lo colapse manualmente.
    }
  }, [isMobile, setCollapsed]);

  // Función para saber si la ruta está activa
  const isRouteActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Lista de ítems: texto, icono y ruta
  const menuItems = [
    { text: 'Pagina principal', icon: <Home />, link: '/home' },
    { text: 'Pedidos', icon: <ShoppingCart />, link: '/admin/pedidos' },
    { text: 'Estadísticas', icon: <BarChart />, link: '/admin/estadisticas' },
    { text: 'Productos', icon: <ShoppingCart />, link: '/admin/productos' },
    { text: 'Usuarios', icon: <People />, link: '/admin/usuarios' },
  ];

  // Ancho dinámico: 60px colapsado, 240px expandido
  const drawerWidth = collapsed ? 60 : 240;
  // Altura total menos AppBar (80px)
  const drawerHeight = 'calc(100vh - 80px)';

  return (
    <Drawer
      variant={variant === 'temporary' ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,  // Mejora rendimiento en móvil
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          top: '80px',
          left: 0,
          height: drawerHeight,
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
          borderRight: '1px solid rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* 
        Encabezado con título y botón de colapsar/expandir 
      */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: 1,
          height: '64px',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        )}
        <IconButton
          onClick={() => setCollapsed(prev => !prev)}
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          sx={
            collapsed
              ? {
                  display: 'flex',
                  margin: '0 auto',
                }
              : {}
          }
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      {/* Lista de enlaces */}
      <List sx={{ mt: 1 }}>
        {menuItems.map(item => {
          const active = isRouteActive(item.link);
          return (
            <ListItem key={item.link} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                href={item.link}
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 0 : 2.5,
                  color: active ? theme.palette.primary.main : 'inherit',
                  backgroundColor: active
                    ? 'rgba(25, 118, 210, 0.08)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: active
                      ? 'rgba(25, 118, 210, 0.15)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 3,
                    justifyContent: 'center',
                    color: active ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
