'use client';

import { useEffect, useState } from 'react';

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/session');
      if (!response.ok) {
        setCurrentUser(null);
        setError('Not authenticated');
      } else {
        const data = await response.json();
        setCurrentUser(data.user ?? null);
        setError(null);
      }
    } catch (err) {
      setCurrentUser(null);
      setError('Failed to fetch session');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Failed to sign in');
      }

      await refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
      setCurrentUser(null);
      setError(null);
    } catch (err) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    login,
    logout,
    refresh,
  };
}
