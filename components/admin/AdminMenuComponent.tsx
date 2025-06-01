// AdminMenuComponent.jsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Avatar, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import { Person, Menu } from '@mui/icons-material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/services/firebaseConfig';

export default function AdminMenuComponent({ pageTitle, onMenuClick }) {
  const [user, setUser] = useState(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppBar position="fixed" color="inherit" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', py: '8px', height: '80px', alignItems: 'center' }}>
        {isMobile && (
          <IconButton edge="start" onClick={onMenuClick}>
            <Menu />
          </IconButton>
        )}
        <Image
          src="/logo2.png"
          alt="Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '150px', height: 'auto', objectFit: 'contain' }}
          priority
          unoptimized
        />
        
        {!isMobile && (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444' }}>
            {pageTitle}
          </Typography>
        )}

        <Button component={Link} href={user ? "/user" : "/login"} sx={{ borderRadius: '20px', bgcolor: '#e8f5e9', paddingX: '10px' }}>
          {user && user.photoURL ? (
            <Avatar src={user.photoURL} sx={{ width: 30, height: 30 }} />
          ) : (
            <Avatar sx={{ bgcolor: '#757575', width: 30, height: 30 }}>
              <Person fontSize="small" />
            </Avatar>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
