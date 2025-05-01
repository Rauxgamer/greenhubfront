'use client';
import { useState } from 'react';
import { Box, Typography, Button, Paper, Stack, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import ProfileComponent from '@/components/user/profile-component';
import { logoutUser } from '@/services/firebase';

export default function UserSettingsPage() {
    const [selectedOption, setSelectedOption] = useState('profile');

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
            <Paper elevation={2} sx={{ width: 260, py: 2 }}>
                <Stack spacing={2}>
                    <IconButton component={Link} href="/home">
                        <ArrowBackIcon />
                    </IconButton>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton selected={selectedOption === 'profile'} onClick={() => setSelectedOption('profile')}>
                                <ListItemIcon><PersonIcon /></ListItemIcon>
                                <ListItemText primary="Perfil" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton disabled>
                                <ListItemIcon><CreditCardIcon /></ListItemIcon>
                                <ListItemText primary="Suscripciones" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton disabled>
                                <ListItemIcon><LanguageIcon /></ListItemIcon>
                                <ListItemText primary="Idioma" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton disabled>
                                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                                <ListItemText primary="Notificaciones" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton disabled>
                                <ListItemIcon><SecurityIcon /></ListItemIcon>
                                <ListItemText primary="Seguridad" />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                                <ListItemText primary="Cerrar sesión" sx={{ color: 'red' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Stack>
            </Paper>

            <Box flex={1} p={4}>
                {renderComponent()}
            </Box>
        </Box>
    );
}
