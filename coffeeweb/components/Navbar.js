"use client";
import Link from "next/link";

export default function Navbar({ isAuthed = false }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>
        <Link href="/">Coffee Wiki</Link>
      </div>

      <div style={{ display: "flex", gap: 22, fontSize: 14, alignItems: "center" }}>
        <Link className="navLink" href="/learn">Learn</Link>
        <Link className="navLink" href="/recipes">Recipes</Link>
        <Link className="navLink" href="/methods">Methods</Link>

        {isAuthed ? (
            <>
            <Link href="/saved" className="navLink">Saved</Link>
            <Link href="/profile" className="navLink">Profile</Link>
            <button
                type="button"
                style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "var(--text)",
                padding: "8px 12px",
                borderRadius: 999,
                cursor: "pointer",
              }}
              onClick={() => alert("Next step: we will hook this to Supabase signOut")}                    
            >
                Logout
            </button>
            </>
        ) : (
            <>
            <Link href="/login">Login </Link>
            <Link href="/register">Register </Link>
            </>
        )}
      </div>
    </nav>
  );
}   
