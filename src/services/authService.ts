import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { SignupData, LoginData } from './auth/types';

export interface AppUser {
  uid: string;
  email: string | null;
  name: string;
  role: string;
  createdAt: any;
  joinedHuntsCount: number;
  progress: number;
}

/**
 * Service to handle Firebase Authentication and Firestore User synchronization.
 */
export const authService = {
  /**
   * Translates common Firebase Authentication error codes to user-friendly messages.
   */
  parseAuthError(error: any): string {
    const code = error?.code;
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email address is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. It must be at least 6 characters long.';
      case 'auth/wrong-password':
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please verify your credentials.';
      case 'auth/too-many-requests':
        return 'Access has been temporarily disabled due to too many failed login attempts. Please reset your password or try again later.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/operation-not-allowed':
        return 'Email/password sign-in is not enabled. Please contact support.';
      default:
        return error?.message || 'An unexpected error occurred during authentication.';
    }
  },

  /**
   * Registers a new user in Firebase Auth and builds their Firestore user document safely.
   */
  async signup({ email, password, name }: SignupData & { name: string }): Promise<FirebaseUser> {
    try {
      // 1. Register with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Set Firebase Auth display name
      await updateProfile(user, { displayName: name });

      // 3. Write user document to Firestore securely (once only during signup)
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: name,
        role: 'user', // Default role
        createdAt: serverTimestamp(),
        joinedHuntsCount: 0,
        progress: 0,
      });

      return user;
    } catch (error: any) {
      console.error('Signup error details:', error);
      throw new Error(this.parseAuthError(error));
    }
  },

  /**
   * Signs in an existing user with Firebase Auth email/password.
   */
  async login({ email, password }: LoginData): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Login error details:', error);
      throw new Error(this.parseAuthError(error));
    }
  },

  /**
   * Signs out the currently authenticated user session.
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error details:', error);
      throw new Error(error?.message || 'Failed to sign out user.');
    }
  },

  /**
   * Safely retrieves personalized user profile metrics from Firestore users collection.
   */
  async getUserData(uid: string): Promise<AppUser | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data() as AppUser;
      }
      return null;
    } catch (error: any) {
      console.error('Firestore user fetching error:', error);
      throw new Error('Failed to retrieve user dashboard information.');
    }
  }
};
