import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies';
import {app} from './firebaseConfig'
import { createOrUpdateUserProfile } from './authService';



const auth = getAuth(app);
export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  username: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  // Guarda datos iniciales del usuario en Firestore
  const { uid, email: userEmail } = userCredential.user;
  await createOrUpdateUserProfile(uid, {
    email: userEmail,
    displayname: displayName,
    username: username,
    photoURL: '',
    emailVerified: false,
    createdAt: new Date(),
    role: 'user', // rol por defecto
    bio: 'Sin descripción'
  });

  return { userCredential, token };
};

// Login por email y password
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
  });

  // Guarda o actualiza datos del usuario en Firestore
  const { uid, email: userEmail, displayName, photoURL } = userCredential.user;
  await createOrUpdateUserProfile(uid, {
    email: userEmail,
    displayName: displayName || 'Nuevo usuario',
    photoURL: photoURL || '',
    emailVerified: userCredential.user.emailVerified,
    lastLogin: new Date(),
    role: 'user', // rol por defecto
    username: displayName || 'Nuevo usuario',
    bio: 'Sin descripción'
  });

  return userCredential;
};

// Login con Google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const token = await userCredential.user.getIdToken();

  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true,
  });

  // Guarda o actualiza datos del usuario en Firestore
  const { uid, email, displayName, photoURL } = userCredential.user;
  await createOrUpdateUserProfile(uid, {
    lastLogin: new Date(),
  });

  return userCredential;
};

// Logout del usuario
export const logoutUser = async () => {
  await auth.signOut();
  destroyCookie(null, 'token', { path: '/' });
};
export {auth,onAuthStateChanged}

