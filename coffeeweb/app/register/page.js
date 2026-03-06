"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMsg(error.message);
            setLoading(false);
            return;
        }

        setMsg("Check your email to confirm your account!");
        setLoading(false);

        setTimeout(() => router.push("/login"), 800);
    }

    return (
        <main className="container" style={{ padding: "80px 24px", minHeight: "100vh" }}>
        <h1 style={{ fontSize: 40, margin: "0 0 10px" }}>Create an account</h1>
            <p style={{ color: "var(--muted)", margin: "0 0 30px" }}>
                Register to save your favorite recipes, access personalized recommendations, and more.
            </p>

                <form onSubmit={handleRegister} style={{ maxWidth: 420, marginTop: 50 }}>
                <label style={{ display: "block", marginBlock: 8}}>Email</label>
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
                    placeholder="Enter a strong password"
                />
                <button disabled={loading} type="submit" style={buttonStyle}>
                    {loading ? "Creating account..." : "Register"}
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