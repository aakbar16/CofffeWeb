import Link from "next/link";

export default function EndlessRecipesSection() {
  return (
    <section className="section" style={{ padding: "96px 0", background: "linear-gradient(180deg,#f6efe7 0%,#efe4d8 100%)" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 520px) minmax(0, 1fr)",
          gap: 72,
          alignItems: "center",
        }}
      >
        {/* Video */}
        <div
          style={{
            borderRadius: 28,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <video
            src="/endless-recipes.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: 320,          
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ paddingRight: 16 }}>
          <h2
            style={{
              fontSize: 56,
              lineHeight: 1.05,
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
              color: "black",
            }}
          >
            Endless recipes, one click away.
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: "black",
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Explore a vast collection of coffee recipes from around the world.
            Whether you&apos;re craving a classic espresso or an adventurous new brew,
            we&apos;ve got you covered.
          </p>

          <div style={{ marginTop: 22 }}>
            <Link
              href="/recipes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.06)",
                color: "black",
                fontWeight: 600,
              }}
            >
              Browse recipes <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>

    
  );
}