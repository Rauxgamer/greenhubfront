'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Avatar, Typography, Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/services/firebaseConfig';

interface AdminMenuProps {
  pageTitle: string;
}

export default function AdminMenuComponent({ pageTitle }: AdminMenuProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppBar position="fixed" color="inherit" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', paddingY: '8px', height: '80px', alignItems: 'center' }}>
        <Image
          src="/logo2.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
          priority
          unoptimized
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444' }}>
          {pageTitle}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component={Link}
            href={user ? "/user" : "/login"}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderRadius: '20px',
              bgcolor: '#e8f5e9',
              color: '#333',
              textTransform: 'none',
              paddingX: '10px',
              '&:hover': {
                bgcolor: '#c8e6c9',
                transition: 'background-color 0.3s ease',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {user ? user.displayName || 'Usuario' : 'Iniciar sesión'}
            </Typography>
            {user && user.photoURL ? (
              <Avatar src={user.photoURL} sx={{ width: 30, height: 30 }} />
            ) : (
              <Avatar sx={{ bgcolor: '#757575', width: 30, height: 30 }}>
                <Person fontSize="small" />
              </Avatar>
            )}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
