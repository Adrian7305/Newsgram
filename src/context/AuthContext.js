import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "newsgram.auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount (optional, for persistence)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {}
  }, []);

  // Save user to localStorage when changed (optional)
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  // Login using backend API (now takes email)
  const login = async (email, password) => {
    if (!email || !password)
      return { ok: false, error: "Email and password are required" };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        return { ok: true };
      }
      return { ok: false, error: data.error || "Invalid credentials" };
    } catch {
      return { ok: false, error: "Unable to login. Try again." };
    }
  };

  // Signup using backend API (now takes username, email, password)
  const signup = async (username, email, password) => {
    if (!username || !email || !password)
      return { ok: false, error: "Username, email, and password are required" };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setUser({ username, email });
        return { ok: true };
      }
      return { ok: false, error: data.error || "Unable to sign up." };
    } catch {
      return { ok: false, error: "Unable to sign up. Try again." };
    }
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
export default AuthContext;