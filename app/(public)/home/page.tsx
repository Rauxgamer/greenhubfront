// src/app/page.tsx (o HomePage.jsx)
'use client';
import { useEffect, useRef, useState } from 'react';
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

  // Ref para saber si ya inicializamos el estado en Desktop al menos una vez
  const initializedDesktop = useRef(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const perfil = await getUserProfile(user.uid);
        const esAdmin = perfil?.role === 'admin';
        setIsAdmin(esAdmin);

        if (esAdmin) {
          if (isMobile) {
            // Si estamos en Mobile, siempre colapsado y cerrado
            setSidebarOpen(false);
            setSidebarCollapsed(true);
            // Como estamos en mobile, reseteamos la inicialización de desktop
            initializedDesktop.current = false;
          } else {
            // Si estamos en Desktop
            if (!initializedDesktop.current) {
              // Solo la PRIMERA vez que llegamos a Desktop, abrimos y expandimos
              setSidebarOpen(true);
              setSidebarCollapsed(false);
              initializedDesktop.current = true;
            }
            // Si ya inicializamos Desktop antes, no hacemos nada y dejamos que el usuario controle el colapsado
          }
        } else {
          // Si no es admin, siempre cerrado
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
          if (isMobile) {
            // En móvil: abrimos/cerramos el Drawer temporary
            setSidebarOpen(prev => !prev);
          } else {
            // En desktop: colapsamos/expandimos
            setSidebarCollapsed(prev => !prev);
          }
        }}
        isAdmin={isAdmin}
      />

      {/* Toolbar vacío para dejar 80px bajo el AppBar */}
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

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: isMobile ? 1 : 2, // Menos padding en móvil
            ml:
              isAdmin && !isMobile
                ? (sidebarOpen
                    ? sidebarCollapsed
                      ? '60px'
                      : '240px'
                    : 0)
                : 0,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <CarrouselComponent />
          <ContentComponent />
        </Box>
      </Box>

      {/* Footer fuera del main para que ocupe 100% de ancho */}
      <FooterComponent />
    </Box>
  );
}
