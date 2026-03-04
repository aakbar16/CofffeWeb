import Link from "next/link";

export default function LearnRatiosSection() {
    return (
        <section className="section" style={{ padding: "96px 0", background: "linear-gradient(180deg,#f6efe7 0%,#efe4d8 100%)" }}>
            <div
                className="container"
                style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 520px)",
                    gap: 72,
                    alignItems: "center",
                }}
            >
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
                        Learn the ratios, brew with confidence.
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
                        Understand espresso, milk, and foam balance for every drink so you can adjust strength, texture, and flavour like a barista.
                    </p>

                    <div style={{ marginTop: 22 }}>
                        <Link
                            href="/learn-ratios"
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
                            Learn more <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>

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
                        src="/learn-ratios.mp4"
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
            </div>
        </section>
    );
}   