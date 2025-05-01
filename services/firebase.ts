import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setCookie, destroyCookie } from 'nookies';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Login por email y password
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  setCookie(null, 'token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 días
    path: '/',
    secure: true,
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

  return userCredential;
};

// Logout del usuario
export const logoutUser = async () => {
  await auth.signOut();
  destroyCookie(null, 'token', { path: '/' });
};
