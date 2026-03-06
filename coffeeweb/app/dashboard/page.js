"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const [savedCount, setSavedCount] = useState(0);
  const [savedPreview, setSavedPreview] = useState([]);
  const [lastViewed, setLastViewed] = useState(null);

  // Read last viewed from localStorage (works right away)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("coffee:lastViewed");
      if (raw) setLastViewed(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Auth + data
  useEffect(() => {
    let unsub = null;

    async function boot() {
      setLoading(true);

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error.message);
      }

      const session = data?.session;
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setEmail(session.user.email || "");
      setUserId(session.user.id);

      await fetchSaved(session.user.id);

      // Listen for auth changes (logout / login in another tab)
      const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!newSession?.user) router.replace("/login");
      });

      unsub = sub?.subscription;
      setLoading(false);
    }

    async function fetchSaved(uid) {
      // Count saved recipes
      const countRes = await supabase
        .from("saved_recipes")
        .select("id", { count: "exact", head: true })
        .eq("user_id", uid);

      if (countRes.error) {
        // Most common reason: RLS policy missing
        console.log("saved_recipes count error:", countRes.error.message);
      } else {
        setSavedCount(countRes.count || 0);
      }

      // Preview list (top 3)
      const previewRes = await supabase
        .from("saved_recipes")
        .select("recipe_id, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(3);

      if (previewRes.error) {
        console.log("saved_recipes preview error:", previewRes.error.message);
        setSavedPreview([]);
        return;
      }

      // If your recipes table uses id as PK, fetch those recipes
      const ids = (previewRes.data || []).map((r) => r.recipe_id).filter(Boolean);

      if (!ids.length) {
        setSavedPreview([]);
        return;
      }

      const recipesRes = await supabase
        .from("recipes")
        .select("id, title, slug, meta")
        .in("id", ids);

      if (recipesRes.error) {
        console.log("recipes fetch error:", recipesRes.error.message);
        setSavedPreview([]);
        return;
      }

      // Keep same order as ids
      const map = new Map((recipesRes.data || []).map((r) => [r.id, r]));
      const ordered = ids.map((id) => map.get(id)).filter(Boolean);

      setSavedPreview(ordered);
    }

    boot();

    return () => {
      if (unsub) unsub.unsubscribe();
    };
  }, [router]);

  const greeting = useMemo(() => {
    if (!email) return "Welcome back";
    return `Welcome back, ${email}`;
  }, [email]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="container" style={{ padding: "84px 0 110px" }}>
        <div style={{ color: "var(--muted)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Dashboard
        </div>
        <h1 style={{ fontSize: 56, lineHeight: 1, margin: "14px 0 0", letterSpacing: "-0.03em" }}>
          Loading…
        </h1>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "84px 0 110px", minHeight: "calc(100vh - 70px)" }}>
      {/* Hero */}
      <div style={{ maxWidth: 900, marginBottom: 34 }}>
        <div style={{ color: "var(--muted)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Coffee Wiki
        </div>

        <h1 style={{ fontSize: 64, lineHeight: 0.98, margin: "14px 0 12px", letterSpacing: "-0.04em" }}>
          {greeting}
        </h1>

        <p style={{ margin: 0, color: "var(--muted)", fontSize: 18, lineHeight: 1.55, maxWidth: 760 }}>
          Pick up where you left off, discover new drinks, and keep your favourites organized.
        </p>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <Panel
          title="Browse recipes"
          desc="Explore espresso, iced, and brewed drinks — with ratios and methods."
          href="/recipes"
          big
        />

        <Panel
          title={`Saved (${savedCount})`}
          desc="Your favourites in one place."
          href="/saved"
        />
      </div>

      <Divider />

      {/* Continue */}
      <div style={{ marginTop: 40 }}>
        <SectionHeader title="Continue" subtitle="Your last viewed recipe will appear here automatically." />

        {lastViewed ? (
          <WideCardLink href={lastViewed.href || "/recipes"}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Last viewed
                </div>
                <div style={{ marginTop: 10, fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>
                  {lastViewed.title || "Recipe"}
                </div>
                <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 15 }}>
                  {lastViewed.meta || "Open to continue"}
                </div>
              </div>
              <div style={{ alignSelf: "center", color: "var(--muted)", fontSize: 14 }}>
                Open →
              </div>
            </div>
          </WideCardLink>
        ) : (
          <WideCard>
            <div style={{ fontSize: 18, fontWeight: 900 }}>No recent recipe yet</div>
            <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 15, maxWidth: 760 }}>
              Once you open any recipe, it will show up here.
            </div>
            <div style={{ marginTop: 16 }}>
              <Link href="/recipes" style={{ color: "var(--muted)", fontSize: 14 }}>
                Browse recipes →
              </Link>
            </div>
          </WideCard>
        )}
      </div>

      <Divider style={{ marginTop: 46 }} />

      {/* Saved preview */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <SectionHeader title="Saved preview" subtitle="Most recent favourites." noMargin />
          <Link href="/saved" style={{ color: "var(--muted)", fontSize: 14 }}>
            See all →
          </Link>
        </div>

        {savedPreview.length ? (
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {savedPreview.map((r) => (
              <WideCardLink key={r.id} href={r.slug ? `/recipes/${r.slug}` : `/recipes/${r.id}`}>
                <div style={{ fontSize: 16, fontWeight: 900 }}>{r.title || "Recipe"}</div>
                <div style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>
                  {r.meta || "Saved recipe"}
                </div>
                <div style={{ marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
                  View →
                </div>
              </WideCardLink>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 14 }}>
            <WideCard>
              <div style={{ fontSize: 18, fontWeight: 900 }}>No saved recipes yet</div>
              <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 15 }}>
                Save any recipe and it will show up here.
              </div>
              <div style={{ marginTop: 16 }}>
                <Link href="/recipes" style={{ color: "var(--muted)", fontSize: 14 }}>
                  Explore recipes →
                </Link>
              </div>
            </WideCard>
          </div>
        )}
      </div>

      <Divider style={{ marginTop: 46 }} />

      {/* Account */}
      <div style={{ marginTop: 40 }}>
        <SectionHeader title="Account" subtitle="Manage your session and profile." />

        <WideCard>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Signed in as
              </div>
              <div style={{ marginTop: 10, fontSize: 18, fontWeight: 900 }}>
                {email || "—"}
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.06)",
                color: "var(--text)",
                padding: "10px 14px",
                borderRadius: 999,
                cursor: "pointer",
                height: 40,
                fontWeight: 700,
              }}
            >
              Logout →
            </button>
          </div>
        </WideCard>
      </div>
    </main>
  );
}

