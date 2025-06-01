
"use client";

import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User state will be updated by onAuthStateChanged
      // router.push('/admin'); // Let the login page handle redirection
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged
      // router.push('/admin/login'); // Let the AdminLayout handle redirection
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
