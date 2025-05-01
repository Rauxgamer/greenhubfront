import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {app} from './firebaseConfig'

const db = getFirestore(app);

// Obtiene perfil de usuario existente
export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No existe el documento del usuario!");
    return null;
  }
};

// Crea o actualiza el perfil del usuario en Firestore
export const createOrUpdateUserProfile = async (userId: string, userData: any) => {
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, userData, { merge: true });
};


export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      return cookie || null;
    }
    return null;
  };



  
  