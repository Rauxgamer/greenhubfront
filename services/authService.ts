import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
export async function createOrUpdateUserProfile(uid: string, data: Record<string, any>) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    // Si no existía, incluimos createdAt + el resto
    await setDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),  // timestamp real
      updatedAt: serverTimestamp(),
    });
  } else {
    // Si ya existía, solo mergedata + updatedAt
    await setDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
}


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



  
  