// src/app/page.tsx (o HomePage.jsx)
'use client';
import { useEffect, useState } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import MenuComponent from '@/components/menu-component';
import CarrouselComponent from '@/components/public/carrousel-component';
import ContentComponent from '@/components/public/content-component';
import FooterComponent from '@/components/footer-component';
import AdminSidebar from '@/components/admin/adminSidebar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserProfile } from '@/services/authService';

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Control del sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Detectar si estamos en móvil (< 900px)
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const perfil = await getUserProfile(user.uid);
        const esAdmin = perfil?.role === 'admin';
        setIsAdmin(esAdmin);

        if (esAdmin) {
          if (isMobile) {
            // En móvil, cerramos el sidebar y lo dejamos colapsado
            setSidebarOpen(false);
            setSidebarCollapsed(true);
          } else {
            // En desktop, abrimos y expandimos por defecto
            setSidebarOpen(true);
            setSidebarCollapsed(false);
          }
        } else {
          setSidebarOpen(false);
        }
      } else {
        setIsAdmin(false);
        setSidebarOpen(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isMobile]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* AppBar superior */}
      <MenuComponent
        onMenuClick={() => {
          // Solo en móvil abrimos/cerramos el temporary drawer
          if (isMobile) {
            setSidebarOpen((prev) => !prev);
          }
        }}
        isAdmin={isAdmin}
      />

      {/* Dejar el espacio de 80px bajo el AppBar */}
      <Toolbar />

      <Box display="flex" flex={1}>
        {isAdmin && (
          <AdminSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            variant={isMobile ? 'temporary' : 'persistent'}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        )}

        {/* Contenido principal, con padding reducido en móvil */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: isMobile ? 1 : 2, // Menos padding en móvil (<900px)
            ml:
              isAdmin && !isMobile
                ? sidebarOpen
                  ? sidebarCollapsed
                    ? '60px'
                    : '240px'
                  : 0
                : 0,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <CarrouselComponent />
          <ContentComponent />
          <FooterComponent />
        </Box>
      </Box>
      
    </Box>
  );
}
