import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { SignupData, LoginData } from './types';

// Types can be defined here or in a separate types file
export interface AppUser {
  uid: string;
  email: string | null;
  role: string;
  createdAt: any;
}

export const authService = {
  async signup({ email, password }: SignupData) {
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        role: 'user', // Default role
        createdAt: serverTimestamp(),
      });

      return user;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  async login({ email, password }: LoginData) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  async getUserData(uid: string): Promise<AppUser | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as AppUser;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
};
