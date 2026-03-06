"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  }

  return (

    <main className="container" style={{ padding: "80px 24px", minHeight: "100vh" }}>
    <h1 style={{ fontSize: 40, margin: "0 0 10px" }}>Welcome back</h1>
      <p style={{ color: "var(--muted)", margin: "0 0 24px" }}>
        Login to access saved recipes.
      </p>

      <form onSubmit={handleLogin} style={{ maxWidth: 420, marginTop: 50}}>
        <label style={{ display: "block", marginBottom: 8 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={inputStyle}
          placeholder="you@example.com"
        />

        <label style={{ display: "block", margin: "14px 0 8px" }}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          style={inputStyle}
          placeholder="Your password"
        />

        <button disabled={loading} style={buttonStyle}>
          {loading ? "Signing in..." : "Login"}
        </button>

        {msg ? (
          <p style={{ marginTop: 14, color: "var(--muted)" }}>{msg}</p>
        ) : null}
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text)",
  outline: "none",
};

const buttonStyle = {
  marginTop: 16,
  width: "100%",
  padding: "12px 14px",
  borderRadius: 999,
  border: "1px solid var(--border)",
  background: "var(--accent)",
  color: "#1a1410",
  fontWeight: 700,
  cursor: "pointer",
};