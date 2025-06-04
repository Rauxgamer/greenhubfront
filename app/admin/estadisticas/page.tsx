'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import AdminSidebar from '@/components/admin/adminSidebar';
import dynamic from 'next/dynamic';
import AdminMenuComponent from '@/components/admin/AdminMenuComponent';

const StatsChart = dynamic(
  () => import('@/components/admin/estadisticas/StatsChart'),
  { ssr: false }
);
const OrdersChart = dynamic(
  () => import('@/components/admin/estadisticas/OrdersChart'),
  { ssr: false }
);

export default function AdminDashboard() {
  // Detectamos si estamos en mobile (<900px)
  const isMobile = useMediaQuery('(max-width:900px)');

  // Control de si el drawer (sidebar) está abierto (para modo temporary)
  const [menuOpen, setMenuOpen] = useState(false);

  // Control de si el sidebar está colapsado (60px) o expandido (240px)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Cuando cambie el breakpoint mobile/desktop, ajustamos el estado colapsado:
  //  • En mobile siempre lo dejamos colapsado y cerrado (temporary).
  //  • En desktop arrancamos expandido.
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMenuOpen(false); // en mobile el drawer solo se abre al hacer clic
    } else {
      setSidebarCollapsed(false);
      setMenuOpen(true); // en desktop lo mantenemos “persistent” abierto
    }
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/**
        AdminMenuComponent debe renderizar el AppBar (barra superior). Recibe:
        - pageTitle: el título que se mostrará
        - onMenuClick: se dispara cuando el usuario pulsa el icono “hamburguesa” en mobile
      **/}
      <AdminMenuComponent
        pageTitle="Administrar estadísticas"
        onMenuClick={() => {
          // Solo abrimos/cerramos el drawer en modo mobile
          if (isMobile) {
            setMenuOpen((prev) => !prev);
          }
        }}
      />

      {/**
        Sidebar:
        - open: controla si el Drawer está “visible”. En mobile será temporary; en desktop será persistent.
        - onClose: función para cerrarlo en modo temporary (mobile).
        - variant: 'temporary' en mobile, 'persistent' en desktop.
        - collapsed & setCollapsed: control de ancho (60px o 240px) para desktop.
      **/}
      <AdminSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant={isMobile ? 'temporary' : 'persistent'}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/**
        Contenido principal:
        - El margin-left se ajusta solo en desktop:
            • Si sidebarCollapsed===true  => ml: '60px'
            • Si sidebarCollapsed===false => ml: '240px'
        - En mobile (temporary), siempre ml: 0 porque el drawer flota sobre el contenido.
        - mt:"80px" para dejar hueco debajo del AppBar.
        - Padding adaptativo: más pequeño en mobile para aprovechar espacio.
      **/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile
            ? 0
            : menuOpen
            ? sidebarCollapsed
              ? '60px'
              : '240px'
            : 0,
          mt: '80px',
          p: isMobile ? 1 : 3,
          overflowX: 'hidden',
        }}
      >
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Estadísticas de Productos
        </Typography>
        <StatsChart />

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Estadísticas de Pedidos
        </Typography>
        <OrdersChart />
      </Box>
    </Box>
  );
}
