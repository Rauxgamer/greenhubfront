'use client';
import { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import AdminSidebar from '@/components/admin/adminSidebar';
import dynamic from 'next/dynamic';
import AdminMenuComponent from '@/components/admin/AdminMenuComponent';

const StatsChart = dynamic(() => import('@/components/admin/estadisticas/StatsChart'), { ssr: false });
const OrdersChart = dynamic(() => import('@/components/admin/estadisticas/OrdersChart'), { ssr: false });

export default function AdminDashboard() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: isMobile ? 'column' : 'row' }}>
      <AdminMenuComponent pageTitle="Administrar estadísticas" onMenuClick={() => setMenuOpen(true)} />
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Box component="main" sx={{
        flexGrow: 1,
        ml: { xs: 0, md: '280px' },
        mt: '80px',
        p: { xs: 1, md: 3 },
        overflowX: 'hidden'
      }}>
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
