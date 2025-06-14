import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import { setCookie, destroyCookie } from 'nookies';
import { app } from './firebaseConfig';
import { createOrUpdateUserProfile } from './authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const auth = getAuth(app);
const functions = getFunctions(app);  // Obtén la instancia de Firebase Functions

// Función para asignar el rol de "admin"
const assignAdminRole = async (uid: string) => {
  try {
    const setAdminRoleFunction = httpsCallable(functions, 'setAdminRole');  
    const result = await setAdminRoleFunction({ uid });
    console.log('Resultado:', result.data.message);  // Mensaje de éxito
  } catch (error) {
    console.error('Error al asignar el rol:', error);
  }
};

// Función para obtener el rol desde Firestore
const getUserRoleFromFirestore = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data()?.role || 'user'; // Retorna el rol, 'user' por defecto si no está definido
  }
  return 'user'; 
};

// Login por email y password
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken(true); // 'true' fuerza la actualización del token

  // Guardar el token en las cookies
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, 
    path: '/',
    secure: true,
  });

  // Actualizar datos del usuario en Firestore
  const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
  const role = await getUserRoleFromFirestore(uid); // Obtener rol desde Firestore
  await createOrUpdateUserProfile(uid, {
    email: userEmail,
    displayName: displayName || 'Nuevo usuario',
    photoURL: photoURL || '',
    emailVerified: userCredential.user.emailVerified,
    lastLogin: new Date(),
    role: role, 
    username: displayName || 'Nuevo usuario',
    bio: 'Sin descripción'
  });

  // Si el rol es admin, asignar el rol en el custom claims del token
  if (role === 'admin') {
    await assignAdminRole(uid); // Llamada al Admin SDK para asignar el rol "admin"
    const updatedToken = await userCredential.user.getIdToken(true); // Refresca el token después de asignar el rol
    setCookie(null, 'token', updatedToken, {
      maxAge: 30 * 24 * 60 * 60, 
      path: '/',
      secure: true,
    });
  }

  return userCredential;
};

// Login con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const token = await userCredential.user.getIdToken(true); 

  // Guardar el token en las cookies
  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, 
    path: '/',
    secure: true,
  });

  // Actualizar datos del usuario en Firestore
  const { uid, email, displayName, photoURL } = userCredential.user;
  assignAdminRole(uid);
  const role = await getUserRoleFromFirestore(uid); 
  await createOrUpdateUserProfile(uid, {
    lastLogin: new Date(),
    role: role, 
  });

  // Si el rol es admin, asignar el rol en el custom claims del token
  if (role === 'admin') {
    await assignAdminRole(uid); // Llamada al Admin SDK para asignar el rol "admin"
    const updatedToken = await userCredential.user.getIdToken(true); // Refresca el token después de asignar el rol
    setCookie(null, 'token', updatedToken, {
      maxAge: 30 * 24 * 60 * 60, 
      path: '/',
      secure: true,
    });
  }

  return userCredential;
};

// Logout del usuario
export const logoutUser = async () => {
  await auth.signOut();
  destroyCookie(null, 'token', { path: '/' });
};

export { auth, onAuthStateChanged };
