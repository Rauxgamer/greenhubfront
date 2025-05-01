'use client';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Image from 'next/image';

export default function CarrouselComponent() {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

  return (
    <Carousel interval={7000} animation="slide" indicators={true}>
      {images.map((img, i) => (
        <Paper key={i} sx={{ height: 500, position: 'relative' }}>
          <Image src={img} alt={`Slide ${i}`} fill style={{ objectFit: 'cover' }} />
        </Paper>
      ))}
    </Carousel>
  );
}
