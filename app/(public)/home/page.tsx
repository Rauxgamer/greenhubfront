'use client';
import { Box, Toolbar } from '@mui/material';
import MenuComponent from '@/components/menu-component';
import CarrouselComponent from '@/components/public/carrousel-component';
import ContentComponent from '@/components/public/content-component';
import FooterComponent from '@/components/footer-component';

export default function HomePage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MenuComponent />
      <Toolbar /> {/* Para dar espacio al AppBar */}
      <CarrouselComponent />
      <ContentComponent />
      <FooterComponent />
    </Box>
  );
}
