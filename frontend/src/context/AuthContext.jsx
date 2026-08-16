import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hackathon Demo Mode: Auto-login with a mock user
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@foodguard.ai',
    };
    
    const demoProfile = {
      id: 'demo-user-123',
      email: 'demo@foodguard.ai',
      full_name: 'Hackathon Judge',
      role: 'ADMIN'
    };

    setSession({ user: demoUser });
    setUser(demoUser);
    setProfile(demoProfile);
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // Mock successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ error: null });
      }, 500);
    });
  };

  const signUp = async (email, password, fullName) => {
    return { error: null };
  };

  const signOut = () => {
    setSession(null);
    setUser(null);
    setProfile(null);
    return Promise.resolve();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: profile?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
