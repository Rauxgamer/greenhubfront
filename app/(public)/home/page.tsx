'use client';
import { useEffect, useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import MenuComponent from '@/components/menu-component';
import CarrouselComponent from '@/components/public/carrousel-component';
import ContentComponent from '@/components/public/content-component';
import FooterComponent from '@/components/footer-component';
import AdminSidebar from '@/components/admin/adminSidebar';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from '@/services/authService';

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        setIsAdmin(userProfile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MenuComponent />
      <Toolbar />
      <Box display="flex" flex={1} sx={{ position: 'relative' }}>
        {isAdmin && <AdminSidebar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: isAdmin ? '280px' : 0, // Ajusta según ancho de tu nuevo menú
            p: 3,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <CarrouselComponent />
          <ContentComponent />
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
}
