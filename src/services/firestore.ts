import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from 'firebase/firestore';

/**
 * Modular service for handling Firestore operations.
 * Centralizing this here keeps UI components clean and makes it easier to mock for testing.
 */
export const firestoreService = {
  // Example: Get user profile
  getUserProfile: async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  
  // Example: Update user profile
  updateUserProfile: async (userId: string, data: any) => {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, data);
  },

  // Example: Get active hunts
  getActiveHunts: async () => {
    const huntsRef = collection(db, 'hunts');
    const q = query(huntsRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