/* --- UI helpers --- */

function Divider({ style }) {
  return (
    <div
      style={{
        height: 1,
        background: "rgba(255,255,255,0.08)",
        marginTop: 10,
        ...style,
      }}
    />
  );
}

function SectionHeader({ title, subtitle, noMargin = false }) {
  return (
    <div style={{ margin: noMargin ? 0 : "0 0 16px" }}>
      <h2 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em" }}>{title}</h2>
      {subtitle ? (
        <p style={{ margin: "10px 0 0", color: "var(--muted)", fontSize: 15, maxWidth: 820 }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function WideCard({ children }) {
  return (
    <div
      style={{
        borderRadius: 28,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.05)",
        padding: 22,
      }}
    >
      {children}
    </div>
  );
}

function WideCardLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        borderRadius: 28,
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.05)",
        padding: 22,
      }}
    >
      {children}
    </Link>
  );
}

function Panel({ title, desc, href, big = false }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        borderRadius: 30,
        border: "1px solid var(--border)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
        padding: big ? 26 : 22,
        minHeight: 150,
      }}
    >
      <div style={{ fontSize: big ? 22 : 18, fontWeight: 900, letterSpacing: "-0.01em" }}>
        {title}
      </div>
      <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 15, maxWidth: 520 }}>
        {desc}
      </div>
      <div style={{ marginTop: 18, color: "var(--muted)", fontSize: 14 }}>
        Go →
      </div>
    </Link>
  );
}