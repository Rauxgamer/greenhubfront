'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ProfileComponent from '@/components/user/profile-component';
import { logoutUser } from '@/services/firebase';

export default function UserSettingsPage() {
  const [selectedOption, setSelectedOption] = useState<'profile'>('profile');
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/login';
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'profile':
        return <ProfileComponent />;
      default:
        return <Typography>Este módulo está deshabilitado temporalmente.</Typography>;
    }
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f8f8f8">
      {/* Sidebar */}
      <Paper
        elevation={2}
        sx={{
          width: { xs: 64, sm: 200, md: 260 },
          py: 2,
          transition: 'width .3s',
        }}
      >
        <Stack spacing={2} alignItems="stretch">
          {/* Página principal */}
          <Box
            component={Link}
            href="/home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <HomeIcon fontSize="small" />
            {!isXs && (
              <Typography variant="body1" ml={1}>
                Página principal
              </Typography>
            )}
          </Box>

          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedOption === 'profile'}
                onClick={() => setSelectedOption('profile')}
                sx={{ px: 2 }}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                {!isXs && <ListItemText primary="Perfil" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton disabled sx={{ px: 2 }}>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                {!isXs && <ListItemText primary="Suscripciones" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton disabled sx={{ px: 2 }}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                {!isXs && <ListItemText primary="Idioma" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton disabled sx={{ px: 2 }}>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                {!isXs && <ListItemText primary="Notificaciones" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton disabled sx={{ px: 2 }}>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                {!isXs && <ListItemText primary="Seguridad" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ px: 2 }}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                {!isXs && (
                  <ListItemText
                    primary="Cerrar sesión"
                    sx={{ color: 'error.main' }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Paper>

      {/* Contenido principal */}
      <Box flex={1} p={4}>
        {renderComponent()}
      </Box>
    </Box>
  );
}
