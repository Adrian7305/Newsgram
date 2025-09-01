import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let res;
    if (mode === "login") {
      res = await login(email.trim(), password); // Use email for login
    } else {
      res = await signup(username.trim(), email.trim(), password); // Use username and email for signup
    }
    if (!res.ok) {
      setError(res.error || "Something went wrong");
    }
  };

  return (
    <div className="app-container">
      <div className="nav-header">
        <h1>📰 Newsgram</h1>
      </div>

      <div className="home-container" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="home-header">
          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p>Continue to explore posts after you {mode === "login" ? "log in" : "sign up"}.</p>
        </div>

        <div className="controls-section" style={{ padding: 0, background: "transparent", border: "none" }}>
          <div className="nav-tabs auth-tabs" style={{ marginBottom: 20 }}>
            <button
              className={`nav-tab auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`nav-tab auth-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="add-post-form" style={{ paddingTop: 10 }}>
          {error ? <div className="error-message">{error}</div> : null}

          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          <div className="form-actions" style={{ justifyContent: "center" }}>
            <button type="submit" className="submit-btn">
              {mode === "login" ? "Log In" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;