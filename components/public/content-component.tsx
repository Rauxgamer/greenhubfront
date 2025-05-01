'use client';
import { Card, CardMedia, CardContent, Typography, IconButton, Stack, Container } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { useState } from 'react';

const products = [
  { img: '/plant1.png', name: 'Planta 1' },
  { img: '/plant2.png', name: 'Planta 2' },
  { img: '/plant3.png', name: 'Planta 3' },
];

export default function ContentComponent() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % products.length);
  const prev = () => setIndex((index - 1 + products.length) % products.length);

  return (
    <Container sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Destacados</Typography>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <IconButton onClick={prev}><ArrowBackIos /></IconButton>
        <Card elevation={3} sx={{ maxWidth: 345 }}>
          <CardMedia component="img" height="250" image={products[index].img} alt={products[index].name} />
          <CardContent>
            <Typography>{products[index].name}</Typography>
          </CardContent>
        </Card>
        <IconButton onClick={next}><ArrowForwardIos /></IconButton>
      </Stack>
    </Container>
  );
}
