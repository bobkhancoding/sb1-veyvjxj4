import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { authService, profileService } from '@/lib/database';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (isMountedRef.current) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await loadProfile();
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (isMountedRef.current) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await loadProfile();
          } else {
            setProfile(null);
            setLoading(false);
          }
        }
      }
    );

    return () => {
      isMountedRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await profileService.getCurrentProfile();
      if (isMountedRef.current) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string; phone?: string; role: 'admin' | 'teacher' | 'student' }) => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    try {
      const result = await authService.signUp(email, password, userData);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    try {
      const result = await authService.signIn(email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const signOut = async () => {
    if (isMountedRef.current) {
      setLoading(true);
    }
    try {
      await authService.signOut();
    } catch (error) {
      throw error;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isTeacher: profile?.role === 'teacher' || profile?.role === 'admin',
    isStudent: profile?.role === 'student'
  };
}