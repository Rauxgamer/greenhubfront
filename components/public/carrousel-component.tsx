// src/components/public/carrousel-component.jsx
'use client';
import { Paper, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function CarrouselComponent() {
  const theme = useTheme();
  // Bajamos la altura del carrusel cuando la pantalla es extra pequeña (<600px)
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // sm ≈ 600px

  const portada = '/img1.jpg'; // Reemplaza con tu imagen

  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        // 500px en desktop, 200px en móvil
        height: isXs ? 200 : 500,
        mb: 2, // margen debajo
      }}
    >
      <Image
        src={portada}
        alt="Imagen de portada"
        fill
        style={{ objectFit: 'cover' }}
      />
    </Paper>
  );
}
