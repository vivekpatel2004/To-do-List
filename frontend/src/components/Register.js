import { useState } from "react";
import api from "../api";
import "../styles/Auth.css";

export default function Register({ setLoggedIn, goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setError("");
    try {
      const res = await api.post("/register", { email, password });

      // 🔥 Auto-login after register
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <div className="error">{error}</div>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        {/* ALWAYS VISIBLE */}
        <p className="link" onClick={goLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
