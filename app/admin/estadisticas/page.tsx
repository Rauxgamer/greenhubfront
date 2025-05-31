'use client';
import { Box, Typography } from '@mui/material';
import AdminSidebar from '@/components/admin/adminSidebar';
import dynamic from 'next/dynamic';

const StatsChart = dynamic(() => import('@/components/admin/estadisticas/StatsChart'), { ssr: false });
const OrdersChart = dynamic(() => import('@/components/admin/estadisticas/OrdersChart'), { ssr: false });

import AdminMenuComponent from '@/components/admin/AdminMenuComponent';

export default function AdminDashboard() {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AdminSidebar />
        <AdminMenuComponent pageTitle={'Administrar estadísticas'}/>
        
            <Box component="main" sx={{
                flexGrow: 1,
                ml: { xs: 0, md: '280px' },
                width: { xs: '100%', md: 'calc(100% - 280px)' },
                mt: '80px', // Añadir margen superior correspondiente al alto del menú superior
                p: 3,
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
