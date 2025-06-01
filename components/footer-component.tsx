'use client';
import { Box, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

export default function FooterComponent() {
  return (
    <Box
      sx={{
        bgcolor: '#263238',
        color: '#fff',
        py: 2,
        mt: 'auto',
        px: { xs: 2, md: 4 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Facebook />
        <Instagram />
        <Twitter />
      </Stack>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        © 2025 GreenHub. Todos los derechos reservados.
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={1}
      >
        <MuiLink href="/legal" color="inherit">
          Información Legal
        </MuiLink>
        <MuiLink href="/privacy" color="inherit">
          Privacidad
        </MuiLink>
        <MuiLink href="/terms" color="inherit">
          Términos
        </MuiLink>
      </Stack>
    </Box>
  );
}
