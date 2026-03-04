import Link from "next/link";

export default function Navbar() {
    return (
        <section className="section">
            <div className="container" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                padding: "60px 40",
                alignItems: "center",
            }}>
                

                <h1 style={{fontSize: 56,lineHeight: 1.05, margin: "18px 0 10px", letterSpacing: "-0.02em"}}>
                    Brew the perfect cup 
                    <span style={{color: "var(--accent)"}}> coffee at home. </span>
                </h1>

                <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 520, margin: 0 }}>
                    Discover coffee recipes, brewing guides, and ratios designed to help you make café-quality coffee every day.
                </p>

                
            </div>


    </section>
  );
}
        