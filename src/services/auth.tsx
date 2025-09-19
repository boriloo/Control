import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, UserProfile } from "firebase/auth"
import { LoginData, RegisterData } from "../types/auth"
import { auth, db } from "../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc, } from "firebase/firestore";

export const registerUser = async ({ name, email, password }: RegisterData): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    console.log('new', newUser)

    await updateProfile(newUser, {
      displayName: name,
    });

    await setDoc(doc(db, "users", newUser.uid), {
      name: name,
      email: newUser.email,
      opaqueWindows: true,
      sideBlur: false,
      createdAt: serverTimestamp()
    });

    const userDocRef = doc(db, "users", newUser.uid);
    const userDoc = await getDoc(userDocRef);

    const userProfile: UserProfile = {
      uid: newUser.uid,
      ...userDoc.data() as Omit<User, 'uid'>
    }

    return userProfile;

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};


export const loginUser = async ({ email, password }: LoginData): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("Usuário autenticado, mas não possui dados no Firestore.")
    }

    const userProfile: User = {
      uid: user.uid,
      ...userDoc.data() as Omit<User, 'uid'>
    }

    return userProfile;

  } catch (error) {
    console.error("Erro ao entrar", error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  const userDocRef = doc(db, "users", uid);

  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    throw new Error("Perfil de utilizador não encontrado no Firestore.");
  }

  const userProfile: UserProfile = {
    uid: uid,
    ...userDoc.data() as Omit<UserProfile, 'uid'>
  };

  return userProfile;
};
