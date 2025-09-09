import { createUserWithEmailAndPassword, User } from "firebase/auth"
import { RegisterData } from "../types/auth"
import { auth, db } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const registerUser = async ({ email, password }: RegisterData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('AUTH', auth)
    const newUser = userCredential.user;

    await setDoc(doc(db, "users", newUser.uid), {
      email: newUser.email,
      createdAt: serverTimestamp()
    });

    return newUser;

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};
