
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, onAuthStateChanged } from '@/services/firebase';  // Tu configuración de Firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from '@/services/firebaseConfig';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Esto se ejecuta cuando el estado de autenticación de Firebase cambia
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        
        // Accedemos al rol desde Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid); // Accede al documento del usuario en Firestore
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            
            const userData = userDoc.data();
            if (userData.role == 'admin') {
              setIsAdmin(true);  // Si el rol es admin, establecemos isAdmin en true
            } else {
              setIsAdmin(false); // Si el rol no es admin, establecemos isAdmin en false
            }
          } else {
            // Si el documento no existe, tratamos como un usuario normal
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error al obtener el rol de Firestore:", error);
        }

      } else {
        setIsAuthenticated(false);
        setIsAdmin(false); // Si el usuario no está autenticado, establecemos isAdmin en false
      }
      setLoading(false); 
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);



  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
