'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import AdminSidebar from '@/components/admin/adminSidebar';
import dynamic from 'next/dynamic';
import AdminMenuComponent from '@/components/admin/AdminMenuComponent';
import { insertarDatos } from '@/services/uploadArboles';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMenuOpen(false);
    } else {
      setSidebarCollapsed(false);
      setMenuOpen(true);
    }
  }, [isMobile]);

  // const handleInsertData = async () => {
  //   setLoading(true);
  //   setError(null); // Limpia el error previo

  //   try {
  //     const response = await insertarDatos();
  //     if (response.success) {
  //       alert('Datos insertados exitosamente');
  //     } else {
  //       setError(response.error || 'Error desconocido');
  //     }
  //   } catch (err: any) {
  //     setError(err.message || 'Error desconocido');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <AdminMenuComponent
        pageTitle="Administrar estadísticas"
        onMenuClick={() => {
          if (isMobile) {
            setMenuOpen((prev) => !prev);
          }
        }}
      />
      <AdminSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        variant={isMobile ? 'temporary' : 'persistent'}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : menuOpen ? (sidebarCollapsed ? '60px' : '240px') : 0,
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
        {/* <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Añadir productos plantas
        </Typography> */}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleInsertData}
          disabled={loading}
        >
          {loading ? 'Insertando...' : 'Insertar Datos'}
        </Button>

        {error && <Typography color="error">{error}</Typography>} */}
      </Box>
    </Box>
  );
}
