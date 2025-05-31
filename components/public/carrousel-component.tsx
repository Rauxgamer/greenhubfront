'use client';
import { Paper } from '@mui/material';
import Image from 'next/image';

export default function CarrouselComponent() {
  const portada = "/img1.jpg"; // Cambia aquí por la imagen que desees utilizar como portada

  return (
    <Paper sx={{ height: 500, position: 'relative' }}>
      <Image
        src={portada}
        alt="Imagen de portada"
        fill
        style={{ objectFit: 'cover' }}
      />
    </Paper>
  );
}
