import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth"
import { LoginData, RegisterData } from "../types/auth"
import { auth, db } from "../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export const registerUser = async ({ name, email, password }: RegisterData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    console.log('new', newUser)

    await setDoc(doc(db, "users", newUser.uid), {
      name: name,
      email: newUser.email,
      createdAt: serverTimestamp()
    });

    return newUser;

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
