'use client';
import { useEffect, useState, useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Stack, Container, CircularProgress, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { getFeaturedPlants, Product } from '@/services/plantService';

export default function ContentComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featured = await getFeaturedPlants();
        setProducts(featured);
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;

      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <Container sx={{ my: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container sx={{ my: 4, textAlign: 'center' }}>
        <Typography>No hay productos destacados.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Destacados
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton onClick={() => scroll('left')}>
          <ArrowBackIos />
        </IconButton>

        <Stack
          direction="row"
          spacing={4}
          ref={scrollRef}
          sx={{
            overflowX: 'auto',
            py: 2,
            px: 1,
            flexGrow: 1,
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-track': { bgcolor: '#f1f1f1' },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#4CAF50', borderRadius: 2 },
          }}
        >
          {products.map((product) => (
            <Card key={product.id} elevation={4} sx={{ minWidth: 280 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.imagen}
                alt={product.nombre}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.nombre}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.descripcion}
                </Typography>
                <Typography variant="subtitle1" color="#4CAF50" fontWeight="bold">
                  Precio: ${product.precio}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <IconButton onClick={() => scroll('right')}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Container>
  );
}
