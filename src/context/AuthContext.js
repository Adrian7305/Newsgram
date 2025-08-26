import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "newsgram.auth";
const USERS_STORAGE_KEY = "newsgram.users";
const DEMO_USER = { username: "demo", password: "demo123" };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.username) {
          setUser(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  const login = (username, password) => {
    const isValid = Boolean(username && password);
    if (!isValid) return { ok: false, error: "Username and password are required" };

    // Check demo account first
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      setUser({ username, createdAt: Date.now(), isDemo: true });
      return { ok: true };
    }

    // Check stored users
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      const found = users.find((u) => u.username === username && u.password === password);
      if (found) {
        setUser({ username: found.username, createdAt: found.createdAt });
        return { ok: true };
      }
    } catch {}

    return { ok: false, error: "Invalid credentials" };
  };

  const signup = (username, password) => {
    const isValid = Boolean(username && password);
    if (!isValid) return { ok: false, error: "Username and password are required" };
    if (username === DEMO_USER.username) return { ok: false, error: "Username is reserved" };
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      if (users.some((u) => u.username === username)) {
        return { ok: false, error: "Username already exists" };
      }
      const newUser = { username, password, createdAt: Date.now() };
      const next = [...users, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(next));
      setUser({ username, createdAt: newUser.createdAt });
      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to sign up. Try again." };
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


