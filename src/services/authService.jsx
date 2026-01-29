import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase"; // <--- You import it here

const googleProvider = new GoogleAuthProvider();

export const signup = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);

export const getUser = () => auth.currentUser;

export const getIdToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};

// 👇 ADD THIS LINE SO APICLIENT CAN USE IT
export { auth };