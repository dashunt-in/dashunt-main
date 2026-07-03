'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AppUser, authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  refreshAppUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  loading: true,
  refreshAppUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAppUser = async () => {
    if (auth.currentUser) {
      try {
        const data = await authService.getUserData(auth.currentUser.uid);
        setAppUser(data);
      } catch (error) {
        console.error("Failed to refresh app user data:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Fetch additional user data from Firestore
          let data = await authService.getUserData(firebaseUser.uid);
          
          // Race condition safety: if Firestore document isn't fully created yet (e.g. during registration), retry once
          if (!data) {
            console.log("App user document not found yet, retrying in 800ms...");
            await new Promise(resolve => setTimeout(resolve, 800));
            data = await authService.getUserData(firebaseUser.uid);
          }
          
          setAppUser(data);
        } catch (error) {
          console.error("Failed to fetch app user data", error);
        }
      } else {
        setAppUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, appUser, loading, refreshAppUser }}>
      {children}
    </AuthContext.Provider>
  );
};

