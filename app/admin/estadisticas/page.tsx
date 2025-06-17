'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';

import AdminSidebar from '@/components/admin/adminSidebar';
import AdminMenuComponent from '@/components/admin/AdminMenuComponent';
import Header from '@/components/header-component';  // <-- Importa tu nueva barra de navegación

const StatsChart = dynamic(
  () => import('@/components/admin/estadisticas/StatsChart'),
  { ssr: false }
);
const OrdersChart = dynamic(
  () => import('@/components/admin/estadisticas/OrdersChart'),
  { ssr: false }
);

export default function AdminDashboard() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMenuOpen(false);
    } else {
      setSidebarCollapsed(false);
      setMenuOpen(true);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant={isMobile ? 'temporary' : 'persistent'}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Contenedor principal */}
      <Box
        sx={{
          flexGrow: 1,
          transition: 'margin-left .3s',
          ml: isMobile
            ? 0
            : menuOpen
            ? sidebarCollapsed
              ? '60px'
              : '240px'
            : 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header con la estética nueva */}
        <Header
          collapsed={sidebarCollapsed}
          isSidebarOpen={menuOpen}
          isMobileMenuOpen={menuOpen}
          setIsMobileMenuOpen={setMenuOpen}
        />

        {/* Área de contenido */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: isMobile ? 2 : 4,
            mt: '80px',         // Ajusta según la altura de tu Header
            overflowX: 'hidden',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Estadísticas de Productos
          </Typography>
          <StatsChart />

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Estadísticas de Pedidos
          </Typography>
          <OrdersChart />
        </Box>
      </Box>

      {/* Menú móvil (si lo necesitas además del Header) */}
      {isMobile && (
        <AdminMenuComponent
          pageTitle="Administrar estadísticas"
          onMenuClick={() => setMenuOpen((prev) => !prev)}
        />
      )}
    </Box>
  );
}
